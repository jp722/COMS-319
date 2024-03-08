const dataURL = './tutorials.json';

async function fetchData() {
  try {
    const response = await fetch(dataURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Get the list element
    const list = document.getElementById('list');

    // Create list items for each title
    data.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item.title;
      listItem.addEventListener('click', () => showDropdown(item));
      list.appendChild(listItem);
    });

    // Get the dropdown element
    const dropdown = document.getElementById('dropdown');

    // Function to show dropdown with description and image
    function showDropdown(item) {
      dropdown.innerHTML = `
      <p>${item.description}</p>
      <img src="${item.url}" alt="${item.title}">
      `;
      dropdown.style.display = 'block';
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();