const formNuevoDoctor = document.querySelector("#formNuevoDoctor");
const tablaEspecialidades = document.querySelector("#especialidad");

formNuevoDoctor.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombres = document.querySelector("#nombres").value;
  const apellidos = document.querySelector("#apellidos").value;
  const fecha_nac = document.querySelector("#fecha_nac").value;
  const dni = document.querySelector("#dni").value;
  const direccion = document.querySelector("#direccion").value;
  const telefono = document.querySelector("#telefono").value;
  const sexo = document.querySelector("#sexo").value;
  const especialidad = document.querySelector("#especialidad").value;
  const rol = 4;

  const nombre_usuario = document.querySelector("#nombre_usuario").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Las contraseñas no coinciden",
    });
    return;
  }

  // SE CREA LA PERSONA
  const responseIdPersona = await fetch(
    "http://localhost:3000/api/persona/registro",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombres,
        apellidos,
        fecha_nac,
        dni,
        direccion,
        telefono,
        sexo,
        email,
      }),
    }
  );

  const respToJsonPersona = await responseIdPersona.json();

  if (respToJsonPersona.status !== 201 && respToJsonPersona.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: respToJsonPersona.message,
    });
    return;
  }

  // SE CREA EL USUARIO
  const responseUsuario = await fetch("http://localhost:3000/api/usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre_usuario,
      email,
      password,
      rol,
    }),
  });

  const respToJsonUsuario = await responseUsuario.json();

  if (respToJsonUsuario.status !== 201 && respToJsonUsuario.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: respToJsonUsuario.message,
    });
    return;
  }

  //Crea al doctor
  const responseDoctor = await fetch("http://localhost:3000/api/doctor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      especialidad,
    }),
  });

  const respToJson = await responseDoctor.json();

  if (responseDoctor.status !== 201 && responseDoctor.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: respToJson.message,
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Doctor creado",
    text: respToJson.message,
  });

  formNuevoDoctor.reset();

  setTimeout(() => {
    window.location.href = "/lista_doctores";
  }, 2000);
});

// Función para obtener las especialidades
const obtenerEspecialidades = async () => {
  const response = await fetch("http://localhost:3000/api/especialidad");

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

//Mostrar especialidades
const mostrarEspecialidades = (Especialidades) => {
  tablaEspecialidades.innerHTML = "";

  Especialidades.forEach((especialidad) => {
    tablaEspecialidades.innerHTML += `
            <option value="${especialidad.especialidad_id}">${especialidad.descripcion_especialidad}</option>
                `;
  });
};

// Programar el evento cuando se carga toda la vista
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  const especialidades = await obtenerEspecialidades();

  // Mostrar especialidades en la tabla
  mostrarEspecialidades(especialidades);
});
