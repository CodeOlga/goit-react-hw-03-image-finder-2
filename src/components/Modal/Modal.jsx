import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  }

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>{this.props.children}</div>
      </div>
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal;



