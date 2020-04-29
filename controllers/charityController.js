const express = require('express');
const router = express.Router();
const db = require("../models");


router.get('/api/charity/:id', function(req,res){
    console.log("charity get one")
    db.Charity.findAll({
        where: {
            id : req.params.id
        }
    })
    .then(results => res.json(results))
    .catch(error => res.json(error))
});

router.get(`/api/charities`, function(req,res){
    console.log("charity get")
    db.Charity.findAll({

    })
    .then(results => res.json(results))
    .catch(error => res.json(error))
});

router.post(`/api/charities`, function(req,res){
    console.log("charity post")
    console.log("req.body ", req.body)
    db.Charity.create({
        name : req.body.name,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        zipCode: req.body.zipCode,
        state: req.body.state,
        phoneNumber: req.body.phoneNumber,
        charUrl: req.body.charUrl,
        photo: req.body.photo,
        email: req.body.email

    })
    .then((response) => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
});

router.put(`/api/charityList`, function(req,res){
    console.log("charity put")
    db.Charity.update(
        //{title :req.body}, {where: req.params.id}
        //https://medium.com/@sarahdherr/sequelizes-update-method-example-included-39dfed6821d
    )
});





module.exports = router;