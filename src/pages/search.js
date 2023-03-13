import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Lint from '../components/SearchResults';

class Search extends React.Component {
  state = {
    artist: '',
    searchButton: true,
    loading: false,
    ovo: false,
    ovo2: false,
    selected: '',
    album: [],
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

  Click = async () => {
    const { artist } = this.state;
    this.setState({
      loading: true,
      artist: '',
      selected: artist,
      album: [],
    }, async () => {
      const { selected } = this.state;
      const sla = await searchAlbumsAPI(selected);
      await this.setState({ album: sla }, () => {
        const { album } = this.state;
        if (album.length !== 0) {
          this.setState({ ovo: true,
            loading: false });
        } else {
          this.setState({ ovo2: true,
            loading: false });
        }
      });
    });
  };

  render() {
    const { searchButton, artist, loading, ovo, ovo2, selected, album } = this.state;
    return (
      <div>
        <div data-testid="page-search">
          <Header />
          <input
            data-testid="search-artist-input"
            value={ artist }
            type="text"
            name="artist"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ searchButton }
            onClick={ this.Click }
          >
            Search
          </button>
          {
            loading && <Loading />
          }
          {
            ovo && <Lint selec={ selected } alb={ album } />
          }
          {
            ovo2
              && <h1>No album was found</h1>
          }
        </div>
      </div>
    );
  }
}

export default Search;
