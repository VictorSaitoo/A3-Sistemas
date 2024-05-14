const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const pool = require('../config/db');

router.get('/login', (req, res) => res.render('login'));

router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
  const { username, password, password2 } = req.body;
  let errors = [];

  if (!username || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', { errors });
  } else {
    pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        errors.push({ msg: 'Username already exists' });
        res.render('register', { errors });
      } else {
        const newUser = { username, password };
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            pool.query('INSERT INTO users SET ?', newUser, (err, results) => {
              if (err) throw err;
              req.flash('success_msg', 'You are now registered and can log in');
              res.redirect('/users/login');
            });
          });
        });
      }
    });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
