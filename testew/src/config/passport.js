const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('./db');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
          return done(null, false, { message: 'No user found' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    pool.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) throw err;
      done(err, results[0]);
    });
  });
};
