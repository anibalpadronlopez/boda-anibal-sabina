// Inicializamos el mapa centrado en Tenerife
const map = L.map('map').setView([28.32, -16.52], 10);

// Capa visual del mapa (Estilo estándar de OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
}).addTo(map);

// Marcador temporal (Lo ajustaremos cuando se decidan por Finca San Miguel, Las Molinas, etc.)
const marker = L.marker([28.4385, -16.4719]).addTo(map);

// Mensaje al hacer clic en el pin
marker.bindPopup("<b>Destino: Tenerife</b><br>Pronto desvelaremos la Finca exacta.").openPopup();