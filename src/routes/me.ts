import express from 'express';

const router = express.Router();

router.get('/api/me', (req, res) => {
  res.send(req.user);
});

export default router;
