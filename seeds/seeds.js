const sequelize = require('../config/connection');
const { User, BlogPost, Comment  } = require('../models'); // Replace with your actual model paths
const bcrypt = require('bcrypt');
// const userData = require('./userData.json');
// const postData = require('./postData.json');
// const commentData = require('./commentData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   const blogpost = await BlogPost.bulkCreate(postData, {
//     individualHooks: true,
//     returning: true,
//   });

//   const comments = await Comment.bulkCreate(commentData, {
//     individualHooks: true,
//     returning: true,
//   });

//   process.exit(0);
// };

// seedDatabase();
const seedDatabase = async () => {
  // Sync the models with the database
  await sequelize.sync({ force: true });

  // Seed users
  const hashedPassword = await bcrypt.hash('password123', 10); // Change this to your desired default password
  const users = await User.bulkCreate([
    { name: 'jon', email: 'alias@mail.co', username: 'user1', password: hashedPassword },
    { name: 'gary', email: 'aliaz@mailz.com', username: 'user2', password: hashedPassword },
  ]);

  // Seed posts
  const posts = await BlogPost.bulkCreate([
    { title: 'First Post', content: 'This is the content of the first post.', userId: users[0].id },
    { title: 'Second Post', content: 'This is the content of the second post.', userId: users[1].id },
  ]);

  // Seed comments
  await Comment.bulkCreate([
    { text: 'Great post!', userId: users[1].id, postId: posts[0].id },
    { text: 'Nice content!', userId: users[0].id, postId: posts[1].id },
  ]);

  console.log('Database seeded successfully.');

  // Close the Sequelize connection
  sequelize.close();
};
seedDatabase();
// Run the seed function