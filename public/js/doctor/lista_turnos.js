const tablaTurnos = document.querySelector("#listaTurnos");

// Función para obtener los usaurios
const obtenerTurnos = async () => {
  const response = await fetch("http://localhost:3000/api/lista_turnos/doctor/dia");

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
  if (Turnos.length === 0 ) {
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
    const doctor = fecha.Doctor.Usuario;

    //Datos del paciente
    const usuarioPaciente = turnos.Paciente.Usuario;
    const personaPaciente = usuarioPaciente.Persona;

    tablaTurnos.innerHTML += `
                    <tr>
                        <td>${personaPaciente.nombres} ${personaPaciente.apellidos}</td>
                        <td>${fecha.fecha}</td>
                        <td>
                            <button onclick=eliminarTurno() class="btn btn-danger btn-sm" data-id="${turnos.turno_id}">Atender</button>
                            <a href="/paciente/editar/${turnos.turno_id}" class="btn btn-warning btn-sm">No asistió</a>
                        </td>
                    </tr>
                `;
  });
};

// Programar el evento cuando se carga toda la vista
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const turnos = await obtenerTurnos();

  // Mostrar Turnos en la tabla
  mostrarTurnos(turnos);
});
