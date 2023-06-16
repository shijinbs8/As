// Array of classes with their respective divisions and students
    var classData = [
      {
        class: "Class 1",
        divisions: ["Division A", "Division B", "Division C"],
        students: ["Student 1", "Student 2", "Student 3"]
      },
      {
        class: "Class 2",
        divisions: ["Division X", "Division Y", "Division Z"],
        students: ["Student A", "Student B", "Student C"]
      },
      {
        class: "Class 3",
        divisions: ["Division P", "Division Q", "Division R"],
        students: ["Student X", "Student Y", "Student Z"]
      }
    ];

    // Function to update the Division dropdown based on the selected class
    function updateDivision() {
      var classSelect = document.getElementById("class");
      var divisionSelect = document.getElementById("division");

      // Clear previous options
      divisionSelect.innerHTML = "<option value=''>Select Division</option>";

      // Get selected class
      var selectedClass = classSelect.value;

      // Find the class object in the classData array
      var selectedClassObj = classData.find(function(obj) {
        return obj.class === selectedClass;
      });

      // Add divisions as options
      selectedClassObj.divisions.forEach(function(division) {
        var option = document.createElement("option");
        option.value = division;
        option.text = division;
        divisionSelect.appendChild(option);
      });
    }

    // Function to update the Students dropdown based on the selected class and division
    function updateStudents() {
      var classSelect = document.getElementById("class");
      var divisionSelect = document.getElementById("division");
      var studentsSelect = document.getElementById("students");

      // Clear previous options
      studentsSelect.innerHTML = "<option value=''>Select Student</option>";

      // Get selected class and division
      var selectedClass = classSelect.value;
      var selectedDivision = divisionSelect.value;

      // Find the class object in the classData array
      var selectedClassObj = classData.find(function(obj) {
        return obj.class === selectedClass;
      });

      // Find the division object in the selected class
      var selectedDivisionObj = selectedClassObj.divisions.find(function(division) {
        return division === selectedDivision;
      });

      // Add students as options
      selectedClassObj.students.forEach(function(student) {
        var option = document.createElement("option");
        option.value = student;
        option.text = student;
        studentsSelect.appendChild(option);
      });
    }

    // Function to show a popup with the selected student
    function showPopUp() {
      var studentsSelect = document.getElementById("students");
      var selectedStudent = studentsSelect.value;
      alert("Selected Student: " + selectedStudent);
    }

// Array of classes with their respective divisions and students
    var classData = [
      {
        class: "Class 1",
        divisions: ["Division A", "Division B", "Division C"],
        students: ["Student 1", "Student 2", "Student 3"]
      },
      {
        class: "Class 2",
        divisions: ["Division X", "Division Y", "Division Z"],
        students: ["arani A", "Student B", "Student C"]
      },
      {
        class: "Class 3",
        divisions: ["Division P", "Division Q", "Division R"],
        students: ["Student X", "Student Y", "Student Z"]
      }
    ];

    // Function to update the Division dropdown based on the selected class
    function updateDivision() {
      var classSelect = document.getElementById("class");
      var divisionSelect = document.getElementById("division");

      // Clear previous options
      divisionSelect.innerHTML = "<option value=''>Select Division</option>";

      // Get selected class
      var selectedClass = classSelect.value;

      // Find the class object in the classData array
      var selectedClassObj = classData.find(function(obj) {
        return obj.class === selectedClass;
      });

      // Add divisions as options
      selectedClassObj.divisions.forEach(function(division) {
        var option = document.createElement("option");
        option.value = division;
        option.text = division;
        divisionSelect.appendChild(option);
      });
    }

    // Function to update the Students dropdown based on the selected class and division
    function updateStudents() {
      var classSelect = document.getElementById("class");
      var divisionSelect = document.getElementById("division");
      var studentsSelect = document.getElementById("students");

      // Clear previous options
      studentsSelect.innerHTML = "<option value=''>Select Student</option>";

      // Get selected class and division
      var selectedClass = classSelect.value;
      var selectedDivision = divisionSelect.value;

      // Find the class object in the classData array
      var selectedClassObj = classData.find(function(obj) {
        return obj.class === selectedClass;
      });

      // Find the division object in the selected class
      var selectedDivisionObj = selectedClassObj.divisions.find(function(division) {
        return division === selectedDivision;
      });

      // Add students as options
      selectedClassObj.students.forEach(function(student) {
        var option = document.createElement("option");
        option.value = student;
        option.text = student;
        studentsSelect.appendChild(option);
      });
    }

    // Function to show a popup with the selected student
    function showPopUp() {
      var studentsSelect = document.getElementById("students");
      var selectedStudent = studentsSelect.value;
      alert("Selected Student: " + selectedStudent);
    }
   const daysTag = document.querySelector(".days");
      const currentDate = document.querySelector(".current-date");
      const prevNextIcon = document.querySelectorAll(".icons span");
      const selectedDates = new Set(); // Store selected dates

      // getting new date, current year and month
      let date = new Date();
      let currYear = date.getFullYear();
      let currMonth = date.getMonth();

      // storing full name of all months in array
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const renderCalendar = () => {
        let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // getting first day of month
        let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
        let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(); // getting last day of month
        let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
        let liTag = "";

        for (let i = firstDayOfMonth; i > 0; i--) {
          // creating li of previous month last days
          liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
          // creating li of all days of current month
          let isToday =
            i === date.getDate() &&
            currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear()
              ? "active"
              : "";
          liTag += `<li class="${isToday}">${i}</li>`;
        }

        for (let i = lastDayOfMonth; i < 6; i++) {
          // creating li of next month first days
          liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
        }
        currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
        daysTag.innerHTML = liTag;
        addClickListenersToDays(); // Add click event listeners to the days
      };

      renderCalendar();

      prevNextIcon.forEach((icon) => {
        // getting prev and next icons
        icon.addEventListener("click", () => {
          // adding click event on both icons
          // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
          currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

          if (currMonth < 0 || currMonth > 11) {
            // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
          } else {
            date = new Date(); // pass the current date as date value
          }
          renderCalendar(); // calling renderCalendar function
        });
      });

      function addClickListenersToDays() {
        const days = document.querySelectorAll(".days li:not(.inactive)");
        days.forEach((day) => {
          day.addEventListener("click", () => {
            day.classList.toggle("selected");
            const dayNumber = parseInt(day.textContent);
            if (selectedDates.has(dayNumber)) {
              selectedDates.delete(dayNumber);
            } else {
              selectedDates.add(dayNumber);
            }
          });
        });
      }