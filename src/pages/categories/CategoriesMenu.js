import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroupItem from "react-bootstrap/ListGroupItem";



import { useRedirect } from "../../hooks/useRedirect";



import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function CategoriesMenu({ message, filter = "" }) {
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
    
      <>
        
        {hasLoaded ? (
          <>
          
            {categories.results.length ? (
                <InfiniteScroll
                children={ categories.results.map((category) => (
                    <ListGroupItem key={category.id}>
                        <option value={category.id}>{category.name}</option>
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
           
          </>
        ) : (
          <Container className={appStyles.Content}>
            <p>loading...</p>
          </Container>
        )}
      
      </>
   
  );
}

export default  CategoriesMenu;