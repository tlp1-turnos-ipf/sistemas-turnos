const tablaTurnos = document.querySelector("#listaTurnos");

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
    const doctor = fecha.Doctor;
    const especialidad = doctor.Especialidad;
    const usuarioDoctor = doctor.Usuario;
    const personaDoctor = usuarioDoctor.Persona;

    //Datos del paciente
    const paciente = turnos.Paciente;
    const usuarioPaciente = paciente.Usuario;
    const personaPaciente = usuarioPaciente.Persona;

    let botonesHtml = ""; // Esta variable almacenará los botones HTML

    if (!usuarioDoctor.estado) {
      botonesHtml = `<td><a href="/reprogramar/turno/${turnos.turno_id}" class="btn btn-danger btn-sm">Reprogramar</a></td>`;
    } else {
      botonesHtml = `<td><a class="btn btn-warning btn-sm px-4 text-white">Editar</a></td>`;
    }

    if(turnos.estado_turno === true)
    tablaTurnos.innerHTML += `
                    <tr>
                        <td>${personaPaciente.nombres} ${personaPaciente.apellidos}</td>
                        <td>${personaDoctor.nombres} ${personaDoctor.apellidos}</td>
                        <td>${especialidad.descripcion_especialidad}</td>
                        <td>${fecha.fecha}</td>
                        
                        ${botonesHtml}
                        
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
