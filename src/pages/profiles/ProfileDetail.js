import React, { useState, useEffect } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Card ,ListGroup,ListGroupItem, Row, Col} from 'react-bootstrap';
import { useParams } from "react-router";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import ProfileEditForm from './ProfileEditForm';
import UserPasswordForm from './UserPasswordForm';
import UsernameForm from './UsernameForm';
import styles from '../../styles/ProfileDetail.module.css'





const ProfileDetail = () => {
  const currentUser = useCurrentUser();

  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);
  const [showEditUserPasswordForm, setShowEditUserPasswordForm] = useState(false);
  const [showEditUsernameForm, setShowEditUsernameForm] = useState(false);


  const toggleEditUserPasswordForm = () => {
    setShowEditUserPasswordForm(!showEditUserPasswordForm);
  }

  const toggleEditProfileForm = () => {
      setShowEditProfileForm(!showEditProfileForm);
    }

  const toggleEditUsernameForm = () => {
    setShowEditUsernameForm(!showEditUsernameForm);
    }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =  await axiosReq.get(`/profiles/${id}`);
        setProfile(response.data);
      } catch (error) {
       // console.log(error);
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
                    <ListGroupItem  onClick={toggleEditProfileForm}>Edit profile</ListGroupItem>
                    <ListGroupItem onClick={toggleEditUsernameForm}>Edit username</ListGroupItem>
                    <ListGroupItem onClick={toggleEditUserPasswordForm}>Edit password</ListGroupItem>
                </ListGroup>
            </Card>

            </Col>
            <Col md={8}>
                <Container className={styles.Content}>

                    {showEditProfileForm && (
                        <ProfileEditForm />
                    ) }
                    {showEditUsernameForm && (
                        <UsernameForm/>
                    ) }
                    {showEditUserPasswordForm && (
                        <UserPasswordForm/>
                    ) }
                    
                    
                </Container>

                
             
            </Col>

        </Row>
        
    </Container>
  );
}

export default ProfileDetail;
