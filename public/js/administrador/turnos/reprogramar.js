const tablaTurnos = document.querySelector("#DatosTurno");
const ListaHorario = document.querySelector("#ListaHorario");
const form = document.querySelector("#form");

// Función para obtener el turno
const obtenerTurno = async () => {
  const response = await fetch(
    `http://localhost:3000/api/turno/reprogramar/${tablaTurnos.dataset.id}`
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

const obtenerHorarios = async () => {
  const idDoctor = document.querySelector("#idDoctor");
  console.log(idDoctor.dataset.id);
  const response = await fetch(
    `http://localhost:3000/api/horarios/${idDoctor.dataset.id}`
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

const mostrarTurnos = (turnos) => {
  //Datos del horario y fecha
  const fecha = turnos.Doctor_Fecha;

  //Datos del Doctor
  const doctor = fecha.Doctor;
  const especialidad = doctor.Especialidad;
  const usuarioDoctor = doctor.Usuario;
  const personaDoctor = usuarioDoctor.Persona;

  //Datos del paciente
  const paciente = turnos.Paciente;
  const usuarioPaciente = paciente.Usuario;
  const personaPaciente = usuarioPaciente.Persona;

  tablaTurnos.innerHTML += `
          <div id='idDoctor' class="shadow m-4 p-3 bg-body rounded border text-center" data-id='${doctor.doctor_id}'">
            <h3 class="fw-bold">Paciente</h3>
            <table>
              <tbody>
                <tr>
                  <td>
                    <p class="fw-bold">DNI:</p>
                  </td>
                  <td>
                    <p>${personaPaciente.dni}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="fw-bold">Nombre:</p>
                  </td>
                  <td>
                    <p>${personaPaciente.nombres}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="fw-bold">Apellido:</p>
                  </td>
                  <td>
                    <p>${personaPaciente.apellidos}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="shadow m-4 p-3 bg-body rounded border text-center">
            <h3 class="fw-bold">Doctor</h3>
            <table>
              <tbody>
                <tr>
                  <td>
                    <p class="fw-bold">DNI:</p>
                  </td>
                  <td>
                    <p>${personaDoctor.dni}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="fw-bold">Nombre:</p>
                  </td>
                  <td>
                    <p>${personaDoctor.nombres}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="fw-bold">Apellido:</p>
                  </td>
                  <td>
                    <p>${personaDoctor.apellidos}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="fw-bold">Especialidad:</p>
                  </td>
                  <td>
                    <p>${especialidad.descripcion_especialidad}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
                `;
};

const mostrarHorarios = (Horarios) => {
  Horarios.forEach((horarios) => {
    ListaHorario.innerHTML += `
  
    <option value="${horarios.doctor_fecha_id}">
    ${horarios.fecha} - Inicio Jornada: ${horarios.horario_inicio} - Fin Jornada: ${horarios.horario_fin} - ${horarios.descripcion}
    </option>
  
    `;
  });
};

// Programar el evento cuando se carga toda la vista
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const turnos = await obtenerTurno();
  // Mostrar Turnos en la tabla
  mostrarTurnos(turnos);

  const horarios = await obtenerHorarios();

  mostrarHorarios(horarios);
});

//ACTUALIZAR LA REPROGRAMACION DEL TURNO
form.addEventListener("submit", async (e) => {
  alert("Entró");
  e.preventDefault();

  // Se crea un objeto con los datos del formulario
  const doctor_fecha_id = document.querySelector("#ListaHorario").value;
  const rol = document.querySelector("#rol");

  try {
    // Se envia la peticion al servidor
    const resp = await fetch(
      `http://localhost:3000/api/turno/actualizar/${tablaTurnos.dataset.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctor_fecha_id }),
      }
    );

    if (resp.status !== 200) {
      throw {
        message: "Error al reprogramar el turno",
      };
    }

    const data = await resp.json();

    Swal.fire({
      icon: "success",
      title: data.message,
      timer: 1500,
    });
    if (rol.dataset.id === "3") {
      setTimeout(() => {
        window.location.href = "/paciente/turnos/dia";
      }, 1500);
    } else {
      setTimeout(() => {
        window.location.href = "/lista_turnos";
      }, 1500);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: error.message,
      timer: 2000,
    });
  }
});
