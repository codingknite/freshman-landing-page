'use client';

import type { Config, Dict, OverridedMixpanel } from 'mixpanel-browser';

/**
 * Mixpanel for the marketing site, in the same project as the desktop and
 * mobile apps (`NEXT_PUBLIC_MIXPANEL_TOKEN` is the same token as their
 * `MIX_PANEL_TOKEN`), so a download can be followed into sign-up.
 *
 * Events are prefixed `web_`, as desktop's are `desk_`. Without a token
 * nothing loads and every call is a no-op; analytics never break a page.
 */

export const Events = {
  desktopDownloadClicked: 'web_desktop_download_clicked',
} as const;

export type DesktopPlatform = 'mac_apple_silicon' | 'mac_intel' | 'windows';

const TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? '';

let client: Promise<OverridedMixpanel | null> | null = null;

function load(): Promise<OverridedMixpanel | null> {
  if (!TOKEN || typeof window === 'undefined') return Promise.resolve(null);
  client ??= import('mixpanel-browser')
    .then(({ default: mixpanel }) => {
      mixpanel.init(TOKEN, {
        autocapture: false,
        track_pageview: false,
        persistence: 'localStorage',
        // A download navigates away from nothing, but a beacon still survives
        // the browser handing the click to the file download.
        api_transport: 'sendBeacon',
      } as Partial<Config>);
      mixpanel.register({ platform: 'web' });
      return mixpanel;
    })
    .catch(() => null);
  return client;
}

/**
 * `immediate` skips Mixpanel's ~10s batch, for clicks after which the visitor
 * often closes the tab (a download), so the event is not left in the queue.
 */
export function track(event: string, properties?: Dict, options?: { immediate?: boolean }): void {
  load()
    .then((mixpanel) =>
      mixpanel?.track(event, properties, options?.immediate ? { send_immediately: true } : undefined),
    )
    .catch(() => undefined);
}

/** A click on one of the desktop installers. */
export function trackDesktopDownload(input: {
  platform: DesktopPlatform;
  /** Where on the page the button sits. */
  placement: 'hero' | 'platforms';
  version: string | null;
  locale: string;
  /** False when the release lookup failed and the button opens the releases page instead. */
  direct: boolean;
}): void {
  track(Events.desktopDownloadClicked, {
    desktop_platform: input.platform,
    placement: input.placement,
    app_version: input.version,
    locale: input.locale,
    direct_download: input.direct,
    page: window.location.pathname,
  }, { immediate: true });
}
