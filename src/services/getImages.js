import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '37056848-912ded0eb5e75838ece32e5ab';

export const getImages = async (inputSearch, page) => {

  const { data } = await axios({
    params: {
      q: inputSearch,
      page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    }
  })

  return data;
}


// //------------2--------------------------------------
// const BASE_URL = 'https://pixabay.com/api';
// const API_KEY = '37056848-912ded0eb5e75838ece32e5ab';

// export const getImages = (inputSearch, page) => {
//   const params = new URLSearchParams({
//     q: inputSearch,
//     page,
//     key: API_KEY,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     per_page: 12,
//   });

//   return fetch(
//     `${BASE_URL}/?${params}`
//   );
// };
