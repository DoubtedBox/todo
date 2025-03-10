/**
 * Representa un solo elemento de la lista de tareas.
 */
export class TodoItem {
    /**
     * Crea una instancia de TodoItem.
     * @param id - El identificador único para el elemento de la lista de tareas.
     * @param task - La descripción de la tarea.
     * @param complete - El estado de finalización del elemento de la lista de tareas. Por defecto es false.
     */
    constructor(id, task, complete = false) {
        this.id = id;
        this.task = task;
        this.complete = complete;
        // no se requieren declaraciones
    }
    /**
     * Imprime los detalles del elemento de la lista de tareas en la consola.
     */
    printDetails() {
        console.log(`${this.id}\t${this.task} ${this.complete
            ? "\t(completado)" : ""}`);
    }
}
