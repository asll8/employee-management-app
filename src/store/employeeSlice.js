import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: Array(891).fill().map((_, index) => ({
      id: index + 1,
      firstName: 'Ahmet',
      lastName: 'Sourtimes',
      dateOfEmployment: '23/09/2022',
      dateOfBirth: '23/09/2022',
      phone: '+(90) 532 123 45 67',
      email: 'ahmet@sourtimes.org',
      department: 'Analytics',
      position: 'Junior',
  })),
  selectedEmployee: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees = [...state.employees, action.payload];
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    },
    selectEmployeeForEdit: (state, action) => {
      state.selectedEmployee = state.employees.find(emp => emp.id === action.payload) || null;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
  },
});

export const { addEmployee, updateEmployee, setEmployees, deleteEmployee, selectEmployeeForEdit, clearSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
