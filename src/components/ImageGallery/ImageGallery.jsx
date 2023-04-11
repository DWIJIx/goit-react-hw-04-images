import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchApi } from '../../services/fetchApi.js';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from 'components/Loader/Loader.jsx';
import { Button } from 'components/Button/Button.jsx';
import { GalleryList, GalleryItem } from './ImageGallery.styled';
import toast from 'react-hot-toast';

export const ImageGallery = ({ searchText }) => {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchText.trim() === '') {
      return;
    }
    fetchApi(searchText.trim(), 1)
      .then(data => {
        if (data.total === 0) {
          // console.log(images);
          // console.log('No data');
          setStatus('idle');
          toast.error('Sorry, the requested image was not found');
        } else {
          setImages(data.hits);
          setStatus('resolved');
          setTotalHits(data.totalHits);
        }
      })
      .catch(error => {
        console.dir(error);
        setError(error.message);
        setStatus('rejected');
      });
  }, [searchText]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.searchText !== this.props.searchText) {
  //     this.setState({ status: 'pending', page: 1, images: [] });

  //     fetchApi(this.props.searchText.trim(), 1)
  //       .then(data => {
  //         if (data.total === 0) {
  //           // console.log(images);
  //           // console.log('No data');
  //           this.setState({ status: 'idle' });
  //           toast.error('Sorry, the requested image was not found');
  //         } else {
  //           this.setState({
  //             images: data.hits,
  //             status: 'resolved',
  //             totalHits: data.totalHits,
  //           });
  //         }
  //       })
  //       .catch(error => {
  //         console.dir(error);
  //         this.setState({ error: error.message, status: 'rejected' });
  //       });
  //   }
  // }

  const loadMore = () => {
    // const maxPage = Math.ceil(this.state.totalHits / 12);
    // // Перевірка на максимальну к-сть сторінок і чи є ще картинки
    // if (maxPage < this.state.page + 1) {
    //   toast.error('Sorry, no more photos');
    //   return;
    // }
    fetchApi(searchText.trim(), page + 1)
      .then(data => {
        setStatus('resolved');
        setImages(prevState => [...prevState, ...data.hits]);
        setPage(prevPage => prevPage + 1);
      })
      .catch(error => {
        console.dir(error);
        this.setState({ error: error.message, status: 'rejected' });
      });
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return (
      <div>
        <h2>Oops, something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <GalleryList>
          {images.map(image => {
            return (
              <GalleryItem key={image.id}>
                <ImageGalleryItem imageObj={image} />
              </GalleryItem>
            );
          })}
        </GalleryList>
        {totalHits !== images.length && <Button onLoadMore={loadMore} />}
      </>
    );
  }
};

ImageGallery.propTypes = {
  searchText: PropTypes.string.isRequired,
};
