import { TodoItem } from "./todoItem.js";

type ItemCounts = {
    total: number,
    incomplete: number
}

/**
 * Representa una colección de elementos Todo.
 */
export class TodoCollection {
    /**
     * El siguiente ID que se asignará a un nuevo elemento Todo.
     */
    private nextId: number = 1;

    /**
     * Un mapa para almacenar elementos Todo con sus IDs como claves.
     */
    private itemMap = new Map<number, TodoItem>();

    /**
     * Crea una instancia de TodoCollection.
     * @param userName - El nombre del usuario.
     * @param todoItems - Una matriz opcional de elementos Todo iniciales.
     */
    constructor(public userName: string, public todoItems: TodoItem[] = []) {
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }

    /**
     * Agrega un nuevo elemento Todo a la colección.
     * @param task - La descripción de la tarea del nuevo elemento Todo.
     * @returns El ID del elemento Todo recién agregado.
     */
    addTodo(task: string): number {
        while (this.getTodoById(this.nextId)) { 
            this.nextId++;
        }

        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    }

    /**
     * Recupera un elemento Todo por su ID.
     * @param id - El ID del elemento Todo a recuperar.
     * @returns El elemento Todo con el ID especificado, o undefined si no se encuentra.
     */
    getTodoById(id: number): TodoItem {
        return this.itemMap.get(id);
    }

    /**
     * Recupera una matriz de elementos Todo.
     * @param includeComplete - Si se deben incluir los elementos Todo completados.
     * @returns Una matriz de elementos Todo.
     */
    getTodoItems(includeComplete: boolean): TodoItem[] {
        return [...this.itemMap.values()]
            .filter(item => includeComplete || !item.complete);
    }

    /**
     * Marca un elemento Todo como completo o incompleto.
     * @param id - El ID del elemento Todo a marcar.
     * @param complete - Si el elemento Todo está completo.
     */
    markComplete(id: number, complete: boolean) {
        const todoItem = this.getTodoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        }
    }

    /**
     * Elimina todos los elementos Todo completados de la colección.
     */
    removeComplete() {
        this.itemMap.forEach(item => {
            if (item.complete) {
                this.itemMap.delete(item.id);
            }
        })
    }

    /**
     * Obtiene los conteos de elementos Todo totales e incompletos.
     * @returns Un objeto que contiene los conteos totales e incompletos.
     */
    getItemCounts(): ItemCounts {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        };
    }
}