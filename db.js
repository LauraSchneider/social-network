const spicedPg = require("spiced-pg");
const {dbUser, dbPass} = require('./config/secrets.json');
const db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/socialnetwork`);


function insertUserInfo(first, last, email, password) {
    return new Promise((resolve, reject) => {
        const q = `INSERT INTO users (first, last, email, hash) VALUES ($1, $2, $3, $4) RETURNING id`;
        const params = [first, last, email, password];
        db.query(q, params).then(results => {
            // console.log("RESULTS", results.rows[0]);
            resolve(results.rows[0]);
        }).catch(err => {
            reject(err);
        });
    });
}

function checkCredentials(email) {
    return new Promise((resolve, reject) => {
        const q = `SELECT hash, id FROM users WHERE email = $1`;
        const params = [email];
        db.query(q, params).then(results => {
            // console.log("HASH BACK", results);
            resolve(results);
        }).catch(err => {
            reject(err);
        });
    });
}

function getUserInfo(id) {
    return new Promise((resolve, reject) => {
        const q = `SELECT id, first, last, email, url FROM users WHERE id =$1`;
        const params = [id];
        db.query(q, params).then(results => {
            console.log("RRESULTS", results);
            resolve(results);
        }).catch(err => {
            reject(err);
        });
    });
}
module.exports = {
    insertUserInfo,
    checkCredentials,
    getUserInfo,
};
