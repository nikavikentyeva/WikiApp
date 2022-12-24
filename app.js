import wikiApi from "./services/WikiService.js";

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const resultsDisplay = document.querySelector(".results-display");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit)

async function handleSubmit(e) {
  e.preventDefault()
  if (input.value.length <= 0) {
    errorMsg.textContent = "Input's value can't be empty";
    return;
  }
  errorMsg.textContent = "";
  loader.style.display = "flex";
  resultsDisplay.textContent = "";
  await wikiApiCall(input.value)
}

async function wikiApiCall (searchInput) {
  let data;
  try {
    data = await wikiApi.getData(searchInput)
  }
  catch (error) {
    errorMsg.textContent = `${error}`
    loader.style.display = "none";
  }
  createCards(data.query.search)
}

function createCards (data) {
  if (!data.length) {
    loader.style.display = "none";
    errorMsg.textContent = "Sorry, no results";
    return;
  }
  data.forEach(el => {
    const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
    const card = document.createElement("div");
    card.className = "result-item";
    card.innerHTML = `
      <h3 class="result-title"><a href="${url}" target="_blank">${el.title}</a></h3>
      <a href="${url}" class="result-link" target="_blank">${url}</a>
      <span class="result-snippet">${el.snippet}</span><br>
    `
    resultsDisplay.appendChild(card)
  });
  loader.style.display = "none";
}
