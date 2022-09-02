import React from 'react';
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
          <h1>asdasddas</h1>
          { carregando ? <Carregando /> : (
            <h1 data-testid="header-user-name">{user}</h1>
          )}
        </div>
      </header>
    );
  }
}

export default Header;
