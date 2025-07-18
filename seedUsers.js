const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    const users = [
      'Rahul', 'Kamal', 'Sanak', 'Anjali', 'Neha',
      'Amit', 'Tanya', 'Ravi', 'Pooja', 'Arjun'
    ];

    // Remove existing users to avoid duplicates
    await User.deleteMany({});

    // Insert new users
    const userDocs = users.map(name => ({ username: name }));
    await User.insertMany(userDocs);

    console.log("✅ Users seeded successfully");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Error seeding users:", err);
  });
