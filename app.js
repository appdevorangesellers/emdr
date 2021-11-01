const express = require('express');
const http = require('http');
var cors = require('cors');
const app = express();
var env = require('dotenv').config();
const bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
var xss = require("xss");
const cookieParser = require("cookie-parser");
const assert = require("assert");
var crypto = require("crypto");
resetId = crypto.randomBytes(16).toString('base64');
resetIdss = crypto.randomBytes(8).toString('base64');
resetIdEscaped = encodeURIComponent(resetId);
const passport = require('passport');
const passportHash = require('passport-hash');
var server = http.createServer(app);
const bcrypt = require('bcrypt');
var LocalStrategy = require("passport-local").Strategy;
var passportLocalMongoose = require("passport-local-mongoose");
const nodemailer = require('nodemailer');
var flash = require('express-flash');
var async = require('async');
var xoauth2 = require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');
const redis = require('redis');
const {
  RateLimiterRedis
} = require('rate-limiter-flexible');
var MongoStore = require('connect-mongo');
var Schema = mongoose.Schema;
var fs = require('fs');
var request = require('request');
const fetch = require("isomorphic-fetch");
const io = require('socket.io')(server);
const rateLimit = require("express-rate-limit");
const listEndpoints = require('express-list-endpoints')





// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

const isAuth = (req, res, next) => {
  if(req.session.isAuth){
    next()
  }else{
    res.redirect('/loginofficial');
  }
}


const {
  ExpressPeerServer
} = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const {
  createMollieClient
} = require('@mollie/api-client');
const {
  v4: uuidV4
} = require('uuid')
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;
global.document = new JSDOM('html').window.document;
const ejs = require('ejs');
var uuid = require("uuid");
var idGen = uuid.v4();
const mollieClient = createMollieClient({
  apiKey: 'test_8fJxAgju3T7FjhkaGERFR8MPQa58FQ'
});
// var helmet = require('helmet')
const socketio = require('socket.io')

const { generatemsg, generateLocation } = require('./public/src/utils/messages')
const { addUser, removeUser, getUser, getUserInRoom } = require('./public/src/utils/users')

io.on("connection", (socket) => {
    console.log("new connection")
socket.on("join", ({ username, room }, cb) => {
const { error, user } = addUser({ id: socket.id, username, room })
if (error) {
            return cb(error)
        }
        socket.join(user.room)
        socket.emit("message", generatemsg("Admin ,Welcome"))
        socket.broadcast.to(user.room).emit("message", generatemsg(`Admin ${user.username} has joined!`))
io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUserInRoom(user.room)
        })
        cb()
    })
socket.on("sendMessage", (msg, cb) => {
        const user = getUser(socket.id)
        io.to(user.room).emit("message", generatemsg(user.username, msg))
        cb()
    })
socket.on("sendLocation", (location, cb) => {
        const user = getUser(socket.id)
        console.log(user)
        io.to(user.room).emit("locationurl", generateLocation(user.username, `https://www.google.com/maps?q=${location.latitude},${location.longitude}`))
        cb()
    })
//connection drop
socket.on("disconnect", () => {
        const user = removeUser(socket.id)
        console.log(user)
        if (user) {
            io.to(user.room).emit("message", generatemsg(`Admin ${user.username} A user  has left`))
io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUserInRoom(user.room)
            })
        }
})
})

let ts = new Date();

let hours = ts.getHours();
let minutes = ('0' + ts.getMinutes()).slice(-2);
let seconds = ('0' + ts.getSeconds()).slice(-2);

let timeTotal = hours + ":" + minutes + ":" + seconds;
console.log(timeTotal)


console.log(Math.floor(ts / 1000));

// passport.use(new LocalStrategy(function(username, password, done) {
//   User.findOne({ username: username }, function(err, user) {
//     if (err) return done(err);
//     if (!user) return done(null, false, { message: 'Incorrect username.' });
//     user.comparePassword(password, function(err, isMatch) {
//       if (isMatch) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//     });
//   });
// }));
//
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

const apiLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 7,
  message: "Too Many Request from your account please try again after 24 hours",
  handler: function(req, res) {
    res.render('routelimit');
  },
});


// app.use(helmet());
// app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));



// app.all(['*package.json*', '*bower.json*', '*README.md*', '*Public/**'], function(req, res, next) {
//   res.send({
//     auth: false
//   });
// })





// mongoose.connect('mongodb+srv://emdr:emdrdb@cluster0.hty64.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
mongoose.connect('mongodb://localhost:27017/emdradmin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');

  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});


const oneDay = 1000 * 60 * 60 * 24;


