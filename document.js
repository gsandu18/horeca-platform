router.get('/all', async (req, res) => {
  const allDocs = await require('../models/Document').find();
  res.json(allDocs);
});
const documentSchema = new mongoose.Schema({
  firmaId: String,
  nume: String,
  path: String,
  status: { type: String, enum: ['in asteptare', 'aprobat', 'respins'], default: 'in asteptare' },
  comentariu: String,
  data_incarcare: { type: Date, default: Date.now },
  actualizat_de: String, // email sau ID admin
  data_validare: Date
});
