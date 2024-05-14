const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {
  pool.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id], (err, results) => {
    if (err) throw err;
    res.render('index', { tasks: results });
  });
});

router.post('/add', ensureAuthenticated, (req, res) => {
  const { name } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ msg: 'Please enter a task' });
  }
  if (errors.length > 0) {
    pool.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id], (err, results) => {
      if (err) throw err;
      res.render('index', { tasks: results, errors });
    });
  } else {
    pool.query('INSERT INTO tasks (name, user_id) VALUES (?, ?)', [name, req.user.id], (err, results) => {
      if (err) throw err;
      req.flash('success_msg', 'Task added');
      res.redirect('/');
    });
  }
});

router.post('/delete/:id', ensureAuthenticated, (req, res) => {
  pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    req.flash('success_msg', 'Task removed');
    res.redirect('/');
  });
});

router.post('/complete/:id', ensureAuthenticated, (req, res) => {
  pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    const task = results[0];
    pool.query('UPDATE tasks SET completed = ? WHERE id = ?', [!task.completed, task.id], (err) => {
      if (err) throw err;
      req.flash('success_msg', 'Task updated');
      res.redirect('/');
    });
  });
});

module.exports = router;
