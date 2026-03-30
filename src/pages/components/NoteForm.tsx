import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import CreateableReactSelect from "react-select/creatable"
import { Link } from "react-router-dom"
function NoteForm() {
  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>
                Title
              </Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tages">
              <Form.Label>
                Tages
              </Form.Label>
              <CreateableReactSelect required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="body">
              <Form.Label>
                Body
              </Form.Label>
              <Form.Control as="textarea" required rows={14} />
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
