import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
  console.log(`Can't connect to Mongoose`);
});

db.once('open', () => {
  console.log('Connected to Mongoose');
});

export default db;