import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
    const [notes, setNotes] = useState([])
    

    function addNote(note) {
        setNotes(prevValue => [...prevValue, note])
    }

    function deleteNote(id) {
        setNotes(prevValue => prevValue.filter((item, index)=> index !== id))
    }

  return (
    <div>
      <Header />
      <CreateArea 
      addNote={addNote}
       />
      {notes.map((note, id) => <Note key={id} title={note.title} content={note.content} id ={id} deleteNote={deleteNote}/> )}
      <Footer />
    </div>
  );
}

export default App;
