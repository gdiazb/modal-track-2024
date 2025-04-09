// Cargar EmailJS
emailjs.init("lcRd2Q4Mwn5mcn5Kq"); 

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("trabajaForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_2ts0nzq", "template_mg7rtbr", this)
      .then(() => {
        alert("✅ Datos enviados correctamente.");
        form.reset();
      }, (error) => {
        console.error("Error:", error);
        alert("❌ Error al enviar los datos.");
      });
  });
});
