const sequelize = require('../config/connection');
const Blogpost = require('../models/Blogpost')
const Comment = require('../models/Comments')
const Users = require('../models/Comments')

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Users = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const BlogPost = await Blogpost.bulkCreate(blogPostData, {
    individualHooks: true,
    returning: true,
  });

  const Comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();