import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    artist: '',
    album: '',
    albumMusics: [],
    favoriteSongs: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const ovo = await getFavoriteSongs();
    const suite = await getMusics(id);
    const albumMusics = suite.filter((_, index) => index !== 0);
    this.setState({ artist: suite[0].artistName,
      album: suite[0].collectionName,
      favoriteSongs: ovo,
      albumMusics });
  }

  render() {
    const { artist, album, albumMusics, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 className='artistName' name="artist-name" data-testid="artist-name">{artist}</h2>
        <h3 name="nameAlbum" data-testid="album-name">{album}</h3>
        <div>
          { albumMusics.map((music) => (
            <MusicCard
              key={ music.trackId }
              musicName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              thisSong={ music }
              favoriteTrack={ favoriteSongs }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
  params: PropTypes.objectOf.isRequired,
  id: PropTypes.string.isRequired,
};

export default Album;
