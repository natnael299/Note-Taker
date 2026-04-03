import type { NoteData, Tag } from "../App";
import { useOutletContext } from "react-router-dom"
import NoteForm from "./components/NoteForm";
type EditProp = {
  onSubmit: (id: string, data: NoteData) => void
  addTag: (data: Tag) => void
  Tags: Tag[]
};

function Edit({ onSubmit, addTag, Tags }: EditProp) {
  const NoteData = useOutletContext<NoteData>();
  return (
    <>
      <h2 className="mb-4">Update Note</h2>
      <NoteForm onSubmit={data => onSubmit(NoteData.id, data)} addTag={addTag} Tags={Tags} title={NoteData.title} content={NoteData.content} tagIds={NoteData.tagIds} />
    </>
  )
}

export default Edit
