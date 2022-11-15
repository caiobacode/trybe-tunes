import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './carregando';
import { addSong, removeSong } from '../favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
    check: false,
  };

  componentDidMount() {
    const { thisSong, favoriteTrack } = this.props;
    favoriteTrack?.forEach((e) => {
      if (e.trackName === thisSong.trackName) {
        this.setState({ check: true });
      }
    });
  }

  handleClick = async (song) => {
    const { check } = this.state;
    const { handleDesfavorite } = this.props;
    if (typeof handleDesfavorite !== 'undefined') {
      handleDesfavorite(song);
    }
    if (check) {
      this.setState({
        loading: true,
        check: false }, async () => {
        await removeSong(song);
        this.setState({ loading: false });
      });
    } else {
      this.setState({
        loading: true,
        check: true }, async () => {
        await addSong(song);
        this.setState({ loading: false });
      });
    }
  };

  render() {
    const { musicName, previewUrl, trackId, thisSong } = this.props;
    const { loading, check } = this.state;
    return (
      <div>
        <h4>{musicName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ () => this.handleClick(thisSong) }
            checked={ check }
          />
          Favorita
        </label>
        {
          loading && <Carregando />
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  handleDesfavorite: PropTypes.func.isRequired,
  musicName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  thisSong: PropTypes.objectOf.isRequired,
  favoriteTrack: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
