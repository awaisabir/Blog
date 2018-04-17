// Posts Model
import mongoose from 'mongoose';
import User from './User';
import Comment from './Comment';
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    user_id: {type: ObjectId, ref: 'User', required: true},
    username: {type: String, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now(), required: true},
    editedAt: {type: Date, default: Date.now(), required: true},
    edited: {type: Boolean, default: false},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    categories: {type: Array, required: true},
    locked: {type: Boolean, default: false},
    content: {type: String, required: true},
    heading: {type: String, required: true},
    thumbnail: String,
    liked: [{type: ObjectId, ref: 'User'}],
    comments: [{type: ObjectId, ref: 'Comment'}]
});

export const Post = mongoose.model('Post', PostSchema);

export const getPosts = (page, heading, order, categories, callback) => {
  let skip = 0;
  let query = {};
  let sort = {_id: -1};

  if (page > 1)
    skip = (page*10) - 10;
  
  if (heading) {
    query.heading = {$regex: RegExp(`${heading}`), $options: 'i'};
  }

  if (categories) {
    let tempArray = categories.split(',');
    query.$and = [];
    for (let category of tempArray) {
      let structure = {
        categories: {$in : [`${category}`]}
      };

      query.$and.push(structure);
    }
  }

  if (order === 'asc') 
    sort = {_id: 1};

  Post.count(query, (err, total) => {
    Post.find(query).sort(sort).skip(skip).limit(10).exec((err, posts) => {
      if(err) {
        callback(err, null);
      }
      
      else {
        const results = {total, posts};
        callback(null, results);
      }
    });
  });
};

export const getPostById = (id, callback) => {
  Post.findById(id, callback);
};

export const createPost = (post, callback) => {
  post.save(callback);
};

export const deletePost = (id, callback) => {
  Post.findByIdAndRemove(id, callback);
}

export const updatePost = (id, updates, callback) => {
  let query = {};
  query.$set = {};

  let { heading, content, category, liked, userId } = updates;

  if (heading !== undefined) query.$set.heading = heading;
  if (content !== undefined) query.$set.content = content;
  if (category !== undefined) query.$set.category = category;
  if (liked) {
    query.$push = {};
    query.$push.liked = userId;

    query.$inc = {};
    query.$inc.likes = 1;
  }
  

  query.$set.edited = true;
  query.$set.editedAt = Date.now();

  Post.findByIdAndUpdate(id, query, {new: true}, (err, post) => {
    if (err)
      callback(err, null);

    callback(null, post);
  });
}