import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Profile extends React.Component {
  state = {
    user: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const userProfile = await getUser();
    this.setState({ user: userProfile,
      loading: false });
  }

  render() {
    const { loading, user } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Header />
        {
          loading ? <Carregando />
            : (
              <div data-testid="page-profile">
                <img data-testid="profile-image" alt="profileImg" src={ user.image } />
                <h1>{user.name}</h1>
                <p>{user.email}</p>
                <text>{user.description}</text>
                <button
                  type="button"
                  onClick={ () => history.push('profile/edit') }
                >
                  Editar perfil
                </button>
              </div>
            )
        }
      </div>

    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Profile;
