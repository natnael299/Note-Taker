import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import NewNote from "./pages/NewNote"
import { Container } from "react-bootstrap"
import { useLocalStorage } from "./utils"
import { useMemo } from "react"
import Note from "./pages/Note"
import { NoteDetail } from "./pages/NoteDetail"
import Edit from "./pages/Edit"
//type for a single note object
export type NoteData = {
  id: string,
  title: string,
  content: string,
  tagIds: string[]
};

//type of a certain tag 
export type Tag = {
  id: string,
  label: string
};

export type DetailedNoteData = { tags: Tag[] } & NoteData

function App() {
  const [Notes, setNotes] = useLocalStorage<NoteData[]>("notess", []);
  const [Tags, setTags] = useLocalStorage<Tag[]>("tagss", []);

  const notesWT = useMemo(() => {
    return Notes.map(note => {
      return { ...note, tags: Tags.filter(t => note.tagIds.includes(t.id)) }
    })
  }, [Notes, Tags]);

  //handle new note creation
  function onCreateNote(data: NoteData) {
    setNotes(prevNote => { return [...prevNote, data] });
  };

  //handle new note creation
  function onUpdateNote(id: string, { ...data }: NoteData) {
    setNotes(prevN => {
      return prevN.map(note => {
        //override the note
        if (note.id == id) { return { ...note, ...data } }
        else { return note }
      })
    })
  };

  //handles deltetion
  function onDeleteNote(id: string, { ...data }: NoteData) {
    setNotes(prevN => {
      return prevN.map(note => {
        if (note.id !== id) { return note }
      })
    })
  };

  //handle new tag creation
  function addTag(data: Tag) {
    setTags(prevNote => { return [...prevNote, data] })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<Home notes={notesWT} Tags={Tags} />} />
        {/* leads a wrongly written path to the home page */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} addTag={addTag} Tags={Tags} />} />
        <Route path="/:id" element={<NoteDetail notes={notesWT} />}>
          <Route index element={<Note />} />
          <Route path="edit" element={<Edit onSubmit={onUpdateNote} addTag={addTag} Tags={Tags} />} />
        </Route>
      </Routes>
    </Container >
  )
}

export default App
