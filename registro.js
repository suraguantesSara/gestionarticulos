let currentStep = 0;
const steps = document.querySelectorAll(".step");
const nextButtons = document.querySelectorAll(".next");
const prevButtons = document.querySelectorAll(".prev");
const pedidoForm = document.getElementById("pedidoForm");
const mensajeUsuario = document.createElement("div");
mensajeUsuario.id = "mensajeUsuario";
document.body.insertBefore(mensajeUsuario, pedidoForm);

function mostrarMensaje(texto, tipo) {
    mensajeUsuario.textContent = texto;
    mensajeUsuario.className = tipo; // "error" o "success"
    setTimeout(() => mensajeUsuario.textContent = "", 3000);
}

function validarCampos(step) {
    let campos = steps[step].querySelectorAll("input, select");
    for (let campo of campos) {
        if (campo.required && campo.value.trim() === "") {
            mostrarMensaje(`⚠️ Por favor completa ${campo.previousElementSibling.textContent}.`, "error");
            return false;
        }
    }
    return true;
}

function showStep(step) {
    steps.forEach((s, index) => {
        s.classList.remove("active");
        if (index === step) s.classList.add("active");
    });
}

nextButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (validarCampos(currentStep) && currentStep < steps.length - 1) {
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

// 📌 Validación antes de enviar el formulario
pedidoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (validarCampos(currentStep)) {
        mostrarMensaje("✅ Pedido enviado correctamente!", "success");
        setTimeout(() => pedidoForm.submit(), 2000);
    }
});

// Mostrar primera sección al cargar
showStep(currentStep);
