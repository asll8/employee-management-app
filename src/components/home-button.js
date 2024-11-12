import { LitElement, html, css } from 'lit';
import { localize } from '../localization/localize.js';

class HomeButton extends LitElement {
    static get styles() {
        return css`
            .tooltip-button {
                position: relative;
                display: inline-block;
                padding: 10px 15px;
                font-size: 16px;
                color: #ff6d00;
                text-decoration: none;
                cursor: pointer;
            }

            .tooltip-button:hover {
                text-decoration: underline;
            }
        `;
    }

    render() {
        return html`
            <div
                role="button"
                tabindex="0"
                class="tooltip-button"
                @click="${this.goHome}"
                @keydown="${this.handleKeydown}"
            >
                <p>&lt; ${localize("backToHome")}</p>
            </div>
        `;
    }

    goHome() {
        window.history.pushState({}, '', '/home-page');
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            this.goHome();
        }
    }
}

window.customElements.define('home-button', HomeButton);
