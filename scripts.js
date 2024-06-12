document.addEventListener("DOMContentLoaded", function () {
  fetch("holidays.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("gallery-container");
      for (const day in data) {
        const dayData = data[day];
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = dayData.image;
        img.alt = `${dayData.title} Image`;
        img.className = "card-image";

        const title = document.createElement("h1");
        title.textContent = dayData.title;

        const factsContainer = document.createElement("div");
        factsContainer.className = "fun-fact";
        const factsTitle = document.createElement("strong");
        factsTitle.textContent = "Fun Facts:";
        factsContainer.appendChild(factsTitle);

        for (const fact in dayData.facts) {
          const factParagraph = document.createElement("p");
          factParagraph.textContent = dayData.facts[fact];
          factsContainer.appendChild(factParagraph);
        }

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(factsContainer);
        container.appendChild(card);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
});
