
var activities = {};
var current = moment().hours();

// Update time function
setInterval(function () {
    $("#currentDay").text(moment().format("dddd, MMM Do YYYY hh mm ss a"));
}, 1000);

function createTimeBlock(time) {
    //row for the time block

    var dataTag = "time" + time;
    var individualHour = $("<div class='row'>");
    var timeStamp = $("<div class='col-2 hour time-block'>");
    var activityDescription = $("<textarea class='description col-8' data-description=" + dataTag + ">");
    var saveButton = $("<button class='saveBtn col-2' data-time=" + dataTag + "><i class='fas fa-save'></i>");

}

//convert time to string
function numberToStringTime(numberTime) {
    textTime = numberTime.toString();
    return textTime + ":00";
}

// Display the entire planner
function displayPlanner() {
    for (var i = 9; i < 18; i++) {
        createTimeBlock(i);
    }
    displayActivities();
}

displayPlanner();



