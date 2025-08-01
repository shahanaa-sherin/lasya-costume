import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'; // ✅ FIXED
import { fileURLToPath } from 'url';
import costumeRoutes from './routes/costume.js'; // ✅ include .js






const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log("🔍 Loaded MONGO_URL from .env:", process.env.MONGO_URL);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors()); // ✅ put CORS before the routes
app.use(express.json()); 
app.use('/api/costumes', costumeRoutes);
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')))



// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
console.log("🗂 Serving static files from:", path.join(process.cwd(), 'uploads'));



// Connect to DB
mongoose.connect(MONGO_URL).then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("❌ MongoDB connection error:", error); 
});
