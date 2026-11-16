/** ISO 3166-1 alpha-2 codes behind the country dropdown; names come from the browser (Intl.DisplayNames). */
const CODES =
  'AF AL DZ AD AO AG AR AM AU AT AZ BS BH BD BB BY BE BZ BJ BT BO BA BW BR BN BG BF BI CV KH CM CA CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FJ FI FR GA GM GE DE GH GR GD GT GN GW GY HT HN HK HU IS IN ID IR IQ IE IL IT JM JP JO KZ KE KI KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MR MU MX FM MD MC MN ME MA MZ MM NA NR NP NL NZ NI NE NG KP MK NO OM PK PW PS PA PG PY PE PH PL PT PR QA RO RU RW KN LC VC WS SM ST SA SN RS SC SL SG SK SI SB SO ZA KR SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TO TT TN TR TM TV UG UA AE GB US UY UZ VU VA VE VN YE ZM ZW'.split(
    ' ',
  );

export type Country = { code: string; name: string };

export function countryList(locale = 'en'): Country[] {
  let names: Intl.DisplayNames | null = null;
  try {
    names = new Intl.DisplayNames([locale], { type: 'region' });
  } catch {
    names = null;
  }
  return CODES.map((code) => ({ code, name: names?.of(code) ?? code })).sort((a, b) => a.name.localeCompare(b.name));
}

const fold = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

const ALIASES: Record<string, string> = {
  usa: 'US',
  'u.s.': 'US',
  'u.s.a.': 'US',
  america: 'US',
  'united states of america': 'US',
  uk: 'GB',
  'u.k.': 'GB',
  england: 'GB',
  scotland: 'GB',
  wales: 'GB',
  britain: 'GB',
  'great britain': 'GB',
  uae: 'AE',
  drc: 'CD',
  'south korea': 'KR',
  russia: 'RU',
  'ivory coast': 'CI',
};

/** The flag emoji for a two-letter code: each letter becomes its regional indicator symbol. */
export const flagOf = (code: string): string =>
  String.fromCodePoint(...Array.from(code.toUpperCase()).map((letter) => 0x1f1e6 + letter.charCodeAt(0) - 65));

/**
 * The countries matching what the visitor typed into the dropdown's search:
 * names that start with it first, then names that contain it, plus common
 * short forms ("uk", "usa", "uae").
 */
export function searchCountries(query: string, countries: Country[]): Country[] {
  const value = fold(query);
  if (!value) return countries;
  const alias = ALIASES[value];
  const starts: Country[] = [];
  const contains: Country[] = [];
  for (const country of countries) {
    const name = fold(country.name);
    if (country.code === alias || name.startsWith(value) || country.code.toLowerCase() === value) starts.push(country);
    else if (name.includes(value)) contains.push(country);
  }
  return [...starts, ...contains];
}
