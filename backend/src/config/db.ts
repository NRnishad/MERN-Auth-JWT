import mongoose from 'mongoose'
import {MONGO_URI} from '../constants/env'
import e from 'express';

const connnectToDAtabase = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to database", error);
  process.exit(1);
    }
    }

    export default connnectToDAtabase;