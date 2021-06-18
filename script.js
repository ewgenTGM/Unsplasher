'use strict';
const ACCESS_KEY = 'Client-ID 2EeXNwVPbbQy4_E9tOH1JvxElb6S1Ysfw5oEVy3mzrQ';
const API = 'https://api.unsplash.com/search/photos';
const searchButton = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');
const section = document.querySelector('.section');

function generateItems(res) {
  if (res.length === 0) {
    generateErrorBlock('Not found');
    return;
  }
  res.forEach(el => {
    const element = document.createElement('div');
    element.classList.add('section__item');
    const imageElement = document.createElement('img');
    imageElement.src = el.urls.small;
    imageElement.alt = 'picture';
    imageElement.classList.add('section__image');
    const aElement = document.createElement('a');
    aElement.href = el.urls.full;
    aElement.target = '_blank';
    aElement.insertAdjacentElement('beforeend', imageElement);
    element.insertAdjacentElement('afterbegin', aElement);
    section.insertAdjacentElement('beforeend', element);
  })
}

function generateErrorBlock(message) {
  const element = document.createElement('span')
  element.textContent = message;
  section.insertAdjacentElement('afterbegin', element);
}


function fetchData(query) {
  const headers = new Headers();
  headers.append('Authorization', ACCESS_KEY);
  return fetch(`${API}?query=${query}`, {
    method: 'GET',
    headers
  });
}

async function search() {
  section.innerHTML = '';
  const query = searchInput.value;
  if (query.trim() === '') {
    generateErrorBlock('Empty query');
    return;
  }

  searchButton.disabled = true;
  searchButton.classList.add('search__button_disabled');
  try {
    const data = await fetchData(query);
    const res = await data.json();
    if (!res.results) {
      generateErrorBlock(res.errors);
    } else {
      generateItems(res.results);
    }
  } catch (e) {
    generateErrorBlock(e.message);
  } finally {
    searchButton.disabled = false;
    searchButton.classList.remove('search__button_disabled');
  }

}

searchButton.addEventListener('click', search);