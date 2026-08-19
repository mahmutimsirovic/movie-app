async function searchMovie() {
  const title = document.getElementById('movieInput').value;
  const resultDiv = document.getElementById('movieResult');

  if (!title) {
    resultDiv.innerHTML = "<p>Please enter a movie title.</p>";
    return;
  }

  try {
    const response = await fetch(`/api/movie?title=${title}`);
    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `<p>${data.error}</p>`;
      return;
    }

    // Render interactive card
    resultDiv.innerHTML = `
      <div class="movie-card" onclick="toggleCard(this)">
        <h2>${data.Title} (${data.Year})</h2>
        <img src="${data.Poster !== "N/A" ? data.Poster : ""}" alt="Poster">
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Actors:</strong> ${data.Actors}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
      </div>
    `;
  } catch (err) {
    resultDiv.innerHTML = "<p>Error fetching movie data.</p>";
    console.error("Frontend fetch error:", err);
  }
}

function toggleCard(card) {
  card.classList.toggle("active");
}
