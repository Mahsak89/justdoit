import React from 'react';
import styles from "../../styles/Task.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card} from "react-bootstrap";
import { Link, useHistory} from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";





const Task = (props) => {
    const {
        id,
        owner,
        //profile_id,
        //category,
        title,
       // description,
       // created_at,
        //updated_at,
       // startdate,
       // deadline,
       // priority,
        state_id,
       // states_count,
        TaskPage,
        TasksPage,
        setTasks,
      } = props
    
      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;
      const history = useHistory();

      const handleEdit = () => {
        history.push(`/tasks/${id}/edit`);
      };
    
      const handleDelete = async () => {
        try {
          await axiosRes.delete(`/tasks/${id}/`);
          history.goBack();
        } catch (err) {
         //console.log(err);
        }
      };




      const handleComplete = async () => {
        try {
          const { data } = await axiosRes.post("/states/", { task: id });
          setTasks((prevTasks) => ({
            ...prevTasks,
            results: prevTasks.results.map((task) => {
              return task.id === id
                ? { ...task, state_id: data.id }
                : task;
            }),
          }));
        } catch (err) {
          //console.log(err);
        }
      };
    
      const handleUncomplete = async () => {
        try {
          await axiosRes.delete(`/states/${state_id}/`);
          setTasks((prevTasks) => ({
            ...prevTasks,
            results: prevTasks.results.map((task) => {
              return task.id === id
                ? { ...task, state_id: null }
                : task;
            }),
          }));
        } catch (err) {
         // console.log(err);
        }
      };
    

      



 

  return (
    <Card className={styles.Task}>
        
        <Card.Body>          
          <div className="d-flex align-items-center ">
            <span>
                { state_id ? (
                <span  onClick={handleUncomplete} >
                    <i className={`fas fa-square ${styles.square}`} />
                </span>
                ) :  (
                <span   onClick={handleComplete}>
                    <i className={`far fa-square ${styles.squareOutline}`} />
                </span>
                ) }
            </span>
            {title &&<Link to={`/tasks/${id}`}> <p  className= "pt-3 ml-4">{title}</p></Link>}
            {is_owner && TaskPage && (
                <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )
            
            }
            {is_owner && TasksPage && (
                <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )
            }
          </div>
      
      </Card.Body>
      
  </Card>
  );
};

export default Task