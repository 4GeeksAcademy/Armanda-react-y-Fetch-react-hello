import React, { useEffect, useState } from "react";
function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [listaTareas, setListaTareas] = useState([]);
  const API_URL = "https://playground.4geeks.com/todo/todos/Armanda_Jaque"; // URL de la API
  // 1. Obtener tareas del servidor cuando el componente se monta
  useEffect(() => {
    traerTareas();
  }, []);
  async function traerTareas() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setListaTareas(data.todos || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }
  // 2. Agregar una nueva tarea
  const addTask = async (task) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Error adding task");
      }
      const data = await response.json();
      console.log("Task added successfully:", data);
      setListaTareas([...listaTareas, data]); // Actualizar la lista con la nueva tarea
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  // Manejar la adición de una nueva tarea
  const handleAddTask = (evento) => {
    if (evento.key === "Enter" && inputValue.trim() !== "") {
      const newTask = { label: inputValue.trim() }; // Crear un nuevo objeto de tarea
      addTask(newTask); // Enviar la tarea al servidor
      setInputValue(""); // Limpiar input
    }
  };
  // 3. Borrar una tarea
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting task");
      }
      setListaTareas(listaTareas.filter(task => task.id !== id)); // Eliminar de la lista
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  // 4. Limpiar todas las tareas
  const handleClearAll = async () => {
    try {
      // Iterar sobre todas las tareas y eliminar cada una
      for (const task of listaTareas) {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Error clearing tasks");
        }
      }
      setListaTareas([]); // Limpiar en el frontend después de eliminar todas las tareas
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  };


  return (

    <div className="container">
      <div className="d-flex justify-content-center mt-20">
        <div className="d-flex">
          <input
            type="text"
            placeholder="Lista de Todos"
            value={inputValue}
            onChange={(evento) => setInputValue(evento.target.value)}
            onKeyDown={handleAddTask}
          />

          <button onClick={handleClearAll} className="btn btn-secondary ms-5">
            <em>Limpiar Todas las Tareas</em>
          </button>

        </div>

      </div>

      <div>

        <div className="d-flex justify-content-center mt-5 flex-column align-items-center">
          {listaTareas.map((task) => (
            <div className="d-flex mt-5" key={task.id}>
              <h4>{task.label}</h4>
              <button onClick={() => handleDelete(task.id)} className="btn btn-warning text-white ms-5 mx-70"><em>Borrar</em></button>
            </div>
          ))}
        </div>

      </div>

    </div>


  );
}
export default TodoList;





















