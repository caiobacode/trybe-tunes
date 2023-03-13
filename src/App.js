import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/login';
import Search from './pages/search';
import Album from './pages/album';
import Favorites from './pages/favorites';
import Profile from './pages/profile';
import ProfileEdit from './pages/profileEdit';
import NotFound from './pages/notFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>TrybeTunes</h1>
        <BrowserRouter>
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/" component={ Login } />
          <Route component={ NotFound } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
