const boton = document.querySelector("#boton");

// Función para obtener los usaurios
const obtenerDoctores = async () => {
  const response = await fetch("http://localhost:3000/api/doctor/completo");

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
  Doctores.forEach((doctores) => {
    const usuario = doctores.Usuario; // Objeto de usuario dentro de doctor
    const especialidad = doctores.Especialidad;
    const persona = usuario.Persona; //Objeto persona dentro de usuario

    let botonesHtml = ""; // Esta variable almacenará los botones HTML

    if (!usuario.estado) {
      botonesHtml = `<button onclick="cambiarEstado(event)" class="btn btn-lg btn-danger my-5" data-id="${usuario.usuario_id}">Desactivado</button>`;
    } else {
      botonesHtml = `
         <button onclick="eliminar(event)" class="btn btn-lg btn-success my-5" data-id="${usuario.usuario_id}">Activado</button>
        `;
    }
    if (usuario.usuario_id === parseInt(boton.dataset.id)) {
      boton.innerHTML += `
          ${botonesHtml}
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

/* ***************************************************************
                        Eliminar doctores activos
*****************************************************************/

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
      title: "Estado Actualizado",
      text: "Se ha desactivado",
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

/* ***************************************************************
                        Activar Doctores
*****************************************************************/

//Ventana Emergente para antes de activar un doctor
const cambiarEstado = (event) => {
  Swal.fire({
    icon: "warning",
    title: "¿Estás seguro de Activarse?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      modificarEstado(event);
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  });
};

//Modificar estado doctor
const modificarEstado = async (event) => {
  //Obtengo el ID
  const id = event.target.dataset.id;

  try {
    const res = await fetch(`http://localhost:3000/api/doctor/estado/${id}`, {
      method: "PUT",
    });

    const data = await res.json();

    Swal.fire({
      icon: "success",
      title: "Me modificó el estado",
      text: data.message,
    });

    setTimeout(() => {
      window.location.reload();
    }, 2200);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};
