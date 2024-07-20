(function () {
	const lat = document.getElementById('lat').textContent;
	const lng = document.getElementById('lng').textContent;
    const titulo = document.querySelector('titulo')
	const mapa = L.map('mapa').setView([lat, lng], 16);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapa);

    L.marker([lat, lng])
        .addTo(mapa)
        .bindPopup(titulo); 
})();
