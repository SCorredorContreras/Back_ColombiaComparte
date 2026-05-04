const countryRepository = require('../repositories/countryRepository');

const getCountries = async () => {
  return await countryRepository.findAllCountries();
};

const getActiveCountries = async () => {
  return await countryRepository.findActiveCountries();
};

const getCountryBySlug = async (slug) => {
  if (!slug) {
    throw new Error('Slug es requerido');
  }

  return await countryRepository.findCountryBySlug(slug);
};

module.exports = {
  getCountries,
  getActiveCountries,
  getCountryBySlug,
};