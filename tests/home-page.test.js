import { fixture, html } from '@open-wc/testing';
import { getByText } from '@testing-library/dom';
import '../src/components/home-page.js';

describe('Home Component', () => {
  let homeElement;

  beforeEach(async () => {
    homeElement = await fixture(html`<home-page></home-page>`);
    await homeElement.updateComplete; // Ensure full rendering
  });

  it('renders the header with the correct text', () => {
    //const el = document.createElement('home-page');
    //document.body.appendChild(el);
    //el.updateComplete; // Ensure the component has fully rendered
 
    //const shadowContent = el.shadowRoot.querySelector('.app-container');
    ///expect(shadowContent).to.exist;

    const header = getByText(homeElement.shadowRoot, "Employee Management"); // Adjust for expected text
    expect(header).toBeInTheDocument();
  });

    /**
  it('renders navigation links correctly', () => {
    const navLinks = homeElement.shadowRoot.querySelectorAll('nav a');
    expect(navLinks.length).to.equal(2); // Assumes two links
    expect(navLinks[0].textContent).to.include("Employees"); // Adjust for localization or expected text
  });

  it('handles navigation click event', async () => {
    const navLink = homeElement.shadowRoot.querySelector('nav a');
    const clickEvent = new Event('click', { bubbles: true, cancelable: true });
    navLink.dispatchEvent(clickEvent);
    
    expect(clickEvent.defaultPrevented).to.be.true; // Check that default navigation is prevented
  });

  */
});
