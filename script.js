/*sidan startar med en eventlyssnare för att 
starta första funktionen*/

window.addEventListener("load", rootPage)

function clearSite () {
    const root = document.getElementById("root")
    localStorage.removeItem("status")
    localStorage.removeItem("title")
    root.innerHTML = ""
    
    rootPage()
}

/*start fuktion för inloggningssidan*/

function rootPage () {
    const root = document.getElementById("root")
    const header = document.createElement("header")
    header.className = "header"
    const logoContainer = document.createElement("h1")
    logoContainer.className = "logoContainer"

    const logo = document.createElement("i") 
    logo.className = "fas fa-tram"

    const inputContainer = document.createElement("div")
    inputContainer.className = "inputContainer"

    const inputName = document.createElement("input")
    inputName.placeholder = "Användarnamn"

    const inputPassword = document.createElement("input")
    inputPassword.placeholder = "Lösenord"

    const button1 = document.createElement("button")
    button1.innerText = "Logga in"

//element som appendas till DOM.  
    
    header.append(logoContainer)
    header.append(inputContainer)
    logoContainer.append(logo)
    inputContainer.append(inputName)
    inputContainer.append(inputPassword)
    root.append(header)
    inputContainer.append(button1)
    
    const footerPage = document.createElement("footer")
    footerPage.className = "footerPage"
    footerPage.innerText = "Copyright Footer"
    root.append(footerPage)

    const containerStart = document.createElement("div")
    const containerPage = document.createElement("div")
    const containerError = document.createElement("div")

    function getArrayFromLs() {
        let collectedUsersList = localStorage.getItem("users")
    
        let users = [{name: "janne",
                     password: "test"}, 
                    {name: "cornelia",
                    password: "prova"}]
    
        if(collectedUsersList) {
            users = JSON.parse(collectedUsersList)
        } 
        return users
    }
    let users = getArrayFromLs()
    // let users = [{name: "janne",
    //             password: "test"},]
    let inloggad = localStorage.getItem("status")
    startSite()

function startSite()  {
/*if-sats för att kolla om det finns en status som inloggad
i local storage, om det finns det så stannar funktionen 
och går till huvudsidan istället*/
    containerPage.innerHTML = ""
    containerError.innerHTML = ""

    
    if( inloggad == "inloggad") {
        nextPage()}
//element
    
    root.append(containerStart)
    containerStart.className = "containerStart"
    
    const containerStartContent = document.createElement("section")
    containerStart.append(containerStartContent)
    containerStartContent.className = "containerStartContent"

    const headingStart = document.createElement("h2")
    headingStart.className = "headingStart"
    containerStartContent.append(headingStart)
    headingStart.innerHTML = "Välkommen"

    const pStart = document.createElement("p")
    containerStartContent.append(pStart)
    pStart.innerHTML ="Var vänlig skapa ny användare i formulöret nedanför:"

    const form = document.createElement("form")
    form.id = "form"
    containerStartContent.append(form)

    const inputNameForm = document.createElement("input")
    inputNameForm.placeholder = "Användarnamn"
    inputNameForm.type = "text"
    

    const inputPasswordForm = document.createElement("input")
    inputPasswordForm.placeholder = "Password"
    inputPasswordForm.type = "password"     

    const buttonNewUser = document.createElement("button")
    buttonNewUser.innerText = "Registrera new användare"
    buttonNewUser.type = "submit"

    form.append(inputNameForm,inputPasswordForm,buttonNewUser)

    buttonNewUser.addEventListener("click", submitNewUser)
    
    
    
    
    

    function submitNewUser(e) {
        e.preventDefault();
        let inputNameFormValue = inputNameForm.value
        let inputPasswordFormValue = inputPasswordForm.value

        validateForm()
        function validateForm() {
            if (inputNameFormValue == "" && inputPasswordFormValue =="") {
                alert("Text måste skrivas i fälten")}
             if (inputNameForm.value.length < 3)
            { alert("Användarnamn och password ska bestå av minst 3 bokstäver")} 
            return false;
        }





        users.push(
            {name: inputNameFormValue,
            password: inputPasswordFormValue})
        localStorage.setItem("users", JSON.stringify(users) )
        inputNameForm.value = ""
        inputPasswordForm.value = ""
      
    }
  
        
    // console.log(arrayUsers)
    
    
//knappen för att logga in som startar funktionen logga in

    button1.addEventListener("click", loggaIn)

    function loggaIn() {
        
        localStorage.setItem("users", JSON.stringify(users) )
        let inputNameValue = inputName.value
        let passwordValue = inputPassword.value
   
        localStorage.setItem("title", inputNameValue)
/*if-sats, om det är korrekt namn och lösen så loggas man in på        
huvudsida, om det inte är korrekt så hamnar man på error-sidan*/
        let namesInArray = JSON.parse(localStorage.getItem("users")).some(person => person.name == inputNameValue) 

        let passwordsInArray = JSON.parse(localStorage.getItem("users")).some(person => person.password == passwordValue)
      
        if (namesInArray && passwordsInArray == true)
        // (inputNameValue == JSON.parse(localStorage.getItem("users")) && passwordValue == JSON.parse(localStorage.getItem("users")))
        //    { localStorage.setItem("name", "janne")
            {localStorage.setItem("status", "inloggad")
            nextPage()} 
            //  else if (inputNameValue == JSON.parse(localStorage.getItem("users"))[1].name && JSON.parse(localStorage.getItem("users"))[1].password)
            // //  {localStorage.setItem("name", "cornelia")
            //  {localStorage.setItem("status", "inloggad")
            //   nextPage()} 
              else
             {errorPage()}
            //  JSON.parse(localStorage.getItem("users")).forEach(users => inputNameValue == users.name)
            // JSON.parse(localStorage.getItem("users")).forEach(users => passwordValue == users.password)
            inputName.value = ""           
            inputPassword.value = ""  
    }
}

/*huvudsidan*/

function nextPage() {
    
//element
    
    containerStart.className = "containerStartNone"
    containerError.className = "containerErrorNone"
    // const root = document.getElementById("root")
    // root.innerHTML = ""
    inputContainer.innerHTML = ""
    
    containerPage.className = "containerPage"

    // const header = document.createElement("header")
    // header.className = "header"
    

    const containerLogOut = document.createElement("div")
    containerLogOut.className = "containerLogOut"

    const button2 = document.createElement("button")
    button2.innerText = "Logga ut"

    const mainPage = document.createElement("main")
    mainPage.className = "mainPage"

    const headingPage = document.createElement("h1")
    headingPage.className = "headingPage"
    headingPage.innerText = "Välkommen till min sida, " + localStorage.getItem("title")

    const footerPage = document.createElement("footer")
    footerPage.className = "footerPage"
    footerPage.innerText = "Copyright Footer"

//element appendade

    root.append(containerPage)
    // containerPage.append(header)
    inputContainer.append(containerLogOut)
    containerLogOut.append(button2)
//navbar

    // const menuArray = ["Home", "Om oss", "Kontakt"]
    //     for (let i=0; i<menuArray.length; i++) {
    //         const li = document.createElement("li")
    //         li.innerText = menuArray[i]
    //         ul.append(li)
    //     }
    //     ul.insertAdjacentElement("beforeend", button2)

//Logga ut knappen

    button2.addEventListener("click", clearSite)

//content main page

    containerPage.append(mainPage)
    mainPage.append(headingPage)
    containerPage.append(footerPage)
    const picture = document.createElement("img")
    picture.src = "img/cat-g457fa44ed_1280.jpg"
    picture.className = "picture"
    mainPage.append(picture)

    

}

//error page

function errorPage() {

    //Element
    containerError.innerHTML = ""
    // containerPage.innerHTML = ""
    // containerStart.innerHTML = ""

    containerStart.className = "containerStartError"

    
    containerError.className = "containerError"
    const button3 = document.createElement("button")
    button3.innerText = "Tillbaka till Skapa användare"
    root.append(containerError)
    
    button3.addEventListener("click", clearSite)
    const pError = document.createElement("p")
    pError.innerText = "Det var fel användarnamn eller password. \nVar vänlig försök igen eller klicka på \nknappen för att kunna skapa ny användare"
    pError.className ="pError"
    containerError.append(pError)
    containerError.append(button3)
    
}

}