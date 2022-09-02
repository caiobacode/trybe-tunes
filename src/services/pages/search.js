import React from 'react';
import Header from '../../components/Header';

class Search extends React.Component {
  state = {
    artist: '',
    searchButton: true,
  };

  disabled = () => {
    const { artist } = this.state;
    const min = 2;
    if (artist.length >= min) {
      this.setState({ searchButton: false });
    } else {
      this.setState({ searchButton: true });
    }
  };

  handleChange = async (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.disabled();
    });
  };

  render() {
    const { searchButton, artist } = this.state;
    return (
      <div>
        <div data-testid="page-search">
          <Header />
          <input
            data-testid="search-artist-input"
            value={ artist }
            name="artist"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ searchButton }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
