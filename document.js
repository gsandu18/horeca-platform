router.get('/all', async (req, res) => {
  const allDocs = await require('../models/Document').find();
  res.json(allDocs);
});
