import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './services/pages/login';
import Search from './services/pages/search';
import Album from './services/pages/album';
import Favorites from './services/pages/favorites';
import Profile from './services/pages/profile';
import ProfileEdit from './services/pages/profileEdit';
import NotFound from './services/pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>TrybeTunes</h1>
        <BrowserRouter>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/" component={ Login } />
          <Route component={ NotFound } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
