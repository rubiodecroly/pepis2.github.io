// Configura el tiempo inicial en segundos
let timeLeft = 90; // 1 minuto (puedes ajustar este valor)
const countdownElement = document.getElementById("countdown-timer");
const explosionElement = document.getElementById("explosion");
const failureMessageElement = document.getElementById("fail-message");
const retryButton = document.getElementById("retry-button");
const welcomeScreen = document.getElementById("welcome-screen");
const startButton = document.getElementById("start-button");
const player = document.querySelector(".player");

// Oculta el juego inicialmente
document.querySelector("header").style.display = "none";
document.querySelector(".container").style.display = "none";

// Oculta la imagen de fondo inicialmente
document.body.style.backgroundImage = "none"; // Oculta la imagen de fondo

// Variable para almacenar el intervalo del contador
let interval;

// Función para comenzar el juego
function startGame() {
    welcomeScreen.style.display = "none"; // Oculta la pantalla de bienvenida
    document.querySelector("header").style.display = "block"; // Muestra el header
    document.querySelector(".container").style.display = "flex"; // Muestra el contenedor del juego
    
    // Restaura la imagen de fondo
    document.body.style.backgroundImage = "url('images/fondo.jpg')"; 
    document.body.style.backgroundSize = "50%"; 
    document.body.style.backgroundPosition = "center 20%"; 
    document.body.style.backgroundRepeat = "no-repeat"; 
    document.body.style.backgroundAttachment = "fixed"; 

    // Reinicia el tiempo
    timeLeft = 90; 
    countdownElement.innerText = "01:30"; 

    // Inicia el contador
    interval = setInterval(updateCountdown, 1000);
}

// Evento para el botón de "Jugar"
startButton.addEventListener("click", startGame);

// Función para actualizar el contador
function updateCountdown() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    countdownElement.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft <= 0) {
        clearInterval(interval);
        countdownElement.innerText = "00:00";
        explosionElement.style.display = "block";
        failureMessageElement.style.display = "block";
        retryButton.style.display = "block";
        console.log("¡Tiempo agotado! Has fracasado.");
    } else {
        timeLeft--;
    }
}

// Evento para el botón de reintento
retryButton.addEventListener("click", recargarPagina);

function recargarPagina() {
    location.reload();  // Recarga la página actual
}

// Definir las posiciones manuales (aquí puedes configurar la posición del jugador)
let manualPosX = -50; // Posición X del jugador (en píxeles)
let manualPosY = -100; // Posición Y del jugador (en píxeles)
const playerImage = player.querySelector('img'); // Obtiene la imagen dentro del jugador
let walkingGif = "caminando.gif"; // Ruta al GIF de caminata
let staticImage = "images/imagen_estatica.png"; // Ruta a la imagen estática

