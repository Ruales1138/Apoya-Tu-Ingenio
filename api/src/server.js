const app = require('./app');
const { sequelize } = require('./db');
const PORT = process.env.PORT || 3001;

// 👇 importa los modelos para que Sequelize los registre
require("./models/User");
require("./models/Convocatoria");
require("./models/Application");
require("./models/Assignment");
require("./models/MonitoringReport");

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida correctamente con la base de datos');

    // sincroniza todos los modelos importados
    await sequelize.sync({ alter: true }); // usa { force: true } solo si quieres borrar y recrear
    console.log('✅ Base de datos sincronizada correctamente');

    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar o sincronizar la base de datos:', error);
  }
})();