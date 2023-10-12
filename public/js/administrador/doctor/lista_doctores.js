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

    let botonesHtml = ""; // Esta variable almacenará los botones HTML

    if (usuario.estado == 0) {
      botonesHtml = `
        <td class="fw-bold f-primary">No disponible</td>
      
      `;
    } else {
      botonesHtml = `
            <td>
                <button onclick="eliminarDoctor(event)" class="btn btn-danger btn-sm" data-id="${usuario.usuario_id}">Eliminar</button>
                <a href="/doctor/editar/${persona.persona_id}" class="btn btn-warning btn-sm">Editar</a>
                <a href="/lista_horarios/${doctores.doctor_id}" class="btn btn-primary btn-sm">Horarios y Turnos</a>
            </td>
        `;
    }

    tablaDoctores.innerHTML += `
                    <tr>
                        <td>${persona.dni}</td>
                        <td>${persona.nombres}  ${persona.apellidos}</td>
                        <td>${especialidad.descripcion_especialidad}</td>
                        ${botonesHtml}
                    </tr>
                `;
  });
};

// Programar el evento cuando se carga toda la vista (sin los datos de usuarios)
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const doctores = await obtenerDoctores();

  // Mostrar Pacientes en la tabla
  mostrarDoctores(doctores);
});

/* ***************************************************************
                        Eliminar doctores activos
*****************************************************************/

//Ventana Emergente para antes de eliminar un doctor
const eliminarDoctor = (event) => {
  Swal.fire({
    icon: "warning",
    title: "¿Estás seguro de eliminar el doctor?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminar(event);
    } else {
      window.location.href = "/lista_doctores";
    }
  });
};

//Eliminar doctor
const eliminar = async (event) => {
  //Obtengo el ID
  const id = event.target.dataset.id;

  try {
    const res = await fetch(`http://localhost:3000/api/doctor/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    Swal.fire({
      icon: "success",
      title: "Doctor eliminado",
      text: data.message,
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};
