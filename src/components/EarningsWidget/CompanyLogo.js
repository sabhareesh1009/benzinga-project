import React from "react";
import PropTypes from "prop-types";

const CompanyLogo = ({ ticker, name, logoUrl }) => {
  // Handle click to redirect to Benzinga quote page
  const handleClick = () => {
    window.location.href = `https://www.benzinga.com/quote/${ticker}`;
  };

  // If we have a logo URL, render the image
  if (logoUrl) {
    return (
      <button 
        className="w-full h-full flex flex-col items-center justify-center cursor-pointer bg-transparent border-none"
        onClick={handleClick}
        title={`Click to view ${ticker} on Benzinga`}
        aria-label={`View ${name || ticker} (${ticker}) on Benzinga`}
      >
        <div className="text-[6px] border-[0.5px] border-gray-300 text-gray-400 mb-[2px] p-[2px]">
          {ticker}
        </div>
        <img
          src={logoUrl}
          alt={`${name || ticker} (${ticker}) logo`}
          height={60}
          width={60}
          title={`${name || ticker} (${ticker})`}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            // If image fails to load, fall back to text
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      </button>
    );
  }

  // If no logo URL is available, just show the ticker symbol
  return (
    <button 
      className="w-full h-full flex justify-center items-center cursor-pointer bg-transparent border-none"
      onClick={handleClick}
      title={`Click to view ${ticker} on Benzinga`}
      aria-label={`View ${ticker} on Benzinga`}
    >
      <div className="flex justify-center items-center w-full h-full font-bold text-gray-700 text-sm">
        {ticker}
      </div>
    </button>
  );
};

CompanyLogo.propTypes = {
  ticker: PropTypes.string.isRequired,
  name: PropTypes.string,
  logoUrl: PropTypes.string,
};

export default CompanyLogo;
