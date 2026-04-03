import { Modal, Form, Stack, Row, Button, Col } from "react-bootstrap"
import type { Tag } from "../App"
type EditTagsProp = {
  show: boolean
  hide: () => void
  Tags: Tag[]
  removeTag: (id: string) => void
  updateTag: (id: string, value: string) => void
}
function EditTags({ show, hide, Tags, removeTag, updateTag }: EditTagsProp) {
  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {Tags.map(tag => {
              return (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control defaultValue={tag.label} onChange={(e) => updateTag(tag.id, e.target.value)} />
                  </Col>
                  <Col xs="auto">
                    <Button variant="outline-danger" onClick={() => removeTag(tag.id)}>X</Button>
                  </Col>
                </Row>)
            })}
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="outline-primary my-3 w-1" onClick={hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditTags