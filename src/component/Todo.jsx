import { useEffect, useState } from "react";
import "./Todo.css";
import { v4 as uuidv4 } from "uuid";
export const Todo = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTaskId, SetEditTaskId] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [error, setError] = useState({
    errorTask: "",
    errorOnEdit: "",
  }); // for display the error

  const handleInput = (event) => {
    // get input value from the user
    setNewTask(event.target.value);
  };

  const addTasktoTasks = () => {
    if (newTask) {
      const id = uuidv4(); //to genereta id for the single item
      const existTodo = JSON.parse(localStorage.getItem("todoList"));
      // console.log('ex=',existTodo)
      let todoList = [];
      if (existTodo) {
        todoList = [...existTodo, { id, task: newTask, complete: false }];
        // localStorage.setItem('todoList',JSON.stringify(todoList));
        console.log(todoList);
      } else {
        const todoList = { id, task: newTask, complete: false };
      }

      localStorage.setItem("todoList", JSON.stringify(todoList));
      setTasks((prev) => [...prev, { id, task: newTask, complete: false }]); //adding the task to the array name tasks
      setError((prev) => ({ ...prev, errorTask: "" }));
    } else {
      setError((prev) => ({ ...prev, errorTask: "Please enter your Task!" }));
    }

    setNewTask("");
  };

  //   // console.log(array)
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("todoList")); // getting the previosly stored data for the local storage
    if (storedTasks) {
      setTasks(storedTasks);
    }
    // return () => {};
  }, []);

  const deleteTask = (id) => {
    const newTasksList = tasks.filter((item) => item.id !== id);
    setTasks(newTasksList);
    localStorage.setItem("todoList", JSON.stringify(newTasksList));
  };

  const updateId = (tasks) => {
    SetEditTaskId(tasks.id); //getting the id of the task to update
    setEditedTask(tasks.task);
  };
  const updateTasks = (id) => {
    if (editedTask) {
      const newTaskList = tasks.map((item) => {
        if (item.id === id) {
          return { ...item, task: editedTask };
        }
        return item;
      });
      setTasks(newTaskList);
      localStorage.setItem("todoList", JSON.stringify(newTaskList));
      SetEditTaskId("");
      setError((prev) => ({ ...prev, errorOnEdit: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        errorOnEdit: "Please enter the edited task !",
      }));
    }
  };

  const editComplete = (id) => {
    const newArray = tasks.map((item) => {
      if (id === item.id) {
        return { ...item, complete: !item.complete };
      }
      return item;
    });
    setTasks(newArray);
    localStorage.setItem("todoList", JSON.stringify(newArray));
  };

  return (
    <>
      <div className="main-contianer">
        <h1>Todo List</h1>
        <div className="input-contianer">
          <input
            type="text"
            name=""
            id=""
            placeholder="New Todo"
            value={newTask}
            onChange={handleInput}
          />
          <button onClick={addTasktoTasks} className="add-button">
            ADD TODO
          </button>
        </div>
        <p style={{ color: "red", marginTop: "10px", paddingLeft: "50px" }}>
          {error.errorTask}
        </p>

        {tasks.map((item) => {
          return (
            <>
              {editTaskId === item.id ? (
                <div className="edit-contianer">
                  <div className="edit-section" key={item.id}>
                    <input
                      type="text"
                      placeholder="Editing Current Todo Item"
                      value={editedTask}
                      onChange={(event) => setEditedTask(event.target.value)}
                    />
                    <div style={{ margin: "20px 50px 0px 0px" }}>
                      <button
                        className="save-button"
                        onClick={() => updateTasks(item.id)}
                      >
                        SAVE
                      </button>
                      <button
                        style={{ backgroundColor: "#8FA8C1", color: "#0C5488" }}
                        className="cancel-button"
                        onClick={() => SetEditTaskId("")}
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                  <div className="display-error">
                    <p
                      style={{
                        color: "red",
                        paddingLeft: "50px",
                        marginBottom: "10px",
                      }}
                    >
                      {error.errorOnEdit}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="display-task" key={item.id}>
                  <h3
                    onClick={() => {
                      editComplete(item.id);
                    }}
                    style={
                      item.complete
                        ? { textDecoration: "line-through 3px" }
                        : { textDecoration: "none" }
                    }
                  >
                    {item.task}
                  </h3>

                  <div className="edit-button">
                    <button style={{ marginRight: "11px" }}>
                      <img
                        src="../public/update.png"
                        alt=""
                        width="24px"
                        height="24px"
                        onClick={() => updateId(item)}
                      />
                    </button>
                    <button>
                      <img
                        src="../public/delete.png"
                        alt=""
                        width="24px"
                        height="24px"
                        className="delete-img"
                        onClick={() => deleteTask(item.id)}
                      />
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};
