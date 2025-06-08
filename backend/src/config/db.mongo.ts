import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
const mongoDBConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI || 'mongodb://localhost:27017/mydatabase');
        console.log('MongoDB connection established successfully.');
        mongoose.connection.on('connected', () => {
            console.log('Mongoose default connection open');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose default connection error: ' + err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose default connection disconnected');
        });
        
       process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default mongoDBConnection;