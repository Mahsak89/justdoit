import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function CreateCategoryForm() {
    const [name , setName] = useState('');

    
      const history = useHistory();

    

      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append("name", name);
       
        
    
        try {
          const { data } = await axiosReq.post("/categories/", formData);
          history.push(`/categories/${data.id}`);
        } catch (err) {
          console.log(err);
          
        }
      };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          
        <h2>Create Category</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="categoryName">
                    <Form.Label>Category Name:</Form.Label>
                    <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
         
        </Col>
      </Row>
    </Container>
  )
}

export default CreateCategoryForm