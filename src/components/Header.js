import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    user: {},
    carregando: true,
  };

  async componentDidMount() {
    const get = await getUser();
    this.setState({ user: get.name, carregando: false });
  }

  render() {
    const { user, carregando } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          { carregando ? <Loading /> : (
            <h1 className='headerName' data-testid="header-user-name">{user}</h1>
          )}
          <Link
            data-testid="link-to-search"
            to="/search"
            >
            <button type='button'>Search</button>
          </Link>
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
            >
            <button type='button'>Favorites</button>
          </Link>
          <Link
            data-testid="link-to-profile"
            to="/profile"
            >
            <button type='button'>Profile</button>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
