// server.js
const express = require("express");
const path = require("path");
const sassMiddleware = require("node-sass-middleware");

const app = express();
const PORT = 3000;

// Definir rutas absolutas
const projectRoot = __dirname;
const pugPath = path.join(projectRoot, "app/templates");
const scssPath = path.join(projectRoot, "app/styles"); 
const cssOutput = path.join(projectRoot, "public/styles");
const publicPath = path.join(projectRoot, "public");

// Middleware para compilar SCSS (incluye subcarpetas)
app.use(
  sassMiddleware({
    src: scssPath,
    dest: cssOutput,
    outputStyle: "compressed",
    prefix: "/styles",
    debug: true,
  })
);

// Servir archivos estáticos desde /public
app.use(express.static(publicPath));
app.use("/styles", express.static(cssOutput));

// Configurar motor de vistas Pug
app.set("views", pugPath);
app.set("view engine", "pug");

// Ruta para la página de trabajos
app.get("/trabaja", (req, res) => {
  res.render("jobs-page");
});

// Redirección de la raíz
app.get("/", (req, res) => {
  res.redirect("/trabaja");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
