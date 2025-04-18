import benzingaApi from "../axios/benzingaApi";
import { DEFAULT_DATE_FROM, DEFAULT_DATE_TO } from "../constants";

/**
 * Fetch earnings data from Benzinga API
 * @param {Object} options - Options for the request
 * @param {string} options.dateFrom - Start date in YYYY-MM-DD format
 * @param {string} options.dateTo - End date in YYYY-MM-DD format
 * @param {number} options.limit - Maximum number of results to return
 * @returns {Promise<Array>} - Array of earnings data
 */
export const fetchEarningsData = async (options = {}) => {
  try {
    const {
      dateFrom = DEFAULT_DATE_FROM,
      dateTo = DEFAULT_DATE_TO,
      limit = 100,
    } = options;

    const response = await benzingaApi.get("/api/v2.1/calendar/earnings", {
      params: {
        date_from: dateFrom,
        date_to: dateTo,
      },
    });

    if (response.data && response.data.earnings) {
      // Sort by date and limit to most recent/upcoming
      return response.data.earnings
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, limit);
    }

    return [];
  } catch (error) {
    console.error("Error fetching earnings data:", error);
    throw new Error("Failed to fetch earnings data");
  }
};

/**
 * Fetch company logos for a list of ticker symbols
 * @param {Array<string>} tickers - Array of ticker symbols
 * @returns {Promise<Object>} - Object mapping ticker symbols to logo URLs
 */
export const fetchCompanyLogos = async (tickers) => {
  if (!tickers || tickers.length === 0) return {};

  try {
    const searchKeys = tickers.join(",");
    const response = await benzingaApi.get("/api/v2/logos/search", {
      params: {
        search_keys: searchKeys,
        search_keys_type: "symbol",
        fields: "mark_vector_light",
      },
    });

    if (response.data && response.data.data) {
      const logos = {};
      response.data.data.forEach((logo) => {
        logos[logo?.search_key] = logo?.files?.mark_vector_light;
      });
      return logos;
    }

    return {};
  } catch (error) {
    console.error("Error fetching company logos:", error);
    return {};
  }
};

/**
 * Get the last updated timestamp from earnings data
 * @param {Object} earningsResponse - Response from the earnings API
 * @returns {number|null} - Unix timestamp or null if not available
 */
export const getLastUpdatedTimestamp = (earningsResponse) => {
  return earningsResponse?.updated || null;
};
