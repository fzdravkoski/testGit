document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fzdravkoski.github.io/testGit/holidays.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("gallery-container");

      // Get current date
      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const currentDate = today.toLocaleDateString(undefined, options);

      // Create card elements
      const card1 = document.createElement("div");
      card1.className = "card";
      const card2 = document.createElement("div");
      card2.className = "card";

      container.appendChild(card1);
      container.appendChild(card2);

      let activeCard = card1;
      let inactiveCard = card2;

      function populateCard(card, dayData) {
        card.innerHTML = '';

        // Create the headline element
        const headline = document.createElement("div");
        headline.className = "card-headline";
        headline.textContent = `Today: ${currentDate}`;

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
        facts.forEach(fact => {
          const factParagraph = document.createElement("p");
          factParagraph.textContent = fact;
          factsContainer.appendChild(factParagraph);
        });

        card.appendChild(headline);
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(factsContainer);
      }

      function showNextCard() {
        // Get all the days
        const days = Object.keys(data);
        // Randomly select one day
        const randomDay = days[Math.floor(Math.random() * days.length)];
        const dayData = data[randomDay];

        // Populate inactive card with new data
        populateCard(inactiveCard, dayData);

        // Swap active and inactive cards
        const temp = activeCard;
        activeCard = inactiveCard;
        inactiveCard = temp;

        // Start animations
        activeCard.classList.remove('fade-out-left');
        activeCard.classList.add('fade-in-right');
        inactiveCard.classList.remove('fade-in-right');
        inactiveCard.classList.add('fade-out-left');
      }

      // Initial population and show of the first card
      showNextCard();

      // Set interval to show the next card every 10 seconds
      setInterval(showNextCard, 10000);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
