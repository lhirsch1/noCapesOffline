const express = require('express');
const router = express.Router();
const db = require("../models");


router.get(`/api/tasks`, function(req,res){
    console.log("tasks get")
    db.Task.findAll({
        
    }

    )
        .then(results => res.json(results))
        .catch(error => res.json(error))
});

//need to do subquery to find list of tasks that are the users usertasks and exclude them from the rendered new tasks on homepage
//SELECT  * FROM tasks LEFT OUTER JOIN charities ON tasks.CharityId = charities.id WHERE tasks.id NOT IN (SELECT `Task`.`id` FROM `Tasks` AS `Task` LEFT OUTER JOIN `UserTasks` AS `UserTasks` ON `Task`.`id` = `UserTasks`.`TaskId` WHERE `UserTasks`.`UserId` = '1')
router.get(`/api/newtasks/:id`, function(req,res){
    console.log("new tasks get")
    db.sequelize.query("SELECT Tasks.id AS 'taskid', Tasks.name AS 'taskName', Tasks.description AS 'taskDescription', Tasks.points AS 'taskPoints', Tasks.badge, Tasks.confirmation, Charities.name AS 'charityName', Charities.photo, Charities.charUrl FROM Tasks LEFT OUTER JOIN Charities ON Tasks.CharityId = Charities.id WHERE Tasks.id NOT IN (SELECT `Task`.`id` FROM `Tasks` AS `Task` LEFT OUTER JOIN `UserTasks` AS `UserTasks` ON `Task`.`id` = `UserTasks`.`TaskId` WHERE `UserTasks`.`UserId` = "+ req.params.id+")" )
        .then(results => res.json(results))
        .catch(error => res.json(error))
});

router.get("/api/task/:id", function(req,res){
    console.log("task get one")
    db.Task.findOne({
        where: {
            id : req.params.id
        }
    })
    .then(results => res.json(results))
    .catch(error => res.json(error))
})

router.post(`/api/tasks`, function(req,res){
    console.log("task post")
    console.log("req.body ", req.body)
    db.Task.create({
        CharityId: req.body.CharityId,
        CategoryId: req.body.CategoryId,
        name : req.body.name,
        description: req.body.description,
        completionMessage: req.body.completionMessage,
        points: req.body.points,
        badge: req.body.badge,
        confirmation: req.body.confirmation

    })
    .then((response) => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
});



module.exports = router;