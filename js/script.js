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
const search = async (event, query, stripExcessData) => {
  event.preventDefault();

  resultContainer.innerHTML =
    // prettier-ignore
    `<div
      class="m-4 spinner-border text-primary text-center"
      style="width: 10rem; height: 10rem;"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>`;

  const { status, data } = await (await fetch(SearchAPIURL + query)).json();

  const requiredData = stripExcessData ? data.slice(0, 20) : data;

  const excessData = stripExcessData && data.slice(20);

  resultContainer.innerHTML = status
    ? `<div
        class="search-results row row-cols-md-2 row-cols-lg-3 justify-content-center"
      >
        ${requiredData
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
      </div>
      ${
        excessData?.length > 0
          ? `<button
              class="btn btn-primary p-3 fs-5 d-block mx-auto my-3"
              onclick="search(event, '${query}')"
            >
              View All Results
            </button>`
          : ""
      }
      
      `
    : `<h2 class="text-center">No phone found</h2>`;
};

// viewDetails button click event handler
const viewDetails = async (url) => {
  const { data } = await (await fetch(DetailsAPIURL + url)).json();

  const { name, brand, image, releaseDate, mainFeatures } = data;

  const { chipSet, memory, storage, sensors, displaySize } = mainFeatures;

  document.querySelector(".phone-details")?.remove();

  resultContainer.insertAdjacentHTML(
    "afterbegin",
    // prettier-ignore
    `<div class="phone-details m-5 gap-3 d-flex flex-column align-items-center">
      <img src="${image}" alt="${name}" />
      <h2>${name}</h2>
      <table>
        ${TableCell("Brand", brand)}
        ${TableCell("Release Date", releaseDate || "Release date not found")}
        ${TableCell("Chipset", chipSet)} ${TableCell("Memory", memory)}
        ${TableCell("Storage", storage)}
        ${TableCell("Sensors", sensors.join(", "))}
        ${TableCell("Display Size", displaySize)}
      </table>
    </div>`
  );

  resultContainer.scrollIntoView({ behavior: "smooth" });
};
