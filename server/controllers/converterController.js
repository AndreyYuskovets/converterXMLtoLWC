
class ConverterController {
  async doConvert(req, res) {
    try {
      const { fileName, fileBody } = req.body;

      console.log('fileName= ', fileName);
      console.log('fileBody= ', fileBody);

      return res.json(fileBody);

    } catch (e) {
      return res.status(400).json({ message: `Server error: ${e.message}` });
    }
  }
}

module.exports = new ConverterController();