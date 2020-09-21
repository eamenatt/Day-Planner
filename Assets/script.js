
var activities = {};
var current = moment().hours();

// Update current time
setInterval(function () {
    $("#currentDay").text(moment().format("dddd, MMM Do YYYY hh mm ss a"));
}, 1000);

// Color code 
function colorCode(timeBlock, description) {
    if (timeBlock == current) {
        description.addClass("present");
    } else if (timeBlock < current) {
        description.addClass("past");
    } else {
        description.addClass("future");
    }
}

function makeTimeBlock(time) {
    // Create a row for the time block

    var data = "time" + time;
    var individualHour = $("<div class='row'>");
    var timeStamp = $("<div class='col-2 hour time-block'>");
    var activityDescription = $("<textarea class='description col-8' data-description=" + data + ">");
    var saveButton = $("<button class='saveBtn col-2' data-time=" + data + "><i class='fas fa-save'></i>");

    colorCode(time, activityDescription);
    timeStamp.text(numberToStringTime(time));
    individualHour.append(timeStamp, activityDescription, saveButton);
    $("#timeblocks").append(individualHour);

}

// convert time to string
function numberToStringTime(numberTime) {
    textTime = numberTime.toString();
    return textTime + ":00";
}

// Display the entire planner between 9am & 6pm
function displayPlanner() {
    for (var i = 9; i < 18; i++) {
        makeTimeBlock(i);
    }
    displayActivities();
}

displayPlanner();


//check local storage for actvities to display
function displayActivities() {
    activities = JSON.parse(localStorage.getItem("activities")) || {};
    if (activities) {
        for (var key in activities) {
            $(`[data-description=${key}]`).text(activities[key]);
        }
    }
}
// Save activity
function writeActivitiesToLocalstorage() {
    localStorage.setItem("activities", JSON.stringify(activities));
}

//save button functionality
$(".saveBtn").click(function () {

    // when save button is clicked get its data attribute
    var identifier = $(this).data("time");
    // select description box with the same data attribute
    var description = $(`[data-description=${identifier}]`);
    if (description.val() != undefined) {
        //take that value and assign create an object with the time stamp as key, and the text content as value
        activities[identifier] = description.val();
        writeActivitiesToLocalstorage();
    }

});