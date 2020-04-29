const express = require('express');
const router = express.Router();
const db = require("../models");



router.get(`/api/categories/`, (req, res) => {
    db.Category.findAll({
        
    }

    )
        .then(results => res.json(results))
        .catch(error => res.json(error))
});

router.get("/api/category/:id", (req, res) => {
    console.log('one cat')
    db.Category.findOne({
        where :{
            id: req.params.id
        }
    })
        .then(results => res.json(results))
        .catch(error => res.json(error))
})

router.post(`/api/category`, (req, res) => {
    console.log("category post")
    console.log(req.body)
    db.Category.create(req.body)
        .then((response) => res.status(200).json(response))
        .catch(error => res.status(500).json(error))
})



module.exports = router;