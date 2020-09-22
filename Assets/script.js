
var activity = {};
var current = moment().hours();

// Update current time
setInterval(function () {
    $("#currentDay").text(moment().format("dddd, MMM Do YYYY hh mm ss a"));
}, 1000);

// categorize colors
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
    var activityDescription = $("<textarea class='description col-9' data-description=" + data + ">");
    var saveButton = $("<button class='saveBtn col-1' data-time=" + data + "> <i class='far fa-save'></i>");

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


//check local storage
function displayActivities() {
    activity = JSON.parse(localStorage.getItem("activity")) || {};
    if (activity) {
        for (var key in activity) {
            $(`[data-description=${key}]`).text(activity[key]);
        }
    }
}
// Save function
function storeActivities() {
    localStorage.setItem("activity", JSON.stringify(activity));
}

//save button
$(".saveBtn").click(function () {
    var identifier = $(this).data("time");
    var description = $(`[data-description=${identifier}]`);
    if (description.val() != undefined) {
        activity[identifier] = description.val();
        storeActivities();
    }

});