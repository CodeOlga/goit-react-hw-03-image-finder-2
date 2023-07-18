import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  //закриття по escape
  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  }

  //закриття по кліку тільки на backdrop
  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  }

  render() {
    return (
      createPortal(
        <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>{this.props.children}</div>
        </div>,
        modalRoot,
    )
    )
  }

  //якщо без портала
  //   render() {
  //   return (
  //     <div className={css.overlay} onClick={this.handleBackdropClick}>
  //       <div className={css.modal}>{this.props.children}</div>
  //     </div>
  //   )
  // }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal;



