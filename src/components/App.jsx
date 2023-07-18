import { Component } from 'react';
import { ColorRing } from  'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from 'services/getImages';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';

class App extends Component {
  state = {
    inputSearch: '',
    hits: [],
    page: 1,
    modalImageURL: '',
    loading: false,
    showModal: false,
    endOfCollection: false,
    tags: '',
  }

async componentDidUpdate(_, prevState) {
  const { inputSearch, page } = this.state;
    if (inputSearch !== prevState.inputSearch || page !== prevState.page) {
      try {
        this.setState({ loading: true })
      
        const data = await getImages(inputSearch, page)

             //успішний запит
          this.setState(prevState => ({
            hits: [...prevState.hits, ...data.hits]
          }))
        
          if (!data.totalHits) {
            //якщо користувач ввів неіснуючий запит
            return toast.error(`No results found for ${inputSearch}`);
          }

            //завершення колекції
          const totalPages = Math.ceil(data.totalHits / 12);
          
          if (page === totalPages) {
            this.setState({ endOfCollection: true }); 
            return toast.error('No more pictures');
          }
      }
      //помилка від сервера
      catch (error) {
        return toast.error(`Something goes wrong. Please, try again.`);
      }

      finally {
        this.setState({ loading: false })
      } 
    }
  }
  
  //очищуємо hits, щоб при новому пошуку оновлювався запит
  handleFormSubmit = inputSearch => {
    this.setState({ inputSearch, page: 1, hits: [], endOfCollection: false});
  }

  //пагінація
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  }

  openModal = (largeImageURL, tags) => {
    this.setState({ showModal: true, modalImageURL: largeImageURL, tags })
  }

  closeModal = () => {
    this.setState({ showModal: false, modalImageURL: ''})
  }

  render() {
    const { hits, loading, showModal, modalImageURL, endOfCollection, tags } = this.state;
    const showLoadMoreBtn = hits.length > 0 && !endOfCollection; 

    return (
      <div className={css.app}>

        <Searchbar onSubmit={ this.handleFormSubmit} />

        {loading && 
          <Loader>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </Loader>}

        {hits && 
          <ImageGallery>
            <ImageGalleryItem images={hits} onImageClick={this.openModal} />
          </ImageGallery>
          }

        {showLoadMoreBtn && 
          <Button onBtnClick={() => this.handleLoadMore()} />
        } 

        {showModal &&
          <Modal onClose={this.closeModal}>
          <img src={modalImageURL} alt={tags} />
        </Modal>}
 
        <ToastContainer autoClose={3000} theme="dark" closeButton={false} />
      </div>
    )
  }
}

export default App;
