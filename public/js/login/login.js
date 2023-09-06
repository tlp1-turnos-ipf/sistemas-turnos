const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/api/login", {
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
  Swal.fire("Correcto", message, "success");

  // Se almacena el token en el local storage
  localStorage.setItem("token", token);

  // Redireccionar a la vista de tareas
  setTimeout(() => {
    window.location.href = "/administrador";
  }, 2000);
});
