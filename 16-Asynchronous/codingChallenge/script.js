"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const result = document.querySelector(".result");

// In this challenge you will build a function 'whereAmI' which renders a country
// only based on GPS coordinates. For that, you will use a second API to geocode
// coordinates. So in this challenge, you’ll use an API on your own for the first time 😁

// Your tasks:
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// and a longitude value ('lng') (these are GPS coordinates, examples are in test
// data below).

const apiKey = "946529663459871158673x71908";

// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
// GOOD LUCK 😀

const lat = 19.037;
// const lat = "xx";
const long = 72.873;

const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: long } = pos.coords;
      return fetch(
        `https://geocode.xyz/${lat},${long}?geoit=json&auth=${apiKey}`
      );
    })
    .then((res) => {
      console.log(res);
      if (res.status === 403) {
        throw new Error(
          `This API only allows you to make only 3 requests per second. Please try again later.`
        );
      }
      return res.json();
    })
    .then((data) => {
      if (data.matches === null) {
        throw new Error(
          `COORDINATES NOT FOUND: Please try again with a correct coordinate.`
        );
      }
      console.log(data);
      renderLocation(data);
      return fetch(`https://restcountries.com/v2/name/${data.country}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0]);
          renderCountry(data[0]);
        });
    })
    .catch((err) => {
      console.error(err);
      renderError(err);
    })
    .finally((countriesContainer.style.opacity = 1));
};

btn.addEventListener("click", whereAmI);

const renderLocation = function (msg) {
  const html = `<div class="location">You are in ${msg.city}, ${msg.country} </div>`;
  result.insertAdjacentHTML("beforeend", html);
};

const renderError = function (err) {
  const errMessage = `<div class = "error"> Something Went Wrong. 💥💥${err.message}💥💥 Please try again. </div>`;
  result.insertAdjacentHTML("beforeend", errMessage);
};
// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
// to convert coordinates to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
// promises to get the data. Do not use the 'getJSON' function we created, that
// is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes
// that you received about the provided location. Then, using this data, log a
// message like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the
// console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you
// will get this error with code 403. This is an error with the request. Remember,
// fetch() does not reject the promise in this case. So create an error to reject
// the promise yourself, with a meaningful error message

// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant
// attribute from the geocoding API result, and plug it into the countries API that
// we have been using.
// 7. Render the country and catch any errors, just like we have done in the last
// lecture (you can even copy this code, no need to type the same code)

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
  //   countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   //fetch country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, "Country Not Found")
//     ///the above will also return a promise to so use another "then()" to get to the data
//     .then((data) => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders?.[0];
//       // Test:
//       // const neighbour = "aaa";
//       if (!neighbour) {
//         throw new Error("No Neighbour Found");
//       }
//       //fetch country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         "Country Not Found"
//       );
//     })
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
//   whereAmI(lat, long, apiKey);
//   const location = document.querySelector(".location");
//   location.addEventListener("load", function () {
//     getCountryData(country);
//   });
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

// Coding Challenge #2
// For this challenge you will actually have to watch the video! Then, build the image
// loading functionality that I just showed you on the screen.
// Your tasks:
// Tasks are not super-descriptive this time, so that you can figure out some stuff by
// yourself. Pretend you're working on your own 😉
// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input.
// This function returns a promise which creates a new image (use
// document.createElement('img')) and sets the .src attribute to the
// provided image path

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

let currentImg;

// createImage("img/img-1.jpg")
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 1 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//   })
//   .catch((err) => console.log(err));

// 2. When the image is done loading, append it to the DOM element with the
// 'images' class, and resolve the promise. The fulfilled value should be the
// image element itself. In case there is an error loading the image (listen for
// the'error' event), reject the promise
// 3. If this part is too tricky for you, just watch the first part of the solution
// PART 2
// 4. Consume the promise using .then and also add an error handler
// 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
// function we created earlier
// 6. After the 2 seconds have passed, hide the current image (set display CSS
// property to 'none'), and load a second image (Hint: Use the image element
// returned by the 'createImage' promise to hide the current image. You will
// need a global variable for that 😉)
// 7. After the second image has loaded, pause execution for 2 seconds again
// 8. After the 2 seconds have passed, hide the current image
// Test data: Images in the img folder. Test the error handler by passing a wrong
// image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
// otherwise images load too fast
// GOOD LUCK 😀

// Coding Challenge #3
// Your tasks:
// PART 1
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time
// using async/await (only the part where the promise is consumed, reuse the
// 'createImage' function from before)

// const loadPause = async function () {
//   try {
//     let img = await createImage("img/img-1.jpg");
//     console.log("Image 1 loaded");
//     await wait(2);
//     img.style.display = "none";

//     img = await createImage("img/img-2.jpg");
//     console.log("Image 2 loaded");
//     await wait(2);
//     img.style.display = "none";
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// loadPause();
// 2. Compare the two versions, think about the big differences, and see which one
// you like more
// 3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
// in the dev tools Network tab

// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths
// 'imgArr'
const imgArr = ["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"];

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.error(err.message);
  }
};
loadAll(imgArr);
// 2. Use .map to loop over the array, to load all the images with the
// 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array 😉
// 5. Add the 'parallel' class to all the images (it has some CSS styles)
// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-
// 3.jpg']. To test, turn off the 'loadNPause' function
// GOOD LUCK 😀
