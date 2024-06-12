document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fzdravkoski.github.io/testGit/holidays.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("gallery-container");
      const headerContainer = document.getElementById("header-container");

      // Get current date
      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const currentDate = today.toLocaleDateString(undefined, options);

      // Create the header element
      const headerTitle = document.createElement("div");
      headerTitle.className = "header-title";
      headerTitle.textContent = `Today: ${currentDate}`;
      headerContainer.appendChild(headerTitle);

      // Get all the days
      const days = Object.keys(data);
      // Randomly select one day
      const randomDay = days[Math.floor(Math.random() * days.length)];
      const dayData = data[randomDay];

      // Create card elements
      const card1 = document.createElement("div");
      card1.className = "card";
      const card2 = document.createElement("div");
      card2.className = "card";
      const card3 = document.createElement("div");
      card3.className = "card";

      container.appendChild(card1);
      container.appendChild(card2);
      container.appendChild(card3);

      let cards = [card1, card2, card3];
      let currentCardIndex = 0;

      function populateCard(card, dayData, fact) {
        card.innerHTML = '';

        const img = document.createElement("img");
        img.src = dayData.image;
        img.alt = `${dayData.title} Image`;
        img.className = "card-image";

        const cardContent = document.createElement("div");
        cardContent.className = "card-content";

        const title = document.createElement("h1");
        title.textContent = dayData.title;

        const factParagraph = document.createElement("p");
        factParagraph.textContent = fact;

        cardContent.appendChild(title);
        cardContent.appendChild(factParagraph);

        card.appendChild(img);
        card.appendChild(cardContent);
      }

      function showNextCard() {
        // Get the current card and the next card
        const currentCard = cards[currentCardIndex];
        const nextCardIndex = (currentCardIndex + 1) % cards.length;
        const nextCard = cards[nextCardIndex];

        // Update the current card index
        currentCardIndex = nextCardIndex;

        // Populate the next card with new data
        const facts = Object.values(dayData.facts);
        populateCard(nextCard, dayData, facts[nextCardIndex]);

        // Start animations
        currentCard.classList.remove('fade-in-right');
        currentCard.classList.add('fade-out-left');
        nextCard.classList.remove('fade-out-left');
        nextCard.classList.add('fade-in-right');
      }

      // Initial population of the cards
      const facts = Object.values(dayData.facts);
      populateCard(card1, dayData, facts[0]);
      populateCard(card2, dayData, facts[1]);
      populateCard(card3, dayData, facts[2]);

      // Show the first card immediately
      card1.classList.add('fade-in-right');

      // Set interval to show the next card every 10 seconds
      setInterval(showNextCard, 10000);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
