const countryService = require('../services/countryService');

const listCountries = async (req, res) => {
  try {
    const countries = await countryService.getCountries();

    return res.status(200).json(countries);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const listActiveCountries = async (req, res) => {
  try {
    const countries = await countryService.getActiveCountries();

    return res.status(200).json(countries);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getCountryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const country = await countryService.getCountryBySlug(slug);

    return res.json(country);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  listCountries,
  listActiveCountries,
  getCountryBySlug,
};