import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import CreateableReactSelect from "react-select/creatable"
import { Link } from "react-router-dom"
import React, { useRef, useState } from "react"
import type { NoteData, Tag } from "../../App"

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  addTag: (data: Tag) => void
  Tags: Tag[]
};
function NoteForm({ onSubmit, addTag, Tags }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, SetSelectedTags] = useState<Tag[]>([])

  //saves the newly added note
  const saveNewNote = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: NoteData = {
      id: crypto.randomUUID(),
      title: titleRef.current!.value,
      content: bodyRef.current!.value,
      tagIds: selectedTags.map(t => t.id)
    };

    onSubmit(data);
  };
  return (
    <Form onSubmit={saveNewNote}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>
                Title
              </Form.Label>
              <Form.Control required ref={titleRef} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tages">
              <Form.Label>
                Tages
              </Form.Label>
              <CreateableReactSelect
                required isMulti
                onCreateOption={label => {
                  const newId = { id: crypto.randomUUID(), label }
                  addTag(newId);
                  SetSelectedTags(v => [...v, newId])
                }}
                options={Tags.map(t => { return { label: t.label, value: t.id } })}
                value={selectedTags.map(t => { return { label: t.label, value: t.id } })}
                onChange={tags => SetSelectedTags(tags.map(t => { return { id: t.value, label: t.label } }))}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="body">
              <Form.Label>
                Body
              </Form.Label>
              <Form.Control
                as="textarea" required rows={14}
                ref={bodyRef} />
            </Form.Group>
          </Col>
        </Row>
      </Stack>

      <Stack direction="horizontal" gap={2} className="justify-content-end my-2">
        <Button type="submit" className="btn-primary">
          Save
        </Button>
        <Link to="..">
          <Button className="btn-danger">Cancel</Button>
        </Link>
      </Stack>
    </Form>
  )
}

export default NoteForm
