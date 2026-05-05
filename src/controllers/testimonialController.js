const testimonialService = require('../services/testimonialService');
const { logAction } = require('../services/auditService');

const listTestimonials = async (req, res, next) => {
  try {
    const testimonials = await testimonialService.getTestimonials(req.user);
    return res.status(200).json(testimonials);
  } catch (error) {
    next(error);
  }
};

const listPublicTestimonials = async (req, res, next) => {
  try {
    const { countrySlug } = req.params;
    const testimonials = await testimonialService.getPublicTestimonialsByCountry(countrySlug);
    return res.status(200).json(testimonials);
  } catch (error) {
    next(error);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await testimonialService.createTestimonial(req.body, req.user);

    await logAction({
      usuario_id: req.user.id,
      accion: 'crear testimonio',
      modulo: 'testimonios',
      registro_id: testimonial.id,
      descripcion: `Creó testimonio de ${testimonial.nombre}`,
      ip: req.ip
    });

    return res.status(201).json({
      message: 'Testimonio creado correctamente',
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;

    const testimonial = await testimonialService.updateTestimonial(id, req.body, req.user);

    await logAction({
      usuario_id: req.user.id,
      accion: 'editar testimonio',
      modulo: 'testimonios',
      registro_id: id,
      descripcion: `Editó testimonio ID ${id}`,
      ip: req.ip
    });

    return res.status(200).json({
      message: 'Testimonio actualizado correctamente',
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await testimonialService.deleteTestimonial(id, req.user);

    await logAction({
      usuario_id: req.user.id,
      accion: 'eliminar testimonio',
      modulo: 'testimonios',
      registro_id: id,
      descripcion: `Eliminó testimonio ID ${id}`,
      ip: req.ip
    });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listTestimonials,
  listPublicTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};