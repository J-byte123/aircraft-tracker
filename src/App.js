import { useState } from "react";
import "./App.css";

function App() {
  const [parts, setParts] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("Available");
  const [engine, setEngine] = useState("F135");
  const [view, setView] = useState("engines");

  const engines = ["F135", "F119", "F117"];

  function addPart() {
    if (!name || !number) return;

    const newPart = { name, number, status, engine };
    setParts([...parts, newPart]);

    setName("");
    setNumber("");
    setStatus("Available");
    setEngine("F135");
  }

  function deletePart(index) {
    const updated = parts.filter((_, i) => i !== index);
    setParts(updated);
  }

  return (
    <div>
      <img src={`${process.env.PUBLIC_URL}/jet.jpg`} alt="fighter jet" className="jet-left" />
   <img src={`${process.env.PUBLIC_URL}/jet.jpg`} alt="fighter jet" className="jet-right" />
      <div className="container">
        <h1>Aircraft Parts Tracker</h1>

        <div className="tabs">
          <button
            className={view === "engines" ? "active" : ""}
            onClick={() => setView("engines")}
          >
            Engines
          </button>
          <button
            className={view === "history" ? "active" : ""}
            onClick={() => setView("history")}
          >
            History
          </button>
        </div>

        <div className="form">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Part Name"
          />
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Part Number"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Available</option>
            <option>In Use</option>
            <option>Maintenance</option>
          </select>
          <select value={engine} onChange={(e) => setEngine(e.target.value)}>
            {engines.map((eng) => (
              <option key={eng}>{eng}</option>
            ))}
          </select>
          <button onClick={addPart}>Add Part</button>
        </div>

        {view === "engines" && (
          <div className="engine-sections">
            {engines.map((eng) => (
              <div key={eng} className="engine-section">
                <h2>{eng}</h2>
                {parts
                  .filter((p) => p.engine === eng)
                  .map((p, i) => (
                    <div key={i} className="part">
                      {p.name} ({p.number}) - {p.status}
                      <button onClick={() => deletePart(i)}>Delete</button>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}

        {view === "history" && (
          <div className="history">
            <h2>History</h2>
            {parts.map((p, i) => (
              <div key={i} className="part">
                {p.name} ({p.number}) - {p.status} [{p.engine}]
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
