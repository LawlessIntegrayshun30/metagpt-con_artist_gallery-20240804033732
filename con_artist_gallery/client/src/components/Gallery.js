## client/src/components/Gallery.js
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artworks: [],
      isLoading: false,
      error: null,
    };
  }

  // Fetch artworks from the server when the component mounts
  componentDidMount() {
    this.fetchArtworks();
  }

  // Function to fetch artworks from the server
  fetchArtworks = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await axios.get('/api/artworks');
      this.setState({ artworks: response.data, isLoading: false });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  };

  // Function to render each artwork
  renderArtwork = (artwork) => {
    return (
      <div key={artwork.id} className="artwork">
        <img src={artwork.imageUrl} alt={artwork.title} />
        <h3>{artwork.title}</h3>
        <p>{artwork.artist}</p>
      </div>
    );
  };

  // Render the gallery component
  render() {
    const { artworks, isLoading, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="gallery">
        {artworks.map(this.renderArtwork)}
      </div>
    );
  }
}

// Define propTypes for Gallery component
Gallery.propTypes = {
  artworks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  })),
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

export default Gallery;
