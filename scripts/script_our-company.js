document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".mt-oc-values__item");
  const buttons = document.querySelectorAll(".mt-oc-values__item-subtitle");

  function toggleAccordion() {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (isDesktop) {
      // Muestra todo el contenido en PC y desactiva el acordeón
      items.forEach((item) => {
        item.classList.add("active");
        item.querySelector(".mt-oc-values__item-content").style.maxHeight = "none";
      });

      // Desactiva los clics en los títulos en PC
      buttons.forEach((button) => {
        button.style.pointerEvents = "none"; // Bloquea clics en PC
      });

    } else {
      // Activa el acordeón en móviles
      items.forEach((item) => {
        item.classList.remove("active");
        item.querySelector(".mt-oc-values__item-content").style.maxHeight = null;

        const button = item.querySelector(".mt-oc-values__item-subtitle");
        button.style.pointerEvents = "auto"; // Permite clics en móviles

        button.removeEventListener("click", toggleItem);
        button.addEventListener("click", toggleItem);
      });
    }
  }

  function toggleItem() {
    const item = this.parentElement;
    const content = item.querySelector(".mt-oc-values__item-content");

    if (item.classList.contains("active")) {
      item.classList.remove("active");
      content.style.maxHeight = null;
    } else {
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  toggleAccordion();
  window.addEventListener("resize", toggleAccordion);
});