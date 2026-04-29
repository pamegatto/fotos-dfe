const URL = "https://teachablemachine.withgoogle.com/models/GkYYdDd1A/"; 

let model, webcam, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Cargamos el modelo
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Configuración de la webcam
    const flip = true; 
    webcam = new tmImage.Webcam(400, 400, flip); 
    await webcam.setup(); 
    await webcam.play();
    window.requestAnimationFrame(loop);

    // --- MEJORA AQUÍ ---
    const container = document.getElementById("webcam-container");
    container.innerHTML = ""; // Esto limpia el texto "La cámara aparecerá aquí"
    container.appendChild(webcam.canvas);
    // -------------------

    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = ""; // Limpia por si acaso se toca el botón dos veces
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(0) + "%";
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}
