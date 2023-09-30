import React from 'react';
import styles from "../../styles/Task.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card} from "react-bootstrap";
import { Link} from "react-router-dom";



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
      } = props
    
      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;

     
    

      



 

  return (
    <Card className={styles.Post}>
        
        <Card.Body>          
          <div className="d-flex align-items-center ">
            <span>
                { state_id ? (
                <span >
                    <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
                ) :  (
                <span>
                    <i className={`far fa-heart ${styles.HeartOutline}`} />
                </span>
                ) }
            </span>
            {title &&<Link to={`/tasks/${id}`}> <p  className= "pt-3 ml-4">{title}</p></Link>}
            {is_owner && TaskPage && "..."
            
            }
            {is_owner && TasksPage && "..."
            }
          </div>
      
      </Card.Body>
      
  </Card>
  );
};

export default Task