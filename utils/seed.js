// call connection, models and data files
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { thoughts, users } = require('./data');

// Checks for error with connection
connection.on('error', (err) => err);

// Creates a connection to MongoDB
connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }
  
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  // Wait for the users and thoughts to be entered into the database
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // Log out table for users and thoughts and exits the connection
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});