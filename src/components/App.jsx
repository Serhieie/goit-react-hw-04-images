import React, { Component } from 'react';
import { Loader } from 'helpers/loader';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGalery } from './ImageGalery/ImageGalery';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import * as API from '../services/apiService';
import {
  toastCallError,
  succesToastCall,
  toastCallOutOfRange,
  toastCallEmpty,
} from '../helpers/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    page: null,
    isLoading: false,
    images: [],
    searchValue: '',
    pagination: 9,
    heightToMinus: 120,
  };

  //Call scrollBottom function after images loaded by pressing load more button
  componentDidUpdate(prevProps, prevState) {
    if (prevState.images !== this.state.images) {
      this.scrollBottom();
    }
  }

  //Next three Functions - experiment with pagination
  // bigger screen more images will fetch also calculating
  // how many pixels need to minus for better experience of use
  componentDidMount() {
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
  handleWindowResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1980) {
      this.setState({ pagination: 16 });
    } else if (windowWidth >= 1480) {
      this.setState({ pagination: 12, heightToMinus: 145 });
    } else if (windowWidth <= 768) {
      this.setState({ pagination: 10, heightToMinus: 640 });
    } else if (windowWidth >= 768) {
      this.setState({ pagination: 12, heightToMinus: 395 });
    } else {
      this.setState({ pagination: 9, heightToMinus: 120 });
    }
  };

  //Function witch taking heights,  calculating  and  scrolling to the needed point
  scrollBottom = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 520) {
      return;
    }
    const windowHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const scrollableDistance =
      pageHeight - windowHeight - this.state.heightToMinus;
    if (scrollableDistance > 0) {
      window.scrollTo({
        top: scrollableDistance,
        behavior: 'smooth',
      });
    }
  };

  //Fetching images by form submission
  fetchImages = async value => {
    try {
      const { page, pagination } = this.state;
      this.setState({
        error: false,
        isLoading: true,
        searchValue: value,
        images: [],
      });
      const images = await API.getImgs(value, page, pagination);
      if (!images.hits.length) {
        this.setState({
          isLoading: false,
          page: null,
        });
        return toastCallEmpty();
      }
      succesToastCall();
      this.setState(prevState => ({
        images: images.hits,
        page: prevState.page + 1,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error: true, isLoading: false });
      toastCallError();
    }
  };

  //Fetching images by pressing load more button
  loadMoreImages = async () => {
    const { page, searchValue, pagination } = this.state;
    this.setState({ isLoading: true });

    try {
      const images = await API.getImgs(searchValue, page + 1, pagination);
      const updatedImages = [...this.state.images, ...images.hits];

      if (!images.hits.length) {
        this.setState({
          isLoading: false,
          page: null,
        });
        toastCallEmpty();
      } else {
        this.setState({
          images: updatedImages,
          isLoading: false,
          page: page + 1,
        });
        succesToastCall();
      }
    } catch (error) {
      this.setState({ error: true, isLoading: false });
      toastCallOutOfRange();
    }
  };

  render() {
    const { page, isLoading, images, error } = this.state;
    return (
      <>
        <SearchBar onSearch={this.fetchImages} />
        <ToastContainer />
        <ImageGalery images={images} />

        {/* Showing loader when loading in state */}
        {isLoading ? (
          <div className="fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-40 flex justify-center items-center z-30">
            <Loader />
          </div>
        ) : (
          // showing button after form submission ( at form submission we are giving +1 for the page)
          page >= 1 && (
            <LoadMoreButton onClick={this.loadMoreImages} error={error} />
          )
        )}
      </>
    );
  }
}
