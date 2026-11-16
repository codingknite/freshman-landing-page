'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { countryList, flagOf, searchCountries, type Country } from './countries';

/**
 * The join form's country field: a button that opens a list of countries
 * with flags, a search box on top, and a fixed-height scrolling list.
 * Keyboard: arrows move, Enter picks, Escape closes.
 */
export function CountryPicker({
  value,
  onChange,
  labelId,
  className,
}: {
  /** Two-letter code, or '' while nothing is picked. */
  value: string;
  onChange: (code: string) => void;
  labelId: string;
  className?: string;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  // Built in the browser: country names differ between the server's and the browser's Intl data.
  const [countries, setCountries] = useState<Country[]>([]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);


  const results = useMemo(() => searchCountries(query, countries), [query, countries]);
  const selected = countries.find((country) => country.code === value) ?? null;

  // Close on a tap or click anywhere else.
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  // Opening: clear the search, start on the picked country. The list is built
  // on first open, in the browser (names differ between server and browser Intl data).
  const openList = () => {
    const list = countries.length > 0 ? countries : countryList('en');
    if (list !== countries) setCountries(list);
    setQuery('');
    setActive(Math.max(0, list.findIndex((country) => country.code === value)));
    setOpen(true);
  };

  // Once open: focus the search box and bring the picked country into view.
  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus({ preventScroll: true });
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'center' });
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const pick = (country: Country) => {
    onChange(country.code);
    setOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => Math.min(results.length - 1, index + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => Math.max(0, index - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const country = results[active];
      if (country) pick(country);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-labelledby={labelId}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' && !open) {
            event.preventDefault();
            openList();
          }
        }}
        className='flex h-12 w-full items-center gap-2.5 rounded-full bg-white pl-5 pr-4 text-left text-[15px] font-medium text-swirl-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-peach-500'
      >
        {selected ? (
          <>
            <span className='text-[18px] leading-none' aria-hidden>
              {flagOf(selected.code)}
            </span>
            <span className='min-w-0 flex-1 truncate'>{selected.name}</span>
          </>
        ) : (
          <span className='flex-1 text-swirl-500'>Choose your country</span>
        )}
        <ChevronDown className={cn('size-4 shrink-0 text-swirl-700 transition-transform', open && 'rotate-180')} />
      </button>

      {open ? (
        <div className='absolute inset-x-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-[20px] bg-white text-swirl-950 shadow-[0_24px_48px_-12px_rgba(0,0,0,.5)]'>
          <div className='flex items-center gap-2 border-b border-swirl-100 px-4'>
            <Search className='size-4 shrink-0 text-swirl-600' aria-hidden />
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder='Search countries'
              aria-label='Search countries'
              aria-controls={listId}
              aria-activedescendant={results[active] ? `${listId}-${results[active].code}` : undefined}
              role='combobox'
              aria-expanded
              aria-autocomplete='list'
              autoComplete='off'
              className='h-11 w-full bg-transparent text-[15px] font-medium placeholder:text-swirl-500 focus:outline-none'
            />
          </div>
          <ul ref={listRef} id={listId} role='listbox' aria-labelledby={labelId} className='h-64 overflow-y-auto overscroll-contain py-1.5'>
            {results.map((country, index) => {
              const isSelected = country.code === value;
              return (
                <li
                  key={country.code}
                  id={`${listId}-${country.code}`}
                  data-index={index}
                  role='option'
                  aria-selected={isSelected}
                  onPointerMove={() => setActive(index)}
                  onClick={() => pick(country)}
                  className={cn(
                    'mx-1.5 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium',
                    index === active && 'bg-swirl-100',
                  )}
                >
                  <span className='text-[18px] leading-none' aria-hidden>
                    {flagOf(country.code)}
                  </span>
                  <span className='min-w-0 flex-1 truncate'>{country.name}</span>
                  {isSelected ? <Check className='size-4 shrink-0 text-swirl-800' /> : null}
                </li>
              );
            })}
            {results.length === 0 ? (
              <li className='px-5 py-6 text-center text-[14px] text-swirl-600'>
                No country matches. Try another spelling.
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
