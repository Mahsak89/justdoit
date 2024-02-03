import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import { Link } from "react-router-dom";

function EditCategoryForm() {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axiosReq.get(`/categories/${id}/`);
        const { name, is_owner } = data;
        if (is_owner) {
          setName(name);
        } else {
          history.push("/");
        }
      } catch (err) {
        // Handle error
      }
    };

    fetchCategory();
  }, [history, id]);

  const handleChange = (event) => {
    setName({
      ...name,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);

    try {
      await axiosReq.put(`/categories/${id}/`, formData);
      history.push(`/categories/${id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const loggedInContent = (
    <>
      <h2 className="text-center mb-5">Edit Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="categoryName">
          <Form.Label>Category Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.name?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <Button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          type="submit"
        >
          Save
        </Button>
      </Form>
    </>
  );

  const loggedOutContent = (
    <>
      <Alert variant='secondary'>
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
          However, you must sign in to edit a category!
        </p>
        <hr />
        <p className="mb-0">
          <Link to="/signin">
            Haven't signed in yet? <span>Sign in now!</span>
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
  );
}

export default EditCategoryForm;