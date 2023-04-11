import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  const [searchText, setSearchText] = useState('');

  const changeText = text => {
    setSearchText(text);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '6px',
        paddingBottom: '4px',
      }}
    >
      <Toaster position="top-left" toastOptions={{ duration: 2000 }} />
      <GlobalStyle />
      <Searchbar onSubmit={changeText} />
      <ImageGallery searchText={searchText} />
    </div>
  );
};
