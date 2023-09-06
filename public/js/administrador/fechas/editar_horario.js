const formEditarHorario = document.querySelector("#formEditarHorario");
const valor = document.querySelector("#valor").value;

const fecha = document.querySelector("#fecha");
const horario_inicio = document.querySelector("#horario_inicio");
const horario_fin = document.querySelector("#horario_fin");
const descripcion = document.querySelector("#descripcion");
const cantidad_turnos = document.querySelector("#cantidad_turnos");

// Funcion para obtener los datos de la tarea cuando se carga la página
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM cargado");

  try {
    const response = await fetch(
      `http://localhost:3000/api/horario/${formEditarHorario.dataset.id}`
    );

    // Si hubo un error al obtener los datos de un usuario
    if (!response.ok) {
      throw {
        message: "Error al obtener datos del doctor",
      };
    }

    // Se obtienen los datos de la respuesta (fetch)
    const data = await response.json();

    fecha.value = data.fecha;
    horario_inicio.value = data.horario_inicio;
    horario_fin.value = data.horario_fin;
    descripcion.value = data.descripcion;
    cantidad_turnos.value = data.cantidad_turnos;
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
formEditarHorario.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Se crea un objeto con los datos del formulario
  const formData = {
    fecha: e.target.fecha.value,
    horario_inicio: e.target.horario_inicio.value,
    horario_fin: e.target.horario_fin.value,
    descripcion: e.target.descripcion.value,
    cantidad_turnos: e.target.cantidad_turnos.value,
  };

  try {
    // Se envia la peticion al servidor
    const resp = await fetch(
      `http://localhost:3000/api/horario/${formEditarHorario.dataset.id}`,
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
      window.location.href = `/lista_horarios/${valor}`;
    }, 1500);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: error.message,
      timer: 2000,
    });
  }
});
