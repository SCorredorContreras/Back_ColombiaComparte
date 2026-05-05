const newsService = require('../services/newsService');
const { logAction } = require('../services/auditService');

const listNews = async (req, res, next) => {
  try {
    const news = await newsService.getNews(req.user);
    return res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

const listPublicNews = async (req, res, next) => {
  try {
    const { countrySlug } = req.params;
    const news = await newsService.getPublicNewsByCountry(countrySlug);
    return res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

const getPublicNewsDetail = async (req, res, next) => {
  try {
    const { countrySlug, newsSlug } = req.params;
    const news = await newsService.getPublicNewsDetail(countrySlug, newsSlug);
    return res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

const createNews = async (req, res, next) => {
  try {
    const news = await newsService.createNews(req.body, req.user);

    await logAction({
      usuario_id: req.user.id,
      accion: 'crear noticia',
      modulo: 'noticias',
      registro_id: news.id,
      descripcion: `Creó la noticia ${news.titulo}`,
      ip: req.ip
    });

    return res.status(201).json({
      message: 'Noticia creada correctamente',
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

const updateNews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const news = await newsService.updateNews(id, req.body, req.user);

    await logAction({
      usuario_id: req.user.id,
      accion: 'editar noticia',
      modulo: 'noticias',
      registro_id: id,
      descripcion: `Editó la noticia ID ${id}`,
      ip: req.ip
    });

    return res.status(200).json({
      message: 'Noticia actualizada correctamente',
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await newsService.deleteNews(id, req.user);

    await logAction({
      usuario_id: req.user.id,
      accion: 'eliminar noticia',
      modulo: 'noticias',
      registro_id: id,
      descripcion: `Eliminó la noticia ID ${id}`,
      ip: req.ip
    });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listNews,
  listPublicNews,
  getPublicNewsDetail,
  createNews,
  updateNews,
  deleteNews,
};