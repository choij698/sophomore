import drama from '../data/drama.js';
/**
 * {
 *   key[number]: {
 *     dramaName: string;
 *     englishName: string;
 *     releaseYear: number;
 *     genre: string[];
 *     mood: string;
 *     preference: number;
 *     netflixLink: string;
 *   }
 * }
 */
import animation from '../data/animation.js';
import menu from '../data/menu.js';

setTimeout(() => {
  document.querySelector('.splash').classList.add('display-none');
}, [1500]);

const scrollBox = document.querySelector('.scroll_box');
const footer = document.querySelector('footer');
const content = document.querySelector('.content');
const _genreArr = ['Romance'];
let _moodArr = ['want to release stress'];
let _key = 0;
const genres = {
  ROMANCE: 'Romance',
  COMEDY: 'Comedy',
  FANTASY: 'Fantasy',
  ACTION: 'Action',
  THRILLER: 'Thriller',
  SUSPENSE: 'suspense',
  CRIME: 'Crime',
  'LEGAL DRAMA': 'Legal drama',
  MEDICAL: 'Medical',
  SCHOOL: 'School',
  REVENGE: 'Revenge',
  HISTORICAL: 'Historical',
  'BLACK COMEDY': 'Black comedy',
};
const moods = {
  'I WANT TO:': 'I want to',
  'RELEASE STRESS': 'want to release stress',
  'FEEL EXCITING': 'want to feel exciting',
  'KNOW KOREAN CULTURE': 'want to know Korean culture',
  'BE CREATIVE': 'want to be creative',
};
// 스포일러 array ! ! ! !  !! ! ! ! !
const spoilers = [1, 2, 9, 11, 14, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 32, 33, 35, 40, 42, 43, 47, 49];
let _state = 'home';
switchTitle(_state);

function refresh() {
  footer.innerHTML = `
    <div class="text_box">
      <div class="english_name">
        ${animation[_key]}
      </div>
      <div class="release_year">
        Released in 20${drama[_key].releaseYear.slice(0, 2)}
      </div>
      <div class="preference">
        Jia's Rating: ${'★'.repeat(drama[_key].preference)}
      </div>
    </div>
    ${_state !== 'home' ? `<button class="back">HOME</button>` : ''}
    `;
  if (_state !== 'home') {
    document.querySelector('.back').addEventListener('click', () => {
      _state = 'home';
      switchTitle(_state);
    });
  }
}

function sortLatest(obj) {
  scrollBox.innerHTML = '';
  return Object.keys(obj).sort((b, a) => parseInt(a) - parseInt(b));
}

function sortGenre(obj) {
  scrollBox.innerHTML = '';
  return Object.keys(obj)
    .sort((b, a) => parseInt(a) - parseInt(b))
    .filter((key) => {
      return obj[key].genre.some((genre) => _genreArr.includes(genre));
    });
}

function sortMood(obj) {
  scrollBox.innerHTML = '';
  return Object.keys(obj)
    .sort((b, a) => parseInt(a) - parseInt(b))
    .filter((key) => {
      return _moodArr.includes(obj[key].mood);
    });
}

function sortSpoiler(obj) {
  scrollBox.innerHTML = '';
  return Object.keys(obj)
    .sort((b, a) => parseInt(a) - parseInt(b))
    .filter((key) => {
      return spoilers.includes(parseInt(key));
    });
}

function setGenreArr(genre) {
  _genreArr.includes(genre)
    ? _genreArr.splice(_genreArr.indexOf(genre), 1)
    : _genreArr.push(genre);
}

function setMoodArr(mood) {
  _moodArr.includes(mood)
    ? _moodArr.splice(_moodArr.indexOf(mood), 1)
    : _moodArr.push(mood);
}

function appendSpoilerElement(key) {
  const img = document.createElement('img');
  img.src = `./data/img/${key}.jpg`;
  img.addEventListener('click', () => {
    console.log(key);
    const container = document.createElement('div');
    container.classList.add('modal_content');
    const modalImg = document.createElement('img');
    modalImg.src = `./data/spoiler_img/${key}.png`;
    container.appendChild(modalImg);
    document.querySelector('.modal').appendChild(container);
  });
  img.addEventListener('mouseover', () => {
    _key = key;
    refresh();
  });
  scrollBox.appendChild(img);
}

