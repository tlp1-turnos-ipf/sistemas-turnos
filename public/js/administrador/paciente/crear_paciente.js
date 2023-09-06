const formNuevoPaciente = document.querySelector("#formNuevoPaciente");

formNuevoPaciente.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombres = document.querySelector("#nombres").value;
  const apellidos = document.querySelector("#apellidos").value;
  const fecha_nac = document.querySelector("#fecha_nac").value;
  const dni = document.querySelector("#dni").value;
  const direccion = document.querySelector("#direccion").value;
  const telefono = document.querySelector("#telefono").value;
  const sexo = document.querySelector("#sexo").value;
  const discapacidad = document.querySelector("#discapacidad").value;

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

  const responseUsuario = await fetch("http://localhost:3000/api/usuario/paciente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre_usuario,
      email,
      password,
    }),
  });

  //Crea al paciente
  const responsePaciente = await fetch("http://localhost:3000/api/paciente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      discapacidad,
    }),
  });

  const respToJson = await responsePaciente.json();

  if (responsePaciente.status !== 201 && responsePaciente.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: respToJson.message,
    });
    return;
  }

  formNuevoPaciente.reset();

  //Ventana emergente que lleva hacia la ventana de los doctores para sacar turno
  Swal.fire({
    icon: "success",
    title: "¿Desea sacar un turno?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      // Acción a realizar si el usuario hace clic en "Sí"
      window.location.href = "/lista_doctores";
    } else {
      window.location.href = "/lista_pacientes";
    }
  });
});
