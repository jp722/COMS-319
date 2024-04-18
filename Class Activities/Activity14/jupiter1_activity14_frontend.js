/**
 *  Author      : Juan Figueroa
 *  ISU Netid   : jupiter1@iastate.edu
 *  Date        : 04/17/2024
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
        let robot = robotsData[robotNumber -1];
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
