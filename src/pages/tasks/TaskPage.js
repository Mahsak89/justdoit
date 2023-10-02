import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Task from "./Task";
import { useRedirect } from "../../hooks/useRedirect";



function TaskPage() {
 useRedirect("loggedOut");


  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: task }] = await Promise.all([
          axiosReq.get(`/tasks/${id}`),
        ]);
        setTask({ results: [task] });
        //console.log(task);
      } catch (err) {
        //console.log(err);
      }
    };

    handleMount();
  }, [id]);
  return (
    <Row className="h-100 justify-content-md-center">
      <col lg={4}></col>
      <Col className="align-items-center" lg={8}>
        
        <Task  {...task.results[0]} setTasks = {setTask} TaskPage />
        <Container className={appStyles.Content}>sth</Container>
      </Col>
     
    </Row>
  )
}

export default TaskPage