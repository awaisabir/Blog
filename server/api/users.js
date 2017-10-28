import express from 'express';
import passport from 'passport';
import * as User from '../models/User';

const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;

  User.getUserById(id, (err, user) => {
    if (err)
      return res.json({success: false, message: 'Something went wrong! Please try again later ...'});
  
    if (!user)
      return res.json({success: false, message: 'User does not exist'});

    return res.json({success: true, user});
  });
});

router.get('/', (req, res) => {
  const { username } = req.query;

  User.getUserByUsername(username, (err, user) => {
    if (err)
      return res.json({success: false, message: 'Something went wrong! Please try again later ...'});
    
    if (!user)
      return res.json({success: false, message: 'Username does not exist'});
 
    return res.json({success: true, user});
  });
});

export default router;

/** GET all users (paginated) */