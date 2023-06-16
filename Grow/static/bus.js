
    function loadImages() {
      const imageContainer = document.querySelector('.image-container');
      imageContainer.innerHTML = '';

      const students = getStudentData();
      let currentRow;

      students.forEach((student, index) => {
        const { imageUrl, name, timeEntered, timeExit } = student;

        if (index % 2 === 0) {
          // Create a new row container for every even index
          currentRow = document.createElement('div');
          currentRow.classList.add('row-container');
          imageContainer.appendChild(currentRow);
        }

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('student-info');

        const nameElement = document.createElement('p');
        nameElement.innerText = `Name: ${name}`;

        const timeEnteredElement = document.createElement('p');
        timeEnteredElement.innerText = `Time Entered: ${timeEntered}`;

        const timeExitElement = document.createElement('p');
        timeExitElement.innerText = `Time Exit: ${timeExit}`;

        const studentContainer = document.createElement('div');
        studentContainer.classList.add('student-container');
        studentContainer.appendChild(imageElement);
        studentContainer.appendChild(infoContainer);
        infoContainer.appendChild(nameElement);
        infoContainer.appendChild(timeEnteredElement);
        infoContainer.appendChild(timeExitElement);

        currentRow.appendChild(studentContainer);
      });
    }

    function getStudentData() {
      const studentData = [
        {
          imageUrl: 'daffodils/smrithi.jpg',
          name: 'Smrithi',
          timeEntered: '9:11 AM',
          timeExit: '4:00 PM',
        },
        {
          imageUrl: 'daffodils/ibrahim.jpg',
          name: 'Ibrahim',
          timeEntered: '9:09 AM',
          timeExit: '4:05 PM',
        },
        {
          imageUrl: 'daffodils/midhun.jpg',
          name: 'Midhun',
          timeEntered: '9:08 AM',
          timeExit: '4:05 PM',
        },
        {
          imageUrl: 'daffodils/haja.jpg',
          name: 'Haja',
          timeEntered: '9:05 AM',
          timeExit: '4:05 PM',
        },
        {
          imageUrl: 'daffodils/abhijith.jpg',
          name: 'Abhijith',
          timeEntered: '9:01 AM',
          timeExit: '4:05 PM',
        },
        {
          imageUrl: 'daffodils/ben10.jpg',
          name: 'Ben',
          timeEntered: '9:05 AM',
          timeExit: '4:05 PM',
        },
        {
          imageUrl: 'daffodils/nandhamol.jpg',
          name: 'Nandhamol',
          timeEntered: '9:00 AM',
          timeExit: '4:05 PM',
        },
        {
          imageUrl: 'daffodils/meghamol.jpg',
          name: 'Meghamol',
          timeEntered: '9:15 AM',
          timeExit: '4:05 PM',
        },
        // Add more student data as needed
      ];
      return studentData;
    }

    // Load images initially
    loadImages();

    // Automatically reload images every 5 seconds (adjust the interval as needed)
    setInterval(loadImages, 5000);
