import { useOutletContext, Link, useNavigate } from "react-router-dom";
import type { DetailedNoteData } from "../App";
import { Row, Col, Badge, Stack, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown"

type NoteProp = {
  onDelete: (id: string) => void
}
function Note({ onDelete }: NoteProp) {
  const note = useOutletContext<DetailedNoteData>();
  const navigate = useNavigate();
  return (
    <>
      <Row className="align-items-center mb-5">
        <Col>
          <h1>{note.title}</h1>
          <Stack direction="horizontal" gap={2}>
            {
              note.tags.length > 1 && note.tags.map(tag => (
                <Badge key={tag.id} className="p-2">{tag.label}</Badge>
              ))
            }
          </Stack>
        </Col>

        <Col>
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button>Edit</Button>
            </Link>

            <Link to="">
              <Button className="btn btn-danger"
                onClick={() => {
                  onDelete(note.id)
                  navigate("/</Link>")
                }}>
                Delete
              </Button>
            </Link>

            <Link to="..">
              <Button className="btn btn-secondary">Back</Button>
            </Link>
          </Stack>
        </Col >
      </Row >

      <ReactMarkdown>
        {note.content}
      </ReactMarkdown>
    </>
  )
}

export default Note
