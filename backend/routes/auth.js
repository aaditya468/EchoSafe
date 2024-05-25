// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


// @desc    Redirect to Dashboard after successful login
// @route   GET /dashboard
router.get('/dashboard', (req, res) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dashboard.html'));
  } else {
    res.redirect('/'); // Redirect to the home page if not authenticated
  }
});


// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard.html');
  }
);



// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});


module.exports = router;