// var sessionMW = session({
//     secret: "workhardplayhard",
//     cookie: {
//         maxAge: new Date(Date.now() + 3600), // 1 hour
//         httpOnly: true,
//         secure: true,
//     },
//     store: MongoStore.create({
//       mongoUrl: 'mongodb://localhost:27017/emdradmin'
//     }),
//     resave: false,
//     saveUninitialized: false
// });

app.use(session({
  secret: 'work hard play hard',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1*60*60*1000
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/emdradmin'
  })
}));


app.use(flash());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

// app.use(function (req, res, next) {
//   var err = new Error('File Not Found');
//   err.status = 404;
//   next(err);
// });


console.log(listEndpoints(express));





// setTimeout(function() {
//   mongoose.connect('mongodb://localhost:27017/emdrapp', {useNewUrlParser: true});
// }, 80000);

// userSchema = new Schema( {
//
// 	unique_id: Number,
// 	email: String,
// 	username: String,
// 	password: String,
// 	passwordConf: String
// }),
// User = new mongoose.model('User', userSchema);



const userSchema = {

  unique_id: Number,
  email: String,
  username: String,
  password: String,
  passwordConf: String,
  active: Boolean,

}












//   user: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   resetPasswordToken: String,
//   resetPasswordExpires: Date,
//
//
// };

  var rand,host,link;
  rand= crypto.randomBytes(20).toString('hex');

  link="http://localhost:3000/verify?id="+rand;
  links = "http://localhost:3000/resetpassword?id="+rand;

var randString = () => {
  var len = 22
  let randStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < len; i++) {
    var ch = (Math.floor(Math.random() * (75800000 - 59438709)) + 59438709);
    randStr += ch
  }
  return randStr
  console.log(randStr);
}

const sendEmail = (email, uniqueString) => {
  var Transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "ravinthiran@ofoundation.nl",
      pass: "Nodedoodle@doodle1407"
    },
    from: 'ravinthiran@ofoundation.nl'
  });

  var mailOptions;
  let sender = "your_name";
  mailOptions = {
    from: sender,
    to: email,
    subject: "Email Confirmation Emdr Meeting account",
    html: "<p>Dear " + email + " </p><p>Thank you for creating an EMDR Meeting account! To welcome you we have added 3 tokens to your account.</p><p>Please click on the following link, to confirm your account: " +link+ "</p><p>When you have confirmed your account, you can log in with your username and password and immediately start using the EMDR Meeting app.</p><p>The confirmation link will remain valid for 1 hour. When the link is expired, you can simply create an account again by clicking on the following link: http://localhost:3000/users/register.</p><div>Kind regards,</div><p>The EMDR Meeting team</p><span><p>For questions: support@emdrmeeting.com</p></span><span><p>Frequently asked questions: https://emdrmeeting.com/nl/online-emdr-nl/#FAQ</p></span><span><p>Instruction video: https://youtu.be/X4IkRyrKPzI</p></span>"
  };

  Transport.sendMail(mailOptions, function(error, response) {
    // err ? res.json(res.status(400).json("Error " + err)) : res.json("Email sent.");
    if (error) {
      console.log(error);
    } else {
      console.log("message sent")
    }
  });

}


var User = new mongoose.model("User", userSchema);

// userSchema.pre('save', async function(next) {
//   try {
//       if (!this.isModified("password")) {
//         return next();
//       }
//       let hashedPassword = await bcrypt.hash(this.password, 10);
//       this.password = hashedPassword;
//       return next();
//   } catch (err) {
//       return next(err);
//  }
//
// })


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');

})

app.get('/verify',function(req,res){
console.log(req.protocol+"://localhost:3000");
if((req.protocol+"://localhost:3000")==("http://localhost:3000"))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("Email Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        res.end("Bad Request");
    }
}
else
{
    res.end("Request is from unknown source");
}
});


app.get('/loginofficial', apiLimit, function(req, res, next) {
  res.sendFile(__dirname + '/public/loginofficial.html');
});

app.post("/loginofficial", apiLimit, function (req, res) {
  const resetIds = crypto.randomBytes(16).toString('base64');
  const username = req.body.emmil;
  const password = req.body.paad;

  User.findOne({
    email: req.body.emmil
  }, function(err, user) {
    if (!user) {
      res.redirect('/');
    }
    bcrypt.compare(password, user.password, (err, data) => {

      if (data) {
        // res.render('home', {
        //   id: resetIds
        // });
        res.redirect('/home?id='+rand);
      } else {
        res.redirect('/loginofficial');
      }

    });
  });
  req.session.isAuth = true;
});


