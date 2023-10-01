import React from "react";


import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";





function NotFound() {
 
  return (
  
  <>
  <Container >

  <Alert variant='secondary'>
    <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
        However I am sorry , we couldnt find your page ! 
        </p>
        <hr />
        <p className="mb-0">
            
               Try again please !
            
        </p>
      </Alert>

 
    
    

  </Container>



  </>
   
  );
}

export default NotFound;
