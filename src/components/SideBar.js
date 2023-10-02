import React from 'react'
import { Col, Row ,Card,ListGroup,ListGroupItem} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CategorieList from '../pages/categories/CategoriesList';
import { useCurrentUser } from "../contexts/CurrentUserContext";


const SideBar = () => {
    
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";


  return (
    <Row>
        <Col>
            <Card>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><Link to="/tasks" >tasks</Link></ListGroupItem>
                    <ListGroupItem><Link to="/states" >completed</Link></ListGroupItem>
                    <ListGroupItem>priorities</ListGroupItem>
                    <ListGroupItem><Link to="/tasks/priority/Low" >Low</Link></ListGroupItem>
                    <ListGroupItem><Link to="/tasks/priority/Medium">Medium</Link></ListGroupItem>
                    <ListGroupItem><Link to="/tasks/priority/High">High</Link></ListGroupItem>
                    <ListGroupItem>categories</ListGroupItem>
                </ListGroup>
                <CategorieList  
                     message="No results found."
                    filter={`owner__id=${profile_id}&`}
                    />
            </Card>
        </Col>
    </Row>
  )
}

export default SideBar