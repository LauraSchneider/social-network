const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const db = require('./db');
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const bcrypt = require('bcryptjs');

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
//
// const checkForLogin = function(req,res,next) {
//     if(req.session.user) {
//         next();
//
//     } else {
//         res.redirect('/');
//     }
// };
//






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
    return new Promise((resolve, reject) =>{
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
                console.log("not results", !results);
                console.log("results", results);
                res.json({success: true});
            }).catch(err => {
                console.log( err);
                res.json({success: false, errorMessage: "Invalid email!"});
            });
        });
    }
});

app.post('/login',(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, errorMessage: "Please enter your password and email."});
    } else {
        db.checkCredentials(req.body.email).then(results=> {
            checkPassword(req.body.password, results.rows[0].hash).then(doesMatch => {
                if (doesMatch) {
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

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, () => {
    console.log("I'm listening.");
});