// app.post('/loginofficial', function (req, res) {
// 	console.log(req.body);
// 	User.findOne(req.body.emmil), function(err, user){
//     console.log('User found ');
//         if(err) {
//           console.log('THIS IS ERROR RESPONSE')
//           res.json(err)
//         }
//         if (user && user.password === req.body.paad){
//           console.log('User and password is correct')
//           res.json(user);
//           res.sendFile(__dirname + '/public/home.html')
//         } else {
//           console.log("Credentials wrong");
//           res.json({data: "Login invalid"});
//         }
// 	}
// })


// app.get('/loginofficial/:uniqueString', async (req, res) => {
//   const {uniqueString} = req.params
//   const user = await User.findOne({uniqueString: uniqueString})
//   if(user){
//     user.isValid = true
//     await user.save()
//     res.sendFile(__dirname + '/public/loginofficial.html')
//   }
//     else{
//       res.json("user not found")
//     }
// })
//
// app.post("/loginofficial", function(req,res){
//   const username = req.body.emmil;
//   const password = req.body.paad;
//
//
//   User.findOne({username: req.body.username, password: req.body.password}, function(err, user){
//         if(err) {
//             console.log(err);
//         }
//         else if(user){
//             res.redirect('/home');
//         }
//         else {
//             console.log('Invalid');
//         }
//     });
//
//
// });

app.get("/get-all-routes", (req, res) => {
  let get = app._router.stack.filter(r => r.route && r.route.methods.get).map(r => r.route.path);
  let post = app._router.stack.filter(r => r.route && r.route.methods.post).map(r => r.route.path);
  res.send({ get: get, post: post });
  // console.log("get:"  + get);
  // console.log("Post:" + post);
  // console.log("fetch:" + fetch);
});



app.get('/users/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
  // res.redirect(`/public/register.html/${uuidV4()}`)
})

// app.post("/users/register", async (req, res, next) => {
//
//     console.log(req.body);
//     var personInfo = req.body;
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(personInfo.pwd, salt);
//     console.log(salt);
//     console.log(hashedPassword);
//     const uniqueString = randString();
//     const isValid = false;
//
// if(!personInfo.eml || !personInfo.password || !personInfo.passwordConf){
//   res.send();
// } else {
//   if (personInfo.password == personInfo.passwordConf) {
//
//     User.findOne({email:personInfo.eml},function(err,data){
//       if(!data){
//         var c;
//         User.findOne({},function(err,data){
//
//           if (data) {
//             console.log("if");
//             c = data.unique_id + 1;
//           }else{
//             c=1;
//           }
//
//           var newPerson = new User({
//             unique_id:c,
//             email:personInfo.eml,
//             password: personInfo.password,
//             passwordConf: personInfo.passwordConf
//           });
//
//           newPerson.save(function(err, Person){
//             if(err)
//               console.log(err);
//             else
//               console.log('Success');
//           });
//
//         }).sort({_id: -1}).limit(1);
//         res.sendFile(__dirname + '/public/welcomeregistration.html');
//       }else{
//         res.send({"Success":"password is not matched"});
//       }
//
//     });
//   }else{
//     res.send({"Success":"password is not matched"});
//   }
// }
// sendEmail(personInfo.eml)
// });

app.post("/users/register", apiLimit, async (req, res, next) => {

  const response_key = req.body["g-recaptcha-response"];

  const secret_key = "6LdDf5ocAAAAAI-SgSng9yBfBWhJEysaAbehgGZF";


  const url =
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;


  fetch(url, {
      method: "post",
    })
    .then((response) => response.json())
    .then((google_response) => {


      if (google_response.success == true) {

        return res.sendFile(__dirname + '/public/welcomeregistration.html');
      } else {


          return res.sendFile(__dirname + '/public/welcomeregistration.html');

      }
    })
    .catch((error) => {

      return res.json({
        error
      });
    });




  // const salt = await bcrypt.genSalt();
  // const hashedPassword = await bcrypt.hash(req.body.pwd, salt);
  // console.log(salt);
  // console.log(hashedPassword);
  // const uniqueString = randString();
  // const isValid = false;
  //
  // newUser = new User({
  //   isValid,
  //   uniqueString,
  //   email: req.body.eml,
  //   password:hashedPassword
  // });
  //
  // console.log(newUser);
  //
  // newUser.save(function(err){
  //   if(!err){
  //     res.sendFile(__dirname + '/public/welcomeregistration.html');
  //   }
  //
  //   else{
  //       console.log(err);
  //     }
  // })

  User.findOne({
      $or: [{
        email: req.body.eml
      }]
    }).then(user => {
      if (user) {
        let errors = {};
        if (user.email === req.body.emil) {
          errors.email = "Email already exists";
        } else {
          errors.email = "Email already exists";
        }
        return res.status(400).json(errors);
      } else {
        const newUser = new User({

          email: req.body.eml,
          password: req.body.pwd
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(res.sendFile(__dirname + '/public/welcomeregistration.html'))
              .catch(err => console.log(err));
          });
        });
        sendEmail(newUser.email)
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });





});



