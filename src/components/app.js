import { LitElement, html, css } from 'lit';
import { initRouter } from '../router.js';
import './add-new-employee.js';
import './employee-list.js';
import './home-page.js';

class App extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
  `;

    async firstUpdated() {
        await this.updateComplete;
        const outlet = this.renderRoot.querySelector('#outlet');
        if (outlet) {
        initRouter(outlet); // Initialize router once
        } else {
        console.error('Outlet element not found');
        }
    }
      
      render() {
        const path = window.location.pathname;
        return html`
          <div id="outlet">

          </div>
        `;
      }
}

window.customElements.define('app-element', App);
