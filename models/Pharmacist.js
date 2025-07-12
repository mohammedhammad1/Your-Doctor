import mongoose from 'mongoose';
const pharmacySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    address: {
        type: String,
        required: true,
        trim: true
    },
    
    phone: {
        type: String,
        required: true,
        unique: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model('Pharmacy', pharmacySchema);