app.get('/users/register/nl', function(req, res) {
  res.sendFile(__dirname + '/public/registerdutch.html')
})

app.post("/users/register/nl", apiLimit, function(req, res, next) {
  const newUsers = new User({
    user: req.body.emal,
    password: req.body.pawd
  });

  console.log(newUsers);

  newUsers.save(function(err) {
    if (!err) {
      res.sendFile(__dirname + '/public/welcomeregistration.html');
    } else {
      console.log(err);
    }
  });
});




// app.post("/users/register", async (req, res) => {
//   const email = req.body.eml;
//   const password  = req.body.pwd;
//   try {
//     const user = await userService.addUser(email, password);
//     res.status(201).json(user);
//     res.sendFile(__dirname + '/home.html');
//   } catch (err) {
//     res.status(401).json({ error: err.message });
//   }
// });
//
// app.post("/videsession", async (req, res) => {
//   const email = req.body.eml;
//   const password  = req.body.pwd;
//   try {
//     const user = await userService.authenticate(email, password);
//     res.json(user);
//   } catch (err) {
//     res.status(401).json({ error: err.message });
//   }
// });

var r = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);



app.get('/home', isAuth, (req, res) => {
  // res.sendFile(__dirname + '/public/home.html');
  res.render('home', {
    id: resetId
  });
})

app.post('/home', apiLimit, function(req, res, next) {
  const resetIds = crypto.randomBytes(16).toString('base64');
  const tokens = req.body.token;
  if (resetIds != null) {
    // res.sendFile(__dirname + '/public/videolayernew.html');
    res.redirect('/videosession/videolayernew')
  } else {
    res.send("Inavlid Token");
  }
})

app.get('/subscription', isAuth, (req, res) => {
  // const orderId =  new Date().getTime();
  res.render('subscription', {
    dat: timeTotal
  });
  // res.render('subscription', {pay:orderId})
})

app.post('/subscription', (req, res) => {
  // const orderId =  new Date().getTime();

  const emailPayment = req.body.emailpayment;
  let transporters = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ravinthiran@ofoundation.nl',
      pass: 'Nodedoodle@doodle1407'
    }
  });
  //     ejs.renderFile(__dirname + "/paymentinvoice.ejs", { dat: timeTotal }, function (err, data) {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //     let mailOptions = {
  //         from: '"EMDR Payment Invoice" <support@emdrmeeting.com>',
  //         to: 'ravinthiran@ofoundation.nl',
  //         subject: "Your EMDR Meeting Account - Payment Invoice",
  //         html: data
  //
  //
  //
  //     };
  //
  //     transporters.sendMail(mailOptions, (error, info) => {
  //         if (error) {
  //             return console.log(error);
  //         }
  //         console.log('Message  sent: ', info.messageId, info.response);
  //             res.redirect('subscription');
  //         });
  //
  //     // res.render('invoicerequest');
  //     // res.render('subscription', {pay:orderId})
  // }

  ejs.renderFile(__dirname + "/views/paymentinvoice.ejs", {
    dat: timeTotal,
    invoice: req.body.emailpaymentID,
    email: req.body.emailpayment,
    sub: req.body.subscriptionpackage,
    doc: idGen
  }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var mainOptions = {
        from: '"EMDR Payment Invoice" <support@emdrmeeting.com>',
        to: 'ravinthiran@ofoundation.nl',
        subject: "Your EMDR Meeting Account - Payment Invoice",
        html: data
      };
      //console.log("html data ======================>", mainOptions.html);

      transporters.sendMail(mainOptions, function(err, info) {
        if (err) {
          return console.log(error);
        } else {
          console.log('Message  sent: ', info.messageId, info.response);
          res.render('paymentinvoice', {
            dat: timeTotal,
            invoice: req.body.emailpaymentID,
            email: req.body.emailpayment,
            sub: req.body.subscriptionpackage,
            doc: idGen
          });
        }
      });
    }
  });



});

app.get('/paymentinvoice', isAuth, (req, res) => {
  // const orderId =  new Date().getTime();
  res.render('paymentinvoice', {
    dat: timeTotal
  });
  // res.render('subscription', {pay:orderId})
})



app.get('/account/newords', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/account.html')
})


app.get('/supporticket', isAuth, (req, res) => {
  res.render('supportticket')
})

// app.get('/emdrvideomeet', isAuth, (req, res) => {
//   res.sendFile(__dirname + '/public/emdrvideomeet.html');
// })




