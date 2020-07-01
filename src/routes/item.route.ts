import express from 'express';
import { Item } from '../models/item.model';

const router = express.Router();

router.get('/api/items', async (req, res) => {
  try {
    const data = await Item.find();
    console.log(data);
    res.send({
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(400);
  }
});

export default router;
