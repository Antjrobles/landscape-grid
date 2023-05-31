const btnEl = document.getElementById('btn');
const cards = document.getElementById('cards');



async function fetchImages() {
  const perPage = 6;
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

    shuffle(photos);

    const pictures = photos.map((photo) => {
      const imgElement = document.createElement('img');
      imgElement.src = photo.src.medium;

      return imgElement;
    });

    pictures.forEach((picture) => {
      cards.appendChild(picture);
    });



  } catch (error) {
    console.log(error);
  }

  function resetGallery() {
    cards.innerHTML = '';
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

