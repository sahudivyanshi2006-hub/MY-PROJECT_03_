import { useEffect, useState } from "react";
import $ from "jquery";

export default function App() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [quote, setQuote] = useState("");
  const [weather, setWeather] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(now.toDateString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("https://api.weatherapi.com/v1/current.json?key=demo&q=London")
      .then(r => r.json())
      .then(d => setWeather(d.current?.temp_c + "°C"));
  }, []);

  const loadQuote = () => {
    fetch("https://api.quotable.io/random")
      .then(r => r.json())
      .then(d => setQuote(d.content));
  };

  useEffect(loadQuote, []);

  useEffect(() => {
    $("#toggleTheme").on("click", () => $("body").toggleClass("dark"));
    $("#pulse").on("click", () => $("#mainCard").fadeOut(200).fadeIn(200));
  }, []);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const deleteTask = (i) => setTasks(tasks.filter((_, idx) => idx !== i));

  return (
    <div className="d-flex">
      <div className="sidebar p-3">
        <h3 className="text-white mb-4">⚡ Dashboard</h3>
        <a href="#">Home</a>
        <a href="#">Tasks</a>
        <a href="#">Settings</a>
        <button id="toggleTheme" className="btn btn-light w-100 mt-4">🌗 Toggle Theme</button>
      </div>

      <div className="flex-grow-1 p-4">
        <h1 className="fw-bold">✨ Beautiful Interactive Dashboard</h1>
        <p className="text-muted">React + Bootstrap + jQuery</p>

        <div id="mainCard" className="glass shadow p-4 mx-auto" style={{ maxWidth: 650 }}>
          <h3 className="mb-3">Hello User 👋</h3>

          <div className="row text-center mb-4">
            {[{ label: "⏰ Time", value: time },
              { label: "📅 Date", value: date },
              { label: "🌥 Weather", value: weather || "Loading..." }
            ].map((item, i) => (
              <div className="col" key={i}>
                <h5>{item.label}</h5>
                <p>{item.value}</p>
              </div>
            ))}
          </div>

          <h5>💬 Quote of the Day</h5>
          <p className="fst-italic">“{quote || "Loading..."}”</p>
          <button className="btn btn-outline-primary btn-sm" onClick={loadQuote}>🔁 Refresh Quote</button>

          <h5 className="mt-4">📝 Task List</h5>
          <div className="input-group mb-3">
            <input
              className="form-control"
              placeholder="Enter task..."
              value={task}
              onChange={e => setTask(e.target.value)}
            />
            <button className="btn btn-primary" onClick={addTask}>Add</button>
          </div>

          <ul className="list-group">
            {tasks.map((t, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                {t}
                <button className="btn btn-sm btn-danger" onClick={() => deleteTask(i)}>X</button>
              </li>
            ))}
          </ul>

          <button id="pulse" className="btn btn-primary mt-4 w-100">Magic Effect ✨</button>
        </div>

        <footer className="mt-5 text-muted small">Built with ❤ React + Bootstrap + jQuery</footer>
      </div>
    </div>
  );
}
