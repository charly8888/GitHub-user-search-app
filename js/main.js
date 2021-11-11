//APP state
const API = "https://api.github.com/users/"
let dark = true


//Grab DOM elements
const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
const result = document.querySelector(".result")
const waiting = document.querySelector(".waiting")
const notFound = document.querySelector(".not-found")
const themeSwitch = document.querySelector(".theme__switch")
const themeCSS = document.querySelector(".theme-css")
const themeName = document.querySelector(".theme__name")

//Listen various events
form.addEventListener("submit", (event) => {
    event.preventDefault();
    //get the username from input
    const username = input.value.trim()
    if (!username) return;

    getUserData(username)

    input.value=""
})

themeSwitch.addEventListener("click", switchTheme)



//Query the GitHub API for that username
async function getUserData(username) {
    try{
        const response = await fetch(API + username)
        if(!response.ok){
            throw new Error("Can’t find that username")
        }
        const data = await response.json()
        showUserData(data)
    }catch(error){
        showNotFound()
    }
}
// sHOW NOT FOUND (404) message

function showNotFound(){
    const image = `<img src="img/not-found.gif" alt="Not-found" class="not-found">`
    result.innerHTML = image

}

//Show the username data

function showUserData(data) {
    const {login, avatar_url:avatar, name, company, blog, location, email, bio, twitter_username:twitter, public_repos:repos, followers, following, created_at:joined} = data
    const userData = `
        <img src="${avatar}" class="avatar">

        <h2 class="name">${name}</h2>
        <h4 class="joined">${parseDate(joined)}</h4>
        <h5 class="username">${login}</h5>
        <p class="bio">${bio}</p>

        <section class="stats">
            <p class="repos"><small>Repos</small></p>
            <p class="followers"><small>Followers</small></p>
            <p class="following"><small>Following</small></p>
            <p >${repos}</p>
            <p >${followers}</p>
            <p >${following}</p>
        </section>

        <nav class="contact">
            <a href="#" class="link"><i class="fa fa-map-marker-alt"></i>${location}</a>
            <a href="#" class="link"><i class="fab fa-twitter"></i>${twitter}</a>
            <a href="#" target="_blank" class="link"><i class="fa fa-link"></i>${blog}</a>
            <a href="#" class="link"><i class="fa fa-building"></i>${company}</a>
        </nav>`

        result.innerHTML = userData

        function parseDate(date){
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleString("es-ES", options)
    }
}

//Do the theme switching stuff

function switchTheme(){
    dark=!dark
    if(dark){
        themeCSS.setAttribute("href", "css/dark.css")
        themeName.textContent= "DARK"
    }else{
        themeCSS.setAttribute("href", "css/light.css")
        themeName.textContent= "LIGHT"
    }
}