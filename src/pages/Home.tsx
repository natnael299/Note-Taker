
import { useMemo, useState } from "react"
import { Row, Button, Col, Stack, Form } from "react-bootstrap"
import CreateableReactSelect from "react-select/creatable"
import type { Tag, DetailedNoteData } from "../App"
import NoteCard from "./components/NoteCard"
import { Link } from "react-router"
type HomeProps = {
  notes: DetailedNoteData[]
  Tags: Tag[]
}

function Home({ notes, Tags }: HomeProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState<string>("")
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (title == "" || note.title.toLowerCase().includes(title.toLowerCase()))
        &&
        (selectedTags.length == 0 || selectedTags.every(tag => note.tags.some(t => t.id == tag.id)))
    });
  }, [title, selectedTags, notes])
  return (
    <>
      <Row className="justify-content">
        <Col>
          <h2>Notes</h2>
        </Col>
        <Col>
          <Stack gap={1} direction="horizontal" className="justify-content-end">
            <Link to="/new">
              <Button className="btn-primary">Create</Button>
            </Link>
            <Link to="/update">
              <Button className="btn-dark">Edit Tages</Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      <Form className="my-3">
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={e => setTitle(e.target.value)} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreateableReactSelect
                isMulti
                options={Tags.map(t => { return { value: t.id, label: t.label } })}
                value={selectedTags.map(t => { return { label: t.label, value: t.id } })}
                onChange={tagsEle => setSelectedTags(tagsEle.map(t => { return { id: t.value, label: t.label } }))}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={2} md={2} lg={3} xl={4}>
        {filteredNotes.map(note => (
          <Col key={note.id} className="">
            <NoteCard info={note} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Home