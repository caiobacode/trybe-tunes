import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Lint extends React.Component {
  render() {
    const { selec, alb } = this.props;
    return (
      <div>
        <h1>
          Resultado de álbuns de:
          {' '}
          {selec}
        </h1>
        {alb.map((e) => {
          const elink = `/album/${e.collectionId}`;
          return (
            <div key={ e.collectionName }>
              <h2>
                Album
                {' '}
                {e.collectionName}
              </h2>
              <h3>{e.artistName}</h3>
              <Link
                data-testid={ `link-to-album-${e.collectionId}` }
                to={ elink }
                value="aaaa"
              >
                Access album
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

Lint.propTypes = {
  selec: PropTypes.string.isRequired,
  alb: PropTypes.arrayOf.isRequired,
};

export default Lint;
