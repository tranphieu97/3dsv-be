import passport from 'passport';
import express from 'express';
import '../services/passport-google-service';
import { appHost } from 'config';

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect(`${appHost}`);
  }
);

export default router;
