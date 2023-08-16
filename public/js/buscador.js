document.addEventListener("keyup", (e) => {
  if (e.target.matches("#buscador")) {
    document.querySelectorAll(".especialidades").forEach((especialidad) => {
      especialidad.textContent.toLowerCase().includes(e.target.value)
        ? especialidad.classList.remove("filtro")
        : especialidad.classList.add("filtro");
    });
  }
});
