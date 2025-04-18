// API Constants
export const API_KEY = "f090a778d74f4450a11ad417ad72740c";
export const BASE_URL = "https://api.benzinga.com";

/**
 * Date Configuration
 */
// Default date range for earnings (next 3 months)
const today = new Date();
const threeMonthsFromNow = new Date(today);
threeMonthsFromNow.setMonth(today.getMonth() + 3);

export const DEFAULT_DATE_FROM = today.toISOString().split('T')[0]; // YYYY-MM-DD
export const DEFAULT_DATE_TO = threeMonthsFromNow.toISOString().split('T')[0]; // YYYY-MM-DD

// Market Hours Constants
export const MARKET_OPEN_HOUR = 9;
export const MARKET_OPEN_MINUTE = 30;
export const MARKET_CLOSE_HOUR = 16;
export const MARKET_CLOSE_MINUTE = 30;

// Earnings Widget Constants
export const WIDGET_TITLE = "Most Anticipated Earnings Releases";
export const WIDGET_LOGO = 'EARNINGS WHISPERS';
export const DAYS_TO_SHOW = 5;

// UI Constants
export const BACKGROUND_COLOR = "#dcb482";
