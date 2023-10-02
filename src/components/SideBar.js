import React from 'react'
import { Col, Row ,Card,ListGroup,ListGroupItem} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <Row>
        <Col>
            <Card>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>priorities</ListGroupItem>
                    <ListGroupItem><Link to="/tasks/priority/Low" >Low</Link></ListGroupItem>
                    <ListGroupItem><Link to="/tasks/priority/Medium">Medium</Link></ListGroupItem>
                    <ListGroupItem><Link to="/tasks/priority/High">High</Link></ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}

export default SideBar