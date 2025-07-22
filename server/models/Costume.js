// server/models/Costume.js
import mongoose from 'mongoose';

const costumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  size: String,
  price: Number,
  image: String,
  description: String,
  available: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

const Costume = mongoose.model('Costume', costumeSchema);

export default Costume;
