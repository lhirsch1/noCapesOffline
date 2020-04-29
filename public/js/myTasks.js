var thisUserId = '';
var thisTask;
let userLat;
let userLng;
let charLat;
let charLng;
let listIdentifier = ''
let userDistance;
let badgeArray = [];
let scoreArray = [];
let titleArray = [];
let totalPoints = 0;
$(document).ready(function () {

    const pathName = window.location.pathname
    //listIdentifier changes what the userTask api call will look like
    //1 means todo list
    //2 is scorecard

    const content = $(`.content`);
    const contentHeader = $(`.contentHeader`)

    if (pathName === '/mylist') {
        listIdentifier = 1;
        //change page title
        document.title = "ToDo List"
        contentHeader.text('ToDo List')


    }
    else if (pathName === '/scorecard') {
        listIdentifier = 2
        //change page title
        document.title = 'Scorecard';
        contentHeader.text('Scorecard')
        //rendering score
        const scoreBoard = $(`<div class='scoreboard'>`);
        const points = $(`<p class='pointHolder'>`)
        //points.text('howdy!')
        scoreBoard.append(points);
        content.prepend(scoreBoard)
    }
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page


    $.get("/api/user_data").then(function (data) {
        thisUserId = data.id
        $(".member-name").text(data.email);


        //This call gets the tasks to populate either the todo list or the scoreboard

        $.get(`/api/userTask/myList/${thisUserId}/${listIdentifier}`).then(function (data) {
            const taskHolder = $('.taskHolder')
            var myTasks = data[0]
            //creates a new card for each task
            myTasks.forEach(
                ({ UserTaskId, TaskId, TaskName, TaskDescription, CompletionMessage, TaskPoints, CharityName, CharityPhoto, CharityId, confirmed, TaskBadge }) => {
                    //creating DOM elements
                    var taskCard = $("<div class = taskCard>");
                    var taskTitle = $("<h4 class='taskTitle'>");
                    var taskPhoto = $(`<img src='../images/${CharityPhoto}'>`);
                    var taskDescript = $("<h4 class='taskDescript'>");
                    var taskCharity = $("<h3 class='taskCharity'>");
                    var taskPoints = $(`<h4 class='taskPoints'>`)
                    var addBtn = $("<button class='addBtn'>");
                    var deleteBtn = $("<button class='deleteBtn'>");
                    addBtn.val([TaskId])

                    //if statement changes button action based on whether it is score or todo
                    if (listIdentifier === 1) {
                        addBtn.text("Mark Done");
                        //adding data attributes to button to store data
                        addBtn.attr('data-toggle', 'modal');
                        addBtn.attr('data-target', '#completeModal');
                        addBtn.attr('data-completionMessage', CompletionMessage);
                        addBtn.attr('data-TaskName', TaskName);
                        addBtn.attr('data-confirm', confirmed);
                        addBtn.attr('data-charId', CharityId);
                        addBtn.attr('data-userTaskId', UserTaskId);
                        addBtn.attr('data-taskbadge', TaskBadge);

                        //addbtn change to complete
                        //addBtn.val([data[i].id, data[i].confirmation])
                        deleteBtn.text("Remove");
                    }
                    else if (listIdentifier === 2) {
                        //populating arrays for trophy case
                        badgeArray.push(TaskBadge);
                        scoreArray.push(TaskPoints);
                        titleArray.push(TaskName);

                        //building trophy case dom
                        const trophyContainer = $(`<div class='trophyContainer'>`)
                        const pointCounter = $(`<p>`)
                        const trophyInfo = $(`<div class='trophyItem'>`)
                        trophyInfo.html(`<img src='../images/${TaskBadge}'> </br> <p class='trophyText'>${TaskName} </br> ${TaskPoints} Points</p>`)
                        //adding points
                        totalPoints += TaskPoints;
                        trophyContainer.append(trophyInfo);

                        const trophyModalBody = $('.trophy-modal-body')
                        trophyModalBody.append(pointCounter, trophyContainer)

                        addBtn.attr('display', 'none')
                    }
                    //populating cards with data
                    taskDescript.text(TaskDescription);
                    taskTitle.text(TaskName);
                    taskCharity.text(CharityName);
                    taskPoints.text(`${TaskPoints} Points`);
                    taskCard.append(taskCharity, taskTitle, taskPhoto, taskDescript, taskPoints)
                    if (listIdentifier === 1) {
                        taskCard.append(addBtn, deleteBtn);
                    }
                    //append completed card to container div
                    taskHolder.append(taskCard)
                });
            if (listIdentifier === 2){
            const trophyButton = $(`<button class='trophyBtn'>`);
            //syncing button to modal
            trophyButton.attr('data-toggle', 'modal');
            trophyButton.attr('data-target', '#trophyCaseModal');
            trophyButton.text('View Trophies');
            taskHolder.prepend(trophyButton)
            //append final score to trophy case modal
            const trophyModalBody = $('.trophy-modal-body')
            trophyModalBody.prepend(`Total Points = ${totalPoints}`)
            }
        }).catch(error => console.log(error));
    });
});

