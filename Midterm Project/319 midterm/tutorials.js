const dataURL = './data.json';

async function fetchData() {
  try {
    const response = await fetch(dataURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function createCards(data) {
  const cardContainer = document.getElementById('card-container'); 

  data.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = item.url;
    image.alt = `${item.title} image`; 

    const title = document.createElement('h3');
    title.textContent = item.title;

    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = item.description;

    const button = document.createElement('button');
    button.textContent = 'Show Description';

    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    dropdown.appendChild(description);
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(button);
    card.appendChild(dropdown);

    cardContainer.appendChild(card);

    // Button click event listener
    button.addEventListener('click', () => {
      dropdown.classList.toggle('show'); 
    });
  });
}


window.addEventListener('DOMContentLoaded', () => {
    fetchData().then(data => createCards(data));
 });

