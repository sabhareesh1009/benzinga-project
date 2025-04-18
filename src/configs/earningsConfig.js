import { MARKET_OPEN_HOUR, MARKET_OPEN_MINUTE } from '../constants';

/**
 * Groups earnings data by day of the week
 * @param {Array} earnings - Array of earnings data
 * @returns {Object} - Earnings grouped by day of the week
 */
export const groupEarningsByDay = (earnings) => {
  const grouped = {};
  
  // Initialize days of the week
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  days.forEach(day => {
    grouped[day] = [];
  });

  // Group earnings by day
  earnings.forEach(earning => {
    if (!earning.date) return;
    
    const date = new Date(earning.date);
    const dayIndex = date.getDay();
    
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (dayIndex === 0 || dayIndex === 6) return;
    
    const dayOfWeek = days[dayIndex - 1]; // Adjust index (Monday is index 0 in our array)
    
    if (dayOfWeek && grouped[dayOfWeek]) {
      grouped[dayOfWeek].push(earning);
    }
  });

  return grouped;
};

/**
 * Determines if an earnings report is before market open
 * @param {string} timeString - Time string in format "HH:MM:SS"
 * @returns {boolean} - True if before market open, false otherwise
 */
export const isBeforeMarketOpen = (timeString) => {
  if (!timeString) return false;
  
  // Parse the time string (format: "04:36:37")
  const [hours, minutes] = timeString.split(':').map(Number);
  
  // US Markets open at 9:30am EST
  return hours < MARKET_OPEN_HOUR || (hours === MARKET_OPEN_HOUR && minutes < MARKET_OPEN_MINUTE);
};

/**
 * Formats a date for display
 * @param {string} dateString - Date string from API
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: '2-digit', 
    year: 'numeric' 
  });
};
