const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const db = require('./db');
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const bcrypt = require('bcryptjs');
const multer = require('multer');
const s3 = require('./config/s3');
const uidSafe = require('uid-safe');
const path = require('path');

//----------------BOILERPLATES---------------------------
if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({target: 'http://localhost:8081/'}));
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static(__dirname + "/public"));

app.use(cookieSession({
    secret: "a really hard to guess secret",
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

app.use(csurf());

app.use((req, res, next) => {
    res.cookie('mytoken', req.csrfToken());
    next();
});

app.use(bodyParser.json());

app.use(compression());

//
//to finish
// const checkForLogin = function(req,res,next) {
//     if(req.session.user) {
//         next();
//
//     } else {
//         res.redirect('/');
//     }
// };
//

// var diskStorage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, __dirname + '/uploads');
//     },
//     filename: function(req, file, callback) {
//         uidSafe(24).then(function(uid) {
//             callback(null, uid + path.extname(file.originalname));
//         });
//     }
// });
//
// const uploader = multer({
//     storage: diskStorage,
//     limits: {
//         fileSize: 2097152
//     }
// });

//
// app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
//
//     if (req.file) {
//         db.addImagesToBrowser(req.body.title, req.body.description, req.body.username, req.file.filename).then(results => {
//              console.log("RESULTS",results);
//             res.json({images: results[0]});
//         });
//     } else {
//
//         res.json({success: false});
//     }
// });

function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, (err, doesMatch) => {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
}

function hashPassword(plainTextPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((err, salt) => {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}

app.post('/registration', (req, res) => {
    if (!req.body.first || !req.body.last || !req.body.email || !req.body.password) {
        res.json({success: false, errorMessage: "Please fill out ALL fields."});
    } else {
        hashPassword(req.body.password).then(hash => {
            db.insertUserInfo(req.body.first, req.body.last, req.body.email, hash).then((results) => {
                console.log("REUSULTS HERE", results);
                req.session = {
                    id: results.id
                };
                console.log("not results", !results);
                console.log("results", results);
                console.log("SESSION", req.session);
                res.json({success: true});
            }).catch(err => {
                console.log(err);
                res.json({success: false, errorMessage: "Invalid email!"});
            });
        });
    }
});

app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, errorMessage: "Please enter your password and email."});
    } else {
        db.checkCredentials(req.body.email).then(results => {
            checkPassword(req.body.password, results.rows[0].hash).then(doesMatch => {
                if (doesMatch) {
                    req.session = {
                        id: results.rows[0].id
                    };
                    console.log("REQ.SESSION", req.session);
                    res.json({success: true});
                } else {
                    res.json({success: false, errorMessage: "Invalid password."});
                }
            }).catch(err => {
                console.log(err);
                res.json({success: false, errorMessage: "Please check your password."});
            });
        }).catch(err => {
            console.log(err);
            res.json({success: false, errorMessage: "Invalid email!"});
        })
    }
});

app.get('/user', (req, res) => {
    db.getUserInfo(req.session.id).then(results => {
        res.json({data: results.rows[0]})
        console.log("RESUTLS", results);
    })
})

// app.get('*', (req, res) => {
//     if (!req.session.user) {
//         res.redirect("/welcome");
//     } else {
//         res.sendFile(__dirname + '/index.html');
//     }
// });

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, () => {
    console.log("I'm listening.");
});
