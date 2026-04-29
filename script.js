const URL = "https://teachablemachine.withgoogle.com/models/GkYYdDd1A/";

let model, labelContainer, maxPredictions;

// Cargamos el modelo al abrir la página
async function loadModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

// Función que se activa cuando el usuario elige una imagen
async function handleImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const imgElement = document.getElementById("document-preview");
    const placeholder = document.getElementById("placeholder-text");

    // Mostrar la imagen en pantalla
    const reader = new FileReader();
    reader.onload = async function(e) {
        imgElement.src = e.target.result;
        imgElement.style.display = "block";
        placeholder.style.display = "none";
        
        // Esperar a que la imagen cargue para predecir
        imgElement.onload = async () => {
            await predict(imgElement);
        };
    }
    reader.readAsDataURL(file);
}
async function predict(imageElement) {
    if (!model) await loadModel();

    const prediction = await model.predict(imageElement);
    
    // Limpiamos el contenedor
    labelContainer.innerHTML = "<h3>Autores Identificados:</h3>"; 

    // NO usamos .sort(), así se mantiene el orden de las clases de Teachable Machine
    prediction.forEach(p => {
        const percentage = (p.probability * 100).toFixed(0);
        
        const item = document.createElement("div");
        item.style.marginBottom = "15px";
        item.innerHTML = `
            <div class="prediction-item">
                <span style="font-weight: bold;">${p.className}</span>
                <span>${percentage}%</span>
            </div>
            <div class="prediction-bar">
                <div class="prediction-progress" style="width: ${percentage}%; background: #6366f1"></div>
            </div>
        `;
        labelContainer.appendChild(item);
    });
}

// Cargar el modelo apenas carga la web
loadModel();
