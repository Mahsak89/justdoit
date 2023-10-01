import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";


import styles from "../../styles/Home.module.css";
import appStyles from "../../App.module.css";

import home from "../../assets/homepage.jpg";
import home2 from "../../assets/homepage2.jpg";


function HomePage() {
 
  return (
  
  <>
  <Container>
  <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>JUST DO IT</h1>


          <p>A to-do list is an essential tool for effective task management. It provides clarity and structure to our daily activities, ensuring that nothing slips through the cracks. By jotting down tasks, we prioritize them and allocate time wisely, promoting productivity and reducing the risk of forgetfulness or procrastination. It serves as a visual roadmap, helping us stay focused and on track.</p>
          
        </Container>
       
      </Col>
      <Col
        md={6}
        className={`my-auto  d-md-block p-2 ${styles.HomeCol}`}
      >
        <Image className={`${appStyles.FillerImage}`} src={home} />
      </Col>
    </Row>

     <Row className={styles.Row}>
     <Col
        md={6}
        className={`my-auto  d-md-block p-2 ${styles.HomeCol}`}
      >
        <Image className={`${appStyles.FillerImage}`} src={home2} />
      </Col>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Why do we needd task to do list ?</h1><br/>


          <p>Tasks provide structure and purpose to our day. They guide us towards our goals and keep us focused on what's important. By tackling tasks, we make progress, whether it's in our personal or professional lives. Each completed task is a small victory, boosting our confidence and motivation.</p>
        </Container>
       
      </Col>
     
    </Row>
    
    

  </Container>



  </>
   
  );
}

export default HomePage;
