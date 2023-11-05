var convertXMLtoJS = require('xml-js');

class ConverterController {
  async doConvert(req, res) {
    try {
      const xml = req.body;

      console.log('xml= ', xml);

      //let obj = convertXMLtoJS.xml2json(xml, {compact: true, spaces: 2});
      //console.log('obj= ', obj);

      return res.json({ status: 'success' });

    } catch (e) {
      return res.status(400).json({ message: `Server error: ${e.message}` });
    }
  }
}

module.exports = new ConverterController();