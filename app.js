const btnEl = document.getElementById('btn');
const cards = document.querySelector('.cards');
const cardFront = document.querySelector('.front');
const cardBack = document.querySelector('.back');



async function fetchImages() {
  
  cards.addEventListener('click', () => {
    cards.classList.toggle('flip');
  });
  
  const perPage = 1;
  try {
    resetGallery();

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=landscapes&per_page=${perPage}`,
      {
        headers: {
          Authorization:
            'F5RU35VJ0hiSHmLcbiwhy9S5IjzIyJuDWByJRt2kwXs6qEY31oE9i955',
        },
      }
    );
    const data = await response.json();
    const photos = data.photos;
    // shuffle(photos);

    const pictures = photos.map((photo) => {
      const imgElement = document.createElement('img');
      imgElement.src = photo.src.medium;
      return imgElement;
    });

    const text = photos.map((alt) => {
      const textElement = document.createElement('textBack');
      textElement.innerText = alt.alt;
      console.log(textElement);
      return textElement;
    });


text.forEach((text) => {
  cardBack.appendChild(text);
});



    pictures.forEach((picture) => {
      cardFront.appendChild(picture);
    });
  } catch (error) {
    console.log(error);
  }

  function resetGallery() {
    cardFront.innerHTML = '';
  }
};

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

