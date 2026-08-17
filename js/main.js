document.addEventListener("DOMContentLoaded", () => {
    
    // --- ANIMACIÓN DE ENTRADA (SOBRE Y AVIÓN) ---
    const openSealBtn = document.getElementById("open-seal");
    const envelopeScreen = document.getElementById("envelope-screen");
    const planeTransition = document.getElementById("plane-transition");
    const planeIcon = document.querySelector(".plane-icon");
    const mainContent = document.getElementById("main-content");

    openSealBtn.addEventListener("click", () => {
        // 1. Desvanecer el sobre
        envelopeScreen.style.opacity = "0";
        
        setTimeout(() => {
            envelopeScreen.style.display = "none";
            
            // 2. Mostrar animación del avión
            planeTransition.style.display = "block";
            planeIcon.classList.add("fly-animation");
            
            setTimeout(() => {
                // 3. Ocultar avión y mostrar contenido web
                planeTransition.style.display = "none";
                mainContent.classList.remove("hidden");
                // Forzar un pequeño scroll al inicio por si acaso
                window.scrollTo(0, 0);
            }, 2500); // El tiempo que tarda el avión (coincide con CSS)

        }, 1000); // El tiempo de fade out del sobre
    });


    // --- CUENTAS ATRÁS ---
    // Fecha de la Boda: 21 Agosto 2027 a las 18:00
    const weddingDate = new Date("August 21, 2027 18:00:00").getTime();
    
    // Fecha Límite RSVP: 21 Febrero 2027 a las 23:59
    const rsvpDate = new Date("February 21, 2027 23:59:59").getTime();

    function updateCountdowns() {
        const now = new Date().getTime();

        // Calcular boda
        const wDistance = weddingDate - now;
        if (wDistance > 0) {
            document.getElementById("w-days").innerText = Math.floor(wDistance / (1000 * 60 * 60 * 24));
            document.getElementById("w-hours").innerText = Math.floor((wDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById("w-mins").innerText = Math.floor((wDistance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById("w-secs").innerText = Math.floor((wDistance % (1000 * 60)) / 1000);
        }

        // Calcular RSVP
        const rDistance = rsvpDate - now;
        if (rDistance > 0) {
            document.getElementById("r-days").innerText = Math.floor(rDistance / (1000 * 60 * 60 * 24));
            document.getElementById("r-hours").innerText = Math.floor((rDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById("r-mins").innerText = Math.floor((rDistance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById("r-secs").innerText = Math.floor((rDistance % (1000 * 60)) / 1000);
        } else {
            // Si ya pasó la fecha tope de confirmación
            document.querySelector(".rsvp-deadline").innerHTML = "<p>El plazo de confirmación ha finalizado.</p>";
        }
    }

    // Actualizar cada segundo
    setInterval(updateCountdowns, 1000);
    updateCountdowns(); // Ejecutar una vez al inicio
});