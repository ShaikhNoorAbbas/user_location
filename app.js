// Input Field
const btn_el = document.querySelector(".btn");
const output_el = document.querySelector(".showDetails");
const fullAddress_el = document.querySelector(".fullAddress");
const formattedAddress_el = document.querySelector(".formattedAddress");

console.log(btn_el);
console.log(output_el);

// API TO Get User Current Location
const apiEndpoint = "https://api.opencagedata.com/geocode/v1/json";
const apiKey = "78f2d1cc4de1476ea64c934f53e525b7";

const getCurrentAddress = async (latitude, longitude) => {
  let query = `${latitude},${longitude}`;
  let apiURL = `${apiEndpoint}?key=${apiKey}&q=${query}$pretty=1`;
  console.log(apiURL);
  //fetching API
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    const { components, formatted } = data.results[0];
    fullAddress_el.textContent = `Full Address is - ${formatted}`;
  } catch (error) {
    console.log(error);
  }
};

btn_el.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        output_el.textContent = `Latitude - ${latitude} & Longitute - ${longitude}`;
        getCurrentAddress(latitude, longitude);
      },
      (error) => {
        console.log(error.message);
        output_el.textContent = ` 😒 - ${error.message}`;
      }
    );
  }
});
