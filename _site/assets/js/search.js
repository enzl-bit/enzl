let idx, store = {};

fetch('{{ "/search.json" | relative_url }}')
  .then(response => response.json())
  .then(data => {
    idx = lunr(function () {
      this.ref('url');
      this.field('title');
      this.field('content');

      data.forEach(doc => {
        this.add(doc);
        store[doc.url] = doc;
      });
    });
  });

function searchPosts() {
  const query = document.getElementById('searchBox').value.trim();
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';
  if (!query) return;

  const results = idx.search(query);
  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found</p>';
    return;
  }

  results.forEach(r => {
    const item = store[r.ref];
    resultsContainer.innerHTML += `
      <div>
        <a href="${item.url}"><strong>${item.title}</strong></a>
        <p>${item.content.substring(0, 100)}...</p>
      </div>
    `;
  });
}
