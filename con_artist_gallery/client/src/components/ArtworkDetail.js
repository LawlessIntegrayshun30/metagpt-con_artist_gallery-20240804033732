## client/src/components/ArtworkDetail.js
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class ArtworkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artwork: null,
      isLoading: false,
      error: null,
    };
  }

  // Fetch artwork detail from the server when the component receives a new artwork ID
  componentDidUpdate(prevProps) {
    if (this.props.artworkId !== prevProps.artworkId) {
      this.fetchArtworkDetail(this.props.artworkId);
    }
  }

  // Function to fetch artwork details from the server
  fetchArtworkDetail = async (artworkId) => {
    this.setState({ isLoading: true });
    try {
      const response = await axios.get(`/api/artworks/${artworkId}`);
      this.setState({ artwork: response.data, isLoading: false });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  };

  // Render the artwork detail component
  render() {
    const { artwork, isLoading, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!artwork) {
      return <div>Select an artwork to view details.</div>;
    }

    return (
      <div className="artwork-detail">
        <img src={artwork.imageUrl} alt={artwork.title} />
        <h3>{artwork.title}</h3>
        <p>{artwork.artist}</p>
        <p>{artwork.description}</p>
      </div>
    );
  }
}

// Define propTypes for ArtworkDetail component
ArtworkDetail.propTypes = {
  artworkId: PropTypes.string.isRequired,
  artwork: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

export default ArtworkDetail;
