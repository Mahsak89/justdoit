import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import "./api/axiosDefaults";
import SignInForm from "./pages/auth/SignInForm";
import CreateCategoryForm from "./pages/categories/CreateCategoryForm";
import CreateTaskForm from './pages/tasks/CreateTaskForm';
import TaskPage from './pages/tasks/TaskPage';
import TasksPage from "./pages/tasks/TasksPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import EditTaskForm from './pages/tasks/EditTaskPage';
import HomePage from "./pages/other/HomePage";
import NotFound from "./pages/other/NotFound";
import ProfileDetail from "./pages/profiles/ProfileDetail";
import EditCategoryForm from './pages/categories/EditCategoryForm';




function App() {


    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";


  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <HomePage/>} />
          <Route
            exact
            path="/tasks"
            render={() => (
              <TasksPage
                message="No results found."
                filter={`owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/states"
            render={() => (
              <TasksPage
                message="You have not completed any task yet."
                filter={`owner__profile=${profile_id}&states__owner__profile=${profile_id}&ordering=-states__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/categories/create" render={() => <CreateCategoryForm/> } />
          <Route exact path="/categories/:id/edit" render={() => <EditCategoryForm />} />
          

          <Route exact path="/tasks/create" render={() => <CreateTaskForm/> } />
          <Route exact path="/tasks/:id" render={() => <TaskPage/>} />
          <Route exact path="/tasks/:id/edit" render={() => <EditTaskForm/>} />
          <Route exact path="/profiles/:id" render={() => <ProfileDetail />} />
          <Route
            exact
            path="/tasks/priority/Low"
            render={() => (
              <TasksPage
                message="No results found."
                filter={`owner__profile=${profile_id}&priority=Low&`}
              />
            )}
          />
            <Route
            exact
            path="/tasks/priority/Medium"
            render={() => (
              <TasksPage
                message="No results found."
                filter={`owner__profile=${profile_id}&priority=Medium&`}
              />
            )}
          />
            <Route
            exact
            path="/tasks/priority/High"
            render={() => (
              <TasksPage
                message="No results found."
                filter={`owner__profile=${profile_id}&priority=High&`}
              />
            )}
          />
          <Route 
          exact path="/categories/:id"
          render={({ match }) =>(
            <TasksPage
              message="No results found."
              filter={`owner__profile=${profile_id}&category=${match.params.id}&`}
            />
          )}
           />
        
          





          <Route render={() => <NotFound/>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