app.post('/supportticket', function(req, res){

  const ticketEmail = req.body.tickemail;
  const ticketOption = req.body.tickdrop;
  const ticketMode = req.body.tickmode;
  const ticketID = ticketEmail + idGen + ticketOption + resetId;
  const ticketMessage = req.body.tickmessage;
  let transporters = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ravinthiran@ofoundation.nl',
      pass: 'Nodedoodle@doodle1407'
    }
  });
  let mailOptions = {
    from: '"Emdrmeeting support ticket confirmation" <support@emdrmeeting.com>',
    to: req.body.tickemail,
    subject: "Your Emdrmeeting support ticket confirmation",
    html: "<p>Dear " + ticketEmail + " </p><p>Your Emdrmeeting support ticket was confirmed</p><p> We will repsond to your case soon</p><p> Below you can find your Sales related Ticket Details name: </p><p><strong> Your TiketID: </strong>" + ticketID + "<p><strong> Ticket Option: </strong>" + ticketOption + "<p><strong> Ticket Mode : </strong>" + ticketMode + "<p><strong> Your Ticket Message : </strong>" + ticketMessage + "<div>Kind regards,</div><p>The EMDR Meeting team</p><span><p>For questions: support@emdrmeeting.com</p></span><span><p>Frequently asked questions: https://emdrmeeting.com/nl/online-emdr-nl/#FAQ</p></span><span><p>Instruction video: https://youtu.be/X4IkRyrKPzI</p></span>"


  };

  transporters.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message  sent: ', info.messageId, info.response);
    res.redirect('/home');
  });
})




app.get('/account', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/account.html');
})

app.post('/account', apiLimit, function(req, res) {


  userSchema.pre('findOneAndUpdate', function(next) {
    const currentPassword = req.body.currentpassword;
    const userPassword = req.body.userpassword;
    const confirmPassword = req.body.passwordconfirmation;

  })

})

app.get('/recentactivity', isAuth, (req, res) => {
  // res.sendFile(__dirname + '/public/recentactivity.html')
  User.findOne({}, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.render('recentactivity', {
        users: resetIdss,
        id: resetId,
        dat: timeTotal
      });
    }
  })
})

app.get('/contact', isAuth, (req, res) => {
  res.render('contact');
})

app.get('/shop', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/shop.html');
})


app.get('/ticketlogin', (req, res) => {
  res.render('ticketlogin');
})

app.get('/ticketregister', (req, res) => {
  res.render('ticketregister');
})

app.get('/tickets', (req, res) => {
  res.render('tickets');
})

app.get('/vremdr', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/vremdr.html');
})

app.get('/vremdr/app/shop', isAuth, (req,res)=>{
  res.sendFile(__dirname + '/public/vremdrshop.html')
})

app.get('/vremdrforest', isAuth, (req,res)=>{
  res.render('vremdrforest')
})

app.get('/vremdrmountain', isAuth, (req,res)=>{
  res.render('vremdrmountain')
})

app.get('/vremdrnoon', isAuth, (req,res)=>{
  res.render('vremdrnoon')
})

app.get('/vremdrsnow', isAuth, (req,res)=>{
  res.render('vremdrsnow')
})

app.get('/vremdrpicture', isAuth, (req,res)=>{
  res.render('vremdrpicture')
})




app.get('/session', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
})

app.get('/inbox', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/gmail.html');
})

app.get('/chat', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/chatindex.html');
})

// app.get('/chatrooms', (req, res) => {
//     res.sendFile(__dirname + '/public/chat.html')
// })
//
// app.post('/chatrooms', (req, res) => {
//     res.sendFile(__dirname + '/public/chat.html')
// })

app.post('/chat', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html')
})

app.get('/chat/logout', isAuth, (req, res) => {
  req.session.destroy()
  res.redirect('/')
  console.log("Chat successfully logged out");
})


app.get('/users/resetpassword', (req, res) => {
  res.sendFile(__dirname + '/public/passwordreset.html');
})


// app.post('/users/resetpassword', (req, res) => {
//   async.waterfall([
//     function(done) {
//       User.findOne({ userEmail: req.body.email, resetPassword: req.body.password, resetPasswordConf: req.body.passwordConf}, function(err, user) {
//         if (!user) {
//           req.flash('error', 'Password reset token is invalid or has expired.');
//           return res.redirect('back');
//         }
//
//         user.userEmail = req.body.email;
//         user.resetPassword = req.body.password;
//         user.resetPasswordConf = req.body.passwordConf;
//
//
//         user.save(function(err) {
//           req.logIn(user, function(err) {
//             done(err, user);
//           });
//         });
//       });
//     },
//     function(user, done) {
//       var smtpTransport = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//           user: 'ravinthiran@ofoundation.nl',
//           pass: 'Nodedoodle@doodle1407'
//         }
//       });
//       var mailOptions = {
//         to: user.email,
//         from: 'passwordreset@emdrmeeting.com',
//         subject: 'Your password has been changed',
//         text: 'Hello,\n\n' +
//           'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
//       };
//       smtpTransport.sendMail(mailOptions, function(err) {
//         req.flash('success', 'Success! Your password has been changed.');
//         done(err);
//       });
//     }
//   ], function(err) {
//     res.redirect('/');
//   });
// })


