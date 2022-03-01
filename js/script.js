// API Endpoints
const SearchAPIURL = "https://openapi.programming-hero.com/api/phones?search=";
const DetailsAPIURL = "https://openapi.programming-hero.com/api/phone/";

// Result container
const resultContainer = document.querySelector(".result-container");

// TableCell function (component)
const TableCell = (key, value) =>
  `<tr>
    <td>${key}</td>
    <td>${value}</td>
  </tr>`;

// form submit event handler
const search = async (event, query) => {
  event.preventDefault();

  const { status, data } = await (await fetch(SearchAPIURL + query)).json();

  resultContainer.innerHTML = status
    ? `<div
        class="search-results row row-cols-md-2 row-cols-lg-3 justify-content-center"
      >
        ${data
          .map(
            ({ brand, phone_name, slug, image }) =>
              `<div
                class="search-result d-flex gap-3 flex-column align-items-center"
              >
                <img src="${image}" alt="${phone_name}" />
                <h3 class="m-0">${phone_name}</h3>
                <p class="m-0">Brand - ${brand}</p>
                <button
                  class="mb-4 btn btn-primary"
                  onclick="viewDetails('${slug}')"
                >
                  View Details
                </button>
              </div>`
          )
          .join("")}
      </div>`
    : `<h2 class="text-center">No phone found</h2>`;
};

// viewDetails button click event handler
const viewDetails = async (url) => {
  const { data } = await (await fetch(DetailsAPIURL + url)).json();

  const { name, slug, brand, image, releaseDate, mainFeatures } = data;

  const { chipSet, memory, storage, sensors, displaySize } = mainFeatures;

  resultContainer.innerHTML =
    // prettier-ignore
    `<div class="phone-details m-4 gap-3 d-flex flex-column align-items-center">
      <img src="${image}" alt="${name}" />
      <h2>${name}</h2>
      <table>
        ${TableCell("Brand", brand)}
        ${TableCell("Release Date", releaseDate || "Not released yet")}
        ${TableCell("Chipset", chipSet)} ${TableCell("Memory", memory)}
        ${TableCell("Storage", storage)}
        ${TableCell("Sensors", sensors.join(", "))}
        ${TableCell("Display Size", displaySize)}
      </table>
    </div>`;
};
