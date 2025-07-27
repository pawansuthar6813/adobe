import mongoose from 'mongoose';

const connectDb = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
}

export default connectDb;