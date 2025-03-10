import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";

// Define el tipo para el elemento del contador y el elemento de la lista de tareas
const counterElement = document.getElementById('counter') as HTMLElement;
const todoListElement = document.getElementById('todoList') as HTMLElement;
const newTodoForm = document.getElementById('newTodoForm') as HTMLFormElement;
const taskInput = document.getElementById('taskInput') as HTMLInputElement;

// Inicializa los elementos de tareas y la colección
let todos: TodoItem[] = [
    new TodoItem(1, "Buy Flowers"), 
    new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"), 
    new TodoItem(4, "Call Joe", true)
];

let collection = new TodoCollection("Adam", todos);

// Actualiza el contador en la interfaz de usuario
function updateCounter() {
    counterElement.textContent = `${collection.userName}'s Todo List (${collection.getItemCounts().incomplete} items to do)`;
}

// Función para renderizar los elementos de tareas en la interfaz de usuario
function renderTodoItems(includeComplete: boolean = true) {
    todoListElement.innerHTML = ''; // Limpia la lista antes de renderizar
    collection.getTodoItems(includeComplete).forEach(item => {
        const listItem = document.createElement('div');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const itemText = document.createElement('span');
        itemText.textContent = item.task;
        if (item.complete) {
            itemText.classList.add('text-decoration-line-through'); // Opcional: estilo para tareas completadas
        }
        
        const completeButton = document.createElement('button');
        completeButton.className = item.complete ? 'btn btn-sm btn-outline-danger' : 'btn btn-sm btn-outline-success'; // Rojo si está completado, verde si no
        completeButton.innerHTML = item.complete ? '❌ Desmarcar' : '✅ Completar'; // Usar icono de "X" para desmarcar
        completeButton.onclick = () => {
            item.complete = !item.complete; // Cambia el estado de completado
            renderTodoItems(); // Re-renderiza la lista
            updateCounter(); // Actualiza el contador
        };
        

        listItem.appendChild(itemText);
        listItem.appendChild(completeButton);
        todoListElement.appendChild(listItem);
    });
}

// Event listener para agregar una nueva tarea
newTodoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Previene el envío del formulario
    const task = taskInput.value.trim();
    if (task) {
        collection.addTodo(task);
        taskInput.value = ''; // Limpia el input
        renderTodoItems(); // Re-renderiza los elementos de tareas
        updateCounter(); // Actualiza el contador
    }
});

// Event listeners para mostrar todas las tareas o solo las pendientes
document.getElementById('showAll')?.addEventListener('click', () => renderTodoItems(true));
document.getElementById('showPending')?.addEventListener('click', () => renderTodoItems(false));

// Event listener para eliminar tareas completadas
document.getElementById('removeComplete')?.addEventListener('click', () => {
    collection.removeComplete(); // Elimina las tareas completadas de la colección
    renderTodoItems(); // Re-renderiza los elementos de tareas
    updateCounter(); // Actualiza el contador
});

// Render inicial
renderTodoItems();
updateCounter();
