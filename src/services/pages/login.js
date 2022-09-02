import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../userAPI';
import Carregando from './carregando';

class Login extends React.Component {
  state = {
    login: '',
    SaveButton: true,
    loading: false,
    redrect: false,
  };

  disabled = () => {
    const { login } = this.state;
    const min = 3;
    if (login.length >= min) {
      this.setState({ SaveButton: false });
    } else {
      this.setState({ SaveButton: true });
    }
  };

  handleChange = async (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.disabled();
    });
  };

  Click = async () => {
    const { login } = this.state;
    this.setState({ loading: true });
    await createUser({ name: login });
    this.setState({ redrect: true });
  };

  render() {
    const { login, SaveButton, loading, redrect } = this.state;

    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          name="login"
          value={ login }
          onChange={ this.handleChange }
        />
        <button
          disabled={ SaveButton }
          data-testid="login-submit-button"
          type="button"
          onClick={ this.Click }
        >
          Entrar
        </button>
        {
          loading && <Carregando />
        }
        {
          redrect && <Redirect to="/search" />
        }
      </div>
    );
  }
}

export default Login;
