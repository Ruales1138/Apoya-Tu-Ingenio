select * from convocatorias


INSERT INTO convocatorias
(titulo, descripcion, materia, "habilidadesRequeridas", "numeroPuestos", requisitos, beneficios, "fechaFin", estado, "docenteId", "createdAt", "updatedAt")
VALUES (
  'Monitoría Programación II',
  'Apoyo en prácticas y tutorías',
  'Programación II',
  ARRAY['Java','Trabajo en equipo'],
  2,
  ARRAY['Aprobó la materia','Promedio 4.0'],
  ARRAY['Certificado','Descuento en matrícula'],
  '2025-12-15',
  'publicada',
  1,
  NOW(),  -- 👈 marca de tiempo actual
  NOW()
);


INSERT INTO convocatorias
(titulo, descripcion, materia, "habilidadesRequeridas", "numeroPuestos", requisitos, beneficios, "fechaFin", estado, "docenteId", "createdAt", "updatedAt")
VALUES (
  'Monitoría Programación I',
  'La monitoría de Programación I ofrece una oportunidad única para estudiantes sobresalientes de Ingeniería de Sistemas de apoyar a sus compañeros en el aprendizaje de los fundamentos de la programación. Como monitor, mejorarás tus habilidades pedagógicas y de liderazgo mientras refuerzas tus conocimientos técnicos. Es una experiencia enriquecedora que contribuye al desarrollo académico de la comunidad universitaria.',
  'Programación I',
  ARRAY['Lógica de programación','Paciencia','Trabajo en equipo'],
  3,
  ARRAY['Haber aprobado Programación I','Promedio mínimo 4.0'],
  ARRAY['Certificado de monitoría','Descuento en matrícula'],
  '2025-12-20',
  'publicada',
  1,
  NOW(),
  NOW()
);


-- Convocatoria de Electrónica
INSERT INTO convocatorias
(titulo, descripcion, materia, "habilidadesRequeridas", "numeroPuestos", requisitos, beneficios, "fechaFin", estado, "docenteId", "createdAt", "updatedAt")
VALUES (
  'Monitoría Electrónica Básica',
  'La monitoría de Electrónica Básica brinda a los estudiantes la oportunidad de profundizar en los principios fundamentales de los circuitos eléctricos y electrónicos. Los monitores apoyarán a sus compañeros en la comprensión de conceptos como resistencias, capacitores, transistores y el uso de instrumentos de medición. Esta experiencia fomenta el aprendizaje colaborativo, fortalece las competencias técnicas y desarrolla habilidades de comunicación efectiva, esenciales para el futuro desempeño profesional en el área de la ingeniería electrónica.',
  'Electrónica Básica',
  ARRAY['Conocimientos en circuitos eléctricos','Manejo de multímetro y osciloscopio','Capacidad de explicar conceptos técnicos'],
  2,
  ARRAY['Haber aprobado Electrónica Básica','Promedio mínimo 3.8'],
  ARRAY['Certificado de monitoría','Acceso a laboratorios especializados'],
  '2025-12-22',
  'publicada',
  1,
  NOW(),
  NOW()
);

-- Convocatoria de Física
INSERT INTO convocatorias
(titulo, descripcion, materia, "habilidadesRequeridas", "numeroPuestos", requisitos, beneficios, "fechaFin", estado, "docenteId", "createdAt", "updatedAt")
VALUES (
  'Monitoría Física Mecánica',
  'La monitoría de Física Mecánica está dirigida a estudiantes con un alto rendimiento académico que deseen apoyar a sus compañeros en el estudio de los fundamentos del movimiento, las leyes de Newton y la resolución de problemas prácticos. Los monitores tendrán la oportunidad de reforzar sus conocimientos en cinemática, dinámica y energía, al tiempo que desarrollan habilidades pedagógicas y de liderazgo. Esta experiencia contribuye al fortalecimiento de la comunidad académica y al desarrollo de competencias analíticas y críticas en el área de la física.',
  'Física Mecánica',
  ARRAY['Dominio de cinemática y dinámica','Capacidad de resolución de problemas','Habilidades de comunicación'],
  3,
  ARRAY['Haber aprobado Física Mecánica','Promedio mínimo 4.0'],
  ARRAY['Certificado de monitoría','Reconocimiento académico'],
  '2025-12-25',
  'publicada',
  1,
  NOW(),
  NOW()
);

INSERT INTO convocatorias
(titulo, descripcion, materia, "habilidadesRequeridas", "numeroPuestos", requisitos, beneficios, "fechaFin", estado, "docenteId", "createdAt", "updatedAt")
VALUES (
  'Monitoría Matemáticas Avanzadas',
  'La monitoría de Matemáticas Avanzadas está dirigida a estudiantes con un excelente desempeño académico que deseen apoyar a sus compañeros en el dominio de temas complejos como álgebra lineal, cálculo multivariable y ecuaciones diferenciales. Los monitores tendrán la oportunidad de guiar a otros en la resolución de problemas abstractos y en la aplicación de conceptos matemáticos a situaciones prácticas de la ingeniería y las ciencias. Esta experiencia no solo fortalece la comprensión teórica, sino que también fomenta el pensamiento crítico, la capacidad de análisis y la comunicación efectiva de ideas complejas, contribuyendo al crecimiento académico de toda la comunidad universitaria.',
  'Matemáticas Avanzadas',
  ARRAY['Dominio de cálculo multivariable','Conocimientos en álgebra lineal','Capacidad de resolución de problemas complejos'],
  2,
  ARRAY['Haber aprobado Matemáticas Avanzadas','Promedio mínimo 4.2'],
  ARRAY['Certificado de monitoría','Reconocimiento académico','Oportunidad de participar en proyectos de investigación'],
  '2025-12-28',
  'publicada',
  1,
  NOW(),
  NOW()
);
