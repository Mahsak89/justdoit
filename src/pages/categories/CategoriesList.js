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
import { MoreDropdown } from "../../components/MoreDropdown";


function Cat("loggedOut");

  const currentUser = useCurrentUser();
  const [categories, setCategories] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  
  const handleEdit = (id) => {
    history.push(`/categories/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
        await axiosRes.delete(`/categories/${id}/`);
        history.goBack();
        setCategories((prevCategories) => ({
          ...prevCategories,
           results: prevCategories.results.filter((category) => category.id !== categoryId),
        }));
         catch (err) {
        //console.log(err);
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
                    <ListGroupItem key={category.id}>
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