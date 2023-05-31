const btnEl = document.getElementById('btn');
const cardsContainer = document.querySelector('.grid');

async function fetchImages() {
  cardsContainer.innerHTML = ''; // Limpiar el contenido existente

  const perPage = 12; // Cambia el valor de perPage según tus necesidades

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=landscapes&per_page=${perPage}`,
      {
        headers: {
          Authorization: 'F5RU35VJ0hiSHmLcbiwhy9S5IjzIyJuDWByJRt2kwXs6qEY31oE9i955',
        },
      }
    );
    const data = await response.json();
    const photos = data.photos;
    shuffle(photos);


    photos.forEach((photo) => {
      const card = createCard(photo);
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}

function createCard(photo) {
  const card = document.createElement('div');
  card.classList.add('cards');

  const front = document.createElement('div');
  front.classList.add('front');

  const img = document.createElement('img');
  img.src = photo.src.medium;
  front.appendChild(img);

  const back = document.createElement('div');
  back.classList.add('back');

  const text = document.createElement('textBack');
  text.innerText = photo.alt;
  back.appendChild(text);

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', () => {
    card.classList.toggle('flip');
  });

  return card;
}



function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}

btnEl.addEventListener('click', fetchImages);
