import React, { useState, useEffect } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Card ,ListGroup,ListGroupItem, Row, Col} from 'react-bootstrap';
import { useParams } from "react-router";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Route, Switch } from "react-router-dom";




const ProfileDetail = () => {
  const currentUser = useCurrentUser();

  const [profile, setProfile] = useState(null);
  const { id } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =  await axiosReq.get(`/profiles/${id}`);
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
        <Row>
            <Col md={4}>
            <Card>
                <Card.Img  style={{ width: '250' }} variant="top" src={currentUser?.profile_image} />
                <Card.Body className='text-center'>
                    <Card.Title>{currentUser?.username}</Card.Title>
                    <Card.Text>
                    {profile.content}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush text-center">
                    <ListGroupItem>Edit profile</ListGroupItem>
                    <ListGroupItem>Edit username</ListGroupItem>
                    <ListGroupItem>Edit password</ListGroupItem>
                </ListGroup>
            </Card>

            </Col>
            <Col md={8}>
                <Switch>
               
                </Switch>

            </Col>

        </Row>
        
    </Container>
  );
}

export default ProfileDetail;
