
import React, {  useEffect, useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toast";
import "react-toast/dist/ReactToast.css";
const getLocalStorage=()=>{
  let TodoData=localStorage.getItem("TodoData");
  if(TodoData){
    return (
    TodoData=JSON.parse(localStorage.getItem("TodoData")));
  }else{
return [];
  }
}

const Home = () => {
  const [title, setTitle] = useState("");
  const [TodoData, setTodoData] = useState(getLocalStorage());
  const [status, setStatus] = useState("Incomplete");
  const [selectedId, setSelectedId] = useState(0);
  const [data, setData] = useState([]);
  useEffect(()=>{
    localStorage.setItem("TodoData",JSON.stringify(TodoData));
  },[TodoData]);
  


  const addTodo= () => {
    if (title) {
      setData([
        ...data,
        { activity: title, status: status, id: data.length + 1 },
      ]);
      setTodoData([
        ...TodoData,
        { activity: title, status: status, id: data.length + 1 },
      ]);
      window.alert("ITEM added successfully!");
      setTitle("");
      setStatus("Incomplete");
    } else {
      window.alert("Please Enter TODO")
    }
  };

  const deleteItem = (e) => {
    const filterData = data.filter((data) => data.id !== Number(e.target.id));
    setTodoData(filterData);
    setData(filterData);
    toast("ITEM Deleted successfully!");
  };
  const editItem = (e) => {
    const item = data.filter((d) => d.id === Number(e.target.id));
    setTitle(item[0].activity);
    setStatus(item[0].status);
    setSelectedId(Number(e.target.id));
  };
  const filterStatus = (status) => {
    if (status !== "All") {
      setTodoData(data.filter((x) => x.status === status));
      console.log(status);
    } else {
      setTodoData(data);
    }
  };

  const updateTodo = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        item.activity = title;
        item.status = status;
      }
    });
    setData(data);
    setTodoData(data);
    setSelectedId(0);
    toast("ITEM Updated successfully!");
    setTitle("");
    setStatus("Incomplete");
  };
  

  return (
    <>
      <div className="container">
        <h1> TODO-LIST </h1>
      </div>

      <div className="Header">
        <div className="add-task">
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#addTaskModal"
          >
            Add Task
          </button>
        </div>
        <div className="option">
          <select
            className="option-head"
            id="status"
            onChange={(e) => {
              filterStatus(e.target.value);
            }}
          >
            <option value="All">All</option>
            <option value="Incomplete">Incomplete</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
      </div>

      <div className="body-part">
        {TodoData.length === 0 ? <p> no records </p> : ""}
        {TodoData !== [] &&
          TodoData.map((item, i) => {
            return (
              <div className="title" key={item.id}>
                <div className="checkbox">
                  <input
                    type="checkbox"
                    className="main-checkbox"
                    checked={item.status === "Complete" ? true : false}
                  />
                  <div className="activity-text">
                  {item.status === "Incomplete" && item.activity}
                  {item.status === "Complete" && <s> {item.activity}</s>}
                  </div>
                </div>
                <div>
                  <button
                    className="button-edit"
                    id={item.id}
                    onClick={(e) => editItem(e)}
                    data-toggle="modal"
                    data-target="#addTaskModal"
                  >
                    <i className="fa-solid fa-pen-to-square" id={item.id}></i>
                  </button>
                  <button
                    className="button-del"
                    id={item.id}
                    onClick={(e) => deleteItem(e)}
                  >
                    <i className="fa-solid fa-trash" id={item.id}></i>
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <ToastContainer position="top-right" />

      <div className="modal" id="addTaskModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {selectedId !== 0 && <h5 className="modal-title">update TODO</h5>}
              {selectedId === 0 && <h5 className="modal-title">ADD TODO</h5>}
            </div>
            <div className="modal-body">
              <h2>Title</h2>
              <div>
                <input
                  type="text"
                  required
                  className="input-text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>              
              <div>
                <h3>Status</h3>
              </div>
              <select
                value={status}
                className="option-new"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"              
                data-dismiss={title.length === 0 ? "" : "modal"}
                onClick={
                  selectedId === 0
                    ? () => addTodo()
                    : () => updateTodo(selectedId)
                }
              >
                {selectedId === 0 ? "Add" : "Update"} Task
              </button>
              <button
                type="submit"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
