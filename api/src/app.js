const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// rutas
const authRoutes = require('./routes/auth');
const convocatoriaRoutes = require('./routes/convocatorias'); // 👈 importamos las rutas de convocatorias
const applicationRoutes = require('./routes/applications');
const assignmentRoutes = require('./routes/assignments');
const reportRoutes = require('./routes/reports');
const alertRoutes = require('./routes/alerts');
const path = require('path');
const fs = require('fs');

app.use('/api/auth', authRoutes);
app.use('/api/convocatorias', convocatoriaRoutes); // 👈 registramos las rutas de convocatorias
app.use('/api/applications', applicationRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/alerts', alertRoutes);

// static uploads serving
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

module.exports = app;