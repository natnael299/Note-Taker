import type { DetailedNoteData } from "../../App"
import { Badge, Card, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import styles from "./style/notes.module.css"
type NoteCard = {
  info: DetailedNoteData
}
function NoteCard({ info }: NoteCard) {
  return (
    <Card as={Link} to={`/${info.id}`} className={`h-100 text-decoration-none ${styles.noteCard}`}>
      <Card.Body>
        <h3 className="text-center">{info.title}</h3>
        <Stack gap={2} className="align-items-center justify-content-center flex-wrap" direction="horizontal">
          {info.tags.length > 0 && info.tags.map(t => (
            <Badge key={t.id} className="p-2">{t.label}</Badge>
          ))}
        </Stack>
      </Card.Body>
    </Card>
  )
}

export default NoteCard
