const formLogin = document.getElementById("formLogin");

// me manda a dashboard si es que existe una sesión activa
document.addEventListener('DOMContentLoaded', () => {
  const token = window.localStorage.getItem('token')
  
 if(token){
  fetch("http://localhost:3000/auth/token", {
      method: "GET",
      headers: {
          'authorization': token
      }
  })
      .then(res => res.json())
      .then(data => {
          if(data.rol == 1) {
              window.location.href = '/administrador'
          }
          else if(data.rol == 3) {
              window.location.href = '/paciente'
          }
          else if(data.rol == 4) {
              window.location.href = '/doctor'
          }
      })
 }
})

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const { message } = await response.json();
    return Swal.fire("Error", message, "error");
  }

  const { message, token } = await response.json();

  // Se almacena el token en el local storage
  localStorage.setItem("token", token);
  
  Swal.fire("Correcto", message, "success");

  //Obtengo el rol
  const infoRol = await fetch("http://localhost:3000/rol/user", {
    method: "GET",
    headers: {
      authorization: token,
    },
  })

  const {roles} = await infoRol.json();

  // Redireccionar a la vista de tareas
  setTimeout(() => {
    window.location.href = roles;
  }, 2000);

});
