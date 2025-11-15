
// !_____________________________________ loading-screen__________________________________________________

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

// !_____________________________________ SideBar__________________________________________________

$(document).ready(function () {
    $(".open-close-icon").click(function () {
        $(".side-nav-menu").toggleClass("open");
        $(this).toggleClass("fa-align-justify fa-xmark fa-3x");


        if ($(".side-nav-menu").hasClass("open")) {
            $(".nav-tab ul li").css({ position: "relative", top: "0px", opacity: 0 });
            $(".nav-tab ul li").each(function (index) {
                $(this).delay(100 * index).animate({ top: "20px", opacity: 1 }, 300);
            });
        }
        else {
            $(".nav-tab ul li").animate({ top: "0px", opacity: 0 }, 200);
        }

    });
});



// ! __________________onclic fun to the logo for reload the home page_______________________________

var button = document.querySelector(".logo")

button.addEventListener("click", function () {
    window.location.href = "index.html";
})



// !____________________________display home-page search name api _________________________________________________

var allMeals = [];
async function getMeals() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
    let data = await response.json();
    console.log(data);
    allMeals = data.meals;
    displaydata();
}
getMeals();


function displaydata() {
    var cartona = '';

    for (var i = 0; i < allMeals.length; i++) {
        cartona += `  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
  <div  onclick=" getMealDetails('${allMeals[i].idMeal}') "class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
 <img src="${allMeals[i].strMealThumb}" alt="${allMeals[i].strMeal}" class="w-100">
   <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h2>${allMeals[i].strMeal}</h2>
      </div>
  </div>
    
  </div>`;
    }
    document.getElementById("rowData").innerHTML = cartona;
}

// !_________________________________________diplay onclick for meal to apper MealDetails by mealid api_________________________________________________________


async function getMealDetails(mealID) {

    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);

    response = await response.json();

    displayMealDetails(response.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}


function displayMealDetails(meal) {

    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")

    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}

// !______________________________________________________search-button_________________________________________

var searchButton = document.querySelector(".search-button")

searchButton.addEventListener("click", function () {
    showSearchInputs();
    $(".side-nav-menu").removeClass("open");
    $(".open-close-icon")
        .removeClass("fa-xmark")
        .addClass("fa-align-justify");

})
function showSearchInputs() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeOut(300)
}

async function searchByName(term) {

    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}

async function searchByFLetter(term) {

    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}



function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

// !_______________________________categories-button________________________________

var categoriesButton = document.querySelector(".categories-button")

categoriesButton.addEventListener("click", function () {
    getCategories();
    $(".side-nav-menu").removeClass("open");
    $(".open-close-icon")
        .removeClass("fa-xmark")
        .addClass("fa-align-justify");

})


async function getCategories() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}


function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


//!_______________________________________area-button___________________________________

var areabutton = document.querySelector(".area-button")

areabutton.addEventListener("click", function () {
    getArea();
    $(".side-nav-menu").removeClass("open");
    $(".open-close-icon")
        .removeClass("fa-xmark")
        .addClass("fa-align-justify");

})

async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)

}


function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

//!_______________________________ingredients-button__________________________________

var ingredientsbutton = document.querySelector(".ingredients-button")

ingredientsbutton.addEventListener("click", function () {
    getIngredients();
    $(".side-nav-menu").removeClass("open");
    $(".open-close-icon")
        .removeClass("fa-xmark")
        .addClass("fa-align-justify");

})

async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

// !__________________________contactUs__________________________________________________

var contactbutton = document.querySelector(".contact-button");

contactbutton.addEventListener("click", function () {
    displaycontact();
    $(".side-nav-menu").removeClass("open");
    $(".open-close-icon")
        .removeClass("fa-xmark")
        .addClass("fa-align-justify");
});

function displaycontact() {
    let cartoona = `
        <div class="container">
            <div class="row py-5 g-4" id="rowData">
                <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
                    <div class="container w-75 text-center">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Special characters and numbers not allowed
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control" placeholder="Enter Your Email">
                                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Email not valid *exemple@yyy.zzz
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Phone">
                                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid Phone Number
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control" placeholder="Enter Your Age">
                                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid age
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Enter Your Password">
                                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Repassword">
                                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid repassword
                                </div>
                            </div>
                        </div>
                        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Simple Toast -->
       // Simple Toast
<div id="simpleToast">Your data has been submitted successfully</div>

    `;
    document.getElementById("rowData").innerHTML = cartoona;


    // Submit Button Event
    document.getElementById("submitBtn").addEventListener("click", function () {
        let toast = document.getElementById("simpleToast");
        toast.classList.add("show");


        document.getElementById("nameInput").value = "";
        document.getElementById("emailInput").value = "";
        document.getElementById("phoneInput").value = "";
        document.getElementById("ageInput").value = "";
        document.getElementById("passwordInput").value = "";
        document.getElementById("repasswordInput").value = "";

        document.getElementById("submitBtn").disabled = true;

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    });
}
function inputsValidation() {
    const inputs = {
        name: document.getElementById("nameInput").value,
        email: document.getElementById("emailInput").value,
        phone: document.getElementById("phoneInput").value,
        age: document.getElementById("ageInput").value,
        password: document.getElementById("passwordInput").value,
        repassword: document.getElementById("repasswordInput").value
    };

    const regexPatterns = {
        name: /^[A-Za-z\s]+$/,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phone: /^[0-9]{11}$/,
        age: /^(1[89]|[2-9][0-9])$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        repassword: (password) => new RegExp(`^${password}$`)
    };

    let validInputs = {
        name: regexPatterns.name.test(inputs.name),
        email: regexPatterns.email.test(inputs.email),
        phone: regexPatterns.phone.test(inputs.phone),
        age: regexPatterns.age.test(inputs.age),
        password: regexPatterns.password.test(inputs.password),
        repassword: regexPatterns.repassword(inputs.password).test(inputs.repassword)
    };

    toggleAlert('nameAlert', validInputs.name);
    toggleAlert('emailAlert', validInputs.email);
    toggleAlert('phoneAlert', validInputs.phone);
    toggleAlert('ageAlert', validInputs.age);
    toggleAlert('passwordAlert', validInputs.password);
    toggleAlert('repasswordAlert', validInputs.repassword);

    document.getElementById("submitBtn").disabled = !Object.values(validInputs).every(value => value);
}

function toggleAlert(alertId, isValid) {
    const alertElement = document.getElementById(alertId);
    if (isValid) {
        alertElement.classList.add('d-none');
    } else {
        alertElement.classList.remove('d-none');
    }
}
