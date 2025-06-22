/* Guarda este contenido como script.js */
document.addEventListener('DOMContentLoaded', () => {
    const violenciometroFill = document.querySelector('.violenciometro-fill');
    const listItems = document.querySelectorAll('.violenciometro-lists ul li');
    const resetButton = document.getElementById('resetButton');

    let totalPoints = 0;
    const selectedActions = new Set(); // Almacena el texto de las acciones seleccionadas

    // Calcular el total de puntos posibles sumando los data-points de todos los elementos
    const allPossiblePoints = Array.from(listItems).reduce((sum, item) => {
        const points = parseInt(item.dataset.points);
        return sum + (isNaN(points) ? 0 : points);
    }, 0);

    // Función para actualizar la barra del violenciometro
    function updateViolenciometro() {
        if (allPossiblePoints === 0) {
            violenciometroFill.style.width = '0%';
            console.warn("No hay puntos definidos para los elementos del violenciometro.");
            return;
        }

        const percentage = (totalPoints / allPossiblePoints) * 100;

        // Asegurarse de que el porcentaje esté entre 0 y 100
        const clampedPercentage = Math.max(0, Math.min(100, percentage));

        violenciometroFill.style.width = `${clampedPercentage}%`;

        // Para depuración:
        console.log(`Puntos actuales: ${totalPoints}`);
        console.log(`Porcentaje de llenado: ${clampedPercentage.toFixed(2)}%`);
    }

    // Función para manejar la selección/deselección de un item
    function toggleItemSelection(item) {
        const points = parseInt(item.dataset.points);
        const actionText = item.textContent.trim();

        if (isNaN(points)) {
            console.error(`Error: data-points no es un número válido para el elemento: "${actionText}"`);
            return;
        }

        if (selectedActions.has(actionText)) {
            // Si ya está seleccionado, deseleccionar
            selectedActions.delete(actionText);
            totalPoints -= points;
            item.classList.remove('selected');
        } else {
            // Si no está seleccionado, seleccionar
            selectedActions.add(actionText);
            totalPoints += points;
            item.classList.add('selected');
        }

        // Asegurarse de que totalPoints no sea negativo
        if (totalPoints < 0) {
            totalPoints = 0;
        }

        updateViolenciometro(); // Actualizar la barra después de cada cambio
    }

    // Asignar el event listener a cada item de la lista
    listItems.forEach(item => {
        item.addEventListener('click', () => toggleItemSelection(item));
    });

    // Event listener para el botón de reinicio
    resetButton.addEventListener('click', () => {
        totalPoints = 0; // Resetear puntos
        selectedActions.clear(); // Limpiar acciones seleccionadas
        listItems.forEach(item => {
            item.classList.remove('selected'); // Quitar la clase 'selected' de todos los items
        });
        updateViolenciometro(); // Actualizar la barra a 0%
        console.log("Violenciómetro reiniciado.");
    });

    // Inicializar la barra al cargar la página
    updateViolenciometro();
});
 


