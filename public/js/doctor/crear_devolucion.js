const formNuevo = document.querySelector("#crearDevolucion");
const turnoId = parseInt(formNuevo.dataset.id);
formNuevo.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo_turno = document.querySelector("#titulo_turno").value;
  const descripcion_turno = document.querySelector("#descripcion_turno").value;
  const turno_id = document.querySelector("#turno_id").value;

  //Crea al horario
  const response = await fetch(`http://localhost:3000/api/devolucion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo_turno,
      descripcion_turno,
      turno_id,
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
    title: "Excelente",
    text: respToJson.message,
  });

  formNuevo.reset();

  setTimeout(() => {
    window.location.href = `/doctor/turno/atender/${turnoId}/:idDevolucion/${pacienteID}`;
  }, 2000);
});
