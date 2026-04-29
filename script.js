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
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }
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
    
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(0) + "%";
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}

// Cargar el modelo apenas carga la web
loadModel();
