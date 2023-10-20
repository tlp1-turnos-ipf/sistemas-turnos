const tablaTurnos = document.querySelector("#listaTurnos");
const idUser = parseInt(tablaTurnos.dataset.id);

// Función para obtener los usaurios
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

    //Datos del Doctor
    const doctorUsuario = fecha.Doctor.Usuario;

    //Datos del paciente
    const usuarioPaciente = turnos.Paciente.Usuario;
    const personaPaciente = usuarioPaciente.Persona;

    if (doctorUsuario.usuario_id === idUser && turnos.estado_turno === true) {
      tablaTurnos.innerHTML += `
      <tr>
          <td>${personaPaciente.nombres} ${personaPaciente.apellidos}</td>
          <td>Turno ${fecha.descripcion}</td>
          <td>${fecha.horario_inicio} - ${fecha.horario_inicio}</td>
          <td>
              <a href="/doctor/turno/atender/${turnos.turno_id}/:idDevolucion/${personaPaciente.persona_id}" class="btn btn-warning btn-sm">Atender</a>
          </td>
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
