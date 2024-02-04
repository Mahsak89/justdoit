import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useRedirect } from "../../hooks/useRedirect";


import Task from "./Task";

import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import SideBar from "../../components/SideBar";

function TasksPage({ message, filter = "" }) {
  useRedirect("loggedOut");

  const currentUser = useCurrentUser();

  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Filter:", filter);  // Check if filter is received
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/?${filter}`);
        console.log("Tasks:", data);  // Log the tasks data

        setTasks(data);
        setHasLoaded(true);
      } catch (err) {
        console.error("Error fetching tasks:", err);

      }
    };

    setHasLoaded(false);
    fetchTasks();
 }, [filter, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col md={4} className="d-lg-block p-0 p-lg-2">
        <SideBar/>
      </Col>
      <Col className="py-2 p-0 p-lg-2 m-auto" md={8} >
        
        {hasLoaded ? (
          <>
            {tasks.results.length ? (
                <InfiniteScroll
                children={ tasks.results.map((task) => (
                    <Task key={task.id} {...task} setTasks={setTasks}  TasksPage />
                ))}
                dataLength={tasks.results.length}
                loader='...'
                hasMore={!!tasks.next}
                next={() => fetchMoreData(tasks, setTasks)}
              />

            ) : (
              <Container className={appStyles.Content}>
               <p>{message}</p>
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <p>loading...</p>
          </Container>
        )}
      </Col>
      
    </Row>
  );
}

export default TasksPage;