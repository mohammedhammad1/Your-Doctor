import mongoose from 'mongoose';
const pharmacySchema = new mongoose.Schema({
   patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   patientid: { type: String, required: true }, // معرف المريض
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  diagnosis: String,            // التشخيص
  medications: [String],        // أسماء الأدوية
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Pharmacy', pharmacySchema);