import dotenv from 'dotenv';
import mongoose from 'mongoose';

export async function connectToDatabase() {
    dotenv.config();
    const { DB_URI } = process.env;

    if (!DB_URI)
        throw new Error(
            'Please define the MONGO_URI and MONGO_DB_NAME environment variables inside .env'
        );

    await mongoose.connect(DB_URI);
    console.log('MongoDB connected successfully');
}
