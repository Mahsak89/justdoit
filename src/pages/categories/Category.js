import React from 'react';
//import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";


const Category = (props) => {
    const {
        id,
        owner,
        name,
    
      } = props
    
      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;
      const history = useHistory();

      
    

      
    

  return (
    <Card className={styles.Post}>
        
        <Card.Body>          
          <div className="d-flex align-items-center ">
            <span>
                { state_id ? (
                <span onClick={handleUnlike}>
                    <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
                ) :  (
                <span onClick={handleLike}>
                    <i className={`far fa-heart ${styles.HeartOutline}`} />
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
  )
}

export default Category

