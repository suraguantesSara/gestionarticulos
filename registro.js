document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const steps = document.querySelectorAll(".step");
    const nextButtons = document.querySelectorAll(".next");
    const prevButtons = document.querySelectorAll(".prev");
    const pedidoForm = document.getElementById("pedidoForm");


        // Validación de contraseña
    function verificarAcceso() {
        const passwordInput = document.getElementById("password").value;
        const correctPassword = "2025";

        if (passwordInput === correctPassword) {
            document.getElementById("authContainer").style.display = "none";
            document.getElementById("formContainer").style.display = "block";
        } else {
            alert("❌ Contraseña incorrecta. Inténtalo nuevamente.");
        }
    }

    window.verificarAcceso = verificarAcceso;

    showStep(currentStep);
});

    function showStep(step) {
        steps.forEach((s, index) => {
            s.classList.remove("active");
            if (index === step) s.classList.add("active");
        });
    }

    nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    // 📌 Mostrar la primera sección correctamente
    showStep(currentStep);
});

document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const steps = document.querySelectorAll(".step");
    const nextButtons = document.querySelectorAll(".next");
    const prevButtons = document.querySelectorAll(".prev");
    const pedidoForm = document.getElementById("pedidoForm");
    const mensajeUsuario = document.createElement("div");
    
    mensajeUsuario.id = "mensajeUsuario";
    mensajeUsuario.style.position = "fixed";
    mensajeUsuario.style.top = "10px";
    mensajeUsuario.style.left = "50%";
    mensajeUsuario.style.transform = "translateX(-50%)";
    mensajeUsuario.style.padding = "10px";
    mensajeUsuario.style.background = "#007bff";
    mensajeUsuario.style.color = "#fff";
    mensajeUsuario.style.borderRadius = "5px";
    mensajeUsuario.style.display = "none";

    document.body.appendChild(mensajeUsuario);

    function mostrarMensaje(texto, tipo) {
        mensajeUsuario.textContent = texto;
        mensajeUsuario.style.background = tipo === "error" ? "#dc3545" : "#28a745";
        mensajeUsuario.style.display = "block";
        setTimeout(() => mensajeUsuario.style.display = "none", 3000);
    }

    function validarCampos(step) {
        let campos = steps[step].querySelectorAll("input[required], select[required]");
        for (let campo of campos) {
            if (campo.value.trim() === "") {
                mostrarMensaje(`⚠️ Completa ${campo.previousElementSibling.textContent}.`, "error");
                return false;
            }
        }
        mostrarMensaje("✅ Todo correcto, puedes avanzar.", "success");
        return true;
    }

    function showStep(step) {
        steps.forEach((s, index) => {
            s.style.display = index === step ? "block" : "none";
            s.classList.remove("fade-in");
            if (index === step) s.classList.add("fade-in");
        });
    }

    nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (validarCampos(currentStep) && currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
                mostrarMensaje(`➡️ Sección ${currentStep + 1} activada.`, "success");
            }
        });
    });

    prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
                mostrarMensaje(`⬅️ Volviendo a Sección ${currentStep + 1}.`, "success");
            }
        });
    });

    // 📌 Validación antes de enviar el formulario
    pedidoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (validarCampos(currentStep)) {
            mostrarMensaje("✅ Pedido enviado correctamente!", "success");
            setTimeout(() => pedidoForm.submit(), 2000);
        }
    });

    // Mostrar la primera sección correctamente
    showStep(currentStep);
});

