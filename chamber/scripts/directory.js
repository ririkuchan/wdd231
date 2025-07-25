const url = "data/members.json";
const container = document.getElementById("member-directory");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

async function getMembers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  container.innerHTML = ""; // clear
  members.forEach(member => {
    const card = document.createElement("section");

    const name = document.createElement("h2");
    name.textContent = member.name;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const website = document.createElement("a");
    website.href = member.websiteUrl;
    website.textContent = "Visit Website";
    website.target = "_blank";

    const logo = document.createElement("img");
    logo.src = member.imageUrl;
    logo.alt = `${member.name} logo`;
    logo.loading = "lazy";
    logo.width = 100;        // 👈 追加
    logo.height = 100;       // 👈 追加

    card.appendChild(name);
    card.appendChild(logo);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    container.appendChild(card);
  });
}

// Toggle buttons
gridBtn.addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list-view");
  container.classList.remove("grid-view");
});

// Initialize
getMembers();
