import React from 'react';
import ReactDOM from 'react-dom/client';
import { LitElement, html } from 'lit';
import { EarningsWidget } from '../components/EarningsWidget';
import { WIDGET_LOGO, WIDGET_TITLE } from '../constants';

// Import Tailwind styles
import '../index.css';

class EarningsWidgetElement extends LitElement {
  static properties = {
    apiKey: { type: String },
    title: { type: String },
    logo: { type: String },
    daysToShow: { type: Number }
  };

  constructor() {
    super();
    // Default values
    this.apiKey = '';
    this.title = WIDGET_TITLE;
    this.logo = WIDGET_LOGO;
    this.daysToShow = 5;
  }

  // Override to disable shadow DOM - this will allow global styles to apply
  createRenderRoot() {
    return this;
  }

  // This is called when the element is first connected to the DOM
  firstUpdated() {
    // Set API key if provided
    if (this.apiKey) {
      window.BENZINGA_API_KEY = this.apiKey;
    }

    // Create a container for our React component
    const container = this.querySelector('.widget-container');
    
    // Create a React root and render our component
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <EarningsWidget 
          title={this.title}
          logo={this.logo}
          daysToShow={parseInt(this.daysToShow, 10)}
        />
      </React.StrictMode>
    );
  }

  // Render method defines the HTML structure
  render() {
    return html`
      <div class="widget-container" style="width: 100%; height: 100%; min-height: 500px;"></div>
    `;
  }
}

// Register the custom element
customElements.define('benzinga-earnings-widget', EarningsWidgetElement);

// Export the element for usage in other files
export { EarningsWidgetElement };