app.get('/users/reset_password', (req, res) => {
  res.sendFile(__dirname + '/public/resetpassword.html')
})


app.get('/resetpasswords', (req, res) => {
  res.render('resetpasswords')
})



app.post('/users/reset_password', apiLimit, function(req, res) {
  const emailreset = req.body.emailuserreset;
  let transporters = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ravinthiran@ofoundation.nl',
      pass: 'Nodedoodle@doodle1407'
    }
  });
  let mailOptions = {
    from: '"Password Reset Emdr meeting" <support@emdrmeeting.com>',
    to: req.body.emailuserreset,
    subject: "Your EMDR Meeting Account Password Reset",
    html: "<p>Dear " + emailreset + " </p><p>You can reset your password by clicking on the following link:"+links+"</p><p>This link is valid for 1 hour.</p><p>If you did not request a new password, you can ignore this email.</p><div>Kind regards,</div><p>The EMDR Meeting team</p><span><p>For questions: support@emdrmeeting.com</p></span><span><p>Frequently asked questions: https://emdrmeeting.com/nl/online-emdr-nl/#FAQ</p></span><span><p>Instruction video: https://youtu.be/X4IkRyrKPzI</p></span>"


  };

  transporters.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message  sent: ', info.messageId, info.response);
    res.redirect('/loginofficial');
  });
});







app.get('/resetpassword', (req, res) => {
  res.sendFile(__dirname + '/public/passwordreset.html');
})

app.post('/resetpassword', async(req, res) => {






  const { password, email } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.findOneAndUpdate({hashedPassword},{email})
    user.save()
      .then(() => res.redirect("/loginofficial"))
      .catch(err => res.status(400).json('Error: ' + err));
      console.log(hashedPassword)
      console.log(hashedPassword)


    console.log(user);
  }
  catch (err) {
  console.log(err)
    res.status(422).send({ error: err.message });
  }



});



app.get('/videonew', isAuth, (req, res) => {
  res.redirect(`/videonew/${uuidV4()}`)
})

app.get('/videonew/:room', isAuth, (req, res) => {
  res.render('room', {
    roomId: req.params.room
  })
})


app.get('/payments/confirmtos/silver', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/confirmtos.html')
})

app.get('/payments/confirmtos/gold', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/confirmtos6months.html')
})

app.get('/payments/confirmtos/platinum', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/confirmtos1year.html')
})

app.get('/payments/confirmtos/lifetime', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/confirmtoslifetime.html')
})

app.get('/aisupportchat', (req, res) => {
  res.render('aisupportchat')
})

app.get('/money', (req, res) => {
  res.render('money')
})




app.get('/admin/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/admindashboard.html')
})

app.get('/admin/logout', isAuth, (req, res) => {
  req.session.destroy();
  res.sendFile(__dirname + '/public/adminlogin.html');
  console.log("User successfully logged out");
})

app.get('/adminclientdetials', (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.render('adminclientdetials', {
        data: users,
        id: resetId,
        dat: timeTotal
      });
    }
  })
})

app.post('/adminclientdetials', function(req, res, err) {
  User.deleteOne({
    email: req.body.deleteuser
  }).then(function() {
    res.sendFile(__dirname + '/public/admindashboard.html');
    console.log("Data deleted");
  }).catch(function(error) {
    res.send(error);
  });
});

app.get('/admin/user/create', (req, res) => {
  res.sendFile(__dirname + '/public/adminuserreg.html')
})

app.post('/admin/user/create', async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.adminuserpassword, salt);
  console.log(salt);
  console.log(hashedPassword);
  const uniqueString = randString();
  const isValid = false;

  newUser = new User({
    isValid,
    uniqueString,
    email: req.body.adminuseremail,
    password: hashedPassword
  });

  console.log(newUser);

  newUser.save(function(err) {
    if (!err) {
      res.sendFile(__dirname + '/public/admindashboard.html')
    } else {
      console.log(err);
    }
  })
  sendEmail(newUser.email)
})

app.get('/admin/login', (req, res) => {
  res.sendFile(__dirname + '/public/adminlogin.html')
})

