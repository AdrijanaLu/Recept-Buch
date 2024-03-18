// Verbindung:

// Uhr Verbindungen
const hoursVerbindung = document.getElementById("hours");
const minVerbindung = document.getElementById("min");
const secVerbindung = document.getElementById("sec");
const h1 = document.getElementById("h1");
const h2 = document.querySelector("h2");

let amPm = "";

// andere

const logoDiv = document.querySelector(`.logoDiv`);
//console.log(logoDiv);
const search_homeDiv = document.querySelector(`.search_homeDiv`);
const aside_o = document.querySelector(`.aside_o`);
const aside_u = document.querySelector(`.aside_u`);
const main_o = document.querySelector(`.main_o`);
const main_m = document.querySelector(`.main_m`);
const main_u = document.querySelector(`.main_u`);
const selection = document.getElementById('select');
const dessertDiv = document.querySelector(`.aside_dessert`);
const burekUl = document.querySelector(`.burek_ul`);
const kaftejiUl = document.querySelector(`.kafteji_ul`);
const shawarmaUl = document.querySelector(`.shawarma_ul`);
const instrDiv = document.querySelector(`.instrDiv`);


let main_m_input = "";


///////////////////////////////////////////////////////////

/* ----------------clock------------------------- */

function uhrzeitStellen(){
    const datum = new Date();
    console.log(datum);
    const h = datum.getHours();
    const m = datum.getMinutes();
    const s = datum.getSeconds();

    const hours = String(datum.getHours()).padStart(2, "0");
    const min = String(datum.getMinutes()).padStart(2, "0");
    const sec = String(datum.getSeconds()).padStart(2, "0");

    if(h <=12){
        amPm = "AM";
        h1.textContent = amPm;
    }else{
        amPm = "PM";
        h1.textContent = amPm;
    }

    hoursVerbindung.innerText = hours;
    minVerbindung.innerText = min;
    secVerbindung.innerText = sec;
    h2.innerText = datum.toDateString();

}
uhrzeitStellen();
setInterval(uhrzeitStellen, 1000);

///////////////////////////////////////////////////////////////////

//  3. header

function hauptInhalt(data){
    
    logoDiv.innerHTML = `
    <img src="${data[22].strMealThumb}" alt="" class="logo_img">
    <span>The</span>
    <img src="./img/logo.png" alt="">
    <span>ealDB</span>`;

    /////////  carousel teil
    let bild1 = data[2].strMealThumb;
    //console.log(bild1);
    let name1 = data[2].strMeal;
    //console.log(name1);

    aside_u.innerHTML += `
    <img id="belibigeBilder" src="${bild1}" style="width: 100%; margin-bottom: -30px;">
    <div class="button_box">
    <button class="previous"> < </button>
    <span id="span_text">${name1}</span>
    <button class="next"> > </button>
    </div>`;
    ///////////////////////

    main_o.innerHTML += `
    <h2>Willkommen bei <b>TheMealDB</b></h2>
    <p><b><i>TheMealDB</i></b>: Eine offene, Crowdsourcing-Plattform
    Datenbank mit Rezepten aus aller Welt!</p><hr>
    <label>`;

    main_m.innerHTML += `
    <div class="main_m_div">
    <select name="meals" id="select">
    <option value="name">Finde bei Name</option>
    <option value="letter">Finde bei erster Buchstabe</option>
    <option value="kategorie">Finde bei Kategorie</option>
    </select>
    <input class="main_m_input" type="text" placeholder="  ...">
    <button id="such_icon" onclick="getByLetter_name()"></button>
    </div>
    <div class="zeige_input">
    <ul class="zeige_input_ul"></ul>
    </div><hr>`;

    main_u.innerHTML += `
    <h3>Was kochen wir heute?</h3>
    <h4>Wenn Du keine Idee hast, 
    schau sich einige von uns an!!!</h4>
    <div id="idee_div"></div><hr>`;

    offcanvasInhalt(data);
}

//  4.

