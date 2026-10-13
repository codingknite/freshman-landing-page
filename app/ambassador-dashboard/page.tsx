'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Copy, LogOut } from 'lucide-react';
import { AMBASSADOR_LOGIN_PATH } from '@/lib/ambassador-cookies';
import {
  displayCountry,
  displayPlan,
  fetchPortalFriends,
  fetchPortalProfile,
  fetchPortalSummary,
  filterDaily,
  formatDate,
  formatMoney,
  signOutAmbassador,
  type ChartRange,
  type DailyCount,
  type PortalFriend,
  type PortalProfile,
  type PortalSummary,
} from '@/lib/ambassador-portal';
import { cn } from '@/lib/utils';

const card =
  'rounded-[24px] bg-white/90 shadow-[0_1px_0_rgba(10,11,20,.04),0_24px_48px_-28px_rgba(45,32,29,.35)] backdrop-blur-sm';

/**
 * The ambassador's own page: their code, three numbers, claims over time, and
 * the friends who used the code (first name, plan, course and country only).
 * Moved here from the internal dashboard; the data and rules are unchanged.
 */
export default function AmbassadorDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<PortalProfile | null>(null);
  const [summary, setSummary] = useState<PortalSummary | null>(null);
  const [friends, setFriends] = useState<PortalFriend[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fail = (failure: unknown) =>
      setError(failure instanceof Error ? failure.message : "Couldn't load your page.");
    fetchPortalProfile().then(setProfile).catch(fail);
    fetchPortalSummary().then(setSummary).catch(fail);
    fetchPortalFriends().then(setFriends).catch(fail);
  }, []);

  const copyCode = async () => {
    if (!profile) return;
    try {
      await navigator.clipboard.writeText(profile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Couldn't copy the code. Select it and copy it instead.");
    }
  };

  const signOut = async () => {
    await signOutAmbassador().catch(() => undefined);
    router.push(AMBASSADOR_LOGIN_PATH);
    router.refresh();
  };

  const minimum = summary?.payoutMinimum ?? 5000;
  const available = summary?.available ?? 0;
  const rate = Math.round((profile?.commissionRate ?? 0.25) * 100);

  const stats = [
    {
      title: 'Friends who used your code',
      value: String(summary?.friends ?? 0),
      note: 'Counted once their payment goes through',
    },
    {
      title: 'Earned so far',
      value: formatMoney(summary?.earned ?? 0),
      note: `${formatMoney(summary?.paid ?? 0)} paid out to you · ${rate}% of what your friends pay`,
    },
    {
      title: 'Next payout',
      value: formatMoney(available),
      note: summary?.pending
        ? `${formatMoney(summary.pending)} more clears on ${formatDate(summary.nextAvailableAt)}. Paid monthly by PayPal or Wise, from ${formatMoney(minimum)}.`
        : `Each payment clears 30 days after it's made. Paid monthly by PayPal or Wise, from ${formatMoney(minimum)}.`,
    },
  ];

  return (
    <main className='mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8'>
      <header className='flex items-center justify-between'>
        <Link href='/en' aria-label='Freshman AI'>
          <Image src='/freshman-footer.svg' alt='Freshman AI' width={800} height={352} unoptimized priority className='h-12 w-auto' />
        </Link>
        <button
          type='button'
          onClick={signOut}
          className='inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-swirl-900 transition-colors hover:bg-white/70'
        >
          <LogOut className='size-4' />
          Sign out
        </button>
      </header>

      <section>
        <h1 className='font-display text-3xl font-semibold tracking-tight sm:text-4xl'>
          {profile ? `Hi ${profile.firstName}` : 'Your ambassador page'}
        </h1>
        <p className='mt-2 max-w-2xl text-[15px] leading-relaxed text-swirl-800'>
          Your friends get $5 off their first payment. You get {rate}% of what they pay for their first 12 months.
        </p>
      </section>

      {error ? (
        <p role='alert' className='rounded-2xl bg-white/90 px-4 py-3 text-sm font-medium text-[#b3261e]'>
          {error}
        </p>
      ) : null}

      <section className={cn(card, 'flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6')}>
        <div className='flex items-center gap-3'>
          <div>
            <p className='text-xs font-bold uppercase tracking-[0.08em] text-swirl-700'>Your code</p>
            <p className='mt-1 font-display text-3xl font-semibold tracking-wide sm:text-4xl'>
              {profile?.code ?? '······'}
            </p>
          </div>
          {profile && profile.status !== 'active' ? (
            <span className='rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800'>
              {profile.status === 'removed' ? 'No longer active' : 'Paused'}
            </span>
          ) : null}
        </div>
        <div className='flex flex-col gap-2 sm:items-end'>
          <button
            type='button'
            onClick={copyCode}
            disabled={!profile}
            className='inline-flex h-10 w-fit items-center gap-2 rounded-full bg-cinder-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-swirl-900 disabled:opacity-60'
          >
            {copied ? <Check className='size-4' /> : <Copy className='size-4' />}
            {copied ? 'Copied' : 'Copy code'}
          </button>
          <p className='max-w-xs text-xs leading-relaxed text-swirl-700 sm:text-right'>
            Friends enter it on the payment page when they subscribe in the Freshman desktop app (Mac and Windows).
          </p>
        </div>
      </section>

      <section aria-busy={!summary} className={cn('grid gap-4 md:grid-cols-3', !summary && !error && 'animate-pulse')}>
        {stats.map((stat) => (
          <div key={stat.title} className={cn(card, 'p-5')}>
            <p className='text-sm font-medium text-swirl-800'>{stat.title}</p>
            <p className='mt-2 font-display text-3xl font-semibold tabular-nums'>{stat.value}</p>
            <p className='mt-2 text-xs leading-relaxed text-swirl-700'>{stat.note}</p>
          </div>
        ))}
      </section>

      <ClaimsChart data={summary?.claimsByDay ?? []} />

      <section className='flex flex-col gap-3'>
        <h2 className='text-sm font-semibold'>Friends who used your code</h2>
        <div className={cn(card, 'overflow-x-auto')}>
          <table className='w-full min-w-[520px] text-left text-sm'>
            <thead>
              <tr className='border-b border-swirl-200 text-xs font-bold uppercase tracking-[0.06em] text-swirl-700'>
                <th className='px-5 py-3'>First name</th>
                <th className='px-5 py-3'>Plan</th>
                <th className='px-5 py-3'>Course</th>
                <th className='px-5 py-3'>Country</th>
              </tr>
            </thead>
            <tbody>
              {(friends ?? []).map((friend) => (
                <tr key={friend.id} className='border-b border-swirl-100 last:border-0'>
                  <td className='px-5 py-3 font-semibold'>{friend.firstName ?? 'A friend'}</td>
                  <td className='px-5 py-3'>{displayPlan(friend.plan)}</td>
                  <td className='max-w-56 truncate px-5 py-3 text-swirl-800'>{friend.course ?? '—'}</td>
                  <td className='px-5 py-3 text-swirl-800'>{displayCountry(friend.country)}</td>
                </tr>
              ))}
              {!friends || friends.length === 0 ? (
                <tr>
                  <td colSpan={4} className='h-24 px-5 text-center text-swirl-700'>
                    {friends === null && !error
                      ? 'Loading…'
                      : 'No one has used your code yet. Share it with friends who stress about exams.'}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <p className='text-xs text-swirl-700'>Questions about your earnings or payouts? Reply to any email from Joel.</p>
      </section>
    </main>
  );
}

const RANGES: Array<{ value: ChartRange; label: string }> = [
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: '90d', label: '90 days' },
  { value: 'all', label: 'All time' },
];

/** Claims per day as bars, with a range picker. Each bar has its date and count as a tooltip. */
function ClaimsChart({ data }: { data: DailyCount[] }) {
  const [range, setRange] = useState<ChartRange>('30d');
  const rows = useMemo(() => filterDaily(data, range), [data, range]);
  const total = rows.reduce((sum, row) => sum + row.count, 0);
  const max = Math.max(1, ...rows.map((row) => row.count));
  const label = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <section className={cn(card, 'p-5 sm:p-6')}>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <h2 className='text-sm font-semibold'>Claims</h2>
          <p className='mt-1 text-xs text-swirl-700'>
            Friends who subscribed with your code: <span className='font-semibold text-cinder-950'>{total}</span> in this
            period
          </p>
        </div>
        <div role='group' aria-label='Time range' className='flex w-fit rounded-full bg-swirl-100 p-1'>
          {RANGES.map((option) => (
            <button
              key={option.value}
              type='button'
              aria-pressed={range === option.value}
              onClick={() => setRange(option.value)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                range === option.value ? 'bg-white text-cinder-950 shadow-sm' : 'text-swirl-700 hover:text-cinder-950',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <p className='mt-6 h-40 content-center text-center text-sm text-swirl-700'>No claims yet.</p>
      ) : (
        <>
          <div
            role='img'
            aria-label={`${total} claims between ${label(rows[0].date)} and ${label(rows[rows.length - 1].date)}`}
            className='mt-6 flex h-40 items-end gap-[2px] border-b border-swirl-200'
          >
            {rows.map((row) => (
              <div key={row.date} className='group relative flex h-full flex-1 items-end' title={`${label(row.date)}: ${row.count}`}>
                <div
                  className={cn(
                    'w-full rounded-t-[3px] transition-colors',
                    row.count > 0 ? 'bg-peach-500 group-hover:bg-swirl-900' : 'bg-swirl-100',
                  )}
                  style={{ height: row.count > 0 ? `${Math.max(6, (row.count / max) * 100)}%` : '3px' }}
                />
              </div>
            ))}
          </div>
          <div className='mt-2 flex justify-between text-[11px] text-swirl-700'>
            <span>{label(rows[0].date)}</span>
            <span>{label(rows[rows.length - 1].date)}</span>
          </div>
        </>
      )}
    </section>
  );
}
