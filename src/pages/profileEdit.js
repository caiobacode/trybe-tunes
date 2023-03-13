import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: false,
    disabledBtn: true,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const actualUser = await getUser();
    this.setState({ ...actualUser,
      loading: false }, () => {
      this.handleDisableBtn();
    });
  }

  handleDisableBtn = () => {
    const maxLength = 4;
    const stateFiltered = Object.values(this.state)
      .filter((i) => i !== '' && i !== true && i !== false);
    const { email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = email && regex.test(email);
    if (verifyEmail && stateFiltered.length === maxLength) {
      this.setState({ disabledBtn: false });
      return;
    }
    this.setState({ disabledBtn: true });
  };

  handleChange = async (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.handleDisableBtn();
    });
  };

  handleSubmit = () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    const newObj = {
      name,
      email,
      image,
      description,
    };
    this.setState({ loading: true }, async () => {
      await updateUser(newObj);
      this.setState({ loading: false });
      history.push('/profile');
    });
  };

  render() {
    const { name, image, description, email, loading, disabledBtn } = this.state;
    return (
      <div>
        <Header />
        {
          loading ? <Loading />
            : (
              <div data-testid="page-profile-edit">
                <input
                  data-testid="edit-input-name"
                  name="name"
                  type="text"
                  value={ name }
                  onChange={ this.handleChange }
                />
                <input
                  data-testid="edit-input-email"
                  name="email"
                  type="text"
                  value={ email }
                  onChange={ this.handleChange }
                />
                <input
                  data-testid="edit-input-image"
                  name="image"
                  type="text"
                  value={ image }
                  onChange={ this.handleChange }
                />
                <input
                  data-testid="edit-input-description"
                  name="description"
                  type="text"
                  value={ description }
                  onChange={ this.handleChange }
                />
                <button
                  data-testid="edit-button-save"
                  type="button"
                  onClick={ this.handleSubmit }
                  disabled={ disabledBtn }
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

ProfileEdit.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default ProfileEdit;
