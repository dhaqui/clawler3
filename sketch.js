
function setup() {
  noCanvas();
  const marketplaceHTML = generateMarketplaceHTML();
  displayGeneratedPage(marketplaceHTML);
  const parsedData = crawlMarketplaceHTML(marketplaceHTML);
  displayCrawlResults(parsedData);
}

// アートワークのマーケットプレイスを模したHTMLを生成
function generateMarketplaceHTML() {
  const randomTitle = `Art Marketplace Mockup ${Math.floor(Math.random() * 1000)}`;

  // Function to generate random artwork using SVG
  function generateArtwork() {
    return `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" style="
        background: linear-gradient(${Math.random() * 360}deg, 
          rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}),
          rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}));
        border: 2px solid black;
        margin: 10px;
      ">
        <circle cx="${Math.random() * 200}" cy="${Math.random() * 200}" r="${Math.random() * 50 + 10}" 
          fill="rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})" />
        <rect x="${Math.random() * 100}" y="${Math.random() * 100}" 
          width="${Math.random() * 100}" height="${Math.random() * 100}" 
          fill="rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})" />
      </svg>
    `;
  }

  const randomArtworks = Array.from({ length: 10 }, (_, i) => `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px;
      background: #f8f9fa;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding: 10px;
      width: 220px;
    ">
      ${generateArtwork()}
      <h3>Artwork #${i + 1}</h3>
      <p style="color: #6c757d;">Price: ${Math.floor(Math.random() * 1000 + 100)} USD</p>
      <button style="
        background: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 15px;
        cursor: pointer;
      ">Buy Now</button>
    </div>
  `).join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>${randomTitle}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #f3f4f6, #ffffff);
          margin: 0;
          padding: 20px;
          color: #333;
        }
        h1 {
          text-align: center;
          color: #343a40;
          margin-bottom: 30px;
        }
        .artworks-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
      </style>
    </head>
    <body>
      <h1>${randomTitle}</h1>
      <div class="artworks-container">
        ${randomArtworks}
      </div>
    </body>
    </html>
  `;
}

// 生成されたHTMLをiframeに表示
function displayGeneratedPage(html) {
  const iframe = document.getElementById("generated-page");
  iframe.srcdoc = html;
}

// マーケットプレイスHTMLを解析
function crawlMarketplaceHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const title = doc.querySelector("title")?.textContent || "No Title";
  const artworks = doc.querySelectorAll("svg").length;

  return {
    title,
    artworksCount: artworks
  };
}

// 解析結果を表示（アートワーク数を含む）
function displayCrawlResults(data) {
  const resultsDiv = document.getElementById("results");

  const evaluation = `
    This mock marketplace showcases ${data.artworksCount} vibrant artworks, inviting 
    exploration of creativity and value in a virtual gallery.
  `;

  resultsDiv.innerHTML = `
    <h2>Analysis Results:</h2>
    <p><strong>Title:</strong> ${data.title}</p>
    <p><strong>Artwork Count:</strong> ${data.artworksCount}</p>
    <p><strong>Evaluation:</strong> ${evaluation}</p>
  `;
}
