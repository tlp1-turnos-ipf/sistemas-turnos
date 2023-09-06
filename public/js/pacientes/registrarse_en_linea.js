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

  //Verifica que las contraseñas coincidan
  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Las contraseñas no coinciden",
    });
    return;
  }

  //Se crea la persona
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

  //Crea el usuario
  const responseUsuario = await fetch("http://localhost:3000/api/usuario", {
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

  Swal.fire({
    icon: "success",
    title: "Paciente creado",
    text: respToJson.message,
  });

  console.log(respToJson.message);

  formNuevoPaciente.reset();

  setTimeout(() => {
    window.location.href = "/login";
  }, 2000);
});
