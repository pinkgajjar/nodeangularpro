// routes/auth.routes.js

const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const userSchema = require("../models/User");
const assetSchema = require("../models/Asset");
const authorize = require("../middlewares/auth");
const { check, validationResult, body } = require('express-validator');


// Sign-up
router.post("/register-user",
    [
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('password', 'Password should be between 5 to 8 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 5, max: 8 })
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
                const user = new userSchema({
                    email: req.body.email,
                    password: req.body.password
                });
                user.save().then((response) => {
                    res.status(201).json({
                        message: "User successfully created!",
                        result: response
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                
            });
        }
    });


// Sign-in
router.post("/login", (req, res, next) => {
    let getUser;
  console.log(req.body.email);
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
      
        return (req.body.password).toString().localeCompare(user.password);
    }).then(response => {
       
       if (response==-1) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
      let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1day"
        });
        res.status(200).json({
            "token": jwtToken,
            expiresIn: 3600*24,
            "status": "Authenticated"
              });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});
// Create asset
router.post("/assets",
    [
        check('assetname', 'AssetName is required')
            .not()
            .isEmpty(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            var today = new Date(); 
            var dd = today.getDate(); 
            var mm = today.getMonth() + 1; 
      
            var yyyy = today.getFullYear(); 
            if (dd < 10) { 
                dd = '0' + dd; 
            } 
            if (mm < 10) { 
                mm = '0' + mm; 
            } 
            today = dd + '/' + mm + '/' + yyyy; 
      
                const asset = new assetSchema({
                    assetname: req.body.assetname,
                    status : "true",
                    regdate: today
                });
                asset.save().then((response) => {
                    res.status(201).json({
                        message: "Asset successfully created!",
                        result: response
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                
            });
        }
    });


// Get assets
router.route('/').get(authorize,(req, res) => {
      assetSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single assests
router.route('/assets/:id').get(authorize, (req, res, next) => {
    assetSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
// Get Assests By Date
router.route('/assets').get(authorize, (req, res, next) => {
    assetSchema.find({'regdate':{$gte:req.query.registration_date}}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
// Deactivate assets
router.route('/assets').put((req, res, next) => {
    var myquery = { status: "true" };
    var updatequery = { status: "false" };
    
    assetSchema.updateMany({myquery,
        $set: updatequery
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Assets successfully updated!')
        }
    })
})


// Delete Asset
router.route('/assets/:id').delete(authorize,(req, res, next) => {
    assetSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data,
                "status":"success"
            })
        }
    })
})

module.exports = router;
