import { LitElement, html, css } from "lit";
import { localize } from '../localization/localize.js';
import "./home-button.js"
import { connect } from '../utils/connect.js';
import generateNewId from '../utils/helpers.js';
import store from '../store/store.js'
import {
    addEmployee,
    updateEmployee,
    clearSelectedEmployee
} from '../store/employeeSlice.js';
import { showConfirmDialog } from '../utils/dialogUtil.js';

export class AddNewEmployee extends connect(store)(LitElement) {

    static get styles() {
        return css`
            .add-emp-container {
                max-width: 500px;
                margin: auto;
                padding: 20px;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .back-link {
                color: #ff6d00;
                text-decoration: none;
                display: inline-block;
                margin-bottom: 15px;
                font-size: 14px;
                cursor: pointer;
            }

            .back-link:hover {
                text-decoration: underline;
            }

            .form-group {
                margin-bottom: 15px;
            }

            label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                color: #ff6d00;
                font-size: 14px;
            }

            .field-text {
                color: black;
            }

            input, select {
                width: 100%;
                padding: 10px;
                font-size: 16px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
                transition: border-color 0.3s;
            }

            input:focus, select:focus {
                border-color: #ff6d00;
                outline: none;
            }

            button {
                width: 100%;
                background-color: #ff6d00;
                color: #fff;
                padding: 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
                transition: background-color 0.3s;
            }

            button:hover {
                background-color: #ff8d33;
            }

            button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }

            .error {
                color: red;
                font-size: 14px;
                margin-top: 5px;
            }

            @media (max-width: 480px) {
                .add-emp-container {
                    padding: 15px;
                }

                label {
                    font-size: 13px;
                }

                input, select, button {
                    font-size: 14px;
                    padding: 10px;
                }
            }

        `;
    }

    static get properties() {
        return {
            firstName: {type: String},
            lastName: {type: String},
            dateOfEmployment: {type: String},
            dateOfBirth: {type: String},
            phone: {type: String},
            email: {type: String},
            department: {type: String},
            position: {type: String},
            errors: {type: Object},
            formType: {type: String},
        }
    }

    constructor() {
        super();
        this.resetForm();
        this.updateFromState();

    }

    updateFromState() {
        const state = store.getState();
        const selectedEmployee = state?.employee?.selectedEmployee;
        const path = window.location.pathname;
        
        if (path === '/employees/edit' && selectedEmployee) {
            this.formType = 'edit';
            this.populateEmployeeData(selectedEmployee);
            console.log('Form type updated to edit');
        } else {
            this.formType = 'add';
            this.resetForm(); 
            console.log('Form type updated to add');
        }
    }
    
    populateEmployeeData(employee) {
        this.firstName = employee.firstName || '';
        this.lastName = employee.lastName || '';
        this.dateOfEmployment = employee.dateOfEmployment || '';
        this.dateOfBirth = employee.dateOfBirth || '';
        this.phone = employee.phone || '';
        this.email = employee.email || '';
        this.department = employee.department || localize("departmentOptionAnalytics");
        this.position = employee.position || localize("positionOptionJunior");
        this.selectedEmployee = employee;
    }

    get formFields() {
        return [
            { label: localize("labelFirstName"), type: "text", property: "firstName", placeholder: localize("labelFirstName") },
            { label: localize("labelLastName"), type: "text", property: "lastName", placeholder: localize("labelLastName") },
            { label: localize("labelDateEmployment"), type: "date", property: "dateOfEmployment", placeholder: localize("placeholderDate") },
            { label: localize("labelDateBirth"), type: "date", property: "dateOfBirth", placeholder: localize("placeholderDate") },
            { label: localize("labelPhone"), type: "text", property: "phone", placeholder: localize("placeholderPhone") },
            { label: localize("labelEmail"), type: "email", property: "email", placeholder: localize("labelEmail") },
            {
                label: localize("labelDepartment"),
                type: "select",
                property: "department",
                options: [localize("departmentOptionAnalytics"), localize("departmentOptionTech")]
            },
            {
                label: localize("labelPosition"),
                type: "select",
                property: "position",
                options: [localize("positionOptionJunior"), localize("positionOptionMedior"), localize("positionOptionSenior")]
            }
        ]
    }

