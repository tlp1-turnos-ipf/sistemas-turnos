const formNuevo = document.querySelector("#formNuevaEspecialidad");

formNuevo.addEventListener("submit", async (e) => {
  e.preventDefault();
  const descripcion_especialidad = document.querySelector(
    "#descripcion_especialidad"
  ).value;

  //Crea al horario
  const response = await fetch(`http://localhost:3000/api/especialidad`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      descripcion_especialidad,
    }),
  });

  const respToJson = await response.json();

  if (response.status !== 201 && response.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: respToJson.message,
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Especialidad creada",
    text: respToJson.message,
  });

  formNuevo.reset();

  setTimeout(() => {
    window.location.href = `/lista_especialidades`;
  }, 2000);
});
