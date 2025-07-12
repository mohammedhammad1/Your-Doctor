
import mongoose from 'mongoose';
const pharmacySchema = new mongoose.Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
patientid: { type: String, required: true }, // معرف المريض 
doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
date: Date,
time: String,
status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' }
});
export default mongoose.model('Pharmacy', pharmacySchema);