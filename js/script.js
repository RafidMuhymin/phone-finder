// API Endpoints
const SearchAPIURL = "https://openapi.programming-hero.com/api/phones?search=";
const DetailsAPIURL = "https://openapi.programming-hero.com/api/phone/";

// Result container
const resultContainer = document.querySelector(".result-container");

// form submit event handler
const search = async (event, query) => {
  event.preventDefault();

  const { status, data } = await (await fetch(SearchAPIURL + query)).json();

  resultContainer.innerHTML = status
    ? `<div class="search-results row row-cols-md-2 row-cols-lg-3 justify-content-center">
        ${data
          .map(
            ({ brand, phone_name, slug, image }) => `
              <div
                class="search-result d-flex gap-3 flex-column align-items-center"
                onclick="showDetails('${slug}')"
              >
                <img src="${image}" alt="${phone_name}" />
                <h3 class="m-0">${phone_name}</h3>
                <p>Brand - ${brand}</p>
              </div>
            `
          )
          .join("")}
      </div>`
    : `<h2 class="text-center">No results found</h2>`;
};

// phone details click event handler
const showDetails = async (url) => {
  const { data } = await (await fetch(DetailsAPIURL + url)).json();

  const { name, slug, brand, image, releaseDate, mainFeatures } = data;

  const { chipSet, memory, storage, sensors, displaySize } = mainFeatures;

  resultContainer.innerHTML = `
    <div class="phone-details m-4 gap-3 d-flex flex-column align-items-center">
      <img src="${image}" alt="${name}" />
      <h2>${name}</h2>
      <table>
        <tr>
          <td>Brand</td>
          <td>${brand}</td>
        </tr>
        <tr>
          <td>Release Date</td>
          <td>${releaseDate || "Not released yet"}</td>
        </tr>

        <tr>
          <td>Chipset</td>
          <td>${chipSet}</td>
        </tr>
        <tr>
          <td>Memory</td>
          <td>${memory}</td>
        </tr>
        <tr>
          <td>Storage</td>
          <td>${storage}</td>
        </tr>
        <tr>
          <td>Sensors</td>
          <td>${sensors.join(", ")}</td>
        </tr>
        <tr>
          <td>Display Size</td>
          <td>${displaySize}</td>
        </tr>
      </table>
    </div>
  `;
};
