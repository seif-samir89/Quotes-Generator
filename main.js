let generateBtn = document.querySelector(".generate");
let autoBtn = document.querySelector(".auto");
let stopBtn = document.querySelector(".stop");
let quoteDiv = document.querySelector(".quote-display");
let quoteId = document.querySelector(".quote-id");
let autoStatus = document.querySelector(".auto-status");
let downloadBtn = document.getElementById("download-btn");
let copyBtn = document.querySelector("#btn-copy");
let quoteImg = document.querySelector(".quote-image");
let intervalId;

generateBtn.onclick = generateQuote;
autoBtn.onclick = startAutoPlay;
stopBtn.onclick = stopAutoPlay;
copyBtn.onclick = copyText;

async function getQuotes() {
  const response = await fetch("quotes.json");
  const data = await response.json();
  return data;
}
async function generateQuote() {
  const quotes = await getQuotes();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDiv.innerHTML = quote.text;
  quoteId.innerHTML = quote.id;
  quoteImg.src = quote.image;
}

function startAutoPlay() {
  intervalId = setInterval(generateQuote, 2000);
  autoStatus.innerHTML = " ";
}

function stopAutoPlay() {
  clearInterval(intervalId);
  autoStatus.innerHTML = " ";
}
// Copybtn

function copyText() {
  let text = quoteDiv.innerText;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert(`Successfully Copied Text: "${text}"`);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}
//Download image
downloadBtn.addEventListener("click", () => {
  const imageUrl = quoteImg.src;
  const fileName = `Image_Quote_${quoteId.innerText}`;

  fetch(imageUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(" Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Failed to download image:", error);
      alert("Failed to download image. Please try again.");
    });
});
// Loading
window.addEventListener("load", function () {
  document.querySelector(".loading").classList.add("hide");
});