//todo add button listener
$(document).on('click', '.addBtn', function () {
    //dom manipulation for modal
    const modalBody = $('.modal-body')
    const completionMessage = $(`<p class='completionMessage'>`);
    const taskName = $(`<p class='taskName'>`);
    let completionDirections = $(`<p class='completionDirections'>`)

    //clear modal content
    modalBody.empty()

    //retrieving data from addBtn data attributes
    thisBadge = this.dataset.taskbadge
    taskName.text(this.dataset.taskname);
    completionMessage.text(this.dataset.completionmessage);
    modalBody.append(completionMessage)
    //confirmation 0 means location based confirmation
    if (this.dataset.confirm === "0") {
        const modalButton = $('#submitTask');
        thisTask = this.dataset.usertaskid;
        completionDirections.text('Checking location...');
        modalBody.append(completionDirections)
        //calls function to get user coords
        userLoc = getLocation();
        //api call to get charity address information
        $.get(`/api/charity/${this.dataset.charid}`).then(function (data) {
            //formating address strings
            var normStAddress = data[0].streetAddress.replace(/\s/g, "+");
            var normCity = data[0].city.replace(/\s/g, "+");
            var address = `${data[0].streetAddress} ${data[0].city} ${data[0].zipCode} ${data[0].state}`;
            //api call takes address of charity and converts into coordinates
            $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${normStAddress},+${normCity},+${data[0].state}&key=AIzaSyC-_L6Oc4Q6H7fQruQLjF2TfW2EL-eB9yo`).then(function (data) {
                charLat = data.results[0].geometry.location.lat;
                charLng = data.results[0].geometry.location.lng;
                //calls distance function to get the distance between user and charity in miles
                distance(userLat, userLng, charLat, charLng, "M")

            }).then(
                //if the distance is within range, the event is considered complete. later there will be other ways to confirm
                function () {
                    //distance is much higher for testing purposes
                    //if within set distance, task is approved
                    if (userDistance < 1.5) {
                        completionDirections.html(`Location confirmed! </br> You earned a new badge!  <img src='../images/${thisBadge}' </br> </br> </br>  Press Save to complete`);
                        modalBody.append(completionDirections)
                        modalButton.prop('disabled', false)
                    }
                    else {
                        modalBody.empty()
                        completionDirections.html(`Hmm looks like your heart is in the right place, but you aren't </br> Please mark task complete at the charity location or upload a photo taken there`);
                        modalBody.append(completionDirections)
                    }
                }
            ).catch(error => console.log(error));
        }).catch(error => console.log(error));
    }
})

//function checks if location is enabled and calls other function 
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log('Please enable location services')
    }
}
//gets user coordinates
function showPosition(position) {
    userLat = position.coords.latitude
    userLng = position.coords.longitude
}

//function measures distance between two points 
function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        userDistance = dist;
    }
}

//listener for submit task button
//updates usertask from todo item to complete
$(document).on('click', '#submitTask', function () {
    $.ajax({
        url: `/api/userTasks/${thisTask}`,
        type: 'PUT',
        success: function (response) {
        }
    }).then(
        function () {
            location.reload()
        }
    )
})




