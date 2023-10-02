import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from 'react-router-dom'



import { useRedirect } from "../../hooks/useRedirect";



import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function CategorieList({ message, filter = "" }) {
  useRedirect("loggedOut");

  const currentUser = useCurrentUser();

  const [categories, setCategories] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosReq.get(`/categories/?${filter}`);
        setCategories(data);
        setHasLoaded(true);
      } catch (err) {
        //console.log(err);
      }
    };

    setHasLoaded(false);
    fetchCategories();
 }, [filter, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 m-auto"  >
        
        {hasLoaded ? (
          <>
          <ListGroup className="list-group-flush">
            {categories.results.length ? (
                <InfiniteScroll
                children={ categories.results.map((category) => (
                    <ListGroupItem key={category.id}>
                        <Link to={`/categories/${category.id}`}>{category.name}</Link>
                    </ListGroupItem>
                ))}
                dataLength={categories.results.length}
                loader='...'
                hasMore={!!categories.next}
                next={() => fetchMoreData(categories, setCategories)}
              />
             

            ) : (
              <Container className={appStyles.Content}>
               <p>{message}</p>
              </Container>
            )}
             </ListGroup>
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

export default  CategorieList;