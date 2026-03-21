import { useState } from "react";
import "./App.css";

function App() {
  const [parts, setParts] = useState([]);
  const [history, setHistory] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("Available");
  const [engine, setEngine] = useState("F135");
  const [view, setView] = useState("engines");
  const [search, setSearch] = useState("");

  const engines = ["F135", "F119", "F117"];

  function addPart() {
    if (!name || !number) return;

    const newPart = {
      id: Date.now(),
      name,
      number,
      status,
      engine,
      deleted: false,
    };

    setParts([...parts, newPart]);
    setHistory([...history, newPart]);

    setName("");
    setNumber("");
    setStatus("Available");
    setEngine("F135");
  }

  function deletePart(id) {
    const updatedParts = parts.filter((part) => part.id !== id);
    setParts(updatedParts);

    const updatedHistory = history.map((part) =>
      part.id === id ? { ...part, deleted: true } : part
    );
    setHistory(updatedHistory);
  }

  const filteredParts = parts.filter((part) => {
    const searchText = search.toLowerCase();
    return (
      part.name.toLowerCase().includes(searchText) ||
      part.number.toLowerCase().includes(searchText)
    );
  });

  const filteredHistory = history.filter((part) => {
    const searchText = search.toLowerCase();
    return (
      part.name.toLowerCase().includes(searchText) ||
      part.number.toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      <img src="/jet.jpg" alt="fighter jet left" className="jet-left" />
      <img src="/jet.jpg" alt="fighter jet right" className="jet-right" />

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

        <div className="search-bar">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by part name or number"
          />
        </div>

        {view === "engines" && (
          <div className="engine-sections">
            {engines.map((eng) => (
              <div key={eng} className="engine-section">
                <h2>{eng}</h2>

                {filteredParts
                  .filter((part) => part.engine === eng)
                  .map((part) => (
                    <div key={part.id} className="part">
                      {part.name} ({part.number}) - {part.status}
                      <button onClick={() => deletePart(part.id)}>Delete</button>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}

        {view === "history" && (
          <div className="history">
            <h2>History</h2>

            {filteredHistory.map((part) => (
              <div key={part.id} className="part">
                {part.name} ({part.number}) - {part.engine}
                {search && (
                  <span style={{ color: part.deleted ? "red" : "limegreen" }}>
                    {" "}
                    - {part.deleted ? "Deleted" : "Active"}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;