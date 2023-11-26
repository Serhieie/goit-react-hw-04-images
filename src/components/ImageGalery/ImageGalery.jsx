import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGalery = ({ images }) => {
  return (
    <div>
      {/* If images state is empty we are hidding ul and showing h1 title */}
      <ul
        className={`grid list-none gap-4 sm:gap-1 sm2:gap-2 
        my-0 p-0 mt-4 mb-2 px-4 sm2:px-2 sm:px-1 mx-auto 
        grid-cols-3 sm:grid-cols-1 w-full sm2:grid-cols-2 extraLargeScreen:grid-cols-4 bg-image2 
        ${!images || images.length === 0 ? 'hidden' : ''}`}
      >
        {/* Making shure that we have images... that we are for shure have it :) */}
        {images &&
          images.length > 0 &&
          images.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
            />
          ))}
      </ul>
      <h1
        className={`m-0 p-0  largeScreen:text-[210px]  sm2:max-w-[460px] lg:max-w-[700px] max-w-[900px] text-[128px] sm2:text-[82px] sm:text-[48px] font-extrabold 
        leading-extra-tight tracking-tight sm:w-[300px] sm:pt-40 sm:leading-none sm:ml-2 sm2:pt-32 sm2:pl-5 ml-2 largeScreen:py-6 py-20 bg-clip-text 
        text-transparent bg-gradient-to-r from-blue-600 to-indigo-900 largeScreen:max-w-[1400px] w-full extraLargeScreen:ml-28 extraLargeScreen:mt-24 select-none
        ${images && images.length > 0 ? 'hidden' : ''}`}
      >
        SEEK{' '}
        <span
          className="largeScreen:text-[60px] text-[40px] tracking-normal bg-gradient-to-r 
         from-blue-400 to-indigo-300 sm2:text-[24px] sm:text-[18px] text-transparent bg-clip-text"
        >
          dark souls phrase
        </span>{' '}
        STRENGTH. THE REST WILL FOLLOW.
      </h1>
    </div>
  );
};

ImageGalery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
