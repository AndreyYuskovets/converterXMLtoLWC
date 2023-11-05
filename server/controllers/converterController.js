
class ConverterController {
  async doConvert(req, res) {
    try {
      const object = req.body;
      console.log('object= ', object);

      return res.json(JSON.stringify(object));

    } catch (e) {
      return res.status(400).json({ message: `Server error: ${e.message}` });
    }
  }
}

module.exports = new ConverterController();