app.post('/admin/login', function(req, res, err) {
  const adminEmail = req.body.adminemail;
  const adminPassword = req.body.adminpassword
  if (adminEmail == "support@emdrmeeting.com" && adminPassword == "emdrmeeting@2021!") {
    res.sendFile(__dirname + '/public/admindashboard.html');
  } else {
    res.send("Invalid Login");
  }
  //   const resetIds = crypto.randomBytes(16).toString('base64');
  //   const username = req.body.adminemail;
  //   const password = req.body.adminpassword;
  //
  // User.findOne({email:req.body.adminemail}, function(err, user){
  //   if(!user){
  //     res.sendFile(__dirname + '/public/adminlogin.html');
  //   }
  //   bcrypt.compare(password, user.password, (err, data) => {
  //
  //     if(data){
  //       res.sendFile(__dirname + '/public/admindashboard.html');
  //     }
  //     else{
  //       res.sendFile(__dirname + '/public/adminlogin.html');
  //     }
  //
  // });
  // });
})


app.get('/adminippanel', (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.render('adminippanel', {
        data: users,
        id: resetId,
        dat: timeTotal
      });
    }
  })
})




app.get('/videosession/deelnemen', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/videootp.html')
})

app.get('/videosession', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/app.html');
})

app.get('/videolayeriframe', isAuth, (req, res) => {
  res.render('videolayeriframe');
})

// app.get('/admin', (req, res) => {
//     res.render('admin');
// })

app.get('/videosession/meeting/deelnemen', isAuth, (req, res) => {
  res.sendFile(__dirname + '/public/videootp.html');
})

app.get('/users/log_out', isAuth, (req, res) => {
  req.session.destroy()
  res.redirect('/')
  console.log("User successfully logged out")
})

app.get('/demo', (req, res) => {
  res.render('demo')
})





app.get('/videomeeting', isAuth, (req, res) => {
  res.redirect('http://localhost:3030/');
})

app.get('/meets', (req, res) => {
  res.render('meets');
})


app.get('/full', (req, res)=>{
  res.render('full')
})

app.get('/fullnew', (req, res)=>{
  res.render('fullnew')
})


app.get('/videosession/videolayernew', (req, res) => {
  res.sendFile(__dirname + '/public/videolayernew.html')
})

app.get('/demos', (req, res) => {
  res.render('demos')
})

app.get('/videosession/videolayer', (req, res) => {
  res.sendFile(__dirname + '/public/videolayer.html');
})

app.post('/videosession/meeting/deelnemen', apiLimit, (req, res) => {
  res.sendFile(__dirname + '/public/fullvideo.html');
})

app.post('/videosession/deelnemen', function(req, res) {
  const codeOtp = req.body.code;
  const randomnumber = document.getElementById('numbera');
  console.log(codeOtp);
  console.log(randomnumber);
  if (randomnumber == codeOtp) {
    res.send("Invalid Verification Code");

  } else {

    res.sendFile(__dirname + '/public/videolayernew.html');
  }


})

app.get('/vremdrshopfirst', isAuth, function(req, res){
  res.sendFile(__dirname + '/public/vremdrshop.html');
})


app.post('/vremdrshopsecond', (req, res)=>{
  const orderId = new Date().getTime();

  mollieClient.payments.create({
      amount: {
        value: '9.99',
        currency: 'EUR'
      },
      description: 'EMDR Meeting App Subscription Payment Test',
      redirectUrl: '  https://1a72-193-219-164-5.ngrok.io',
      webhookUrl: '  https://1a72-193-219-164-5.ngrok.io',
      metadata: {
        orderId
      },
    })
    .then(payment => {

      res.redirect(payment.getPaymentUrl());

    })
    .catch(error => {

      res.send(error);
    });
})



app.get('/vremdrshopsecond', isAuth, function(req, res){
  res.sendFile(__dirname + '/public/vremdrshop.html');
})


app.post('/vremdrshopsecond', (req, res)=>{
  const orderId = new Date().getTime();

  mollieClient.payments.create({
      amount: {
        value: '7.99',
        currency: 'EUR'
      },
      description: 'EMDR Meeting App Subscription Payment Test',
      redirectUrl: '  https://1a72-193-219-164-5.ngrok.io',
      webhookUrl: '  https://1a72-193-219-164-5.ngrok.io',
      metadata: {
        orderId
      },
    })
    .then(payment => {

      res.redirect(payment.getPaymentUrl());

    })
    .catch(error => {

      res.send(error);
    });
})

app.get('/vremdrshopthird', isAuth, function(req, res){
  res.sendFile(__dirname + '/public/vremdrshop.html');
})


