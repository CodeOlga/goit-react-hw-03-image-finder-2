import { Component } from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component  {
  
  state = {
    inputSearch: ''
  }

  handleInputChange = e => {
    this.setState({inputSearch: e.currentTarget.value.toLowerCase()})
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputSearch.trim() === '') {
      return toast.error('please fill in the input field');
    }
    this.props.onSubmit(this.state.inputSearch)
    this.setState({inputSearch: ''})
  }
  
  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.searchForm}>
          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputSearch}
            onChange={this.handleInputChange}
          />
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
            <ImSearch/>
          </button>
        </form>
      </header>
    )
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Searchbar;