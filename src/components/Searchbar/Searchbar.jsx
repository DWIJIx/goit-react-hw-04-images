import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  Header,
  Form,
  SearchButton,
  SearchButtonLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [text, setText] = useState('');

  //   Метод для записування даних в стейт при введенны в input
  const handleChange = event => {
    // console.log(event.currentTarget.value);
    // Перезаписуємо в стейт text
    setText(event.currentTarget.value);
  };

  //   Метод сабміну форми.
  const handleSubmit = event => {
    event.preventDefault();
    // Перевіряємо, чи по сабміту в форму щось введено
    if (text === '') {
      toast.error('You need to enter something');
      return;
    }
    // Предаємо новий text в App через функцію onSubmit (вона передана пропом onSubmit={changeText} )
    onSubmit(text);
    resetForm();
  };

  const resetForm = () => {
    setText('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchButtonLabel>
            <BsSearch />
          </SearchButtonLabel>
        </SearchButton>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="text"
          value={text}
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
