import Pharmacy from "../Pharmacy";

// إنشاء صيدلية جديدة
exports.createPharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.create(req.body);
    res.status(201).json(pharmacy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// إضافة صيدلي إلى صيدلية
exports.addPharmacistToPharmacy = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const pharmacistData = req.body;

    const pharmacist = await Pharmacist.create({
      ...pharmacistData,
      pharmacy: pharmacyId
    });

    res.status(201).json({ message: 'Added successfully', pharmacist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف صيدلي
exports.removePharmacist = async (req, res) => {
  try {
    const { pharmacistId } = req.params;

    const deleted = await Pharmacist.findByIdAndDelete(pharmacistId);

    if (!deleted) {
      return res.status(404).json({ message: 'The pharmacist is not present ' });
    }

    res.json({ message: ' The pharmacist has been successfully removed.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حالة الصيدلية (مفتوحة / مغلقة)
exports.getPharmacyStatus = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const pharmacy = await Pharmacy.findById(pharmacyId);

    if (!pharmacy) {
      return res.status(404).json({ message: ' Pharmacy is not available' });
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const [fromHour, fromMin] = pharmacy.workingHours.from.split(':').map(Number);
    const [toHour, toMin] = pharmacy.workingHours.to.split(':').map(Number);

    const isOpen =
      (currentHour > fromHour || (currentHour === fromHour && currentMinute >= fromMin)) &&
      (currentHour < toHour || (currentHour === toHour && currentMinute < toMin));

    res.json({
      pharmacy,
      status: isOpen ? ' Open ✅' : ' Closed ❌'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


