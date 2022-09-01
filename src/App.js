import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './services/pages/login';
import Search from './services/pages/Search';
import Album from './services/pages/Album';
import Favorites from './services/pages/Favorites';
import Profile from './services/pages/profile';
import ProfileEdit from './services/pages/profileEdit';
import NotFound from './services/pages/NotFound';

class App extends React.Component {
  render() {
    return (
    <div>
      <p>TrybeTunes</p>;
      <Route path='/' component={Login} />
      <Route path='/search' component={Search} />
      <Route path='/album/:id' component={Album} />
      <Route path='/favorites' component={Favorites} />
      <Route path='/profile' component={Profile} />
      <Route path='/profile/edit/' component={ProfileEdit} />
      <Route component={NotFound} />
    </div>
    )
  }
}

export default App;
