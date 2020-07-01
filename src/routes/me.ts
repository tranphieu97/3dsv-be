import express from 'express';

const router = express.Router();

router.get('/api/me', (req, res) => {
  res.send(req.user);
});

router.get('/api/logout', (req, res) => {
  req.logOut();
  res.send();
});

export default router;