// Arrastrar el objeto
document.addEventListener('DOMContentLoaded', () => {
    const risks = document.querySelectorAll('.risk');
    const dropZone1 = document.getElementById('drop-zone1');
    const dropZone2 = document.getElementById('drop-zone2');
    const dropZone3 = document.getElementById('drop-zone3');
    const dropZone4 = document.getElementById('drop-zone4');
    const dropZone5 = document.getElementById('drop-zone5');
    const dropZone6 = document.getElementById('drop-zone6');
    const counter = document.getElementById('contador');
    const victoryScreen = document.getElementById('victory-screen');
    const nextLevelButton = document.getElementById('next-level-button');
    let score = 0;

    // Variable para verificar si la imagen ha sido soltada correctamente
    let isImageDropped = false;

    // Suponiendo que el elemento con la clase .cajonbien es el que quieres hacer visible
    const cajonBien = document.querySelector('.cajonbien');

    // Función para manejar el arrastre
    risks.forEach(risk => {
        risk.addEventListener('dragstart', (e) => {
            // Verifica si el riesgo ya ha sido arrastrado
            if (e.target.classList.contains('dragged')) {
                e.preventDefault(); // Evita que se arrastre si ya fue soltado
            } else {
                e.dataTransfer.setData('text/plain', risk.alt);
                e.dataTransfer.setData('posX', e.clientX);
                e.dataTransfer.setData('posY', e.clientY);
            }
        });
    });

    // Función para hacer visible el elemento
    function hacerVisible() {
        cajonBien.style.visibility = 'visible';  // Cambia la visibilidad a visible
    }

    dropZone1.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    dropZone1.addEventListener('drop', (e) => {
        e.preventDefault();
        const riskType = e.dataTransfer.getData('text/plain');
    
        // Si el riesgo no es el esperado, muestra el mensaje de error
        if (!riskType.includes('Riesgo 1')) { // Cambia 'Riesgo' por 'Señal' o el texto que identifique las señales
            mostrarError();
            return; // Detiene la ejecución si no es la zona correcta
        }
    
        // Si el riesgo es el esperado
        const draggedElement = document.querySelector(`[alt="${riskType}"]`);
        draggedElement.classList.add('dragged');
        score++;
        counter.textContent = `Puntos ${score}/6`;
    
        // Marca que la imagen ha sido soltada en la zona
        isImageDropped = true;
    
        // Mueve al "player" a la posición manual que has configurado
        if (isImageDropped) {
            movePlayerToCajones(manualPosX, manualPosY);
        }
    
        // Ocultar el riesgo después de 4 segundos
    setTimeout(() => {
        dropZone1.innerHTML = '';  // Elimina la imagen de la zona
        hacerVisible();
    }, 4000); // 4000 milisegundos = 4 segundos


        if (score === 6) {
            setTimeout(() => {
                victoryScreen.style.display = 'flex';
                clearInterval(interval); // Detiene el contador  
            }, 1000); // 4000 milisegundos = 4 segundos   
        }
    });
    
    // Función para mostrar el mensaje de error
    function mostrarError() {
        const mensaje = document.getElementById("error-message");
    
        // Muestra el mensaje de error
        mensaje.classList.remove("hidden");
        mensaje.style.opacity = 1;
    
        // Después de 1.5 segundos, oculta el mensaje
        setTimeout(function() {
            mensaje.style.opacity = 0;
            // Espera un segundo más para eliminar el mensaje completamente
            setTimeout(function() {
                mensaje.classList.add("hidden");
            }, 500); // Medio segundo para que se desvanezca
        }, 1500); // 1.5 segundos
    }

    dropZone2.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    dropZone2.addEventListener('drop', (e) => {
        e.preventDefault();
        const riskType = e.dataTransfer.getData('text/plain');
    
        // Si el riesgo no es el esperado, muestra el mensaje de error
        if (!riskType.includes('Riesgo 2')) { // Cambia 'Riesgo' por 'Señal' o el texto que identifique las señales
            mostrarError();
            return; // Detiene la ejecución si no es la zona correcta
        }
    
        // Si el riesgo es el esperado
        const draggedElement = document.querySelector(`[alt="${riskType}"]`);
        draggedElement.classList.add('dragged');
        score++;
        counter.textContent = `Puntos ${score}/6`;
    
        // Marca que la imagen ha sido soltada en la zona
        isImageDropped = true;
    
        // Mueve al "player" a la posición manual que has configurado
        if (isImageDropped) {
            movePlayerToCharco(manualPosX, manualPosY, dropZone2);  // Pasa la dropzone como parámetro
        }
    
        // Eliminar la imagen de la dropzone después de la animación
        setTimeout(() => {
            dropZone2.style.display = 'none';
        }, 4000); // 4000 milisegundos = 4 segundos
    
        // Si el puntaje llega a 6, muestra la pantalla de victoria
        if (score === 6) {
            setTimeout(() => {
                victoryScreen.style.display = 'flex';
                clearInterval(interval); // Detiene el contador  
            }, 1000); // 4000 milisegundos = 4 segundos   
        }
    });
    
    // Función para mostrar el mensaje de error
    function mostrarError() {
        const mensaje = document.getElementById("error-message");
    
        // Muestra el mensaje de error
        mensaje.classList.remove("hidden");
        mensaje.style.opacity = 1;
    
        // Después de 1.5 segundos, oculta el mensaje
        setTimeout(function() {
            mensaje.style.opacity = 0;
            // Espera un segundo más para eliminar el mensaje completamente
            setTimeout(function() {
                mensaje.classList.add("hidden");
            }, 500); // Medio segundo para que se desvanezca
        }, 1500); // 1.5 segundos
    }
    
    dropZone3.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    dropZone3.addEventListener('drop', (e) => {
        e.preventDefault();
        const riskType = e.dataTransfer.getData('text/plain');
    
        // Si el riesgo no es el esperado, muestra el mensaje de error
        if (!riskType.includes('Riesgo 3')) { // Cambia 'Riesgo' por 'Señal' o el texto que identifique las señales
            mostrarError();
            return; // Detiene la ejecución si no es la zona correcta
        }
    
        // Si el riesgo es el esperado
        const draggedElement = document.querySelector(`[alt="${riskType}"]`);
        draggedElement.classList.add('dragged');
        score++;
        counter.textContent = `Puntos ${score}/6`;
    
        // Marca que la imagen ha sido soltada en la zona
        isImageDropped = true;
    
        // Mueve al "player" a la posición manual que has configurado
        if (isImageDropped) {
            movePlayerToPapelera(manualPosX, manualPosY, dropZone3);  // Pasa la dropzone como parámetro
        }
    
        // Eliminar la imagen de la dropzone después de la animación
        setTimeout(() => {
            dropZone3.style.display = 'none';
        }, 4000); // 4000 milisegundos = 4 segundos
    
        // Si el puntaje llega a 6, muestra la pantalla de victoria
        if (score === 6) {
            setTimeout(() => {
                victoryScreen.style.display = 'flex';
                clearInterval(interval); // Detiene el contador  
            }, 1000); // 4000 milisegundos = 4 segundos    
        }
    });
    
    
    // Función para mostrar el mensaje de error
    function mostrarError() {
        const mensaje = document.getElementById("error-message");
    
        // Muestra el mensaje de error
        mensaje.classList.remove("hidden");
        mensaje.style.opacity = 1;
    
        // Después de 1.5 segundos, oculta el mensaje
        setTimeout(function() {
            mensaje.style.opacity = 0;
            // Espera un segundo más para eliminar el mensaje completamente
            setTimeout(function() {
                mensaje.classList.add("hidden");
            }, 500); // Medio segundo para que se desvanezca
        }, 1500); // 1.5 segundos
    }

    dropZone4.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    dropZone4.addEventListener('drop', (e) => {
        e.preventDefault();
        const riskType = e.dataTransfer.getData('text/plain');
    
        // Si el riesgo no es el esperado, muestra el mensaje de error
        if (!riskType.includes('Riesgo 4')) { // Cambia 'Riesgo' por 'Señal' o el texto que identifique las señales
            mostrarError();
            return; // Detiene la ejecución si no es la zona correcta
        }
    
        // Si el riesgo es el esperado
        const draggedElement = document.querySelector(`[alt="${riskType}"]`);
        draggedElement.classList.add('dragged');
        score++;
        counter.textContent = `Puntos ${score}/6`;
    
        // Marca que la imagen ha sido soltada en la zona
        isImageDropped = true;
    
        // Mueve al "player" a la posición manual que has configurado
        if (isImageDropped) {
            movePlayerToCafe(manualPosX, manualPosY, dropZone4);  // Pasa la dropzone como parámetro
        }
    
        // Eliminar la imagen de la dropzone después de la animación
        setTimeout(() => {
            dropZone4.style.display = 'none';
        }, 4000); // 4000 milisegundos = 4 segundos
    
        // Si el puntaje llega a 6, muestra la pantalla de victoria
        if (score === 6) {
            setTimeout(() => {
                victoryScreen.style.display = 'flex';
                clearInterval(interval); // Detiene el contador  
            }, 1000); // 4000 milisegundos = 4 segundos
        }
    });

    // Función para mostrar el mensaje de error
    function mostrarError() {
        const mensaje = document.getElementById("error-message");
    
        // Muestra el mensaje de error
        mensaje.classList.remove("hidden");
        mensaje.style.opacity = 1;
    
        // Después de 1.5 segundos, oculta el mensaje
        setTimeout(function() {
            mensaje.style.opacity = 0;
            // Espera un segundo más para eliminar el mensaje completamente
            setTimeout(function() {
                mensaje.classList.add("hidden");
            }, 500); // Medio segundo para que se desvanezca
        }, 1500); // 1.5 segundos
    }

    dropZone5.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    dropZone5.addEventListener('drop', (e) => {
        e.preventDefault();
    
        const riskType = e.dataTransfer.getData('text/plain');
    
        // Si el riesgo no es el esperado, muestra el mensaje de error
        if (!riskType.includes('Riesgo 5')) { // Cambia 'Riesgo' por 'Señal' o el texto que identifique las señales
            mostrarError();
            return; // Detiene la ejecución si no es la zona correcta
        }
    
        // Si el riesgo es el esperado
        const draggedElement = document.querySelector(`[alt="${riskType}"]`);
        draggedElement.classList.add('dragged');
        score++;
        counter.textContent = `Puntos ${score}/6`;
    
        // Marca que la imagen ha sido soltada en la zona
        isImageDropped = true;
    
        // Mueve al "player" a la posición manual que has configurado
        if (isImageDropped) {
            movePlayerToEnchufes(manualPosX, manualPosY, dropZone5);  // Pasa la dropzone como parámetro
        }
    
        // Eliminar la imagen de la dropzone después de la animación
        setTimeout(() => {
            dropZone5.style.display = 'none';
        }, 4000); // 4000 milisegundos = 4 segundos
    
        // Si el puntaje llega a 6, muestra la pantalla de victoria
        if (score === 6) {
            setTimeout(() => {
                victoryScreen.style.display = 'flex';
                clearInterval(interval); // Detiene el contador  
            }, 1000); // 4000 milisegundos = 4 segundos
        }
    });

    // Función para mostrar el mensaje de error
    function mostrarError() {
        const mensaje = document.getElementById("error-message");
    
        // Muestra el mensaje de error
        mensaje.classList.remove("hidden");
        mensaje.style.opacity = 1;
    
        // Después de 1.5 segundos, oculta el mensaje
        setTimeout(function() {
            mensaje.style.opacity = 0;
            // Espera un segundo más para eliminar el mensaje completamente
            setTimeout(function() {
                mensaje.classList.add("hidden");
            }, 500); // Medio segundo para que se desvanezca
        }, 1500); // 1.5 segundos
    }

    dropZone6.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    dropZone6.addEventListener('drop', (e) => {
        e.preventDefault();
        const riskType = e.dataTransfer.getData('text/plain');
    
        // Si el riesgo no es el esperado, muestra el mensaje de error
        if (!riskType.includes('Riesgo 6')) { // Cambia 'Riesgo' por 'Señal' o el texto que identifique las señales
            mostrarError();
            return; // Detiene la ejecución si no es la zona correcta
        }
    
        // Si el riesgo es el esperado
        const draggedElement = document.querySelector(`[alt="${riskType}"]`);
        draggedElement.classList.add('dragged');
        score++;
        counter.textContent = `Puntos ${score}/6`;
    
        // Marca que la imagen ha sido soltada en la zona
        isImageDropped = true;
    
        // Mueve al "player" a la posición manual que has configurado
        if (isImageDropped) {
            movePlayerToPapeles(manualPosX, manualPosY, dropZone6);  // Pasa la dropzone como parámetro
        }
    
        // Eliminar la imagen de la dropzone después de la animación
        setTimeout(() => {
            dropZone6.style.display = 'none';
        }, 4000); // 4000 milisegundos = 4 segundos
    
        // Si el puntaje llega a 6, muestra la pantalla de victoria
        if (score === 6) {
            setTimeout(() => {
                victoryScreen.style.display = 'flex';
                clearInterval(interval); // Detiene el contador  
            }, 1000); // 4000 milisegundos = 4 segundos
               
        }
    });
    
    // Función para mostrar el mensaje de error
    function mostrarError() {
        const mensaje = document.getElementById("error-message");
    
        // Muestra el mensaje de error
        mensaje.classList.remove("hidden");
        mensaje.style.opacity = 1;
    
        // Después de 1.5 segundos, oculta el mensaje
        setTimeout(function() {
            mensaje.style.opacity = 0;
            // Espera un segundo más para eliminar el mensaje completamente
            setTimeout(function() {
                mensaje.classList.add("hidden");
            }, 500); // Medio segundo para que se desvanezca
        }, 1500); // 1.5 segundos
    }

    // Botón para pasar al siguiente nivel
    nextLevelButton.addEventListener('click', () => {
        victoryScreen.style.display = 'none';
        alert('¡Nivel 2 cargado!');
    });
});

