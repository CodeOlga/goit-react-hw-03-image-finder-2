import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({onBtnClick}) => {
  return (
    <div className={css.btnContainer}>
          <button className={css.button} type='button' onClick={onBtnClick}>
                Load more
          </button>
    </div>
  )
}

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired
}

export default Button;


