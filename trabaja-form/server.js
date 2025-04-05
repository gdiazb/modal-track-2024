// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuraciones
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../app/templates'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta principal para mostrar el formulario
app.get('/', (req, res) => {
  res.render('jobs-page');
});

// Ruta para procesar el formulario
app.post('/enviar-formulario', (req, res) => {
  const datos = req.body;
  const filePath = path.join(__dirname, 'datos.xlsx');

  let workbook;
  let worksheet;

  if (fs.existsSync(filePath)) {
    workbook = xlsx.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    data.push(datos);
    worksheet = xlsx.utils.json_to_sheet(data);
  } else {
    const data = [datos];
    worksheet = xlsx.utils.json_to_sheet(data);
    workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Datos');
  }

  xlsx.writeFile(workbook, filePath);
  res.send('✅ ¡Datos enviados correctamente! Puedes cerrar esta página.');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
