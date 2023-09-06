// Referencia al formulario
const formEditar = document.querySelector("#formEditarPaciente");
const nombres = document.querySelector("#nombres");
const apellidos = document.querySelector("#apellidos");
const fecha_nac = document.querySelector("#fecha_nac");
const dni = document.querySelector("#dni");
const direccion = document.querySelector("#direccion");
const telefono = document.querySelector("#telefono");

// Funcion para obtener los datos de la tarea cuando se carga la página
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM cargado");

  try {
    const response = await fetch(
      `http://localhost:3000/api/paciente/${formEditar.dataset.id}`
    );

    // Si hubo un error al obtener los datos de un usuario
    if (!response.ok) {
      throw {
        message: "Error al obtener datos del paciente",
      };
    }

    // Se obtienen los datos de la respuesta (fetch)
    const data = await response.json();

    nombres.value = data.nombres;
    apellidos.value = data.apellidos;
    fecha_nac.value = data.fecha_nacimiento;
    dni.value = data.dni;
    direccion.value = data.direccion;
    telefono.value = data.telefono;
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});

// Escuchar el evento submit
formEditar.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Se crea un objeto con los datos del formulario
  const formData = {
    nombres: e.target.nombres.value,
    apellidos: e.target.apellidos.value,
    fecha_nac: e.target.fecha_nac.value,
    dni: e.target.dni.value,
    direccion: e.target.direccion.value,
    telefono: e.target.telefono.value,
  };

  try {
    // Se envia la peticion al servidor
    const resp = await fetch(
      `http://localhost:3000/api/paciente/${formEditar.dataset.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (resp.status !== 200) {
      throw {
        message: "Error al editar el usuario",
      };
    }

    const data = await resp.json();

    Swal.fire({
      icon: "success",
      title: data.message,
      timer: 1500,
    });
    setTimeout(() => {
      window.location.href = "/lista_pacientes";
    }, 1500);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: error.message,
      timer: 2000,
    });
  }
});
