import React, { useState } from "react";
import { Form, Button, Container, Row, Col,Alert } from 'react-bootstrap';
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser} from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";


import { Link} from "react-router-dom";


function CreateCategoryForm() {
    const [name , setName] = useState('');
    const [errors, setErrors] = useState({});
    const currentUser = useCurrentUser();



    
      const history = useHistory();

    

      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append("name", name);
       
        
    
        try {
          await axiosReq.post("/categories/", formData);
          history.goBack();
        } catch (err) {
            // console.log(err);
             if (err.response?.status !== 401) {
               setErrors(err.response?.data);
             }
           }
      };

      const loggedInContent = (
        <>
           <h2 className="text-center mb-5">Create Category</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="categoryName">
                    <Form.Label >Category Name:</Form.Label>
                    <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                {errors?.name?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                    {message}
                    </Alert>
                 ))}
                <Button
                className={`${btnStyles.Button}  ${btnStyles.Bright}`}
                 type="submit">
                    Create
                </Button>
            </Form>
         
        </>
        );
      
      const loggedOutContent = (
      <>
      <Alert variant='secondary'>
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
        However you must sign in to add a category ! 
        </p>
        <hr />
        <p className="mb-0">
            <Link  to="/signin">
               have'nt sign in yet? <span>Sign in now!</span>
            </Link>
        </p>
      </Alert>
      
      </>
      
      );

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
        {currentUser ? loggedInContent : loggedOutContent}

          
       
        </Col>
      </Row>
    </Container>
  )
}

export default CreateCategoryForm