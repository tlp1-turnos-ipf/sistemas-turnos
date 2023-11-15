const tablaDoctores = document.querySelector("#listaDoctores");

// Función para obtener los usaurios
const obtenerDoctores = async () => {
  const response = await fetch("http://localhost:3000/api/doctor");

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

//Mostrar Doctores
const mostrarDoctores = (Doctores) => {
  if (Doctores.length === 0) {
    tablaDoctores.innerHTML = `
            <tr>
                <td colspan="4">No hay Doctores</td>
            </tr>
        `;
  }

  Doctores.forEach((doctores) => {
    const usuario = doctores.Usuario; // Objeto de usuario dentro de doctor
    const especialidad = doctores.Especialidad;
    const persona = usuario.Persona; //Objeto persona dentro de usuario

    if (usuario.estado != 0) {
      tablaDoctores.innerHTML += `
                    <tr>
                        <td>${persona.dni}</td>
                        <td>${persona.nombres}  ${persona.apellidos}</td>
                        <td>${especialidad.descripcion_especialidad}</td>
                        <td>
                          <a href="/paciente/turno/elegir_fecha/${doctores.doctor_id}" class="btn btn-primary btn-sm">Seleccionar</a>
                        </td>
                    </tr>
                `;
    }
  });
};

// Programar el evento cuando se carga toda la vista (sin los datos de usuarios)
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const doctores = await obtenerDoctores();

  // Mostrar Pacientes en la tabla
  mostrarDoctores(doctores);
});
