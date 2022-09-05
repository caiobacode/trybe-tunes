import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import getMusics from '../musicsAPI';
import MusicCard from './musicCard';

class Album extends React.Component {
  state = {
    artist: '',
    album: '',
    albumMusics: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const suite = await getMusics(id);
    const albumMusics = suite.filter((_, index) => index !== 0);
    this.setState({ artist: suite[0].artistName,
      album: suite[0].collectionName,
      albumMusics });
  }

  render() {
    const { artist, album, albumMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 name="artist-name" data-testid="artist-name">{artist}</h2>
        <h3 name="album-name" data-testid="album-name">{album}</h3>
        <div>
          { albumMusics.map((music) => (
            <MusicCard
              key={ music.trackId }
              musicName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              thisSong={ music }
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
