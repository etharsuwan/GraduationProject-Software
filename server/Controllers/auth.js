const Driver = require("../models/drivers");
const Customer = require("../models/customer");
const Package = require("../models/package");

const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");
const { nanoid } = require("nanoid");
const cloudinary = require("cloudinary");


// sendgrid
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);


exports.signup = async (req, res) => {
    console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    console.log(req.body);
    console.log("Signup Hit");
    try {
        // validation
        console.log(req.body);

        const {  name,email,phone,city,license, password } = req.body;
        
        console.log(req.body);


        if (!name) {
            return res.json({
                error: "Name is required",
            });
        }

        if (!email) {
            return res.json({
                error: "Email is required",
            });
        }
        if (!phone) {
          return res.json({
              error: "phone is required",
          });
      }
      if (!city) {
        return res.json({
            error: "city is required",
        });
    }
    if (!license) {
      return res.json({
          error: "license is required",
      });
  }
        if (!password || password.length < 6) {
            return res.json({
                error: "Password is required and should be 6 characters long",
            });
        }
        const exist = await Driver.findOne({ email });
        if (exist) {
            return res.json({
                error: "Email is taken",
            });
        }
        // hash password
        const hashedPassword = await hashPassword(password);
        try {
            const user = await new Driver({
                name,
                email,
                phone,
                city,
                license,
                password: hashedPassword,
            }).save();
            // create signed token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            //   console.log(user);
            const { password, ...rest } = user._doc;
            console.log(res.json);
            return res.json({
        
                token,
                user: rest,
            });
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
};

exports.customerSignup = async (req, res) => {
    console.log(req.body);
    console.log("Signup Hit");
    try {
        // validation
        

        const {  name,email,phone,city, password } = req.body;
        
        console.log(req.body);


        if (!name) {
            return res.json({
                error: "Name is required",
            });
        }

        if (!email) {
            return res.json({
                error: "Email is required",
            });
        }
        if (!phone) {
          return res.json({
              error: "phone is required",
          });
      }
      if (!city) {
        return res.json({
            error: "city is required",
        });
    }
  
        if (!password || password.length < 6) {
            return res.json({
                error: "Password is required and should be 6 characters long",
            });
        }
        const exist = await Customer.findOne({ email });
        if (exist) {
            return res.json({
                error: "Email is taken",
            });
        }
        // hash password
        const hashedPassword = await hashPassword(password);
        try {
            const user = await new Customer({
                name,
                email,
                phone,
                city,
                password: hashedPassword,
            }).save();
            // create signed token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            //   console.log(user);
            const { password, ...rest } = user._doc;
            console.log(res.json);
            return res.json({
        
                token,
                user: rest,
            });
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
};

exports.signin = async (req, res) => {
    // console.log(req.body);
    try {
        const { email, password } = req.body;
        // check if our db has user with that email
        const user = await Driver.findOne({ email });
        if (!user) {
            return res.json({
                error: "No user found",
            });
        }
        // check password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({
                error: "Wrong password",
            });
        }
        // create signed token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined;
        user.secret = undefined;
        res.json({
            token,
            user,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
};

exports.signincustomer = async (req, res) => {
    // console.log(req.body);
    try {
        const { email, password } = req.body;
        // check if our db has user with that email
        const user = await Customer.findOne({ email });
        if (!user) {
            return res.json({
                error: "No user found",
            });
        }
        // check password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({
                error: "Wrong password",
            });
        }
        // create signed token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined;
        user.secret = undefined;
        res.json({
            token,
            user,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    // find user by email
    const user = await Customer.findOne({ email });
    console.log("USER ===> ", user);
    if (!user) {
        return res.json({ error: "User not found" });
    }
    // generate code
    const resetCode = nanoid(5).toUpperCase();
    // save to db
    user.resetCode = resetCode;
    user.save();
    // prepare email
    const emailData = {
        from: 'atobapplication@gmail.com',
        to: user.email,
        subject: "Password reset code",
        html: `<h1>Your password  reset code is: ${resetCode}</h1>`
    };
    // send email
    try {
        const data = await sgMail.send(emailData);
        console.log(data);
        res.json({ ok: true });
    } catch (err) {
        console.log(err);
        res.json({ ok: false });
    }
};
exports.resetPassword = async (req, res) => {
    console.log('djksjdflskd');
    try {
        const { email, password, resetCode } = req.body;
        // find user based on email and resetCode
        const user = await Customer.findOne({ email, resetCode });
        // if user not found
        if (!user) {
            return res.json({ error: "Email or reset code is invalid" });
        }
        // if password is short
        if (!password || password.length < 6) {
            return res.json({
                error: "Password is required and should be 6 characters long",
            });
        }
        // hash password
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        user.resetCode = "";
        user.save();
        return res.json({ ok: true });
    } catch (err) {
        console.log(err);
    }
};



exports.updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        console.log(req.body.user.user._id)
        if (password && password.length < 6) {
            return res.json({
                error: "Password is required and should be min 6 characters long",
            });
        } else {
            // update db
            const hashedPassword = await hashPassword(password);
            const user = await User.findByIdAndUpdate(req.body.user.user._id, {
                password: hashedPassword,
            });
            user.password = undefined;
            user.secret = undefined;
            return res.json(user);
        }
    } catch (err) {
        console.log(err);
    }
};
