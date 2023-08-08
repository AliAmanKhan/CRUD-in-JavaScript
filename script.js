
const dataForm = document.getElementById('dataForm');
const dataTable = document.getElementById('dataTable');
const tableBody = document.getElementById('tableBody');

// Load existing data from local storage on page load
window.onload = function () {
  const savedData = JSON.parse(localStorage.getItem('formData')) || [];
  displayData(savedData);
};

// Function to add data to the table and local storage
function addData(name, email, gender, message) {
  const data = {
    name,
    email,
    gender,
    message
  };

  const savedData = JSON.parse(localStorage.getItem('formData')) || [];
  savedData.push(data);

  localStorage.setItem('formData', JSON.stringify(savedData));
  displayData(savedData);
}

// Function to display data in the table
function displayData(dataArray) {
  tableBody.innerHTML = '';

  dataArray.forEach((data, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `<td class="orange">${data.name}</td>
                     <td class="orange">${data.email}</td>
                     <td class="orange">${data.gender}</td>
                     <td class="orange">${data.message}</td>
                     <td class="orange buttons">
                     <button onclick="editData(${index})">Edit</button>
                     <button onclick="deleteData(${index})">Delete</button>
                     </td>`;
  });
}

// Function to handle form submission
dataForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  const gender = document.querySelector('input[name="gender"]:checked').value;
  const message = document.getElementById('message').value;
  addData(name, email, gender, message);
  dataForm.reset();
});

// Function to handle data deletion
function deleteData(index) {
  const savedData = JSON.parse(localStorage.getItem('formData')) || [];
  savedData.splice(index, 1);
  localStorage.setItem('formData', JSON.stringify(savedData));
  displayData(savedData);
}

// Function to handle data editing

function editData(index) {
  const savedData = JSON.parse(localStorage.getItem('formData')) || [];
  const dataToEdit = savedData[index];

  document.getElementById('name').value = dataToEdit.name;
  document.getElementById('email').value = dataToEdit.email;
  document.querySelector(`input[name="gender"][value="${dataToEdit.gender}"]`).checked = true;
  document.getElementById('message').value = dataToEdit.message;

  deleteData(index); // Delete the data from the table and local storage before editing
}
