import mongoose from 'mongoose';
import { CustomError } from '../middlewares/errorHandler.js';

const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('DB Connected'))
        .catch(err => {
            console.log(err.message);
            throw new CustomError('Error connecting to the database');
        });
}

export default dbConnection;