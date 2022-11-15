import React from 'react';
import Header from '../../components/Header';
import { getUser } from '../userAPI';
import Carregando from './carregando';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const actualUser = await getUser();
    this.setState({ ...actualUser,
      loading: false });
  }

  handleChange = async (event) => {
    console.log(this.state);
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {

  };

  render() {
    const { name, image, description, email, loading } = this.state;
    return (
      <div>
        <Header />
        {
          loading ? <Carregando />
            : (
              <div data-testid="page-profile-edit">
                <input
                  name="name"
                  type="text"
                  value={ name }
                  onChange={ this.handleChange }
                />
                <button
                  type="button"
                  onClick={ this.handleSubmit }
                >
                  Submit

                </button>
              </div>
            )
        }
      </div>
    );
  }
}

export default ProfileEdit;