    render() {
        const headerText = this.formType === 'edit' ? localize("editEmployeeHeader") : localize("addEmployeeHeader");
        const buttonText = this.formType === 'edit' ? localize("editEmployeeButtonText") : localize("addEmployeeButtonText");
        
        return html`
        <div class="add-emp-container">
            <home-button></home-button>
            <h2 class="header-text">${headerText}</h2>
            ${this.formFields.map(field => this.renderField(field))}
            <button @click="${this.handleSubmit}" data-id="submit-button">${buttonText}</button>
        </div>
    `;
    }

    renderField(field) {
        const {label, type, property, placeholder, options } = field;
        const value = this[property];
        const error = this.errors?.[property];

        return html`
        <div class="form-group">
            <label class="field-text">${label}</label>
            ${options?.length > 0 ? html`
                <select .value="${value}" @change="${e => this.handleInput(e, property)}" data-id="${property}-select">
                    ${options.map(option => html`<option value="${option}">${option}</option>`)}
                </select>
            ` : html`
                <input
                    type="${type}"
                    .value="${value}"
                    placeholder="${placeholder}"
                    @input="${e => this.handleInput(e, property)}"
                    data-id="${property}-input"
                />
            `}
            ${error ? html`<div class="error" role="alert">${error}</div>` : ''}
        </div>
    `;

    }

    handleInput(e, property) {
        this[property] = e.target.value;
        this.requestUpdate();
    }

    validate() {
        const errors = {};
    
        const validationRules = [
            { field: 'firstName', message: localize("firstNameWarningMsg") },
            { field: 'lastName', message: localize("lastNameWarningMsg") },
            { field: 'dateOfEmployment', message: localize("dateEmploymentWarningMsg") },
            { field: 'dateOfBirth', message: localize("dateBirthWarningMsg") },
            { field: 'phone', message: localize("phoneWarningMsg") },
            { 
                field: 'email', 
                message: localize("emailWarningMsg"), 
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ 
            }
        ];
    
        validationRules.forEach(({ field, message, pattern }) => {
            const value = this[field];
            
            if (!value) {
                errors[field] = message;
            } else if (pattern && !pattern.test(value)) {
                errors[field] = message;
            }
        });
    
        this.errors = errors;
        return Object.keys(errors).length === 0;
    }
    

    handleSubmit() {

        if (!this.validate()) {
            console.log("Validation failed", this.errors);
            return;
        }
        const employeeData = {
            id: this.formType === 'edit' ? this.selectedEmployee?.id : generateNewId(),
            firstName: this.firstName,
            lastName: this.lastName,
            dateOfEmployment: this.dateOfEmployment,
            dateOfBirth: this.dateOfBirth,
            phone: this.phone,
            email: this.email,
            department: this.department,
            position: this.position
        };
        console.log(employeeData);
        
        if (this.formType === 'edit') {
            this.showEditConfirmation(employeeData);
            store.dispatch(clearSelectedEmployee());
        } else {
            this.addEmployee(employeeData);
            this.navigateToEmployeeList();
        }
    
    }

    showEditConfirmation(employeeData) {
        console.log("Dispatching update for employee:", employeeData);
        showConfirmDialog(
            localize("confirmDialogHeader"),
            localize("editConfirmationText"),
            localize("proceedButtonText"),
            localize("cancelButtonText"),
            () => {
                store.dispatch(updateEmployee(employeeData));
                console.log("Employee updated in store");
                this.navigateToEmployeeList();
            }
        );
    }

    addEmployee(employeeData) {
        store.dispatch(addEmployee(employeeData));
        this.resetForm();
    }
    
    navigateToEmployeeList() {
        store.dispatch(clearSelectedEmployee());
        if (window.location.pathname !== '/employees') {
            window.history.pushState({}, '', '/employees');
            window.dispatchEvent(new PopStateEvent('popstate'));
        }
    }

    resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.dateOfEmployment = '';
        this.dateOfBirth = '';
        this.phone = '';
        this.email = '';
        this.department = localize("departmentOptionAnalytics");
        this.position = localize("positionOptionJunior");
        this.errors = {};
        this.formType = 'add';
    }
}

window.customElements.define('add-new-employee', AddNewEmployee);