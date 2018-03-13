const spicedPg = require("spiced-pg");
const {dbUser, dbPass} = require('./secrets.json');
const db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/socialnetwork`);
const bcrypt = require('bcryptjs');

function insertUserInfo(first, last, email, password) {
    return new Promise((resolve, reject) => {
        const q =`INSERT INTO users (first, last, email, hash) VALUES ($1, $2, $3, $4) RETURNING id`;
        const params = [first, last, email, password];
        db.query(q, params).then(results => {
            console.log("RESULTS", results.rows[0]);
            resolve(results.rows[0]);
        }).catch(err => {
            reject(err);
        });
    });
}

function hashPassword(plainTextPassword) { //for registration
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            // console.log(salt);
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                // console.log(hash);
                resolve(hash);
            });
        });
    });
}

module.exports = {
    insertUserInfo,
    hashPassword,
};
