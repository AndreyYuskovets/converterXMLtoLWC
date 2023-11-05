class ConverterController {
  async doConvert(req, res) {
    try {
      const { file } = req.body;

      console.log('sever. ConverterController.doConvert' , file);

      return res.json(file);

    } catch (e) {
      return res.status(400).json({ message: `Server error: ${e.message}` });
    }
  }
}

module.exports = new ConverterController();