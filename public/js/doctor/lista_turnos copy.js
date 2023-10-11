const tablaTurnos = document.querySelector("#listaTurnos");

// Función para obtener los usaurios
const obtenerTurnos = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const response = await fetch("http://localhost:3000/api/turno", {
    headers: {
      Authorization: token,
    },
  });

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

    tablaTurnos.innerHTML += `
                    <tr>
                        <td>${personaPaciente.nombres} ${personaPaciente.apellidos}</td>
                        <td>${personaDoctor.nombres} ${personaDoctor.apellidos}</td>
                        <td>${especialidad.descripcion_especialidad}</td>
                        <td>${fecha.fecha}</td>
                        <td>
                            <button onclick=eliminarPaciente(event) class="btn btn-danger btn-sm" data-id="${turnos.turno_id}">Eliminar</button>
                            <a href="/paciente/editar/${turnos.turno_id}" class="btn btn-warning btn-sm">Editar</a>
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
