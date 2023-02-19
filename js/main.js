fetch('data.json')
.then(response => {return response.json()})
.then(data => createElements(data))

const countriesBoxes = document.querySelector('.countries_boxes');
let allCountries;

function createElements(countries) {
   allCountries = countries;
   countries.forEach( country => {
      let box = document.createElement('div');
      box.setAttribute("data-country-name", country.name)
      box.setAttribute("data-country-region", country.region)
      box.setAttribute("class", "box")

      let img = document.createElement('img');
      img.setAttribute("class", "country_img");
      img.src = country.flags.png;
      img.alt = `${country.name} Flag`;
      box.appendChild(img);
   
      let h2 = document.createElement('h2');
      h2.setAttribute("class", "country_name p-3")
      h2.textContent = country.name;
      box.appendChild(h2);
      
      let p1 = document.createElement('p');
      p1.textContent = "Population: ";
      let span1 = document.createElement('span');
      span1.setAttribute("class", "country_population")
      p1.appendChild(span1);
      span1.textContent = country.population
      box.appendChild(p1);
   
      let p2 = document.createElement('p');
      p2.textContent = "Region: ";
      let span2 = document.createElement('span');
      span2.setAttribute("class", "country_region")
      p2.appendChild(span2);
      span2.textContent = country.region;
      box.appendChild(p2);
   
      let p3 = document.createElement('p');
      p3.textContent = "Capital: ";
      p3.setAttribute("class", "mb-4")
      let span3 = document.createElement('span');
      span3.setAttribute("class", "country_capital")
      p3.appendChild(span3);
      span3.textContent = country.capital;
      box.appendChild(p3);

      countriesBoxes.appendChild(box);
   });
}



const darkModeBtn = document.querySelector('.theme_changer');
darkModeBtn.addEventListener('click', darkMode)

function darkMode() {
   const header = document.querySelector('header');
   header.classList.toggle("header_darkMode");

   const appContent = document.querySelector('.app_content');
   appContent.classList.toggle("appContent_darkMode")

   const boxes = document.querySelectorAll('.box');
   boxes.forEach(box => {
      box.classList.toggle("box_darkMode")
   })

   const searchAndFilter = document.querySelector('.search_filter');
   searchAndFilter.classList.toggle("searchFilter_darkMode");

   const dropdownBtn = document.querySelector('.dropdown');
   dropdownBtn.classList.toggle("dropdown_darkMode");

   const dropDoenItems = document.querySelector('.dropdown_items');
   dropDoenItems.classList.toggle("dropdown_items_darkMode");

   const backBtton = document.querySelector('.back_btn');
   backBtton.classList.toggle('back_btn_darkMode');

   const countryInfo = document.querySelector('.country_info');
   countryInfo.classList.toggle("country_info_darkMode");
   
   const noBoxFoundMsg = document.querySelector('.noBoxFoundMsg');
   noBoxFoundMsg.classList.toggle("noBoxFoundMsg_darkMode");
}


const searchInput = document.querySelector('.search_input');

searchInput.addEventListener('input', searchFilter)

function searchFilter(e) {
   const boxes = document.querySelectorAll('.box');
   let searchInpuValue = searchInput.value.toLowerCase();
   let countryFoundNumber = 0;

   boxes.forEach(box => {
      let countryName = box.getAttribute("data-country-name").toLowerCase();
      if (countryName.includes(searchInpuValue)) {
         box.style.display = '';
         countryFoundNumber++;
      } else {
         box.style.display = "none";
      }
   })

   const noBoxFoundMsg = document.querySelector('.noBoxFoundMsg');
   if (countryFoundNumber == 0) {
      noBoxFoundMsg.style.display = "block";
   } else {
      noBoxFoundMsg.style.display = "none";
   }
}


const dropDownItemsLis = document.querySelectorAll('.dropdown_items ul li');

dropDownItemsLis.forEach(liItem => {
   liItem.addEventListener('click', () => {
      let itemClicked = liItem.textContent;
      checkBoxes(itemClicked);
   })
})
   

const dropdownSelectBtn = document.querySelector('.dropdown_select');
const dropDownItems = document.querySelector('.dropdown_items');
const dropDownIcon = document.querySelector('.dropdown_select i');

dropdownSelectBtn.addEventListener('click', () => {
   dropDownItems.classList.toggle("dropdown_items_open");
   dropDownIcon.classList.toggle("rotate");
})


function checkBoxes(item) {
   const boxes = document.querySelectorAll('.box');
   boxes.forEach(box => {
      if (item.toLowerCase() == box.getAttribute("data-country-region").toLowerCase()) {
         box.style.display = '';
      } else {
         box.style.display = "none";
      }
   })
}


function getCountryInfo() {
   setTimeout(() => {
      const boxes = document.querySelectorAll('.box');
      countryCLick(boxes)
   }, 1000)

   
   function countryCLick(boxes) {
      boxes.forEach(box => {
         box.addEventListener('click', () => {
            const countryNameSlected = box.getAttribute("data-country-name");

            const countryBoxSelected = document.querySelector('.searh_filter_boxes');
            countryBoxSelected.classList.add("searh_filter_boxes_hide");

            const countryInfo = document.querySelector('.country_more_info');
            countryInfo.classList.add("country_more_info_open")

            const backBtn = document.querySelector('.back_btn');
            backBtn.onclick = () => {
               countryBoxSelected.classList.remove("searh_filter_boxes_hide");
               countryInfo.classList.remove("country_more_info_open")
            }

            let  countryNameSlectedObj;

            allCountries.forEach(country => {
               if (countryNameSlected == country.name) {
                  countryNameSlectedObj = country;
               }
            })

            moreInfoCountry(countryNameSlectedObj);
         })
      })
   }
}
getCountryInfo();


function moreInfoCountry(countryObject) {
   const countryMoreInfoImg = document.querySelector('.countryMoreInfoImg');
   countryMoreInfoImg.src = countryObject.flag;

   const countryName = document.querySelector('.countryName');
   countryName.textContent = countryObject.name;

   const nativeName = document.querySelector('.nativeName');
   nativeName.textContent = countryObject.nativeName;

   const population = document.querySelector('.population');
   population.textContent = countryObject.population;

   const region = document.querySelector('.region');
   region.textContent = countryObject.region;

   const subRegion = document.querySelector('.subRegion');
   subRegion.textContent = countryObject.subregion;

   const capital = document.querySelector('.capital');
   capital.textContent = countryObject.capital;

   const topLevelDomaine = document.querySelector('.topLvlDomaine');
   topLevelDomaine.textContent = countryObject.topLevelDomain[0]

   const currencies = document.querySelector('.currencies');
   currencies.textContent = countryObject.currencies[0].name

   const languages = document.querySelector('.languages');
   languages.textContent = countryObject.languages[0].name
   console.log(countryObject)
}