function appendImgElement(key) {
  const img = document.createElement('img');
  img.src = `./data/img/${key}.jpg`;
  if (drama[key].netflixLink !== '') {
    img.classList.add('link');
  }
  img.addEventListener('mouseover', () => {
    _key = key;
    refresh();
  });
  img.addEventListener('click', () => {
    if (drama[key].netflixLink !== '') {
      window.open(drama[key].netflixLink, '_blank');
    }
  });
  scrollBox.appendChild(img);
}

function insertGenreCategory() {
  content.innerHTML = ``;
  for (const genre in genres) {
    const btn = document.createElement('button');
    btn.classList.add('category');
    if (_genreArr.includes(genres[genre])) {
      btn.classList.add('selected');
    }
    btn.innerHTML = genre;
    btn.addEventListener('click', () => {
      setGenreArr(genres[genre]);
      insertGenreCategory();
      sortGenre(drama).forEach(appendImgElement);
    });
    content.appendChild(btn);
  }
}

function insertMoodCategory() {
  content.innerHTML = ``;
  for (const mood in moods) {
    const btn = document.createElement('button');
    btn.classList.add('category');
    if (_moodArr.includes(moods[mood])) {
      btn.classList.add('selected');
    }
    btn.innerHTML = mood;
    btn.addEventListener('click', () => {
      setMoodArr(moods[mood]);
      insertMoodCategory();
      if (moods[mood] !== 'I want to') {
        sortMood(drama).forEach(appendImgElement);
      }
    });
    content.appendChild(btn);
  }
}

function switchTitle(state) {
  _key = 0;
  switch (state) {
    case 'home':
      document.querySelector('.content').innerHTML = `
        <h1>Snack Mate</h1>
      `;
      document.querySelector('.menu_btn').style.display = 'unset';
      document.querySelector('.home').style.display = 'none';
      sortLatest(drama).forEach(appendImgElement);
      break;
    case 'genre':
      footer.innerHTML = `<button class="back">HOME</button>`;
      document.querySelector('.back').addEventListener('click', () => {
        _state = 'home';
        switchTitle(_state);
      });
      document.querySelector('.menu_btn').style.display = 'none';
      document.querySelector('.home').style.display = 'unset';
      insertGenreCategory();
      sortGenre(drama).forEach(appendImgElement);
      break;
    case 'mood':
      footer.innerHTML = `<button class="back">HOME</button>`;
      document.querySelector('.back').addEventListener('click', () => {
        _state = 'home';
        switchTitle(_state);
      });
      document.querySelector('.menu_btn').style.display = 'none';
      document.querySelector('.home').style.display = 'unset';
      insertMoodCategory();
      sortLatest(drama).forEach(appendImgElement);
      break;
    case 'spoiler':
      footer.innerHTML = `<button class="back">HOME</button>`;
      document.querySelector('.back').addEventListener('click', () => {
        _state = 'home';
        switchTitle(_state);
      });
      document.querySelector('.content').innerHTML = `
        <h1>Snack Mate</h1>
      `;
      document.querySelector('.menu_btn').style.display = 'none';
      document.querySelector('.home').style.display = 'unset';
      sortSpoiler(drama).forEach(appendSpoilerElement);
      break;
    default:
      break;
  }
}

document.querySelector('.menu_1').addEventListener('click', () => {
  _state = 'genre';
  switchTitle(_state);
  document.querySelector('header').classList.toggle('show');
});

document.querySelector('.menu_2').addEventListener('click', () => {
  _state = 'mood';
  switchTitle(_state);
  document.querySelector('header').classList.toggle('show');
});

document.querySelector('.menu_3').addEventListener('click', () => {
  _state = 'spoiler';
  switchTitle(_state);
  document.querySelector('header').classList.toggle('show');
});

document.querySelector('.menu_btn').addEventListener('click', () => {
  document.querySelector('header').classList.toggle('show');
});

document.querySelector('.prev_btn').addEventListener('click', () => {
  scrollBox.scrollBy({
    left: -scrollBox.scrollWidth / 5,
    behavior: 'smooth',
  });
});

document.querySelector('.next_btn').addEventListener('click', () => {
  scrollBox.scrollBy({
    left: scrollBox.scrollWidth / 5,
    behavior: 'smooth',
  });
});

document.querySelector('.home').addEventListener('click', () => {
  _state = 'home';
  switchTitle(_state);
});

document.querySelector('.modal').addEventListener('click', () => {
  document.querySelector('.modal').innerHTML = '';
});
