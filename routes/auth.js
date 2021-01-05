const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/requireLogin");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const crypto = require('crypto');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:"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"
  }
}))


router.post("/signup", (req, res) => {
  const { name, email, password, profilepic } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({
      success: false,
      error: "Field missing, Please add all the fields",
    });
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (savedUser) {
          return res.status(422).json({
            success: false,
            error: "User already exists with this Email",
          });
        } else {
          bcrypt.hash(password, 12).then((hashedpassword) => {
            const user = new User({
              email: email,
              password: hashedpassword,
              name: name,
              profilepic: profilepic
            });
            user
              .save()
              .then((user) => {
                transporter.sendMail({
                  to:user.email,
                  from:"avigyanbhaktacontai@gmail.com",
                  subject:"AviSocial Account Activation",
                  html: `
                    <head>
                      <meta name="viewport" content="width=device-width" />
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                      <title>Simple Transactional Email</title>
                      <style>
                        /* -------------------------------------
                            GLOBAL RESETS
                        ------------------------------------- */
                        img {
                          border: none;
                          -ms-interpolation-mode: bicubic;
                          max-width: 100%; }
                        body {
                          background-color: #f6f6f6;
                          font-family: sans-serif;
                          -webkit-font-smoothing: antialiased;
                          font-size: 14px;
                          line-height: 1.4;
                          margin: 0;
                          padding: 0; 
                          -ms-text-size-adjust: 100%;
                          -webkit-text-size-adjust: 100%; }
                        table {
                          border-collapse: separate;
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          width: 100%; }
                          table td {
                            font-family: sans-serif;
                            font-size: 14px;
                            vertical-align: top; }
                        /* -------------------------------------
                            BODY & CONTAINER
                        ------------------------------------- */
                        .body {
                          background-color: #f6f6f6;
                          width: 100%; }
                        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                        .container {
                          display: block;
                          Margin: 0 auto !important;
                          /* makes it centered */
                          max-width: 580px;
                          padding: 10px;
                          width: 580px; }
                        /* This should also be a block element, so that it will fill 100% of the .container */
                        .content {
                          box-sizing: border-box;
                          display: block;
                          Margin: 0 auto;
                          max-width: 580px;
                          padding: 10px; }
                        /* -------------------------------------
                            HEADER, FOOTER, MAIN
                        ------------------------------------- */
                        .main {
                          background: #fff;
                          border-radius: 3px;
                          width: 100%; }
                        .wrapper {
                          box-sizing: border-box;
                          padding: 20px; }
                        .footer {
                          clear: both;
                          padding-top: 10px;
                          text-align: center;
                          width: 100%; }
                          .footer td,
                          .footer p,
                          .footer span,
                          .footer a {
                            color: #999999;
                            font-size: 12px;
                            text-align: center; }
                        /* -------------------------------------
                            TYPOGRAPHY
                        ------------------------------------- */
                        h1,
                        h2,
                        h3,
                        h4 {
                          color: #000000;
                          font-family: sans-serif;
                          font-weight: 400;
                          line-height: 1.4;
                          margin: 0;
                          Margin-bottom: 30px; }
                        h1 {
                          font-size: 35px;
                          font-weight: 300;
                          text-align: center;
                          text-transform: capitalize; }
                        p,
                        ul,
                        ol {
                          font-family: sans-serif;
                          font-size: 14px;
                          font-weight: normal;
                          margin: 0;
                          Margin-bottom: 15px; }
                          p li,
                          ul li,
                          ol li {
                            list-style-position: inside;
                            margin-left: 5px; }
                        a {
                          color: #3498db;
                          text-decoration: underline; }
                        /* -------------------------------------
                            BUTTONS
                        ------------------------------------- */
                        .btn {
                          box-sizing: border-box;
                          width: 100%; }
                          .btn > tbody > tr > td {
                            padding-bottom: 15px; }
                          .btn table {
                            width: auto; }
                          .btn table td {
                            background-color: #ffffff;
                            border-radius: 5px;
                            text-align: center; }
                          .btn a {
                            background-color: #ffffff;
                            border: solid 1px #3498db;
                            border-radius: 5px;
                            box-sizing: border-box;
                            color: #3498db;
                            cursor: pointer;
                            display: inline-block;
                            font-size: 14px;
                            font-weight: bold;
                            margin: 0;
                            padding: 12px 25px;
                            text-decoration: none;
                            text-transform: capitalize; }
                        .btn-primary table td {
                          background-color: #3498db; }
                        .btn-primary a {
                          background-color: #3498db;
                          border-color: #3498db;
                          color: #ffffff; }
                        /* -------------------------------------
                            OTHER STYLES THAT MIGHT BE USEFUL
                        ------------------------------------- */
                        .last {
                          margin-bottom: 0; }
                        .first {
                          margin-top: 0; }
                        .align-center {
                          text-align: center; }
                        .align-right {
                          text-align: right; }
                        .align-left {
                          text-align: left; }
                        .clear {
                          clear: both; }
                        .mt0 {
                          margin-top: 0; }
                        .mb0 {
                          margin-bottom: 0; }
                        .preheader {
                          color: transparent;
                          display: none;
                          height: 0;
                          max-height: 0;
                          max-width: 0;
                          opacity: 0;
                          overflow: hidden;
                          mso-hide: all;
                          visibility: hidden;
                          width: 0; }
                        .powered-by a {
                          text-decoration: none; }
                        hr {
                          border: 0;
                          border-bottom: 1px solid #f6f6f6;
                          Margin: 20px 0; }
                        /* -------------------------------------
                            RESPONSIVE AND MOBILE FRIENDLY STYLES
                        ------------------------------------- */
                        @media only screen and (max-width: 620px) {
                          table[class=body] h1 {
                            font-size: 28px !important;
                            margin-bottom: 10px !important; }
                          table[class=body] p,
                          table[class=body] ul,
                          table[class=body] ol,
                          table[class=body] td,
                          table[class=body] span,
                          table[class=body] a {
                            font-size: 16px !important; }
                          table[class=body] .wrapper,
                          table[class=body] .article {
                            padding: 10px !important; }
                          table[class=body] .content {
                            padding: 0 !important; }
                          table[class=body] .container {
                            padding: 0 !important;
                            width: 100% !important; }
                          table[class=body] .main {
                            border-left-width: 0 !important;
                            border-radius: 0 !important;
                            border-right-width: 0 !important; }
                          table[class=body] .btn table {
                            width: 100% !important; }
                          table[class=body] .btn a {
                            width: 100% !important; }
                          table[class=body] .img-responsive {
                            height: auto !important;
                            max-width: 100% !important;
                            width: auto !important; }}
                        @media all {
                          .ExternalClass {
                            width: 100%; }
                          .ExternalClass,
                          .ExternalClass p,
                          .ExternalClass span,
                          .ExternalClass font,
                          .ExternalClass td,
                          .ExternalClass div {
                            line-height: 100%; }
                          .apple-link a {
                            color: inherit !important;
                            font-family: inherit !important;
                            font-size: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                            text-decoration: none !important; } 
                          .btn-primary table td:hover {
                            background-color: #34495e !important; }
                          .btn-primary a:hover {
                            background-color: #34495e !important;
                            border-color: #34495e !important; } }
                      </style>
                    </head>
                    <body class="">
                      <table border="0" cellpadding="0" cellspacing="0" class="body">
                        <tr>
                          <td>&nbsp;</td>
                          <td class="container">
                            <div class="content">
                              <span class="preheader">Subscribe to Coloured.com.ng mailing list</span>
                              <table class="main">
                  
                                <!-- START MAIN CONTENT AREA -->
                                <tr>
                                  <td class="wrapper">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td>
                                          <h1>Greetings from AviSocial</h1>
                                          <h2>You are just one step away</h2>
                                          <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                            <tbody>
                                              <tr>
                                                <td align="left">
                                                  <table border="0" cellpadding="0" cellspacing="0">
                                                    <tbody>
                                                      <tr>
                                                        <td> <a href="https://avisocialmedia.herokuapp.com/" target="_blank">confirm email</a> </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <p>If you received this email by mistake, simply delete it.</p>
                        
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                  
                              <!-- END MAIN CONTENT AREA -->
                              </table>
                  
                              <!-- START FOOTER -->
                              <div class="footer">
                                <table border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td class="content-block">
                                      <span class="apple-link">avisocial.com | I am agreeing to all terms and conditions</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="content-block powered-by">
                                      Powered by <a href="https://fb.me/jalasem">AviSocial</a>.
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!-- END FOOTER -->
                              
                            <!-- END CENTERED WHITE CONTAINER -->
                            </div>
                          </td>
                          <td>&nbsp;</td>
                        </tr>
                      </table>
                    </body>
                  `      
                }).then(sent => {
                  console.log(sent)
                }).catch(err => {
                  console.log(err)
                })
                res.status(201).json({
                  success: true,
                  message: "User successfully created. Check inbox to view confirmation email",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({
      success: false,
      error: "Please provide email and correct password",
    });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({
        success: false,
        error: "Invalid email or password",
      });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
          const {_id, name, email, profilepic, followers, following} = savedUser
          res.json({ token, user:{_id,name,email,profilepic,followers,following} });
        } else {
          return res.status(422).json({
            success: false,
            error: "Invalid email or password",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});


router.post("/reset-password", (req,res) => {
  crypto.randomBytes(32, (err,buffer) => {
    if(err){
      console.log(err)
    }
    console.log(buffer)
    const token = buffer.toString("hex")
    User.findOne({email:req.body.email}).then(user=> {
      if(!user){
        return res.status(422).json({
          error:"User does not exists with provided email"
        })
      }
      user.resetToken = token
      user.expireToken = Date.now() + 900000
      user.save().then(result => {
        transporter.sendMail({
          to:user.email,
          from:"avigyanbhaktacontai@gmail.com",
          subject:"AviSocial Password Reset",
          html:`
            <head>
              <meta name="viewport" content="width=device-width" />
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Simple Transactional Email</title>
              <style>
                /* -------------------------------------
                    GLOBAL RESETS
                ------------------------------------- */
                img {
                  border: none;
                  -ms-interpolation-mode: bicubic;
                  max-width: 100%; }
                body {
                  background-color: #f6f6f6;
                  font-family: sans-serif;
                  -webkit-font-smoothing: antialiased;
                  font-size: 14px;
                  line-height: 1.4;
                  margin: 0;
                  padding: 0; 
                  -ms-text-size-adjust: 100%;
                  -webkit-text-size-adjust: 100%; }
                table {
                  border-collapse: separate;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  width: 100%; }
                  table td {
                    font-family: sans-serif;
                    font-size: 14px;
                    vertical-align: top; }
                /* -------------------------------------
                    BODY & CONTAINER
                ------------------------------------- */
                .body {
                  background-color: #f6f6f6;
                  width: 100%; }
                /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                .container {
                  display: block;
                  Margin: 0 auto !important;
                  /* makes it centered */
                  max-width: 580px;
                  padding: 10px;
                  width: 580px; }
                /* This should also be a block element, so that it will fill 100% of the .container */
                .content {
                  box-sizing: border-box;
                  display: block;
                  Margin: 0 auto;
                  max-width: 580px;
                  padding: 10px; }
                /* -------------------------------------
                    HEADER, FOOTER, MAIN
                ------------------------------------- */
                .main {
                  background: #fff;
                  border-radius: 3px;
                  width: 100%; }
                .wrapper {
                  box-sizing: border-box;
                  padding: 20px; }
                .footer {
                  clear: both;
                  padding-top: 10px;
                  text-align: center;
                  width: 100%; }
                  .footer td,
                  .footer p,
                  .footer span,
                  .footer a {
                    color: #999999;
                    font-size: 12px;
                    text-align: center; }
                /* -------------------------------------
                    TYPOGRAPHY
                ------------------------------------- */
                h1,
                h2,
                h3,
                h4 {
                  color: #000000;
                  font-family: sans-serif;
                  font-weight: 400;
                  line-height: 1.4;
                  margin: 0;
                  Margin-bottom: 30px; }
                h1 {
                  font-size: 35px;
                  font-weight: 300;
                  text-align: center;
                  text-transform: capitalize; }
                p,
                ul,
                ol {
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: normal;
                  margin: 0;
                  Margin-bottom: 15px; }
                  p li,
                  ul li,
                  ol li {
                    list-style-position: inside;
                    margin-left: 5px; }
                a {
                  color: #3498db;
                  text-decoration: underline; }
                /* -------------------------------------
                    BUTTONS
                ------------------------------------- */
                .btn {
                  box-sizing: border-box;
                  width: 100%; }
                  .btn > tbody > tr > td {
                    padding-bottom: 15px; }
                  .btn table {
                    width: auto; }
                  .btn table td {
                    background-color: #ffffff;
                    border-radius: 5px;
                    text-align: center; }
                  .btn a {
                    background-color: #ffffff;
                    border: solid 1px #3498db;
                    border-radius: 5px;
                    box-sizing: border-box;
                    color: #3498db;
                    cursor: pointer;
                    display: inline-block;
                    font-size: 14px;
                    font-weight: bold;
                    margin: 0;
                    padding: 12px 25px;
                    text-decoration: none;
                    text-transform: capitalize; }
                .btn-primary table td {
                  background-color: #3498db; }
                .btn-primary a {
                  background-color: #3498db;
                  border-color: #3498db;
                  color: #ffffff; }
                /* -------------------------------------
                    OTHER STYLES THAT MIGHT BE USEFUL
                ------------------------------------- */
                .last {
                  margin-bottom: 0; }
                .first {
                  margin-top: 0; }
                .align-center {
                  text-align: center; }
                .align-right {
                  text-align: right; }
                .align-left {
                  text-align: left; }
                .clear {
                  clear: both; }
                .mt0 {
                  margin-top: 0; }
                .mb0 {
                  margin-bottom: 0; }
                .preheader {
                  color: transparent;
                  display: none;
                  height: 0;
                  max-height: 0;
                  max-width: 0;
                  opacity: 0;
                  overflow: hidden;
                  mso-hide: all;
                  visibility: hidden;
                  width: 0; }
                .powered-by a {
                  text-decoration: none; }
                hr {
                  border: 0;
                  border-bottom: 1px solid #f6f6f6;
                  Margin: 20px 0; }
                /* -------------------------------------
                    RESPONSIVE AND MOBILE FRIENDLY STYLES
                ------------------------------------- */
                @media only screen and (max-width: 620px) {
                  table[class=body] h1 {
                    font-size: 28px !important;
                    margin-bottom: 10px !important; }
                  table[class=body] p,
                  table[class=body] ul,
                  table[class=body] ol,
                  table[class=body] td,
                  table[class=body] span,
                  table[class=body] a {
                    font-size: 16px !important; }
                  table[class=body] .wrapper,
                  table[class=body] .article {
                    padding: 10px !important; }
                  table[class=body] .content {
                    padding: 0 !important; }
                  table[class=body] .container {
                    padding: 0 !important;
                    width: 100% !important; }
                  table[class=body] .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important; }
                  table[class=body] .btn table {
                    width: 100% !important; }
                  table[class=body] .btn a {
                    width: 100% !important; }
                  table[class=body] .img-responsive {
                    height: auto !important;
                    max-width: 100% !important;
                    width: auto !important; }}
                @media all {
                  .ExternalClass {
                    width: 100%; }
                  .ExternalClass,
                  .ExternalClass p,
                  .ExternalClass span,
                  .ExternalClass font,
                  .ExternalClass td,
                  .ExternalClass div {
                    line-height: 100%; }
                  .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important; } 
                  .btn-primary table td:hover {
                    background-color: #34495e !important; }
                  .btn-primary a:hover {
                    background-color: #34495e !important;
                    border-color: #34495e !important; } }
              </style>
            </head>
            <body class="">
              <table border="0" cellpadding="0" cellspacing="0" class="body">
                <tr>
                  <td>&nbsp;</td>
                  <td class="container">
                    <div class="content">
                      <span class="preheader">Subscribe to Coloured.com.ng mailing list</span>
                      <table class="main">
          
                        <!-- START MAIN CONTENT AREA -->
                        <tr>
                          <td class="wrapper">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td>
                                  <h1>AviSocial</h1>
                                  <h2>Reset your password by clicking on the button</h2>
                                  <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                    <tbody>
                                      <tr>
                                        <td align="left">
                                          <table border="0" cellpadding="0" cellspacing="0">
                                            <tbody>
                                              <tr>
                                                <td> <a href="https://avisocialmedia.herokuapp.com/reset/${token}" target="_blank">Reset password</a> </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p>If you received this email by mistake, simply delete it.</p>
                
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
          
                      <!-- END MAIN CONTENT AREA -->
                      </table>
          
                      <!-- START FOOTER -->
                      <div class="footer">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="content-block">
                              <span class="apple-link">avisocial.com | I am agreeing to all terms and conditions</span>
                            </td>
                          </tr>
                          <tr>
                            <td class="content-block powered-by">
                              Powered by <a href="">AviSocial</a>.
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!-- END FOOTER -->
                      
                    <!-- END CENTERED WHITE CONTAINER -->
                    </div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
              </table>
            </body>
          `
        }).then(sent => {
          console.log(sent)
        }).catch(err => {
          console.log(err)
        })
        res.json({message:"Password reset link has been sent to your email"})
      })
    })
  })
})



router.post("/new-password", (req,res) => {
  const newpassword = req.body.password
  const sentToken = req.body.token
  User.findOne({resetToken:sentToken, expireToken:{$gt:Date.now()}}).then(user => {
    if(!user){
      return res.status(422).json({
        success: false,
        error: "Try again. Session Expired"
      })
    }
    bcrypt.hash(newpassword,12).then(hashedpassword => {
      user.password = hashedpassword
      user.resetToken = undefined
      user.expireToken = undefined
      user.save().then(savedUser => {
        res.json({message:"Password updated"})
      })
    })
  }).catch(err => {
    console.log(err)
  })
})





module.exports = router;
