import { useEffect, useState } from 'react'
import axios from 'axios';
import './index.css'



function App() {
  const [note, setNote] = useState([
    {
      title: "Sample Note",
      content: "This is a sample note content."
    },
    {
      title: "Another Note",
      content: "This is another note content."
    },
    {
      title: "Third Note",
      content: "This is the third note content."
    },
    {
      title: "Fourth Note",
      content: "This is the fourth note content."
    }
  ])

const fetchNotes = () => {
axios.get('http://localhost:3000/api/notes')
    .then(response => {
      console.log(response);
      setNote(response.data.notes);
    })
    .catch(error => {
      console.error('There was an error fetching the notes!', error);
    });
  }

  useEffect(() => {
   fetchNotes();
  }, [])  // empty dependency array means this effect runs once on mount

//posting new data
function postsubmit(e){
  e.preventDefault();
  const title = e.target[0].value;
  const content = e.target[1].value;
  axios.post('http://localhost:3000/api/notes', {
    title,
    content
  })
  .then(response => {
    console.log(response);
    fetchNotes(); // Refresh notes after adding a new one
  }
  )
  .catch(error => {
    console.error('There was an error creating the note!', error);
  });
}

//deleting a note
function DeleteNote(id){
  axios.delete(`http://localhost:3000/api/notes/${id}`)
  .then(response => {
    console.log(response);
    fetchNotes(); // Refresh notes after deleting one
  })
  .catch(error => {
    console.error('There was an error deleting the note!', error);
  });
}

//updating a note
function updateNote(id){
  const title = prompt("Enter new title:");
  const content = prompt("Enter new content:");
  
  axios.patch(`http://localhost:3000/api/notes/${id}`, {
    title,
    content
  })
  .then(response => {
    console.log(response);
    fetchNotes(); // Refresh notes after updating one
  })
  .catch(error => {
    console.error('There was an error updating the note!', error);
  });
}



  return (
   
    <div >
    <form className='form'onSubmit={postsubmit}>
      <input type="text" className="title-input" placeholder='Title' />
      <textarea className="content-input" placeholder='Content' />
      
       <button type='submit'>Add Note</button>
       
    </form>

    <div className="notes">
      {note.map((note, index) => (
        <div key={note._id || index} className="note">
          <h1>{note.title}</h1>
          <p>{note.content}</p>
           <div className='form-btns'>
            <button type='button' onClick={() => DeleteNote(note._id)}>Delete</button>
            <button type='button' onClick={() => updateNote(note._id)}>Update</button>
           </div>
        </div>
      ))}
    </div>
    </div>

  
  ) 

}
export default App
