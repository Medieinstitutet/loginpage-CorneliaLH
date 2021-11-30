window.addEventListener("load", startSite)

function clearSite () {
    const root = document.getElementById("root")
    root.innerHTML = ""
    localStorage.clear()
    startSite()
}

function startSite()  {
    let inloggad = localStorage.getItem("status")
    if( inloggad == "inloggad") {
        nextPage()}
    const root = document.getElementById("root")
    const containerStart = document.createElement("div")
    containerStart.className = "containerStart"
    const inputName = document.createElement("input")
    inputName.placeholder = "Användarnamn"
    const inputPassword = document.createElement("input")
    inputPassword.placeholder = "Lösenord"
    const button1 = document.createElement("button")
    button1.innerText = "Logga in"
    containerStart.append(inputName)
    containerStart.append(inputPassword)
    root.append(containerStart)
    containerStart.append(button1)



    button1.addEventListener("click", loggaIn)
    function loggaIn() {
        let inputNameValue = inputName.value
        let passwordValue = inputPassword.value

        if(inputNameValue == "janne" && passwordValue == "test")
            {localStorage.setItem("name", "janne")
            localStorage.setItem("status", "inloggad")
            nextPage()} 
             else if (inputNameValue == "cornelia" && passwordValue == "test")
             {localStorage.setItem("name", "cornelia")
             localStorage.setItem("status", "inloggad")
              nextPage()} 

             else
             {errorPage()}
    }
}

function nextPage() {
    
    const root = document.getElementById("root")
    root.innerHTML = ""
    const containerPage = document.createElement("div")
    containerPage.className = "containerPage"
    const header = document.createElement("header")
    header.className = "header"
    const ul = document.createElement("ul")
    ul.className = "ul"
    const button2 = document.createElement("button")
    button2.innerText = "Logga ut"
    const mainPage = document.createElement("main")
    mainPage.className = "mainPage"
    const headingPage = document.createElement("h1")
    headingPage.className = "headingPage"
    headingPage.innerText = "Välkommen till min sida, " + localStorage.getItem("name")
    const footerPage = document.createElement("footer")
    footerPage.className = "footerPage"
    footerPage.innerText = "Copyright Footer"
    root.append(containerPage)
    containerPage.append(header)
    header.append(ul)
    const menuArray = ["Home", "Om oss", "Kontakt"]
        for (let i=0; i<menuArray.length; i++) {
            const li = document.createElement("li")
            li.innerText = menuArray[i]
            ul.append(li)
        }
        ul.insertAdjacentElement("beforeend", button2)
    
    button2.addEventListener("click", clearSite)
    
    containerPage.append(mainPage)
    mainPage.append(headingPage)
    containerPage.append(footerPage)
    const picture = document.createElement("img")
    picture.src = "img/cat-g457fa44ed_1280.jpg"
    picture.className = "picture"
    mainPage.append(picture)

    

}

function errorPage() {
    const root = document.getElementById("root")
    root.innerHTML = ""
    const containerError = document.createElement("div")
    containerError.className = "containerError"
    const button3 = document.createElement("button")
    button3.innerText = "Tillbaka till Logga In"
    root.append(containerError)
    
    button3.addEventListener("click", clearSite)
    const p = document.createElement("p")
    p.innerText = "Oooooops något gick fel"
    containerError.append(p)
    containerError.append(button3)
}

