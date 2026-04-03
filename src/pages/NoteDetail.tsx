import type { DetailedNoteData } from "../App"
import { useParams, Navigate, Outlet } from "react-router-dom";
type NoteDetailProp = {
  notes: DetailedNoteData[]
}

export function NoteDetail({ notes }: NoteDetailProp) {
  const { id } = useParams();
  const noteData = notes.find(n => n.id === id);
  //the replace is to prevent the website from returnning the user to the unexisting link.
  if (noteData === undefined) return <Navigate to="/" replace />;
  return <Outlet context={noteData} />
}