// Función para mover al "player" hasta la imagen soltada
function movePlayerToCajones(targetX, targetY) {

 // Deshabilitar el arrastre de todos los riesgos
 const risks = document.querySelectorAll('.risk');
 risks.forEach(risk => {
     risk.setAttribute('draggable', 'false');
 });

    // Guardar el tamaño original del jugador
    const originalWidth = player.offsetWidth + "px";
    const originalHeight = player.offsetHeight + "px";
    player.style.position = "absolute"; 

    // Cambiar a la imagen de caminata
    document.getElementById('player').src = 'images/walkingGif.gif';

    // Fijar el tamaño antes de la animación
    player.style.width = originalWidth;
    player.style.height = originalHeight;
    player.style.position = "absolute";

    // Aplicar transformación suave sin afectar el tamaño
    player.style.transition = "transform 3s linear";
    player.style.transform = `translate(-130px, -30px) scale(1)`;

    // Detener la animación cuando llega al destino
    setTimeout(() => {
        document.getElementById('player').src = 'images/player.png'; // Volver a la imagen estática
        player.style.animation = "none"; // Eliminar cualquier animación activa
        risks.forEach(risk => {
            if (!risk.classList.contains('dragged')) {
                risk.setAttribute('draggable', 'true');
            }
        });
    }, 3000); // Tiempo de la transición
}

