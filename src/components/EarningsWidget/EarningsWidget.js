import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EarningsDay from "./EarningsDay";
import { fetchEarningsData, fetchCompanyLogos } from "../../services/earnings";
import { groupEarningsByDay, formatDate } from "../../configs/earningsConfig";
import { DAYS_TO_SHOW } from "../../constants";

const EarningsWidget = ({ title, logo, daysToShow = DAYS_TO_SHOW }) => {
  const [earningsData, setEarningsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyLogos, setCompanyLogos] = useState({});

  // Fetch earnings data and company logos
  useEffect(() => {
    const loadEarningsData = async () => {
      try {
        setLoading(true);

        // Fetch earnings data with date range
        const earnings = await fetchEarningsData();
        setEarningsData(earnings);

        // Extract tickers for logo fetching
        const tickers = earnings.map((earning) => earning.ticker);
        const logos = await fetchCompanyLogos(tickers);
        setCompanyLogos(logos);

        setLoading(false);
      } catch (err) {
        console.error("Error loading earnings data:", err);
        setError("Failed to load earnings data. Please try again later.");
        setLoading(false);
      }
    };

    loadEarningsData();
  }, []);

  // Group the earnings by day once we have the data
  const groupedEarnings =
    earningsData.length > 0 ? groupEarningsByDay(earningsData) : {};

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto bg-[#dcb482] rounded-lg h-full shadow-md p-4">
        <div className="flex flex-col justify-center items-center h-48">
          <p className="text-gray-800">Loading earnings data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto bg-[#dcb482] rounded-lg shadow-md p-4">
        <div className="flex justify-center items-center h-48">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-[#dcb482] rounded-lg shadow-md">
      <div className="flex flex-start items-center mb-6 pb-2 border-b border-amber-800">
        <div className="text-left text-2xl font-bold text-amber-900">
          {logo}
        </div>
        <div className="flex-[0.8] text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-1">{title}</h2>
          <div className="text-amber-900 text-sm font-bold">
            {formatDate(new Date())}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between">
        {Object.keys(groupedEarnings)
          .slice(0, daysToShow)
          .map((day) => (
            <EarningsDay
              key={day}
              day={day}
              earnings={groupedEarnings[day]}
              logos={companyLogos}
            />
          ))}
      </div>

      <div className="mt-6 text-center text-amber-900 text-xs">
        <p>&#169; {new Date().getFullYear()} Earnings Whispers</p>
      </div>
    </div>
  );
};

EarningsWidget.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
  daysToShow: PropTypes.number,
};

export default EarningsWidget;
