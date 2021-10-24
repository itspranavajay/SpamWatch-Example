const express = require('express');
const Pool = require('pg').Pool;
const moe = express();
const port = process.env.PORT || 5000

const { query } = require('./moe');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

const adminkey = ["Moe1234"];


moe.get('/', (req, res) => res.send('Hi'))

moe.get('/jail', (req, res)=> {
const lockup = req.query.lockup
pool.query('SELECT user_id, reason FROM gbans WHERE user_id=$1', [lockup])
    .then(result => res.send(result.rows))
    .catch(error => console.log(error))
});

moe.get('/ban', (req, res)=> {

const userid = req.query.userid
const name = req.query.name
const reason = req.query.reason
const apikey = req.query.apikey

if(adminkey.includes(apikey)) {

pool.query('INSERT INTO gbans(user_id, name, reason) VALUES ($1, $2, $3)', [userid, name, reason])
    .then(result => res.send(result.rows))
    .catch(error => console.log(error))
}
});

moe.get('/unban', (req, res)=> {

const userid = req.query.userid

const apikey = req.query.apikey

if(adminkey.includes(apikey)) {

pool.query('DELETE FROM gbans WHERE user_id=($1)', [userid])
    .then(result => res.send(result.rows))
    .catch(error => console.log(error))
}
})



moe.listen( port, () => {
    console.log(`Connected to port ${port}`)
} )