// Función para mover al "player" hasta la imagen soltada
function movePlayerToCharco(targetX, targetY) {
 // Deshabilitar el arrastre de todos los riesgos
 const risks = document.querySelectorAll('.risk');
 risks.forEach(risk => {
     risk.setAttribute('draggable', 'false');
 });

    // Guardar el tamaño original del jugador
    const originalWidth = player.offsetWidth + "px";
    const originalHeight = player.offsetHeight + "px";
    player.style.position = "absolute"; 

    // Cambiar a la imagen de caminata
    document.getElementById('player').src = 'walkingGif.gif';

    // Fijar el tamaño antes de la animación
    player.style.width = originalWidth;
    player.style.height = originalHeight;
    player.style.position = "absolute";

    // Aplicar transformación suave sin afectar el tamaño
    player.style.transition = "transform 3s linear";
    player.style.transform = `translate(-102px, 210px) scale(1)`;

    // Detener la animación cuando llega al destino
    setTimeout(() => {
        document.getElementById('player').src = 'images/player.png'; // Volver a la imagen estática
        player.style.animation = "none"; // Eliminar cualquier animación activa

        risks.forEach(risk => {
            if (!risk.classList.contains('dragged')) {
                risk.setAttribute('draggable', 'true');
            }
        });
    }, 3000); // Tiempo de la transición
}

