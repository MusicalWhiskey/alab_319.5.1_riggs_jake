import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
  console.log(`Can't connect to Mongoose`);
});

db.once('open', () => {
  console.log('Connected to Mongoose');
});

export default db;