import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import NewNote from "./pages/NewNote"
import { Container } from "react-bootstrap"
import { useLocalStorage } from "./utils"
import { useMemo } from "react"
import NoteDetail from "./pages/NoteDetail"
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
        <Route path="/:id">
          <Route index element={<NoteDetail />} />
          <Route path="delete" element={<h1>Delete</h1>} />
        </Route>
      </Routes>
    </Container >
  )
}

export default App
