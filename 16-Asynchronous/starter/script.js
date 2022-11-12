"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const apiKey = "946529663459871158673x71908";
///////////////////////////////////////

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  //   countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = "") {
  const html = `
   <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

/// XML Request

// const getCountryandNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     //Render country
//     renderCountry(data);
//     //Render country2
//     const [neighbour] = data.borders;
//     if (!neighbour) return;

//     //AJAX Call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener("load", function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       //Render country
//       renderCountry(data2, "neighbour");
//     });
//   });
// };
// getCountryandNeighbour("usa");

const getJSON = function (url, errorMsg = "Something Went Wrong.") {
  return fetch(url).then((res) => {
    console.log(res);

    if (!res.ok) {
      throw new Error(`${res.status} ${errorMsg} `);
    }

    return res.json();
  });
};

///////// Fetch API request
const getCountryData = function (country) {
  //fetch country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, "Country Not Found")
    ///the above will also return a promise to so use another "then()" to get to the data
    .then((data) => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];
      // Test:
      // const neighbour = "aaa";
      if (!neighbour) {
        throw new Error("No Neighbour Found");
      }
      //fetch country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        "Country Not Found"
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => {
      console.error(`${err}`);
      renderError(
        `Something Went Wrong. 💥💥${err.message}💥💥 Please try again.`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// const getCountryData = function (country) {
//   //fetch country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then((res) => {
//       console.log(res);

//       if (!res.ok) {
//         throw new Error(`Error ${res.status}: Country Not Found`);
//       }

//       return res.json();
//     })
//     ///the above will also return a promise to so use another "then()" to get to the data
//     .then((data) => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) return;
//       //fetch country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then((res) => res.json())
//     .then((data) => renderCountry(data, "neighbour"))
//     .catch((err) => {
//       console.error(`${err}`);
//       renderError(
//         `Something Went Wrong. 💥💥${err.message}💥💥 Please try again.`
//       );
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener("click", function () {
//   getCountryData("gb");
// });

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => resolve(position),
    //   (err) => reject(err)
    // );
    /// The above will be the same as:
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then((pos) => console.log(pos));

// async await
const whereAmI = async function () {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: long } = pos.coords;
    // Reverse geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${long}?geoit=json&auth=${apiKey}`
    );
    if (!resGeo.ok) throw new Error("Problem getting location data");

    const dataGeo = await resGeo.json();
    //Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );

    if (!resGeo.ok) throw new Error("Problem getting country");

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city},${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}`);
    renderError(`${err.message}`);

    //Reject promise returned from async function
    throw err;
  }
};

console.log("1: Will get location");
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then((city) => console.log(`2: ${city}`))
//   .catch((err) => console.log(`2: ${err.message}`))
//   .finally(() => console.log("3: Finished getting location"));

//The above uses then which defeats the purpose of async
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch {
    console.error(`2: ${err.message}`);
  }
  console.log("3: Finished getting location");
})();

const get3C = async function (c1, c2, c3) {
  try {
    // In Sequence
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    // In Parallel
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map((d) => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3C("hk", "gb", "canada");

// Promise.race First settled promise
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/spain`),
    getJSON(`https://restcountries.com/v2/name/portugal`),
  ]);
  console.log(res[0]);
})();

const timeout = function (ms) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("Request took too long!"));
    }, ms * 1000);
  });
};

Promise.race([getJSON(`https://restcountries.com/v2/name/canada`), timeout(1)])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err.message));

//Promise.allSettled
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));

//Promise.any [ES2021] First resolved promise
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));
