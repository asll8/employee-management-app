import store from '../store/store.js';

//Creating generic employee id
export function generateNewId() {
    const state = store.getState();
    const employees = state.employee?.employees || [];
    const maxId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) : 0;
    return maxId + 1;
}

export function formatDateToHTML(date) {
    if (!date) return '';

    const parts = date.split('/');
    
    if (parts.length !== 3) {
        console.warn('Invalid date format:', date);
        return '';
    }

    const [part1, part2, part3] = parts;

    let year;
    if (part3.length === 2) {
        const currentYear = new Date().getFullYear();
        const currentCentury = Math.floor(currentYear / 100) * 100;
        const threshold = (currentYear % 100) + 10;
    
        year = parseInt(part3, 10) <= threshold
            ? currentCentury + parseInt(part3, 10)
            : currentCentury - 100 + parseInt(part3, 10);
    } else if (part3.length === 4) {
        year = part3;
    } else {
        console.warn('Invalid year format:', part3);
        return '';
    }


    const month = part2.length === 2 ? part2 : '0' + part2;
    const day = part1.length === 2 ? part1 : '0' + part1;

    return `${year}-${month}-${day}`;
}


export function formatDateForStorage(date) {
    if (!date) return '';

    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
}