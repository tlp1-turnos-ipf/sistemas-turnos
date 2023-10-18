const tablaTurnos = document.querySelector("#listaTurnos");
const idUser = parseInt(tablaTurnos.dataset.id);

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0"); // El mes es 0-indexado, por lo que le sumamos 1 y lo formateamos
const day = String(today.getDate()).padStart(2, "0");

const formattedDate = `${year}-${month}-${day}`;

// Función para obtener los usuarios
const obtenerTurnos = async () => {
  const response = await fetch("http://localhost:3000/api/turno");

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

const mostrarTurnos = (Turnos) => {
  console.log(Turnos);
  if (Turnos.length === 0) {
    tablaTurnos.innerHTML = `
            <tr>
                <td colspan="5">No hay Turnos</td>
            </tr>
        `;
  }

  Turnos.forEach((turnos) => {
    //Datos del horario y fecha
    const fecha = turnos.Doctor_Fecha;
    const especialidadDoctor =
      fecha.Doctor.Especialidad.descripcion_especialidad;

    //Datos del Doctor
    const doctorUsuario = fecha.Doctor.Usuario;
    const doctorPersona = doctorUsuario.Persona;

    //Datos del paciente
    const usuarioPaciente = turnos.Paciente.Usuario;
    const personaPaciente = usuarioPaciente.Persona;

    let botonHtml = ""; // Esta variable almacenará los botones HTML

    if (doctorUsuario.estado === true) {
      botonHtml = `<td><a class="btn btn-sm btn-primary" href="#">Programado</a></td>`;
    } else {
      botonHtml = `<td><a href="/reprogramar/turno/${turnos.turno_id}"  class="btn btn-sm btn-danger">Reprogramar</a></td>`;
    }

    if (
      usuarioPaciente.usuario_id === idUser &&
      fecha.fecha === formattedDate &&
      turnos.estado_turno === true
    ) {
      tablaTurnos.innerHTML += `
      <tr>
          <td>${doctorPersona.nombres} ${doctorPersona.apellidos}</td>
          <td>${especialidadDoctor}</td>
          <td>${fecha.descripcion}</td>
          <td>${fecha.horario_inicio}</td>

          ${botonHtml}
          
      </tr>
  `;
    }
  });
};

// Programar el evento cuando se carga toda la vista
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const turnos = await obtenerTurnos();

  // Mostrar Turnos en la tabla
  mostrarTurnos(turnos);
});
