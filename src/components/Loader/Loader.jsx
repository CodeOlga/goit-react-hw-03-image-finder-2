import PropTypes from 'prop-types';
import css from './Loader.module.css';

const Loader = ({children}) => {
  return (
    <div className={css.loaderContainer}>
      {children}
    </div>
  )
}

Loader.propTypes = {
  children: PropTypes.node.isRequired
};

export default Loader;