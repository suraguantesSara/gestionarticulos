document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const mensajeError = document.getElementById("mensajeError");
    const correctPassword = "2025"; // Contraseña

    function verificarAcceso() {
        const userPassword = passwordInput.value.trim();

        if (userPassword === correctPassword) {
            // ✅ Redirigir a la página de registro
            window.location.href = "registro.html";
        } else {
            //error
            mensajeError.textContent = "❌ Contraseña incorrecta. Inténtalo nuevamente.";
            mensajeError.style.display = "block";
            passwordInput.value = "";
            passwordInput.focus();
        }
    }

    // 🎯 Detectar "Enter" para ingresar más rápido
    passwordInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            verificarAcceso();
        }
    });

    // 🔄 Asignar la función al botón
    window.verificarAcceso = verificarAcceso;
});
