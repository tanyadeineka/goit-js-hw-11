 import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=31491056-913106eba1c8b28fe3dc938e7';

export const fetchImages = async (inputValue, pageNumber) => {
  const { data } = await axios.get(`&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNumber}`);
  return data;
}

/* export const fetchImages = async (inputValue, pageNr) => {
  return await fetch(
    `https://pixabay.com/api/?key=31491056-913106eba1c8b28fe3dc938e7&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNr}`
  )
    .then(async response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}; */