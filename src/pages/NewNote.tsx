import NoteForm from "./components/NoteForm.tsx"
import type { NoteData, Tag } from "../App.tsx"
export type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  addTag: (data: Tag) => void
  Tags: Tag[]
}
function NewNote({ onSubmit, addTag, Tags }: NewNoteProps) {
  return (
    <>
      <h1>New Note</h1>
      <NoteForm onSubmit={onSubmit} addTag={addTag} Tags={Tags} />
    </>
  )
}

export default NewNote