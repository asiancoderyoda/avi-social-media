const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/post");
const requireLogin = require("../middleware/requireLogin");
const User = require("../models/user");



router.get('/user/:id', requireLogin, (req, res) => {
    User.findOne({_id:req.params.id}).select("-password")
    .then(user => {
        Post.find({postedBy:req.params.id}).populate("postedBy","_id name email").exec((err,posts) => {
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user, posts})
        })
    }).catch(err => {
        return res.status(404).json({
            success: false,
            error: "User not found"
        })
    })
})


router.put('/follow', requireLogin, (req,res) => {
    // req.body.followId is Id of the person logged in user want to follow so increase followers of that Id and increase following of logged in user
    User.findByIdAndUpdate(req.body.followId, {
        $push:{followers:req.user._id}
    },{new:true},(err, result) => {
        if(err) {
            return res.status(422).json({
                error:err
            })
        }
        User.findByIdAndUpdate(req.user._id, {
            $push:{following:req.body.followId}
        },{new:true}).select("-password").then(data => {
            res.json(data)
            //console.log(data)
        }).catch(err => {
            return res.status(422).json({error:err})
        })
    }) 

})



router.put('/unfollow', requireLogin, (req,res) => {
    // req.body.followId is Id of the person logged in user want to follow so increase followers of that Id and increase following of logged in user
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull:{followers:req.user._id}
    },{new:true},(err, result) => {
        if(err) {
            return res.status(422).json({
                error:err
            })
        }
        User.findByIdAndUpdate(req.user._id, {
            $pull:{following:req.body.unfollowId}
        },{new:true}).select("-password").then(data => {
            res.json(data)
            //console.log(data)
        }).catch(err => {
            return res.status(422).json({error:err})
        })
    }) 

})


router.put('/updateprofilepic',requireLogin,(req,res) => {
    User.findByIdAndUpdate(req.user._id,{$set:{profilepic:req.body.profilepic}},{new:true},(err,result) => {
        if(err){
            return res.status(422).json({error:"Failed to update profile picture"})
        }
        res.json(result)
    })
})



router.post('/search-users',(req,res) => {
    let userPattern = new RegExp("^"+req.body.query)
    User.find({name:{$regex:userPattern}}).select("_id name").then(user=> {
        res.json({user:user})
    }).catch(err=> {
        console.log(err)
    })
})




module.exports = router;