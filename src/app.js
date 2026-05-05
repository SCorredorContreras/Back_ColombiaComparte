const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Rutas
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const countryRoutes = require('./routes/countryRoutes');
const newsRoutes = require('./routes/newsRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRequestRoutes = require('./routes/contactRequestRoutes');

// Middleware de errores
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

/*
  MIDDLEWARES GLOBALES
*/
app.use(cors());
app.use(express.json());

/*
  RUTA BASE
*/
app.get('/', (req, res) => {
  res.json({
    message: 'API CMS Multipais funcionando correctamente',
  });
});

/*
  RUTAS API
*/
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact-requests', contactRequestRoutes);

/*
  RUTA 404 (cuando no existe endpoint)
*/
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
});

/*
  MANEJO GLOBAL DE ERRORES
*/
app.use(errorHandler);

/*
  SERVIDOR
*/
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});