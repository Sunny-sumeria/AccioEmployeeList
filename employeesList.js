let employees = [];

const addUserBtn = document.getElementById('addUserBtn');
const employeeList = document.getElementById('employeeList');
const messageContainer = document.getElementById('messageContainer');

// Function to render the list
function renderEmployees() {
    if (employees.length === 0) {
        employeeList.innerHTML = '<p class="empty-msg">Data not found</p>';
        return;
    }

    employeeList.innerHTML = ''; // Clear current view
    employees.forEach((emp, index) => {
        const div = document.createElement('div');
        div.className = 'employee-card';
        div.innerHTML = `
            <div class="card-content">
                <span>${index + 1}.</span>
                <span>Name: ${emp.name}</span>
                <span>Profession: ${emp.profession}</span>
                <span>Age: ${emp.age}</span>
            </div>
            <button class="delete-btn" onclick="deleteUser(${emp.id})">Delete</button>
        `;
        employeeList.appendChild(div);
    });
}

// Function to add user
addUserBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const profession = document.getElementById('profession').value;
    const age = document.getElementById('age').value;

    // Validation
    if (!name || !profession || !age) {
        messageContainer.innerHTML = '<span class="error">Error: Please Make sure All the fields are filled before adding in an employee</span>';
        return;
    }

    // Creating object with Unique ID
    const newEmployee = {
        id: Date.now(),
        name,
        profession,
        age
    };

    employees.push(newEmployee);
    messageContainer.innerHTML = '<span class="success">Success : Employee Added!</span>';
    
    // Reset inputs
    document.getElementById('name').value = '';
    document.getElementById('profession').value = '';
    document.getElementById('age').value = '';

    renderEmployees();
});

// Function to delete user (attached to window for global access from HTML)
window.deleteUser = function(id) {
    employees = employees.filter(emp => emp.id !== id);
    renderEmployees();
};