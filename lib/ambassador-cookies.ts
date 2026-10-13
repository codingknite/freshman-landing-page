/**
 * The ambassador dashboard's session cookies. Shared by the middleware (edge)
 * and lib/ambassador-session.ts (server), so this file imports nothing.
 */
export const AMBASSADOR_ACCESS_COOKIE = 'fm_amb_access';
export const AMBASSADOR_REFRESH_COOKIE = 'fm_amb_refresh';

/** Where the dashboard and its sign-in live: outside the language routes. */
export const AMBASSADOR_DASHBOARD_PATH = '/ambassador-dashboard';
export const AMBASSADOR_LOGIN_PATH = '/ambassador-dashboard/login';
