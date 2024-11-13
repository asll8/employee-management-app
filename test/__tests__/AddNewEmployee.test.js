import { fixture, expect, html } from '@open-wc/testing';
import AddNewEmployee from '../../src/components/add-new-employee'; 

describe('AddNewEmployee Component', () => {
  it('renders correctly with default properties', async () => {
    const element = await fixture(html`<add-new-employee></add-new-employee>`);
    expect(element).to.be.accessible; 
    expect(element.shadowRoot.querySelector('.header-text').textContent).to.include('Add Employee');
  });

  it('updates fields when populated with data', async () => {
    const element = await fixture(html`<add-new-employee></add-new-employee>`);
    
    element.firstName = 'John';
    element.lastName = 'Doe';
    element.phone = '123456789';

    await element.updateComplete;
    const firstNameInput = element.shadowRoot.querySelector('input[placeholder="First Name"]');
    expect(firstNameInput.value).to.equal('John');
  });

  it('validates form correctly', async () => {
    const element = await fixture(html`<add-new-employee></add-new-employee>`);
    
    element.handleSubmit();
    await element.updateComplete;

    expect(element.shadowRoot.querySelector('.error')).to.exist;
  });
});
