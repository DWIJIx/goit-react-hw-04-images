import { useState } from 'react';
import { Img } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal.jsx';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ imageObj }) => {
  const [showModal, setshowModal] = useState(false);
  const [image, setImage] = useState({});
  // console.log(imageObj);

  const openModal = image => {
    // console.log(image);
    setshowModal(true);
    setImage(image);
  };

  const closeModal = () => {
    setshowModal(false);
    setImage({});
  };

  const { webformatURL, tags } = imageObj;

  return (
    <>
      <Img src={webformatURL} alt={tags} onClick={() => openModal(imageObj)} />
      {showModal && <Modal image={image} onClose={closeModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
