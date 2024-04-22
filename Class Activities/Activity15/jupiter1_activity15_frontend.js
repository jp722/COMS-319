/**
 *  Author      : Juan Figueroa
 *  ISU Netid   : jupiter1@iastate.edu
 *  Date        : 04/21/2024
 */

let robotsData;

fetch("http://localhost:8081/listRobots")
    .then(response => response.json())
    .then(data => {
        robotsData = data;
        loadRobots(data);
    })
    .catch(error => console.error("Error fetching robots:", error));

function loadRobots(robotsData) {
    var mainContainer = document.getElementById("robot-container");

    for (var i = 0; i < robotsData.length; i++) {
        let name = robotsData[i].name;
        let price = robotsData[i].price;
        let description = robotsData[i].description;
        let imageUrl = robotsData[i].imageUrl;

        let div = document.createElement("div");
        div.innerHTML = `
            <img src=${imageUrl} width="200"> <br> <br>             
            <h3>${name}</h3> <br>            
            $${price} <br>            
            ${description} <br>            
                   
        `;
        mainContainer.appendChild(div);
    }
}

function getInputValue() {
    let inputField = document.forms["my_form"]["inputRobotNumber"];
    let robotNumber = parseInt(inputField.value);
    var mainContainer2 = document.getElementById("found-robot-container");
    mainContainer2.innerHTML = "";


    if (robotNumber >= 0 && robotNumber < robotsData.length + 1) {
        let robot = robotsData[robotNumber - 1];
        let div = document.createElement("div");
        div.innerHTML = `
            <img src=${robot.imageUrl} width="200"> <br> <br>             
            <h3>${robot.name}</h3> <br>            
            $${robot.price} <br>            
            ${robot.description} <br>            
                   
        `;
        mainContainer2.appendChild(div);
    } else {
        console.error("Robot number not found");
    }
}


function addNewCustomRobot() {
    const newRobotData = {
        id: 4,
        name: 'Robot Juan',
        price: 100.90,
        description: 'Example',
        imageUrl: 'https://robohash.org/Juan'
    };

    fetch('http://localhost:8081/addRobot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRobotData)
    })
        .then(response => response.json())
    alert("New Robot!");
    window.location.reload();
}

function deleteOneRobot() {
    // Fetch the value from the input field
    let id = document.getElementById("deleteRobotById").value;
    console.log(id);
    fetch(`http://localhost:8081/deleteRobot/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(
            { "id": id }
        )
    })
        .then(response => response.json())
        .then(deleteThisRobot => { deleteOneRobotById(deleteThisRobot) })};

        function updateOneRobot() {
            // Fetch the value from the input field
            let id = document.getElementById("updateRobotById").value;
            console.log(id);
            fetch(`http://localhost:8081/updateRobot/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(
            {
            "name": "Robot Juan Figueroa",
            "price": 100000.99,
            "description": "the best of the robots",
            "imageUrl": "https://robohash.org/Juan"
            }
            )
            })
            .then(response => response.json())
            .then(updateThisRobot => {updateOneRobotById(updateThisRobot)})};