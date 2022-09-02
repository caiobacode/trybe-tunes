import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../services/pages/carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      carregando: true,
    };
  }

  componentDidMount() {
    this.sla();
  }

  sla = async () => {
    const get = await getUser();
    this.setState({ user: get.name, carregando: false });
  };

  render() {
    const { user, carregando } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          { carregando ? <Carregando /> : (
            <h1 data-testid="header-user-name">{user}</h1>
          )}
          <Link
            data-testid="link-to-search"
            to="/search"
          />
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
          />
          <Link
            data-testid="link-to-profile"
            to="/profile"
          />
        </div>
      </header>
    );
  }
}

export default Header;
