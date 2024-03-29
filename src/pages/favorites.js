import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    favoriteSongs: [],
    loading: true,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false,
      favoriteSongs });
  }

  handleDesfavorite = (song) => {
    this.setState({ loading: true }, async () => {
      await removeSong(song);
      const newFavoriteSongs = await getFavoriteSongs();
      this.setState({ favoriteSongs: newFavoriteSongs });
      this.setState({ loading: false });
    });
  };

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading ? <Loading />
            : favoriteSongs?.map((music) => (
              <MusicCard
                handleDesfavorite={ this.handleDesfavorite }
                key={ music.trackId }
                musicName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                thisSong={ music }
                favoriteTrack={ favoriteSongs }
              />))
        }
      </div>
    );
  }
}

export default Favorites;
