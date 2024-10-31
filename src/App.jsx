import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

import { FaSquareCheck } from "react-icons/fa6";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [newTask, setNewTask] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [taskModal, setTaskModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [taskExistModal, setTaskExistModal] = useState(false);
  const [timeExistModal, setTimeExistModal] = useState(false);

  const setBackEmpty = () => {
    setTask(""), setDate(""), setTime(""), setEditTask(null), setNewTask(false);
  };

  const handleDelete = (forDelete) => {
    setTasks(tasks.filter((deleteFilter) => deleteFilter != forDelete));
  };

  const handleAdd = () => {
    if (task === "") {
      setTaskModal(true);
    } else if (date === "") {
      setDateModal(true);
    } else if (time === "") {
      setTimeModal(true);
    } else if (
      tasks
        .map((mapTaskAlreadyAdded) => mapTaskAlreadyAdded.isTask)
        .includes(task)
    ) {
      setTaskExistModal(true);
    } else if (
      tasks
        .map((mapTimeAlreadyAdded) => mapTimeAlreadyAdded.isTime)
        .includes(time)
    ) {
      setTimeExistModal(true);
    } else if (newTask) {
      updateTask();
    } else {
      setTasks([
        ...tasks,
        { isTask: task, isDate: date, isTime: time, isDone: false },
      ]);
      setBackEmpty();
    }
  };

  const handleDone = (forDone) => {
    const markDone = tasks.map((mapDone) => {
      if (mapDone.isTask === forDone.isTask) {
        mapDone.isDone = !mapDone.isDone;
      }
      return mapDone;
    });
    setTasks(markDone);
  };

  const setEdit = (forEdit) => {
    setTask(forEdit.isTask);
    setDate(forEdit.isDate);
    setTime(forEdit.isTime);
    setNewTask(true);
    setEditTask(forEdit);
  };

  const updateTask = () => {
    const toEdit = tasks.map((mapEdit) =>
      mapEdit === editTask
        ? {
            ...tasks,
            isTask: task,
            isDate: date,
            isTime: time,
            isDone: false,
          }
        : mapEdit
    );
    setTasks(toEdit);

    setBackEmpty();
  };

  const sortCompleted = tasks.sort(
    (a, b) => Number(a.isDone) - Number(b.isDone)
  );

  const totalTasks = tasks.filter((filterTotal) => filterTotal.isTask).length;
  const totalCompleted = tasks.filter(
    (filterTotalCompleted) => filterTotalCompleted.isDone
  ).length;
  const calculateTotalTasks = totalTasks - totalCompleted;

  return (
    <>
      <div className="main-container">
        <div className="header-div">
          <h1 className="header-h1">To-Do</h1>
        </div>

        <div className="input-div">
          <input
            autoCapitalize="words"
            disabled={taskModal}
            className="task-input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Enter task..."
          />
          <input
            className="date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
          <input
            className="time-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type="time"
          />
          <button
            onClick={() => {
              handleAdd();
            }}
            className="add-btn"
          >
            {newTask ? "EDIT" : "ADD"}
          </button>
        </div>

        {taskModal && (
          <div className="modal">
            <div>Please Enter Task</div>
            <div
              className="modal-close-div"
              onClick={() => {
                setTaskModal(false);
              }}
            >
              X
            </div>
          </div>
        )}

        {dateModal && (
          <div className="modal">
            <div>Select Task Date</div>
            <div
              className="modal-close-div"
              onClick={() => {
                setDateModal(false);
              }}
            >
              X
            </div>
          </div>
        )}

        {timeModal && (
          <div className="modal">
            <div>Select Task Time</div>
            <div
              className="modal-close-div"
              onClick={() => {
                setTimeModal(false);
              }}
            >
              X
            </div>
          </div>
        )}

        {taskExistModal && (
          <div className="modal">
            <div>Task Already Exist</div>
            <div
              className="modal-close-div"
              onClick={() => {
                setTaskExistModal(false);
              }}
            >
              X
            </div>
          </div>
        )}

        {timeExistModal && (
          <div className="modal">
            <div>Time Not Available</div>
            <div
              className="modal-close-div"
              onClick={() => {
                setTimeExistModal(false);
              }}
            >
              X
            </div>
          </div>
        )}

        <div className="total-tasks-completed-tasks">
          <div className="total-tasks">
            Total-Task's{" "}
            <span className="calculate-number">{calculateTotalTasks}</span>
          </div>
          <div className="total-completed">
            Completed-task's{" "}
            <span className="calculate-number">{totalCompleted}</span>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th className="th-task">TASK</th>
                <th>DATE</th>
                <th>TIME</th>
                <th className="th-actions" colSpan={"2"}>
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {sortCompleted.map((mapTask, index) => (
                <tr key={index}>
                  <td className="td-tasks">
                    <span className={mapTask.isDone ? "isCompleted" : ""}>
                      {mapTask.isTask}
                    </span>{" "}
                    {!mapTask.isDone && (
                      <input
                        className="check-box"
                        checked={mapTask.isDone}
                        onChange={() => {
                          handleDone(mapTask);
                        }}
                        type="checkbox"
                      />
                    )}
                    {mapTask.isDone && <FaSquareCheck className="done-icon" />}
                  </td>

                  <td className="td-date">{mapTask.isDate}</td>
                  <td className="td-time">{mapTask.isTime}</td>
                  <td className="td-edit-icon">
                    <div
                      onClick={() => {
                        setEdit(mapTask);
                      }}
                    >
                      <FaPenToSquare />
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      handleDelete(mapTask);
                    }}
                    className="td-delete-icon"
                  >
                    <FaTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
    </>
  );
}

export default App;
