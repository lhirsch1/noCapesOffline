var thisUserId;

$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
        thisUserId = data.id
        $(".member-name").text(data.email);

        //api call gets tasks that the user has not interacted with
        $.get(`/api/newtasks/` + thisUserId).then(function (data) {
            const taskHolder = $('.taskHolder')
            newTasks = data[0];
            newTasks.forEach(
                ({ taskid, taskName, taskDescription, taskPoints, photo, charityName, confirmation }) => {
                    var taskCard = $("<div class='taskCard'>");
                    var taskTitle = $("<h4 class='taskTitle'>");
                    var taskCharity = $("<h3 class='taskCharity'>");
                    var taskPhoto = $(`<img src='../images/${photo}'>`);
                    var taskDescript = $("<h4 class='taskDescript'>");
                    var taskPoint = $(`<h4 class='taskPoints'>`)
                    var addBtn = $("<button class='addBtn'>");
                    var deleteBtn = $("<button class='deleteBtn'>");
                    addBtn.text("Add To List");
                    addBtn.attr('data-toggle', 'modal');
                    addBtn.attr('data-target', '#confirmModal');
                    addBtn.val([taskid,confirmation])
                    deleteBtn.text("Not Interested");
                    taskDescript.text(taskDescription);
                    taskTitle.text(taskName);
                    taskCharity.text(charityName)
                    taskPoint.text(`${taskPoints} Points`)
                    taskCard.append(taskCharity, taskTitle, taskPhoto, taskDescript, taskPoint, addBtn, deleteBtn);
                    taskHolder.append(taskCard)
                });


        }).catch(error => console.log(error))
    })
});

$(document).on('click', '.addBtn', function () {
    var confirmBool;
    //just a lil sugar 
    this.value[2] === 't' ? confirmBool = 1 : confirmBool = 0


    //clicking add button creates a userTask and removes from the new task queue
    $.post('/api/userTasks', {
        completionStatus: 1,
        photo: 'hi',
        confirmed: confirmBool,
        TaskId: this.value[0],
        UserId: thisUserId
    });

    //remove item from list
    $(this).siblings().remove()
    $(this).parent().remove()
    $(this).remove()
})


$(document).on('click', '.deleteBtn', function () {
    //change to popper.js
    alert('removed to list')
    //remove item from list
    $(this).siblings().remove()
    $(this).parent().remove()
    $(this).remove()
})
