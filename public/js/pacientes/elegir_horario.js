const formBuscadorFecha = document.querySelector("[name='formBuscadorFecha']");

const formNuevoTurno = document.querySelector("#formNuevoTurno");

// Función para obtener los usaurios
const obtenerHorarios = async () => {
  const response = await fetch(
    `http://localhost:3000/api/horarios/${formNuevoTurno.dataset.id}`
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
    formBuscadorFecha.innerHTML = `
            <tr>
                <td colspan="3">No hay Horarios</td>
            </tr>
        `;
  }

  Horarios.forEach((horarios) => {
    formBuscadorFecha.innerHTML += `
      <option value="${horarios.doctor_fecha_id}">${horarios.fecha} - ${horarios.horario_inicio}hs a ${horarios.horario_fin}</option>
      `;
  });
};

//Agregar Turno
formNuevoTurno.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fecha_id = document.querySelector("#fecha_id").value;

  //Crea al turno
  const responseTurno = await fetch(
    `http://localhost:3000/api/paciente/turno`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha_id,
      }),
    }
  );

  const respToJson = await responseTurno.json();

  if (responseTurno.status !== 201 && responseTurno.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: respToJson.message,
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Turno creado",
    text: respToJson.message,
  });

  formNuevoTurno.reset();

  setTimeout(() => {
    window.location.href = "/paciente/turnos/completo";
  }, 2000);
});

// Programar el evento cuando se carga toda la vista (sin los datos de usuarios)
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const Horarios = await obtenerHorarios();

  // Mostrar Pacientes en la tabla
  mostrarHorarios(Horarios);
});
