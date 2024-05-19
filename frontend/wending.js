document.getElementById("form1").addEventListener("submit", submitOrDelete);
var studentDataArr = JSON.parse(localStorage.getItem("studentData")) || [];

function submitOrDelete(e) {
    e.preventDefault();
    var regNo = document.querySelector("#reg").value;
    var selectedExercise = document.querySelector('input[name="exercise"]:checked');

    if (!selectedExercise) {
        alert("Please select an exercise.");
        return;
    }

    var exerciseNumber = selectedExercise.value;

    // Check if the registration number already exists in the table
    var indexToDelete = studentDataArr.findIndex(function(item) {
        return item.name === regNo;
    });

    if (indexToDelete !== -1) {
        // If the registration number exists, delete the corresponding row
        studentDataArr.splice(indexToDelete, 1);
        localStorage.setItem("studentData", JSON.stringify(studentDataArr));
        displayFun(studentDataArr);
        document.querySelector("#form1").reset();
        return; // Exit the function to prevent inserting the entry
    }

    // Add the new student entry
    var currentDate = new Date().toLocaleString(); // Get current date and time
    var studentObj = {
        name: regNo,
        exercise: exerciseNumber, // Store the selected exercise as "EX X"
        dateTime: currentDate // Add the current date and time to the student object
    };

    studentDataArr.push(studentObj);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));

    document.querySelector("#form1").reset();
    displayFun(studentDataArr);
}

function displayFun(studentDataArr) {
    var count = 1;
    var tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";
    studentDataArr.forEach(function(item, index) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = count++;
        var td2 = document.createElement("td");
        td2.innerHTML = item.name;
        var td3 = document.createElement("td");
        td3.innerHTML = item.exercise; // Display exercise number
        var td4 = document.createElement("td");
        td4.innerHTML = item.dateTime; // Display date & time
        tr.append(td1, td2, td3, td4);
        tbody.append(tr);
    });
}

displayFun(studentDataArr);

// Add event listeners to exercise buttons
var exerciseButtons = document.querySelectorAll('.btn-exercise');
exerciseButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var selectedExercise = this.dataset.exercise;
        document.querySelector("#selectedExercise").textContent = "Selected Exercise: " + selectedExercise;
    });
});