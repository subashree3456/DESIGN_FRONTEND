import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";
const Main = () => {
  const [task, setTask] = useState([]);
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateID] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      desc,
      date,
      time,
      assignUser: user,
    };
    const res = await axios.post(
      "https://design-backend-1.onrender.com/task",
      data,
      {
        headers: { token, "Access-Control-Allow-Origin": "*" },
      }
    );
    if (res.status == 201) {
      setDate("");
      setDesc("");
      setTime("");
      setUser("");
      setShow(!show);

      getdata();
    }
  };
  const currentDate = new Date().toString();
  const handleEdit = (id) => {
    const filterTask = task.filter((item) => item._id === id);
    const username = users.filter(
      (item) => item.id == filterTask[0].assignUser
    );

    setShow(!show);
    setDesc(filterTask[0].desc);
    setDate(filterTask[0].date);
    setTime(filterTask[0].time);
    setUser(username[0].id);
    setUpdateID(id);
    setUpdate(!update);
  };
  const updateDate = async (e) => {
    e.preventDefault();
    const data = {
      desc,
      date,
      time,
      assignUser: user,
    };
    const res = await axios.put(
      `https://design-backend-1.onrender.com/task/${updateId}`,
      data,
      {
        headers: { token, "Access-Control-Allow-Origin": "*" },
      }
    );
    if (res.status == 200) {
      setDate("");
      setDesc("");
      setTime("");
      setUser("");
      setShow(!show);
      setUpdate(!update);
      setUpdateID("");
      getdata();
    }
  };

  const getUsers = async () => {
    const res = await axios.get(
      "https://design-backend-1.onrender.com/auth/users"
    );
    const data = res.data;
    setUsers(data);
  };
  const getdata = async () => {
    const res = await axios.get(
      "https://design-backend-1.onrender.com/task"
    );
    const data = res.data;
    setTask(data);
  };
  const deleteTask = async () => {
    const res = await axios.delete(
      `https://design-backend-1.onrender.com/task/${updateId}`,
      {
        headers: { token, "Access-Control-Allow-Origin": "*" },
      }
    );
    setDate("");
    setDesc("");
    setTime("");
    setUser("");
    setShow(!show);
    setUpdate(!update);
    setUpdateID("");
    getdata();
  };
  const handleCorrect = async (id) => {
    const data = { hai: "hai" };
    const res = await axios.patch(
      `https://design-backend-1.onrender.com/task/${id}`,
      data,
      {
        headers: { token, "Access-Control-Allow-Origin": "*" },
      }
    );
    if (res.status === 200) {
      getdata();
    }
  };
  useEffect(() => {
    getdata();
    getUsers();
  }, []);
  return (
    <div className="mains">
      <div className="head">
        <h2>Test</h2>
        <p className="link">sloovi.com</p>
        <p>
          <i>Add Description</i>
        </p>
      </div>
      <div className="taskhead">
        <h3>
          TASKS <span> {task.length === 0 ? "0" : task.length}</span>
        </h3>
        <button className="task__head__button" onClick={() => setShow(!show)}>
          {show ? "×" : "+"}
        </button>
      </div>
      {show && (
        <form className="taskbody" onSubmit={handleSubmit}>
          <div>
            <p className="label">Task Description</p>
            <input
              type="text"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="desc the task"
            />
          </div>
          <div className="detail">
            <div className="date">
              <p className="label">Date</p>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                id="Date"
                placeholder="06/14/2023"
              />
            </div>
            <div className="time">
              <p className="label">Time</p>
              <input
                type="time"
                id="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="09:30 AM"
              />
            </div>
          </div>
          <div>
            <p className="label">Assign User</p>
            <select
              id="selete"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            >
              {users?.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.username}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="button">
            {user !== "" ? (
              <div onClick={deleteTask} id="delete">
                <i className="fa-solid fa-trash"></i>
              </div>
            ) : (
              <div id="delete"></div>
            )}
            <div>
              <button className="cancel" onClick={() => setShow(!show)}>
                cancel
              </button>
              {update ? (
                <button className="save" onClick={updateDate}>
                  Update
                </button>
              ) : (
                <button className="save" type="submit">
                  save
                </button>
              )}
            </div>
          </div>
        </form>
      )}
      {!show &&
        task?.map((item) => {
          return (
            <div className="task" key={item._id}>
              <div className="img">
                <img
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=2048x2048&w=is&k=20&c=X7M3yQkbRq7zIsY16tuaHy8Wu_oo5j-Hp8Uqe7wWxDY="
                  alt="createrImage"
                />
              </div>
              <div className="taskDetail">
                <h4 className={item.isCompleted ? " mark" : ""}>{item.desc}</h4>
                <>
                  {currentDate > item.date ? (
                    <h5 style={{ color: "red" }}>{item.date}</h5>
                  ) : (
                    <h5 style={{ color: "green" }}>{item.date}</h5>
                  )}
                </>
              </div>
              {item.isCompleted ? (
                <div className="action">
                  <i className="fa-solid fa-pen"></i>
                </div>
              ) : (
                <div className="action">
                  <i
                    className="fa-solid fa-pen"
                    onClick={() => handleEdit(item._id)}
                  ></i>
                  <i className="fa-solid fa-bell"></i>
                  <i
                    className="fa-solid fa-check"
                    onClick={() => handleCorrect(item._id)}
                  ></i>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Main;
