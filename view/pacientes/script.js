document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.getElementById("buscador");
  const listaPacientes = document.getElementById("listaPacientes").getElementsByTagName("li");

  buscador.addEventListener("input", () => {
    const inputValue = buscador.value.toLowerCase();

    for (const paciente of listaPacientes) {
      const nombrePaciente = paciente.textContent.toLowerCase();

      if (nombrePaciente.includes(inputValue)) {
        paciente.style.display = "block";
      } else {
        paciente.style.display = "none";
      }
    }
  });
});