import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { Link, useHistory } from 'react-router-dom'



import { useRedirect } from "../../hooks/useRedirect";



import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from '../../components/MoreDropdown';



function CategorieList({ message, filter = "" }) {
  useRedirect("loggedOut");

  const currentUser = useCurrentUser();

  const [categories, setCategories] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const history = useHistory();

  const handleEditCategory = (id) => {
    history.push(`/categories/${id}/edit`);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axiosReq.delete(`/categories/${id}/`);
    
      setCategories((prevCategories) => ({
        ...prevCategories,
        results: prevCategories.results.filter((category) => category.id !== id),
      }));
    } catch (err) {
      // Handle error
      // console.log(err);
    }
  };

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
                    <ListGroupItem key={category.id} className="d-flex justify-content-between align-items-center">
                        <Link to={`/categories/${category.id}`}>{category.name}</Link>
                        <MoreDropdown
                            handleEdit={() => handleEditCategory(category.id)}
                            handleDelete={() => handleDeleteCategory(category.id)}
                        />
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

export default  CategorieList;