// import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

// create associations

//User

User.hasMany(Post, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
    hooks: true,
});

//Comment

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
    hooks: true,
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL',
    hooks:true,
});
  
//Post

Post.belongsTo(User, {
  foreignKey: 'user_id',
  
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
  hooks: true,
});

module.exports = { User, Post, Comment };