// Función para mover al "player" hasta la imagen soltada
function movePlayerToCafe(targetX, targetY) {

     // Deshabilitar el arrastre de todos los riesgos
     const risks = document.querySelectorAll('.risk');
     risks.forEach(risk => {
         risk.setAttribute('draggable', 'false');
     });

    // Guardar el tamaño original del jugador
    const originalWidth = player.offsetWidth + "px";
    const originalHeight = player.offsetHeight + "px";
    player.style.position = "absolute"; 

    // Cambiar a la imagen de caminata
    document.getElementById('player').src = 'images/walkingGif.gif';
    
    // Fijar el tamaño antes de la animación
    player.style.width = originalWidth;
    player.style.height = originalHeight;
    player.style.position = "absolute";
    
    // Aplicar transformación suave sin afectar el tamaño
    player.style.transition = "transform 3s linear";
    player.style.transform = `translate(-8px, 110px) scale(1)`;

    // Detener la animación cuando llega al destino
    setTimeout(() => {
        document.getElementById('player').src = 'images/player.png'; // Volver a la imagen estática
        player.style.animation = "none"; // Eliminar cualquier animación activa
        risks.forEach(risk => {
            if (!risk.classList.contains('dragged')) {
                risk.setAttribute('draggable', 'true');
            }
        });
    }, 3000); // Tiempo de la transición
}