function goBack(data){
    let bild1 = data[2].strMealThumb;
    //console.log(bild1);
    let name1 = data[2].strMeal;
    //console.log(name1);
    let bild2 = data[8].strMealThumb;
    let name2 = data[8].strMeal;
    let bild3 = data[18].strMealThumb;
    let name3 = data[18].strMeal; 

    if( (document.getElementById(`belibigeBilder`).src === bild1) 
        && (document.getElementById(`span_text`).textContent === name1) ){

        document.getElementById(`belibigeBilder`).src = bild3;
        document.getElementById(`span_text`).textContent = name3;

    }else if( (document.getElementById(`belibigeBilder`).src === bild3)
        && (document.getElementById(`span_text`).textContent === name3) ){

        document.getElementById(`belibigeBilder`).src = bild2;
        document.getElementById(`span_text`).textContent = name2;

    }else if( (document.getElementById(`belibigeBilder`).src === bild2)
        && (document.getElementById(`span_text`).textContent === name2) ){

        document.getElementById(`belibigeBilder`).src = bild1;
        document.getElementById(`span_text`).textContent = name1;
    }
}

//  5.

function goAhead(data){ 
    let bild1 = data[2].strMealThumb;
    //console.log(bild1);
    let name1 = data[2].strMeal;
    //console.log(name1);
    let bild2 = data[8].strMealThumb;
    let name2 = data[8].strMeal;
    let bild3 = data[18].strMealThumb;
    let name3 = data[18].strMeal; 

    if( (document.getElementById(`belibigeBilder`).src === bild1) 
        && (document.getElementById(`span_text`).textContent === name1) ){

        document.getElementById(`belibigeBilder`).src = bild2;
        document.getElementById(`span_text`).textContent = name2;

    }else if( (document.getElementById(`belibigeBilder`).src === bild2)
        && (document.getElementById(`span_text`).textContent === name2) ){

        document.getElementById(`belibigeBilder`).src = bild3;
        document.getElementById(`span_text`).textContent = name3;

    }else if( (document.getElementById(`belibigeBilder`).src === bild3)
        && (document.getElementById(`span_text`).textContent === name3) ){

        document.getElementById(`belibigeBilder`).src = bild1;
        document.getElementById(`span_text`).textContent = name1;
    }
}

//  6.

function ideeDIV(data){
    const ideeDiv = document.getElementById(`idee_div`);

    for(let x=18; x<data.length; x++){
        //console.log(data[x]);
       
        if(data[x].strCategory !== "Dessert"){
            ideeDiv.innerHTML += `
            <article>
            <img src="${data[x].strMealThumb}">
            <div>
            <p>Name des Gerichts:<br> <b>${data[x].strMeal}</b></p>
            <p>Herkunftsland:<br> <b>${data[x].strArea}</b></p>
            </div>
            </article>`;
        }

        if(data[x].strCategory == "Dessert"){
            //console.log([x]);
            let index = [x];
            dessertDiv.innerHTML += `
            <h4>Lust auf Dessert?!</h4>
            <article>
            <img src="${data[x].strMealThumb}">
            <div>
            <p>Der Name des Gerichts: <b><i>${data[x].strMeal}</i></b></p>
            <p>Herkunftsland: <b><i>${data[x].strArea}</i></b></p>
            </div>
            </article>`;

            if(data[x].strInstructions != ""){
                dessertDiv.innerHTML += `
                <button id="alertBtn">
                Schau Instructions</button>`;

                const btnAlert = document.getElementById(`alertBtn`);
                btnAlert.addEventListener("click", () => {
                    alert(`${data[x].strInstructions}`);
                });
            }
        }
    }
}

//  8.

