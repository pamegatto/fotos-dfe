# Clasificador de Fotos de recitales según el fotografo que capturó el momento 🤖

Este proyecto utiliza **Machine Learning** para reconocer fotos de recitales tomadas por distintos fotografos argnetinos que se especializan en retratar artistas en shows en vivos y reconocer su obra segun el enfoque, uso de luz, juego de contrastes y muchos otros aspectos que a simple vista no notamos, pero que ellos desde su subjetividad son capaces de repetir infinitas veces. Este modelo no va hacer público el dataset con que ha sido alimentado a fin de mantener la obra de los artistas al resguardo, 

## 🚀 Propósito y Visión
Este desarrollo nace de querer demostrar que los modelos de machine learning son capaces de diferenciar subjetividades y abstracciones segun grupos de personas.

## 🛠️ Tecnologías Utilizadas
* **Teachable Machine (Google):** Entrenamiento del modelo de Deep Learning.
* **TensorFlow.js:** Para la ejecución del modelo directamente en el navegador.
* **JavaScript (ES6+):** Lógica de integración y manipulación del DOM.
* **HTML5 / CSS3:** Interfaz de usuario.

## 📊 El Modelo
El modelo fue entrenado con un dataset de aproximadamente **180** imágenes distribuidas en **2** clases:
1. **Fotográfo A:** Recitales
2. **Fotográfo B** Recitales
3. ...

Se priorizó la diversidad en la captura de datos para reducir sesgos y asegurar que el modelo funcione bajo diferentes condiciones de iluminación.
