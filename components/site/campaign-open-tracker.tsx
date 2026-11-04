'use client';

import { useEffect } from 'react';

const SOURCE = 'reactivation';
const SEEN_KEY = `campaign-open:${SOURCE}`;

/**
 * Counts an open of the landing page from the reactivation emails' link. It runs
 * in the browser so mail scanners that fetch links without running them are not
 * counted, and once per tab so a refresh is not a second open.
 */
export function CampaignOpenTracker() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('utm_source') !== SOURCE) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Blocked storage only means a refresh could count twice.
    }
    fetch('/api/campaign-open', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: SOURCE }),
      keepalive: true,
    }).catch(() => undefined);
  }, []);
  return null;
}
