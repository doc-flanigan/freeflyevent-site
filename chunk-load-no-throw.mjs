// Webpack plugin: a JS chunk that fails to load is retried, then waited on
// forever instead of throwing. Client build only (wired in next.config.mjs).
//
// Why: Google's renderer skips some resources on any given render ("Other
// error" in URL Inspection). When a chunk that hydration needs fails after
// hydration has started, webpack rejects with ChunkLoadError, React gives up
// on hydration (#423), switches the whole root to client rendering, fails
// again, and the page Google renders comes out blank or degraded: no content,
// no breadcrumbs, no canonical. That is how /day-one-citizen/first-flight was
// handed to another site's canonical. It was reproduced in Chrome on 2026-10-22
// by delaying a chunk 1.5s and then aborting it.
//
// With this runtime patch, a failed chunk is retried twice (0.5s, then 1s).
// If it still fails, the promise never settles. React suspends instead of
// throwing, so the server-rendered HTML stays exactly as delivered, readable
// and indexable. Visitors on a genuinely broken connection get the static page
// (links still work) instead of an error screen.

export default class ChunkLoadNoThrowPlugin {
  constructor(webpack) {
    this.webpack = webpack
  }

  apply(compiler) {
    const { RuntimeModule, RuntimeGlobals, Template } = this.webpack
    const ensure = RuntimeGlobals.ensureChunk // "__webpack_require__.e"

    class NoThrowEnsureChunk extends RuntimeModule {
      constructor() {
        // STAGE_TRIGGER runs after ensureChunk is defined, so we can wrap it.
        super('chunk-load-no-throw', RuntimeModule.STAGE_TRIGGER)
      }

      generate() {
        return Template.asString([
          `var origEnsure = ${ensure};`,
          `${ensure} = function (chunkId) {`,
          Template.indent([
            'var attempt = function (retriesLeft, delay) {',
            Template.indent([
              'return origEnsure(chunkId).catch(function () {',
              Template.indent([
                // Never settle: React suspends and keeps the server HTML.
                'if (retriesLeft <= 0) return new Promise(function () {});',
                'return new Promise(function (resolve) { setTimeout(resolve, delay); })',
                '  .then(function () { return attempt(retriesLeft - 1, delay * 2); });',
              ]),
              '});',
            ]),
            '};',
            'return attempt(2, 500);',
          ]),
          '};',
        ])
      }
    }

    compiler.hooks.thisCompilation.tap('ChunkLoadNoThrowPlugin', (compilation) => {
      const added = new WeakSet()
      compilation.hooks.runtimeRequirementInTree
        .for(ensure)
        .tap('ChunkLoadNoThrowPlugin', (chunk) => {
          if (added.has(chunk)) return
          added.add(chunk)
          compilation.addRuntimeModule(chunk, new NoThrowEnsureChunk())
        })
    })
  }
}
