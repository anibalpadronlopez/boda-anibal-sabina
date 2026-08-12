document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("rsvp-modal");
    const btnOpen = document.getElementById("btn-open-modal");
    const closeBtn = document.querySelector(".close-btn");
    const btnAddAcompanante = document.getElementById("btn-add-acompanante");
    const acompanantesContainer = document.getElementById("acompanantes-container");
    const form = document.getElementById("rsvp-form");
    const formMsg = document.getElementById("form-msg");

    let numAcompanantes = 0;

    // Abrir y cerrar modal
    btnOpen.addEventListener("click", () => modal.classList.remove("hidden"));
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("hidden");
    });

    // Añadir acompañantes dinámicamente
    btnAddAcompanante.addEventListener("click", () => {
        numAcompanantes++;
        const div = document.createElement("div");
        div.className = "form-group";
        div.innerHTML = `
            <label>Nombre del Acompañante ${numAcompanantes}:</label>
            <input type="text" name="acompanante_${numAcompanantes}" class="acompanante-input" placeholder="Nombre y apellidos">
        `;
        acompanantesContainer.appendChild(div);
    });

    // Enviar formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // --- AQUÍ COLOCAREMOS LA URL DEL SCRIPT DE GOOGLE SHEETS LUEGO ---
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxsbQy591RWqCKM8HV3RiUD9nTfB9VYwS9UOwWmE38-t0lWFxRc_ZB8yvGB9v2zyy8/exec";
        
        // Recopilamos todos los acompañantes en un solo texto
        const inputsAcompanantes = document.querySelectorAll(".acompanante-input");
        let listaAcompanantes = [];
        inputsAcompanantes.forEach(input => {
            if(input.value.trim() !== "") listaAcompanantes.push(input.value.trim());
        });

        // Preparamos los datos
        const formData = new FormData();
        formData.append("nombre", document.getElementById("nombre").value);
        formData.append("asiste", document.getElementById("asiste").value);
        formData.append("acompanantes", listaAcompanantes.join(", "));
        formData.append("alergias", document.getElementById("alergias").value);
        formData.append("canciones", document.getElementById("canciones").value);

        const btnSubmit = document.getElementById("btn-submit");
        btnSubmit.textContent = "Procesando billete...";
        btnSubmit.disabled = true;

        fetch(SCRIPT_URL, { method: "POST", body: formData })
            .then(response => {
                formMsg.textContent = "¡Billete confirmado con éxito! Te esperamos.";
                formMsg.style.color = "green";
                formMsg.classList.remove("hidden");
                form.reset();
                acompanantesContainer.innerHTML = "";
                numAcompanantes = 0;
            })
            .catch(error => {
                formMsg.textContent = "Hubo un error en el sistema. Inténtalo de nuevo.";
                formMsg.style.color = "red";
                formMsg.classList.remove("hidden");
            })
            .finally(() => {
                btnSubmit.textContent = "Confirmar Billete";
                btnSubmit.disabled = false;
            });
    });
});