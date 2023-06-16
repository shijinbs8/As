var classSelect = document.getElementById('class-select');
var divisionSelect = document.getElementById('division-select');
var studentSelect = document.getElementById('student-select');
var studentDetails = document.getElementById('student-details');
var popup = document.getElementById('popup');
var popupContent = document.getElementById('popup-content');
var closeButton = document.querySelector('.close-button');

// Add change event listeners to the selects
classSelect.addEventListener('change', displayStudentOptions);
divisionSelect.addEventListener('change', displayStudentOptions);
studentSelect.addEventListener('change', displayStudentDetails);
closeButton.addEventListener('click', closePopup);

// Display the student options
function displayStudentOptions() {
  studentSelect.innerHTML = '<option value="">Select a student</option>';

  // Add student options permanently
  var numStudents = 3; // Change this number as per your requirement

  for (var i = 1; i <= numStudents; i++) {
    var option = document.createElement('option');
    option.value = 'student' + i;
    option.text = 'Student ' + i;
    studentSelect.appendChild(option);
  }
}

// Display the details of the selected student
function displayStudentDetails() {
  var selectedStudent = studentSelect.value;

  // Remove all existing details
  studentDetails.innerHTML = '';

  // Display the details of the selected student
  if (selectedStudent) {
    var studentName = document.createElement('p');
    studentName.textContent = 'Name: ' + selectedStudent;

    // Add student details to the student details container
    studentDetails.appendChild(studentName);
  }
}

// Display the popup with pie chart
function displayStudentsPopup() {
  // Clear the popup content
  popupContent.innerHTML = '';

  // Create the canvas for the chart
  var chartCanvas = document.createElement('canvas');
  chartCanvas.id = 'chart';
  chartCanvas.width = 400;
  chartCanvas.height = 400;
  popupContent.appendChild(chartCanvas);

  // Generate the pie chart using Chart.js
  var ctx = chartCanvas.getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['happy', 'sad', 'fear'], // Example labels
      datasets: [{
        data: [80, 30, 90], // Example data
        backgroundColor: ['red', 'blue', 'green'], // Example colors
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // Show the popup
  popup.style.display = 'block';
}

// Close the popup
function closePopup() {
  // Clear the popup content
  popupContent.innerHTML = '';

  // Hide the popup
  popup.style.display = 'none';
}

// Call displayStudentOptions when either class or division is changed
classSelect.addEventListener('change', displayStudentOptions);
divisionSelect.addEventListener('change', displayStudentOptions);

// Call displayStudentsPopup when both Class and Division are selected
classSelect.addEventListener('change', function() {
  if (classSelect.value && divisionSelect.value) {
    displayStudentsPopup();
  } else {
    closePopup();
  }
});

divisionSelect.addEventListener('change', function() {
  if (classSelect.value && divisionSelect.value) {
    displayStudentsPopup();
  } else {
    closePopup();
  }
});