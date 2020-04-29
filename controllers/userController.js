const express = require('express');
const router = express.Router();
const db = require("../models");






// router.get(`/api/user/:id`, function(req,res){
//     console.log("user get one")
   
//     db.User.findAll({
//         where: {
//             id : req.params.id
//         }
//     })
//     .then(results => res.json(results))
//     .catch(error => res.json(error))
// });
router.get('/api/user/:id', (req, res) => {
    console.log('get one user')
    db.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((response) => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
  });

router.get(`/api/users`, function(req,res){
    console.log("user get all")
    db.User.findAll({

    })
    .then(results => res.json(results))
    .catch(error => res.json(error))
});

router.post(`/api/users`, function(req,res){
    console.log("user post")
    console.log("req.body ", req.body)
    db.User.create({
        email: req.body.email,
        password: req.body.password,
        firstName : req.body.name,
        lastName : req.body.name,
        phoneNumber : req.body.phoneNumber,
        zipCode: req.body.zipCode,
        photo: req.body.photo,
        charityID: req.body.charityID

    })
    .then((response) => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
});

// router.put(`/api/charityList`, function(req,res){
//     console.log("charity put")
//     db.Charity.update(
//         //{title :req.body}, {where: req.params.id}
//         //https://medium.com/@sarahdherr/sequelizes-update-method-example-included-39dfed6821d
//     )
// })




module.exports = router;