app.post('/vremdrshopthird', (req, res)=>{
  const orderId = new Date().getTime();

  mollieClient.payments.create({
      amount: {
        value: '9.99',
        currency: 'EUR'
      },
      description: 'EMDR Meeting App Subscription Payment Test',
      redirectUrl: '  https://1a72-193-219-164-5.ngrok.io',
      webhookUrl: '  https://1a72-193-219-164-5.ngrok.io',
      metadata: {
        orderId
      },
    })
    .then(payment => {

      res.redirect(payment.getPaymentUrl());

    })
    .catch(error => {

      res.send(error);
    });
})


app.get('/vremdrshopfour', isAuth, function(req, res){
  res.sendFile(__dirname + '/public/vremdrshop.html');
})


app.post('/vremdrshopfour', (req, res)=>{
  const orderId = new Date().getTime();

  mollieClient.payments.create({
      amount: {
        value: '7.99',
        currency: 'EUR'
      },
      description: 'EMDR Meeting App Subscription Payment Test',
      redirectUrl: '  https://1a72-193-219-164-5.ngrok.io',
      webhookUrl: '  https://1a72-193-219-164-5.ngrok.io',
      metadata: {
        orderId
      },
    })
    .then(payment => {

      res.redirect(payment.getPaymentUrl());

    })
    .catch(error => {

      res.send(error);
    });
})

app.post('/payments/confirmtos/1month', (req, res) => {

  const orderId = new Date().getTime();

  mollieClient.payments.create({
      amount: {
        value: '15.00',
        currency: 'EUR'
      },
      description: 'EMDR Meeting App Subscription Payment Test',
      redirectUrl: '  https://1a72-193-219-164-5.ngrok.io',
      webhookUrl: '  https://1a72-193-219-164-5.ngrok.io',
      metadata: {
        orderId
      },
    })
    .then(payment => {

      res.redirect(payment.getPaymentUrl());

    })
    .catch(error => {

      res.send(error);
    });
})


app.post('/payments/confirmtos/6months', (req, res) => {
  const orderId = new Date().getTime();

  mollieClient.payments.create({
      amount: {
        value: '80.00',
        currency: 'EUR'
      },
      description: 'EMDR Meeting App Subscription Payment Test',
      redirectUrl: '  https://1a72-193-219-164-5.ngrok.io',
      webhookUrl: '  https://1a72-193-219-164-5.ngrok.io'
    })
    .then(payment => {

      res.redirect(payment.getPaymentUrl());
    })
    .catch(error => {

      res.send(error);
    });

})

app.post('/payments/confirmtos/1year', (req, res) => {
  const orderId = new Date().getTime();

  mollieClient.payments.create({
      amount: {
        value: '150.00',
        currency: 'EUR'
      },
      description: 'EMDR Meeting App Subscription Payment Test',
      redirectUrl: '  https://1a72-193-219-164-5.ngrok.io',
      webhookUrl: '  https://1a72-193-219-164-5.ngrok.io'
    })
    .then(payment => {

      res.redirect(payment.getPaymentUrl());
    })
    .catch(error => {

      res.send(error);
    });

})

app.post('/payments/confirmtos/lifetime', (req, res) => {
  const orderId = new Date().getTime();

  const payment = mollieClient.payments.create({
      amount: {
        value: '295.00',
        currency: 'EUR'
      },
      description: 'EMDR Meeting App Subscription Payment Test',
      redirectUrl: 'https://1a72-193-219-164-5.ngrok.io',
      webhookUrl: 'https://1a72-193-219-164-5.ngrok.io',
    })
    .then(payment => {

      res.redirect(payment.getPaymentUrl());
    })
    .catch(error => {

      res.send(error);
    });
});


// app.post('/onemonth', function(req, res){
//
// })

//   mollieClient.payments
//    .create({
//      amount: { value: '10.00', currency: 'EUR' },
//      description: 'New payment',
//      redirectUrl: 'http://localhost:3000',
//      webhookUrl: 'https://9c3d7805.ngrok.io/api/v1/payments/webhook',
//    })
//    .then(payment => {
//      // Redirect the consumer to complete the payment using `payment.getPaymentUrl()`.
//      res.status(201).json({
//           success: true,
//           data: payment,
//           checkoutUrl: payment.getCheckoutUrl(),
//    })
//    .catch(error => {
//      // Do some proper error handling.
//      res.send(error);
//    });
// })

function availableRoutes() {
  return app._router.stack
    .filter(r => r.route)
    .map(r => {
      return {
        method: Object.keys(r.route.methods)[0].toUpperCase(),
        path: r.route.path
      };
    });
}




const port = process.env.PORT || 3000;

// module.exports = app;


app.listen(port, () => {
  console.log('Server started on port: ${port}')
})
