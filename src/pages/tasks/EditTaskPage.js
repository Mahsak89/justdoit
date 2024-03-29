import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";




function EditTaskForm() {

    const [errors, setErrors] = useState({});
      const [categories, setCategories] = useState({ results: [] });


    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        startdate: '',
        deadline: '',
        priority: 'Low',
        category: 'DefaultCategory',

      });
      const { title, description, startdate, deadline, priority, category} = taskData;
      const history = useHistory();
      const { id } = useParams();
      const currentUser = useCurrentUser();


      useEffect(() => {
        const handleMount = async () => {
          try {
            const { data } = await axiosReq.get(`/tasks/${id}/`);
            const { title, description, startdate, deadline, priority, is_owner, category  } = data;
             if (is_owner) {
                setTaskData({ title, description, startdate, deadline, priority, category });
                // Fetch user categories and set them in state
                const { data: userCategories } = await axiosReq.get(`/categories/?owner__id=${currentUser.pk}`);
                setCategories(userCategories.results);
            } else {
                history.push("/");
            }


          } catch (err) {
            //console.log(err);
          }
        };
    
        handleMount();
      }, [history, id, currentUser]);


      const handleChange = (event) => {
        setTaskData({
          ...taskData,
          [event.target.name]: event.target.value,
        });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append("title", title);
        formData.append("description", description);
        formData.append("startdate", startdate);
        formData.append("deadline", deadline);
        formData.append("priority", priority);
        formData.append("category", category);

        
    
        try {
            await axiosReq.put(`/tasks/${id}/`, formData);
            history.push(`/tasks/${id}`);
        } catch (err) {
        // console.log(err);
          if (err.response?.status !== 401) {
            setErrors(err.response?.data);
          }
        }
      };


  return (
    <div>
      <h2 className="text-center mb-5">Edit Task</h2>

      <Form onSubmit={handleSubmit} >

        <Form.Group controlId="formCategory">
          <Form.Label>Category:</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={category}
            onChange={handleChange}
          >
            <option value="DefaultCategory" disabled>Select a category</option>

            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
        {errors?.category?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <Form.Group controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
          /> 
        </Form.Group>
        {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={description}
            onChange={handleChange}
           
          />
        </Form.Group>
        {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        <Form.Group controlId="formStartdate">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control
            type="date"
            name="startdate"
            value={startdate}
            onChange={handleChange}
           
          />
        </Form.Group>
        {errors?.startdate?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        <Form.Group controlId="formDeadline">
          <Form.Label>Deadline:</Form.Label>
          <Form.Control
            type="datetime-local"
            name="deadline"
            value={deadline}
            onChange={handleChange}
           
           
          />
        </Form.Group>
        {errors?.deadline?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        <Form.Group controlId="formPriority">
          <Form.Label>Priority:</Form.Label>
          <Form.Control
            as="select"
            name="priority"
            value={priority}
            onChange={handleChange}
          
          >
            <option value="Low" disabled>Select a priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Control>
        </Form.Group>
        {errors?.priority?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        <Button 
         className={`${btnStyles.Button}  ${btnStyles.Bright} mb-5`}

         type="submit">
          Save
        </Button>
      </Form>
 
    </div>
  )
}

export default EditTaskForm