require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const multer = require("multer");
const upload = multer();
const sanitizeHTML = require("sanitize-html");
const fse = require("fs-extra");
const sharp = require("sharp");
const path = require("path")

fse.ensureDirSync(path.join("public", "uploaded-photos"));

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
    secret: "Product page.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  photo: String
})

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

const Product = new mongoose.model("Product", productSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3002/auth/google/products"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({
      googleId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));
app.get("/", (req, res) => {
    res.render("home");
});
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
}));
app.get('/auth/google/products',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  function(req, res) {

    res.redirect('/products');
  });

app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/products", (req, res) => {
    
    if (req.isAuthenticated()) {
        res.render("products");
    } else {
        res.redirect("/login");
    }
})

app.post("/register", (req, res) => {
    User.register({
        username: req.body.username
      }, req.body.password, function(err, user) {
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
          passport.authenticate("local")(req, res, function() {
            res.redirect("/products")
          });
        }
      })
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login?info=' + info);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/products');
      });
  
    })(req, res, next);
  });

app.get("/api/products", async (req, res) => {
  
  if (req.isAuthenticated()) {
    const allProducts = await Product.find();
    res.json(allProducts);
} else {
    res.redirect("/login");
}
  
});

app.post("/create-product", upload.single("photo"), cleanUpData, async (req, res) => {
  let newProduct = new Product({
    name: req.cleanData.name,
    price: req.cleanData.price,
    description: req.cleanData.description
  });
  if(req.file){
    const photoFileName = `${Date.now()}.jpg`;
    await sharp(req.file.buffer).resize(844, 456).jpeg({quality: 60}).toFile(path.join("public", "uploaded-photos", photoFileName));
    req.cleanData.photo = photoFileName;
    newProduct.photo = req.cleanData.photo;
  }
  newProduct.save();

});

app.delete("/product/:id", async (req, res) => {
  if(typeof req.params.id != "string") req.params.id = ""
  const doc = await Product.findOne({_id: req.params.id})

  if(doc.photo){
    fse.remove(path.join("public", "uploaded-photos", doc.photo))
  }
  await Product.deleteOne({_id: req.params.id})
});

function cleanUpData(req, res, next){
  if(typeof req.body.name != "string") req.body.name = "";
  if(typeof req.body.price != "string") req.body.price = "";
  if(typeof req.body.description != "string") req.body.description = "";
  if(typeof req.body._id != "string") req.body._id = "";

  req.cleanData = {
    name: sanitizeHTML(req.body.name.trim(), {allowedTags: [], allowedAttributes: {}}),
    price: sanitizeHTML(req.body.price.trim(), {allowedTags: [], allowedAttributes: {}}),
    description: sanitizeHTML(req.body.description.trim(), {allowedTags: [], allowedAttributes: {}})
  }
  next();
}

app.listen(3002, () => {
    console.log("Server running on port 30002");
});