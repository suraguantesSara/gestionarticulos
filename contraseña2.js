document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const mensajeError = document.getElementById("mensajeError");
    const correctPassword = "2025"; // 🔐 Contraseña definida

    function verificarAcceso() {
        const userPassword = passwordInput.value.trim();

        if (userPassword === correctPassword) {
            // ✅ Redirigir a la página de registro
            window.location.href = "consultas.html";
        } else {
            // ❌ Mostrar mensaje de error
            mensajeError.textContent = "❌ Contraseña incorrecta. Inténtalo nuevamente.";
            mensajeError.style.display = "block";
            passwordInput.value = "";
            passwordInput.focus();
        }
    }

    function mostrarAviso() {
        alert("⚠️ Si no recuerdas la contraseña, por favor contacta al encargado del sistema.");
    }

    // 🎯 Detectar "Enter" para ingresar más rápido
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            verificarAcceso();
        }
    });

    // 🔄 Asignar las funciones a los botones
    window.verificarAcceso = verificarAcceso;
    window.mostrarAviso = mostrarAviso;
});