function offcanvasInhalt(data){
    //console.log(data[2].strInstructions);
    burekUl.innerHTML += `
    <li><b>ZUTATEN:</b></li>`;
    kaftejiUl.innerHTML += `
    <li><b>ZUTATEN:</b></li>`;
    shawarmaUl.innerHTML += `
    <li><b>ZUTATEN:</b></li>`;

    if( (data[2].strIngredient1 != "") || 
        (data[8].strIngredient1 != "") || 
        (data[16].strIngredient1 != "") ){

        burekUl.innerHTML += `
        <li>-${data[2].strIngredient1}</li>`;

        kaftejiUl.innerHTML += `
        <li>-${data[8].strIngredient1}</li>`;

        burekUl.innerHTML += `
        <li>-${data[16].strIngredient1}</li>`;

    }else if( (data[2].strIngredient2 != "") || 
        (data[8].strIngredient2 != "") || 
        (data[16].strIngredient2 != "") ){

        burekUl.innerHTML += `
        <li>-${data[2].strIngredient2}</li>`;
        
        kaftejiUl.innerHTML += `
        <li>-${data[8].strIngredient2}</li>`;
        
        burekUl.innerHTML += `
        <li>-${data[16].strIngredient2}</li>`;
                
    }else if( (data[2].strIngredient3 != "") || 
        (data[8].strIngredient3 != "") || 
        (data[16].strIngredient3 != "") ){

        burekUl.innerHTML += `
        <li>-${data[2].strIngredient3}</li>`;
    
        kaftejiUl.innerHTML += `
        <li>-${data[8].strIngredient3}</li>`;
    
        burekUl.innerHTML += `
        <li>-${data[16].strIngredient3}</li>`;
            
    }else if( (data[2].strInstructions != "") || 
        (data[8].strInstructions != "") || 
        (data[16].strInstructions != "") ){

        burekUl.innerHTML += `
        <li>-Instructions: ${data[2].strInstructions}</li>`;
    
        kaftejiUl.innerHTML += `
        <li>-Instructions: ${data[8].strInstructions}</li>`;
    
        burekUl.innerHTML += `
        <li>-Instructions: ${data[16].strInstructions}</li>`;
            
    }
}


/* --------------- fetch ------------------------ */

//  1. "meals" -array (idMeal, strMeal, strDrinkAlternate, 
//  strCategory, strArea, strInstructions, strMealThumb, 
//  strTags, strYoutube, strIngredient 1-20, strMeasure 1-20, 
//  strSource, )
//  slika, sastojci, mjere... SASTOJAK S ID-om

function getList_sData(){
    return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
    .then((res) => {
        //console.log(res);  // response
        return res.json();
    })
    .then(data => {
        //console.log(data.meals); // direkt array
        return data.meals;
    })
}
getList_sData()
.then(mealsData => {
    //console.log(mealsData); // 25 komada sa skoro svim informacijama!!!!!!!
    hauptInhalt(mealsData);
    const previousBtn = document.querySelector(`.previous`);
    previousBtn.addEventListener("click", () => goBack(mealsData));
    const nextBtn = document.querySelector(`.next`);
    nextBtn.addEventListener("click", () => goAhead(mealsData));
    ideeDIV(mealsData);
})


///////////////////////////////////////////////

 /* 
// idIngredient, strDescription, strIngredient - SVI!!!

//  2.
function getList_iData(){
    return fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((response) => {
        //console.log(response);  // response
        return response.json();
    })
    .then(daten => {
        console.log(daten.meals);  // array (575 komada)
        return daten.meals;
    })
}
getList_iData()
    .then(mealsData => {
    //console.log(mealsData);  // zutaten
    const such_icon = document.getElementById(`such_icon`);
    such_icon.addEventListener("click", () => search(mealsData));
})*/

////////////////////////////////////////////////////////////

//  7.

function getByLetter_name(){
    main_m_input = document.querySelector(`.main_m_input`).value;
    let url = "https://www.themealdb.com/api/json/v1/1/";
    // search.php?f=" + `${main_m_input}`;
    let select_main = document.getElementById("select");
    // let selectValue = selection.options[selectionId].value;
    console.log(select_main.selectedIndex);  // index selectiona, tj pozicija optionsa
    let select_index = select_main.selectedIndex;

    if ( select_index === 0 ) {
            url += `search.php?s=${main_m_input}`;
    }else if ( select_index === 1){
        url += `search.php?f=${main_m_input}`;
    } else {
        url += `filter.php?i=${main_m_input}`;
    }
    
    console.log(main_m_input);  // slovo koje je koristeno/ime
    
    console.log(url);  // citav url
    fetch(`${url}`)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(daten => {
        console.log(daten.meals);  // array s jelima
        return daten.meals;
    })
    .then(datai => {
        zeigeInput(datai);
    })
}

function zeigeInput(daten){
    for(let x=0; x<daten.length; x++){
        document.querySelector(`.zeige_input`).innerHTML += `
        <li><b><i>${daten[x].strMeal}</i></b></li>
        <li><img src="${daten[x].strMealThumb}" 
        style="width: 250px;"></li>
        <li><i>${daten[x].strArea}</i></li>
        <li><i style="text-decoration-line: underline;">
        Instructions:</i> ${daten[x].strInstructions}</li><hr>`;
    }
}
