const URL = "https://teachablemachine.withgoogle.com/models/GkYYdDd1A/";
let model, labelContainer, maxPredictions;

// Cargamos el modelo al abrir la página
async function loadModel() {
    try {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        
        labelContainer = document.getElementById("label-container");
    } catch (error) {
        console.error("Error loading model:", error);
        alert("Error al cargar el modelo. Asegúrate de estar en un servidor HTTPS.");
    }
}

// Función que se activa cuando el usuario elige una imagen
async function handleImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const imgElement = document.getElementById("document-preview");
    
    // Mostrar la imagen en pantalla
    const reader = new FileReader();
    reader.onload = async function(e) {
        imgElement.src = e.target.result;
        imgElement.style.display = "block";
        
        // Esperar a que la imagen cargue para predecir
        imgElement.onload = async () => {
            await predict(imgElement);
        };
    }
    reader.readAsDataURL(file);
}

async function predict(imageElement) {
    if (!model) await loadModel(); // Asegura que el modelo esté cargado
    
    const prediction = await model.predict(imageElement);
    
    // Limpiar contenedor
    labelContainer.innerHTML = '';
    
    // Crear elemento para cada predicción
    for (let i = 0; i < maxPredictions; i++) {
        const percentage = (prediction[i].probability * 100).toFixed(0);
        const className = prediction[i].className;
        
        // Crear estructura HTML
        const itemDiv = document.createElement("div");
        itemDiv.className = "prediction-item";
        
        const labelDiv = document.createElement("div");
        labelDiv.className = "prediction-label";
        
        const nameSpan = document.createElement("span");
        nameSpan.className = "prediction-name";
        nameSpan.textContent = className;
        
        const percentageSpan = document.createElement("span");
        percentageSpan.className = "prediction-percentage";
        percentageSpan.textContent = percentage + "%";
        
        labelDiv.appendChild(nameSpan);
        labelDiv.appendChild(percentageSpan);
        
        const barContainer = document.createElement("div");
        barContainer.className = "prediction-bar-container";
        
        const bar = document.createElement("div");
        bar.className = "prediction-bar";
        
        barContainer.appendChild(bar);
        
        itemDiv.appendChild(labelDiv);
        itemDiv.appendChild(barContainer);
        
        labelContainer.appendChild(itemDiv);
        
        // Animar la barra después de un pequeño delay
        setTimeout(() => {
            bar.style.width = percentage + "%";
        }, 100 + (i * 150));
    }
}

// Cargar el modelo apenas carga la web
loadModel();
