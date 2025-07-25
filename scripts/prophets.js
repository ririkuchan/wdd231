const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector(".cards");

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
}

function displayProphets(prophets) {
  prophets.forEach((prophet) => {
    const card = document.createElement("section");
    card.classList.add("card");

    const name = document.createElement("h2");
    name.textContent = `${prophet.name} ${prophet.lastname}`;

    const dob = document.createElement("p");
    dob.textContent = `Date of Birth: ${prophet.birthdate}`;

    const pob = document.createElement("p");
    pob.textContent = `Place of Birth: ${prophet.birthplace}`;

    const image = document.createElement("img");
    image.src = prophet.imageurl;
    image.alt = `Portrait of ${prophet.name} ${prophet.lastname}`;
    image.loading = "lazy";

    card.appendChild(name);
    card.appendChild(dob);
    card.appendChild(pob);
    card.appendChild(image);

    cards.appendChild(card);
  });
}

getProphetData();
