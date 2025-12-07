import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("myNotes");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("myNotes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    inputRef.current.focus();
  });

  const addNote = () => {
    if (!text.trim()) return;

    if (editId) {
      setNotes(notes.map(n => (n.id === editId ? { ...n, text } : n)));
      setEditId(null);
    } else {
      setNotes([{ id: Date.now(), text }, ...notes]);
    }

    setText("");
  };

  const editNote = (note) => {
    setEditId(note.id);
    setText(note.text);
    inputRef.current.focus();
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="container">
      <h1>Notes App</h1>

      <div className="input-row">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
        />
        <button onClick={addNote}>
          {editId ? "Save" : "Add"}
        </button>
      </div>

      <div className="notes-list">
        {notes.length === 0 && <p>No notes yet.</p>}

        {notes.map(note => (
          <div className="note" key={note.id}>
            <p>{note.text}</p>
            <div>
              <button id="edit" onClick={() => editNote(note)}>Edit</button>
              <button className="delete" onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
