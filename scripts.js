document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fzdravkoski.github.io/testGit/holidays.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("gallery-container");

      // Get all the days
      const days = Object.keys(data);
      // Randomly select one day
      const randomDay = days[Math.floor(Math.random() * days.length)];
      const dayData = data[randomDay];

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

      const facts = Object.values(dayData.facts);
      let factIndex = 0;

      const factParagraph = document.createElement("p");
      factParagraph.textContent = facts[factIndex];
      factsContainer.appendChild(factParagraph);

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(factsContainer);
      container.appendChild(card);

      // Function to show the next fact
      function showNextFact() {
        factParagraph.classList.add("fade-out");
        setTimeout(() => {
          factIndex = (factIndex + 1) % facts.length;
          factParagraph.textContent = facts[factIndex];
          factParagraph.classList.remove("fade-out");
          factParagraph.classList.add("fade-in");
        }, 1000); // Match this with the CSS fadeOut duration
      }

      // Set interval to show the next fact every 10 seconds
      setInterval(showNextFact, 10000);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
