import { fetchImages } from './js/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.form-input');
const btnSearch = document.querySelector('.btn-search');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

btnLoadMore.style.display = 'none';

let pageNumber = 1;

btnSearch.addEventListener('click', e => {
    e.preventDefault();
    cleanGallery();
    const trimValue = input.value.trim();
    if (trimValue !== '') {
        fetchImages(trimValue, pageNumber).then(foundData => {
            if (foundData.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                renderImageList(foundData.hits);
                Notiflix.Notify.success(`Hooray! We found ${foundData.totalHits} images.`);
                btnLoadMore.style.display = 'block';
                gallerySimpleLightbox.refresh();
            }
        });
    }
});

btnLoadMore.addEventListener('click', () => {
  pageNumber += 1;
  const trimValue = input.value.trim();
  btnLoadMore.style.display = 'none';
  fetchImages(trimValue, pageNumber).then(foundData => {
    if (foundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderImageList(foundData.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${foundData.totalHits} images.`
      );
      btnLoadMore.style.display = 'block';
    }
  });
});

function renderImageList(images) {
    const markup = images.map(image => {
        return `<div class="photo-card">
                    <a href="${image.largeImageURL}">
                        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                    </a>    
                    <div class="info">
                        <p class="info-item">
                            <b>Likes: </b> <span>${image.likes}</span>
                        </p>
                        <p class="info-item">
                            <b>Views: </b> <span>${image.views}</span>
                        </p>
                        <p class="info-item">
                            <b>Comments: </b> <span>${image.comments}</span>
                        </p>
                        <p class="info-item">
                            <b>Downloads: </b> <span>${image.downloads}</span>
                        </p>
                    </div>
                </div>`;
    }).join('');
    gallery.innerHTML += markup;
};

function cleanGallery() {
    gallery.innerHTML = '';
    pageNumber = 1;
    btnLoadMore.style.display = 'none';
};