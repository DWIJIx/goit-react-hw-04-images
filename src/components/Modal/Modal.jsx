import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalDiv } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ image, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    console.log('UseEffect');
  });

  // Ставимо слухача, коли модалка змонтована
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }
  // // Знімаємо слухача, коли модалка розмонтована
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }
  //   Метод закриття модалки по кліку на ескейп
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      // console.log('Find Escape');
      window.removeEventListener('keydown', handleKeyDown);
      onClose();
    }
  };
  //   Метод закриття модалки по кліку на бекроп
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      window.removeEventListener('keydown', handleKeyDown);
      onClose();
    }
  };

  const { largeImageURL, tags } = image;
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalDiv>
        <img src={largeImageURL} alt={tags} />
      </ModalDiv>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
