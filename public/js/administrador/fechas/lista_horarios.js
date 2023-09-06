const tablaHorarios = document.querySelector("#listaHorarios");

// Función para obtener los usaurios
const obtenerHorarios = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const response = await fetch(
    `http://localhost:3000/api/horarios/${tablaHorarios.dataset.id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  if (response.status === 404) {
    return [];
  }

  if (response.status !== 200) {
    const { message } = await response.json();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
    return;
  }

  const data = await response.json();

  return data;
};

const mostrarHorarios = (Horarios) => {
  if (Horarios.length === 0) {
    tablaHorarios.innerHTML = `
            <tr>
                <td colspan="3">No hay Horarios</td>
            </tr>
        `;
  }

  Horarios.forEach((horarios) => {
    tablaHorarios.innerHTML += `
              <tr>
                  <td>${horarios.fecha}</td>
                  <td>${horarios.horario_inicio}hs a ${horarios.horario_fin}hs</td>
                  <td>
                      <a href="/editar_horario/${horarios.doctor_fecha_id}/${tablaHorarios.dataset.id}" class="btn btn-warning btn-sm">Editar</a>
                      <a href="/crear_turno/${horarios.doctor_fecha_id}" class="btn btn-primary btn-sm">Sacar Turno</a>
                  </td>
              </tr>
                `;
  });
};

// Programar el evento cuando se carga toda la vista (sin los datos de usuarios)
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const Horarios = await obtenerHorarios();

  // Mostrar Pacientes en la tabla
  mostrarHorarios(Horarios);
});
