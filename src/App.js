import './App.css';
import Main from "./components/Main";
import {Container} from "./components/Container";
import {Header} from "./components/Header";
import {Route} from "react-router-dom";
import VideogameDetail from "./components/VideogameDetail.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {
    getVidegamePlatforms,
    getVideogameGenres,
    getVideogamePage, setVideogamesBeforeFilter,
} from "./redux/actions";
import {ExclusiveForm} from "./components/ExclusiveForm";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideogamePage(1))
        dispatch(getVideogameGenres())
        dispatch(getVidegamePlatforms())
    }, [])

  return (
      <Container>
          <Header/>
          <Route exact path={'/'} component={Main}/>
          <Route path={'/videogames/:id'} component={VideogameDetail}/>
          <Route path={'/exclusives'} component={ExclusiveForm}/>
      </Container>
  );
}

export default App;
