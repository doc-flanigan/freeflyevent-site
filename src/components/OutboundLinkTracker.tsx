"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Counts clicks on links that leave the site, as a Vercel Web Analytics
 * custom event: `Outbound` with { domain, url }. The page the click came from
 * is Vercel's own requestPath/route dimension, so it isn't sent again.
 *
 * One delegated listener covers every <a>, including links inside guide HTML
 * (contentHtml), which can't carry onClick handlers. Middle-clicks count too.
 * Query strings and fragments are dropped before sending, so referral codes,
 * UTM tags and other parameters are never stored. Nothing is sent about the
 * visitor beyond what Web Analytics already records (cookieless).
 *
 * Query: Vercel MCP aggregate_events, filter eventName eq 'Outbound',
 * by eventData/domain (or eventData/url, requestPath).
 */
const bare = (host: string) => host.replace(/^www\./, "").toLowerCase();

export default function OutboundLinkTracker() {
  useEffect(() => {
    const self = bare(window.location.hostname);
    const onClick = (e: MouseEvent) => {
      if (e.type === "auxclick" && e.button !== 1) return; // only middle-click
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      let u: URL;
      try {
        u = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (u.protocol !== "http:" && u.protocol !== "https:") return;
      const domain = bare(u.hostname);
      if (domain === self) return;
      const path = u.pathname === "/" ? "" : u.pathname.replace(/\/$/, "");
      track("Outbound", { domain, url: (domain + path).slice(0, 255) });
    };
    // capture phase: runs even if a link's own handler stops propagation
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);
  return null;
}
