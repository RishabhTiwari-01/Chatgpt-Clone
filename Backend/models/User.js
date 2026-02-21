import mongoose from 'mongoose'; // <-- Pehle yahan 'require' tha, use 'import' kar diya

// User ka structure (Schema) define kar rahe hain
const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true,
    min: 6 
  }
}, { timestamps: true });

// Export default ekdum sahi hai ESM ke liye
export default mongoose.model('User', UserSchema);