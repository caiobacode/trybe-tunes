import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from './Carregando';
import { getUser } from '../services/userAPI';

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
          { carregando ? <Carregando /> : (
            <h1 className='headerName' data-testid="header-user-name">{user}</h1>
          )}
          <Link
            data-testid="link-to-search"
            to="/search"
            >
            <button type='button'>Pesquisar</button>
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
