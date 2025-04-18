import React from "react";
import PropTypes from "prop-types";
import CompanyLogo from "./CompanyLogo";
import { isBeforeMarketOpen } from "../../configs/earningsConfig";

const EarningsDay = ({ day, earnings, logos }) => {
  // Sort earnings by ticker
  const sortedEarnings = [...earnings].sort((a, b) => {
    return a.ticker.localeCompare(b.ticker);
  });

  // Separate earnings into before open and after close
  const beforeOpenEarnings = sortedEarnings.filter((earning) =>
    isBeforeMarketOpen(earning.time)
  );
  const afterCloseEarnings = sortedEarnings.filter(
    (earning) => !isBeforeMarketOpen(earning.time)
  );

  // Function to render company logo
  const renderCompanyLogo = (earning) => {
    const earningTime = earning.time;
    const beforeOpen = isBeforeMarketOpen(earningTime);
    const timeLabel = beforeOpen ? "Before Open" : "After Close";
    
    return (
      <div
        key={earning.id || `${earning.ticker}-${earning.date}`}
        className="flex justify-center items-center min-w-[80px] p-2 gap-1 hover:shadow-md hover:-translate-y-0.5 transition-all mb-2"
        title={`${earning.name || earning.ticker} (${
          earning.ticker
        }) - ${timeLabel} - ${earningTime || "Time not specified"}`}
      >
        <CompanyLogo
          ticker={earning.ticker}
          name={earning.name || earning.ticker}
          logoUrl={logos[earning.ticker]}
        />
      </div>
    );
  };

  return (
    <div className="flex-1 min-w-[200px] bg-white rounded-md shadow p-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{day}</h3>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="text-center">
          <h4 className="text-xs font-medium text-gray-600 border-b pb-1">
            Before Open
          </h4>
        </div>
        <div className="text-center">
          <h4 className="text-xs font-medium text-gray-600 border-b pb-1">
            After Close
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          {beforeOpenEarnings.length > 0 ? (
            beforeOpenEarnings.map(renderCompanyLogo)
          ) : (
            <p className="text-xs text-gray-500 py-2 text-center">None</p>
          )}
        </div>

        <div className="flex flex-col">
          {afterCloseEarnings.length > 0 ? (
            afterCloseEarnings.map(renderCompanyLogo)
          ) : (
            <p className="text-xs text-gray-500 py-2 text-center">None</p>
          )}
        </div>
      </div>
    </div>
  );
};

EarningsDay.propTypes = {
  day: PropTypes.string.isRequired,
  earnings: PropTypes.array.isRequired,
  logos: PropTypes.object.isRequired,
};

export default EarningsDay;
