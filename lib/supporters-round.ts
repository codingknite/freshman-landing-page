/**
 * The supporters round page (joinfreshman.com/supporters?code=...).
 *
 * Types mirror the API's `/supporters-round` responses (api-v2
 * src/supportersRound/service.ts). The page never sees a full name, email or
 * country: names arrive masked ("Jo***") and only paid rows are listed.
 *
 * Everything in `ROUND_COPY` is a placeholder from the spec still to be filled
 * in before launch; leave a value `null` and its line is left out.
 */

export type RoundState = {
  name: string;
  targetCents: number;
  centsPerShare: number;
  companyShares: number;
  sharesOffered: number;
  minCents: number;
  maxCents: number;
  participantCap: number;
  endsAt: string | null;
  closedAt: string | null;
  open: boolean;
  full: boolean;
};

export type PublicSupporter = {
  key: string;
  displayName: string;
  amountCents: number | null;
  paidAt: string;
};

export type PublicRound = {
  round: RoundState;
  totals: { receivedCents: number; pendingCents: number; paidCount: number; sharesLeft: number };
  supporters: PublicSupporter[];
};

export type PledgeResult = { firstName: string; amountCents: number; shares: number };

export const ROUND_COPY = {
  /** "We email you within [2] days." */
  followUpDays: 2,
  /** Section 3's money split, in whole dollars. `null` hides the amount on the card. */
  moneySplit: { talk: null as number | null, creators: null as number | null, test: null as number | null },
  paymentsFrom: 'joel@joinfreshman.com',
  questionsTo: 'team@joinfreshman.com',
  team: [
    { name: 'Joel', role: 'CEO', photo: '/team/joel.png' },
    { name: 'Serge', role: 'Founding Advisor', photo: '/team/serge.png' },
    { name: 'Christina', role: 'CFO', photo: '/team/christina.png' },
    { name: 'Edwina', role: 'Head of Growth', photo: '/team/edi.png' },
  ],
  /** "[Final legal wording from your lawyer.]" Shown after the small print once set. */
  legalSmallPrint: null as string | null,
};

const DAY_MS = 24 * 60 * 60 * 1000;

export const sharesFor = (dollars: number, centsPerShare: number): number =>
  Math.floor((dollars * 100) / centsPerShare);

export function formatDollars(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export const formatCount = (value: number): string => new Intl.NumberFormat('en-US').format(value);

/** "0.025%": at most 3 decimals, trailing zeros dropped. */
export function formatPercent(shares: number, companyShares: number): string {
  const percent = (shares / companyShares) * 100;
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 3 }).format(percent)}%`;
}

/**
 * "December 7": the round's last day, in Kampala time so the server and the
 * browser render the same date (the deadline is 23:59 on that day, EAT).
 */
export function formatDeadline(endsAt: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'Africa/Kampala' }).format(
    new Date(endsAt),
  );
}

export function daysLeft(endsAt: string | null, now = Date.now()): number | null {
  if (!endsAt) return null;
  return Math.max(0, Math.ceil((new Date(endsAt).getTime() - now) / DAY_MS));
}

export function relativeDay(iso: string, now = Date.now()): string {
  const days = Math.floor((now - new Date(iso).getTime()) / DAY_MS);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? 'a month ago' : `${months} months ago`;
}

/** The API's refusals, in the page's plain words. */
export function pledgeErrorMessage(message: string, params?: { minCents?: number; maxCents?: number }): string {
  switch (message) {
    case 'round.invite_invalid':
      return 'This invitation link no longer works. Ask the person who sent it to you for a new link.';
    case 'round.full':
      return 'The round is full, so we cannot take new pledges. Thank you for wanting to join.';
    case 'round.closed':
      return 'The round has closed, so we cannot take new pledges. Thank you for wanting to join.';
    case 'round.amount_too_small':
      return `The smallest amount is ${formatDollars(params?.minCents ?? 10000)}.`;
    case 'round.amount_whole_dollars':
      return 'Please enter a whole number of dollars.';
    case 'round.amount_too_large':
      return params?.maxCents
        ? `The most you can put in is ${formatDollars(params.maxCents)}.`
        : 'You have already pledged the most one person can put in.';
    case 'round.not_enough_shares':
      return params?.maxCents
        ? `There are only enough shares left for ${formatDollars(params.maxCents)}.`
        : 'There are not enough shares left for that amount.';
    case 'rate_limited':
      return 'Too many tries. Please wait a minute and try again.';
    default:
      return 'Something went wrong on our side. Please try again, or email us.';
  }
}
