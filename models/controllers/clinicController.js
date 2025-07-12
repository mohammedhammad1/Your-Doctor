import Clinic from "../Clinic"; 

// إنشاء عيادة جديدة
exports.createClinic = async (req, res) => {
  try {
    const clinic = await Clinic.create(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// إضافة طبيب إلى العيادة
exports.addDoctorToClinic = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const doctorData = req.body;

    // إنشاء الطبيب وربطه بالعيادة
    const doctor = await Doctor.create({
      ...doctorData,
      clinic: clinicId
    });

    res.status(201).json({ message: 'تم إضافة الطبيب إلى العيادة', doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف طبيب من العيادة
exports.removeDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const deleted = await Doctor.findByIdAndDelete(doctorId);

    if (!deleted) {
      return res.status(404).json({ message: 'الطبيب غير موجود' });
    }

    res.json({ message: 'تم حذف الطبيب من العيادة' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// جلب معلومات العيادة مع الحالة (مفتوحة أو مغلقة)
exports.getClinicStatus = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const clinic = await Clinic.findById(clinicId);

    if (!clinic) {
      return res.status(404).json({ message: 'العيادة غير موجودة' });
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const [fromHour, fromMin] = clinic.workingHours.from.split(':').map(Number);
    const [toHour, toMin] = clinic.workingHours.to.split(':').map(Number);

    const isOpen =
      (currentHour > fromHour || (currentHour === fromHour && currentMinute >= fromMin)) &&
      (currentHour < toHour || (currentHour === toHour && currentMinute < toMin));

    res.json({
      clinic,
      status: isOpen ? ' Open ' : ' Closed '
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};