let travelData = [];

fetch("travel_recommendation_api.json")
  .then(res => res.json())
  .then(data => {
      travelData = data;
      console.log("API Loaded:", travelData);
  })
  .catch(err => console.error("Error loading API:", err));


// SEARCH FUNCTION
function search() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!keyword) {
        resultsDiv.innerHTML = "<p>Please type a keyword: beach, temple, or a country.</p>";
        return;
    }

    let results = [];

    // ★ BEACH SEARCH
    if (keyword.includes("beach") || keyword.includes("beaches")) {
        results = travelData.beaches;
        displayResults(results);
        return;
    }

    // ★ TEMPLE SEARCH
    if (keyword.includes("temple") || keyword.includes("temples")) {
        results = travelData.temples;
        displayResults(results);
        return;
    }

    // ★ COUNTRY SEARCH (Australia, Japan, Brazil…)
    const countryMatch = travelData.countries.find(country =>
        country.name.toLowerCase().includes(keyword)
    );

    if (countryMatch) {
        // Display all cities in that country
        results = countryMatch.cities;
        displayResults(results, countryMatch.name);
        return;
    }

    // If no match
    resultsDiv.innerHTML = `<p>No results found for "${keyword}". Try: beach, temple, Japan, etc.</p>`;
}


// DISPLAY RESULTS ON PAGE
function displayResults(list, countryName = "") {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (countryName) {
        resultsDiv.innerHTML += `<h2>Results for ${countryName}</h2>`;
    }

    list.forEach(item => {
        resultsDiv.innerHTML += `
            <div class="result-card">
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;
    });
}


// CLEAR BUTTON
function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
}
