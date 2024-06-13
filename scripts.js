document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fzdravkoski.github.io/testGit/holidays.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("gallery-container");
      const headerContainer = document.getElementById("header-container");

      // Get the date from the JSON data
      const jsonDate = data.date;

      // Create the header element
      const headerTitle = document.createElement("div");
      headerTitle.className = "header-title";
      headerTitle.textContent = `Date: ${jsonDate}`;
      headerContainer.appendChild(headerTitle);

      // Create card elements
      const card1 = document.createElement("div");
      card1.className = "card";
      const card2 = document.createElement("div");
      card2.className = "card";

      container.appendChild(card1);
      container.appendChild(card2);

      let cards = [card1, card2];
      let currentCardIndex = 0;

      function getRandomHolidayAndFact(data) {
        const days = Object.keys(data).filter(key => key.startsWith("Day"));
        const randomDay = days[Math.floor(Math.random() * days.length)];
        const dayData = data[randomDay];
        const facts = Object.values(dayData.facts);
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        return { dayData, randomFact };
      }

      function populateCard(card, dayData, fact) {
        card.innerHTML = '';
        card.style.backgroundImage = `url(${dayData.image})`;

        const cardContent = document.createElement("div");
        cardContent.className = "card-content";

        const title = document.createElement("h1");
        title.textContent = dayData.title;

        const factParagraph = document.createElement("p");
        factParagraph.textContent = fact;

        cardContent.appendChild(title);
        cardContent.appendChild(factParagraph);

        card.appendChild(cardContent);
      }

      function showNextCard() {
        // Get the current card and the next card
        const currentCard = cards[currentCardIndex];
        const nextCardIndex = (currentCardIndex + 1) % cards.length;
        const nextCard = cards[nextCardIndex];

        // Update the current card index
        currentCardIndex = nextCardIndex;

        // Get random holiday and fact
        const { dayData, randomFact } = getRandomHolidayAndFact(data);

        // Populate the next card with new data
        populateCard(nextCard, dayData, randomFact);

        // Start animations
        currentCard.classList.remove('fade-in-right');
        currentCard.classList.add('fade-out-left');
        nextCard.classList.remove('fade-out-left');
        nextCard.classList.add('fade-in-right');
      }

      // Initial population of the first card
      const { dayData, randomFact } = getRandomHolidayAndFact(data);
      populateCard(card1, dayData, randomFact);
      card1.classList.add('fade-in-right');

      // Set interval to show the next card every 10 seconds
      setInterval(showNextCard, 10000);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
