const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/post");
const requireLogin = require("../middleware/requireLogin");



router.get('/allposts',requireLogin , (req,res) => {
    Post.find().populate('postedBy', "_id name email profilepic").populate("comments.postedBy","_id name email profilepic").sort('-createdAt')
    .then(posts => {
        res.status(200).json({
            success: true,
            posts: posts
        })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/createpost', requireLogin, (req,res) => {
    const {title, body, photo} = req.body
    if(!title || !body || !photo) {
        return res.status(422).json({
            error: "Please add all fields"
        })
    }
    req.user.password = undefined
    const post = new Post({
        title: title,
        body: body,
        photo: photo,
        postedBy: req.user
    })
    post.save().then(result => {
        res.status(201).json({
            post: result
        })
    }).catch(err => {
        console.log(err)
    })

})


router.get('/myposts',requireLogin, (req,res) => {
    Post.find({postedBy: req.user._id}).populate("postedBy", "_id name email profilepic")
    .then(myposts => {
        res.json({
            success: true,
            length: myposts.length,
            myposts: myposts
        })
    }).catch(err => {
        console.log(err)
    })
})

router.put('/like', requireLogin, (req,res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy", "_id name email profilepic").populate("comments.postedBy", "_id name email profilepic").exec((err, result) => {
        if(err) {
            return res.status(422).json({
                success: false,
                error:err
            })
        }else{
            res.json(result)
        }
    })
})


router.put('/unlike', requireLogin, (req,res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy", "_id name email profilepic").populate("comments.postedBy", "_id name email profilepic").exec((err, result) => {
        if(err) {
            return res.status(422).json({
                success: false,
                error:err
            })
        }else{
            res.json(result)
        }
    })
})



router.put('/comment', requireLogin, (req,res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push:{comments:comment}
    },{
        new:true
    }).populate("comments.postedBy", "_id name email profilepic").populate("postedBy","_id name email profilepic").exec((err, result) => {
        if(err) {
            return res.status(422).json({
                success: false,
                error:err
            })
        }else{
            res.json(result)
        }
    })
})


router.delete('/deletepost/:postId',requireLogin, (req,res) => {
    Post.findOne({_id: req.params.postId}).populate("postedBy", "_id name email profilepic").exec((err,post) => {
        if(err || !post) {
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove().then(result => {
                res.json({
                    success: true,
                    message: "Post successfully removed",
                    data: result
                })
            }).catch(err => {
                console.log(err)
            })
        }
    })
})




router.delete("/deletecomment/:id/:comment_id", requireLogin, (req, res) => {
    const comment = { _id: req.params.comment_id };
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { comments: comment },
      },
      {
        new: true, 
      }
    )
      .populate("comments.postedBy", "_id name email profilepic")
      .populate("postedBy", "_id name email profilepic")
      .exec((err, postComment) => {
        if (err || !postComment) {
          return res.status(422).json({ error: err });
        } else {
         
          const result = postComment;
          res.json(result);
        }
      });
  });




  //route to see posts of users that user follows
  router.get('/myfeed',requireLogin , (req,res) => {

    //if postedBy in following
    Post.find({postedBy:{$in:req.user.following}}).populate('postedBy', "_id name email profilepic").populate("comments.postedBy","_id name email profilepic").sort('-createdAt')
    .then(posts => {
        res.status(200).json({
            success: true,
            posts: posts
        })
    }).catch(err => {
        console.log(err)
    })
})






module.exports = router;