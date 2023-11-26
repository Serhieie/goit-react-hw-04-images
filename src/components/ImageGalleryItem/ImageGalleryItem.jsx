import Modal from 'helpers/Modal';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
    isZoomed: false,
  };

  //toggle modal function with scroll blocking effect
  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
    this.scrollBlock();
  };

  //Imitation of zoom in open modal
  toggleZoom = evt => {
    const { isZoomed } = this.state;
    this.setState(prevState => ({
      isZoomed: !prevState.isZoomed,
    }));
    const target = evt.currentTarget;
    target.style.transition = 'all 300ms linear';
    if (isZoomed) {
      target.style.transform = 'scale(1)';
      target.style.cursor = 'zoom-in';
    } else {
      target.style.transform = 'scale(1.4)';
      target.style.cursor = 'zoom-out';
    }
  };

  //block scroll function if modal is open
  scrollBlock = () => {
    if (!this.state.isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;
    const { isModalOpen, isZoomed } = this.state;
    return (
      <li className="rounded shadow-lg">
        <img
          className="w-full h-[260px] object-cover transition-transform 
        duration-300 sm:hover:scale-[1] hover:scale-[1.02] cursor-zoom-in"
          src={webformatURL}
          alt="galeryImage"
          onClick={this.toggleModal}
          loading="lazy"
        />
        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <img
              onClick={event => this.toggleZoom(event)}
              className={`w-full object-cover transition-transform 
        duration-300  max-h-[720px] max-w-[1080px] cursor-zoom-in
        ${isZoomed ? 'cursor-zoom-out' : ''}`}
              src={largeImageURL}
              alt="galeryImage"
            />
          </Modal>
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
};