// Función para mover al "player" hasta la imagen soltada
function movePlayerToPapelera(targetX, targetY) {

    // Deshabilitar el arrastre de todos los riesgos
    const risks = document.querySelectorAll('.risk');
    risks.forEach(risk => {
        risk.setAttribute('draggable', 'false');
    });
    
    // Guardar el tamaño original del jugador
    const originalWidth = player.offsetWidth + "px";
    const originalHeight = player.offsetHeight + "px";
    player.style.position = "absolute"; 

    // Cambiar a la imagen de caminata
    document.getElementById('player').src = 'images/walkingGif.gif';
    
    // Fijar el tamaño antes de la animación
    player.style.width = originalWidth;
    player.style.height = originalHeight;
    player.style.position = "absolute";
    
    // Aplicar transformación suave sin afectar el tamaño
    player.style.transition = "transform 3s linear";
    player.style.transform = `translate(-230px, 110px) scale(1)`;

    // Detener la animación cuando llega al destino
    setTimeout(() => {
        document.getElementById('player').src = 'images/player.png'; // Volver a la imagen estática
        player.style.animation = "none"; // Eliminar cualquier animación activa

        risks.forEach(risk => {
            if (!risk.classList.contains('dragged')) {
                risk.setAttribute('draggable', 'true');
            }
        });
    }, 3000); // Tiempo de la transición
}

// Función para mover al "player" hasta la imagen soltada
function movePlayerToCharco(targetX, targetY) {

 // Deshabilitar el arrastre de todos los riesgos
 const risks = document.querySelectorAll('.risk');
 risks.forEach(risk => {
     risk.setAttribute('draggable', 'false');
 });

    // Guardar el tamaño original del jugador
    const originalWidth = player.offsetWidth + "px";
    const originalHeight = player.offsetHeight + "px";
    player.style.position = "absolute"; 

    // Cambiar a la imagen de caminata
    document.getElementById('player').src = 'images/walkingGif.gif';

    // Fijar el tamaño antes de la animación
    player.style.width = originalWidth;
    player.style.height = originalHeight;
    player.style.position = "absolute";

    // Aplicar transformación suave sin afectar el tamaño
    player.style.transition = "transform 3s linear";
    player.style.transform = `translate(-102px, 210px) scale(1)`;

    // Detener la animación cuando llega al destino
    setTimeout(() => {
        document.getElementById('player').src = 'images/player.png'; // Volver a la imagen estática
        player.style.animation = "none"; // Eliminar cualquier animación activa

        risks.forEach(risk => {
            if (!risk.classList.contains('dragged')) {
                risk.setAttribute('draggable', 'true');
            }
        });
   }, 3000); // Tiempo de la transición
}

// Función para mover al "player" hasta la imagen soltada
function movePlayerToCafe(targetX, targetY) {

     // Deshabilitar el arrastre de todos los riesgos
     const risks = document.querySelectorAll('.risk');
     risks.forEach(risk => {
         risk.setAttribute('draggable', 'false');
     });

    // Guardar el tamaño original del jugador
    const originalWidth = player.offsetWidth + "px";
    const originalHeight = player.offsetHeight + "px";
    player.style.position = "absolute"; 

    // Cambiar a la imagen de caminata
    document.getElementById('player').src = 'images/walkingGif.gif';

    // Fijar el tamaño antes de la animación
    player.style.width = originalWidth;
    player.style.height = originalHeight;
    player.style.position = "absolute";

    // Aplicar transformación suave sin afectar el tamaño
    player.style.transition = "transform 3s linear";
    player.style.transform = `translate(-8px, 110px) scale(1)`;

    // Detener la animación cuando llega al destino
    setTimeout(() => {
        document.getElementById('player').src = 'images/player.png'; // Volver a la imagen estática
        player.style.animation = "none"; // Eliminar cualquier animación activa
        risks.forEach(risk => {
            if (!risk.classList.contains('dragged')) {
                risk.setAttribute('draggable', 'true');
            }
        });
    }, 3000); // Tiempo de la transición
}

