const formNuevoHorario = document.querySelector("#formNuevoHorario");

formNuevoHorario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fecha = document.querySelector("#fecha").value;
  const horario_inicio = document.querySelector("#horario_inicio").value;
  const horario_fin = document.querySelector("#horario_fin").value;
  const descripcion = document.querySelector("#descripcion").value;
  const cantidad_turnos = document.querySelector("#cantidad_turnos").value;

  //Crea al horario
  const responseHorario = await fetch(
    `http://localhost:3000/api/horario/${formNuevoHorario.dataset.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha,
        horario_inicio,
        horario_fin,
        descripcion,
        cantidad_turnos,
      }),
    }
  );

  const respToJson = await responseHorario.json();

  if (responseHorario.status !== 201 && responseHorario.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: respToJson.message,
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Horario creado",
    text: respToJson.message,
  });

  formNuevoHorario.reset();

  setTimeout(() => {
    window.location.href = `/lista_horarios/${formNuevoHorario.dataset.id}`;
  }, 2000);
});
