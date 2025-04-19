import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { EarningsWidget } from '../components/EarningsWidget';
import { WIDGET_LOGO, WIDGET_TITLE } from '../constants';
import './WidgetPage.css';

const WidgetPage = () => {
  // Parse URL parameters for widget configuration
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  
  // Extract configuration from URL parameters
  const apiKey = params.get('apiKey');
  const title = params.get('title') || WIDGET_TITLE;
  const logo = params.get('logo') || WIDGET_LOGO;
  const daysToShow = parseInt(params.get('daysToShow') || '5', 10);
  const quarter = params.get('quarter') || 'Q1';
  
  // Set API key if provided
  if (apiKey) {
    window.BENZINGA_API_KEY = apiKey;
  }

  // Add widget-page class to body when mounted
  useEffect(() => {
    document.body.classList.add('widget-page');
    
    // Clean up function to remove the class when unmounted
    return () => {
      document.body.classList.remove('widget-page');
    };
  }, []);

  return (
    <div className="widget-container">
      <EarningsWidget 
        title={title}
        logo={logo}
        daysToShow={daysToShow}
        quarter={quarter}
      />
    </div>
  );
};

export default WidgetPage;