// Función para mover al "player" hasta la imagen soltada
function movePlayerToPapelera(targetX, targetY) {

    // Deshabilitar el arrastre de todos los riesgos
    const risks = document.querySelectorAll('.risk');
    risks.forEach(risk => {
        risk.setAttribute('draggable', 'false');
    });
    
    // Guardar el tamaño original del jugador
    const originalWidth = player.offsetWidth + "px";
    const originalHeight = player.offsetHeight + "px";
    player.style.position = "absolute"; 

    // Cambiar a la imagen de caminata
    document.getElementById('player').src = 'images/walkingGif.gif';

    // Fijar el tamaño antes de la animación
    player.style.width = originalWidth;
    player.style.height = originalHeight;
    player.style.position = "absolute";
    
    // Aplicar transformación suave sin afectar el tamaño
    player.style.transition = "transform 3s linear";
    player.style.transform = `translate(-230px, 110px) scale(1)`;

    // Detener la animación cuando llega al destino
    setTimeout(() => {
        document.getElementById('player').src = 'images/player.png'; // Volver a la imagen estática
        player.style.animation = "none"; // Eliminar cualquier animación activa
        risks.forEach(risk => {
            if (!risk.classList.contains('dragged')) {
                risk.setAttribute('draggable', 'true');
            }
        });
    }, 3000); // Tiempo de la transición
}


// Función para mover al "player" hasta la imagen soltada
function movePlayerToEnchufes(targetX, targetY) {
  
     // Deshabilitar el arrastre de todos los riesgos
    const risks = document.querySelectorAll('.risk');
    risks.forEach(risk => {
        risk.setAttribute('draggable', 'false');
    });

    // Guardar el tamaño original del jugador
    const originalWidth = player.offsetWidth + "px";
    const originalHeight = player.offsetHeight + "px";
    player.style.position = "absolute"; 

    // Cambiar a la imagen de caminata
    document.getElementById('player').src = 'images/walkingGif.gif';

    // Fijar el tamaño antes de la animación
    player.style.width = originalWidth;
    player.style.height = originalHeight;
    player.style.position = "absolute";

    // Aplicar transformación suave sin afectar el tamaño
    player.style.transition = "transform 2.9s linear";
    player.style.transform = `translate(150px, 90px) scale(1)`;

    // Detener la animación cuando llega al destino y borrar la imagen de la dropzone
    setTimeout(() => {
        document.getElementById('player').src = 'images/player.png'; // Volver a la imagen estática
        player.style.animation = "none"; // Eliminar cualquier animación activa

        // Habilitar nuevamente el arrastre de los riesgos
        risks.forEach(risk => {
            if (!risk.classList.contains('dragged')) {
                risk.setAttribute('draggable', 'true');
            }
        });
    }, 3000); // Tiempo de la transición
}

function movePlayerToPapeles(targetX, targetY) {

    // Deshabilitar el arrastre de todos los riesgos
    const risks = document.querySelectorAll('.risk');
    risks.forEach(risk => {
        risk.setAttribute('draggable', 'false');
    });
   
       // Guardar el tamaño original del jugador
       const originalWidth = player.offsetWidth + "px";
       const originalHeight = player.offsetHeight + "px";
       player.style.position = "absolute"; 
   
       // Cambiar a la imagen de caminata
       document.getElementById('player').src = 'images/walkingGif.gif';
   
       // Fijar el tamaño antes de la animación
       player.style.width = originalWidth;
       player.style.height = originalHeight;
       player.style.position = "absolute";
       
       // Aplicar transformación suave sin afectar el tamaño
       player.style.transition = "transform 3s linear";
       player.style.transform = `translate(-102px, 210px) scale(1)`;
   
       // Detener la animación cuando llega al destino
       setTimeout(() => {
           document.getElementById('player').src = 'images/player.png'; // Volver a la imagen estática
           player.style.animation = "none"; // Eliminar cualquier animación activa
           risks.forEach(risk => {
               if (!risk.classList.contains('dragged')) {
                   risk.setAttribute('draggable', 'true');
               }
           });
       }, 3000); // Tiempo de la transición
   }