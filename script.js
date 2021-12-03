/*sidan startar med en eventlyssnare för att 
starta första funktionen*/

window.addEventListener("load", rootPage);



/*start fuktion för inloggningssidan, i denna funktion finns övriga funktioner förutom clear*/

function rootPage () {

/*Element som alltid visas*/

    const root = document.getElementById("root");
    const header = document.createElement("header");
    header.className = "header";

    const logoContainer = document.createElement("h1");
    logoContainer.className = "logoContainer";

    const logo = document.createElement("i");
    logo.className = "fas fa-tram";

    const inputContainer = document.createElement("div");
    inputContainer.className = "inputContainer";

    const inputName = document.createElement("input");
    inputName.placeholder = "Användarnamn";

    const inputPassword = document.createElement("input");
    inputPassword.placeholder = "Lösenord";
/* man kan lägga till kod under för att få stjärnor istället för klartext, 
förstod det som det skulle vara klartext i denna uppgiften*/
// inputPassword.type = "password" 

    const button1 = document.createElement("button");
    button1.innerText = "Logga in";

    const footerPage = document.createElement("footer");
    footerPage.className = "footerPage";
    footerPage.innerText = "Copyright Footer";
    
//element som appendas till DOM.  
    
    header.append(logoContainer);
    header.append(inputContainer);
    logoContainer.append(logo);
    inputContainer.append(inputName);
    inputContainer.append(inputPassword);
    root.append(header);
    inputContainer.append(button1);
    root.append(footerPage);
    

    const containerStart = document.createElement("div");
    const containerPage = document.createElement("div");
    const containerError = document.createElement("div");

//funktion för att local storage ska vara min "single source of truth"
//De redan inlagda användarna genereras vid load
    
    function getArrayFromLs() {
        let collectedUsersList = localStorage.getItem("users");
    
        let users = [];
    
        if(collectedUsersList) {
            users = JSON.parse(collectedUsersList);
        } 
        return users;
    }
    
    let users = getArrayFromLs();

//Redan inlagda users, för att undvika dubletter kompletterat med if-sats
    if (!localStorage.users)
    {users.push({name: "janne",
                password: "test"}, 
                {name: "cornelia",
                password: "prova"},
                {name: "victor",
                password: "test"})

    localStorage.setItem("users", JSON.stringify(users))};

    let inloggad = localStorage.getItem("status");

//
//START-SIDAN
//

    startSite()

        function startSite()  {

        containerPage.innerHTML = "";
        containerError.innerHTML = "";

/*if-sats för att kontrollera om det finns en status som inloggad
i local storage, om det finns det så stannar funktionen 
och går till huvudsidan istället*/

        if( inloggad === "inloggad") {
        mainPage()
        return}
        

//element
        
        root.append(containerStart);
        containerStart.className = "containerStart";
        
        const containerStartContent = document.createElement("section");
        containerStart.append(containerStartContent);
        containerStartContent.className = "containerStartContent";

        const headingStart = document.createElement("h2");
        headingStart.className = "headingStart";
        containerStartContent.append(headingStart);
        headingStart.innerHTML = "Välkommen";

        const pStart = document.createElement("p");
        containerStartContent.append(pStart);
        pStart.innerHTML ="Var vänlig skapa ny användare i formuläret nedanför:";

//skapa ny användare form

        const form = document.createElement("form");
        form.id = "form";
        containerStartContent.append(form);

        const inputNameForm = document.createElement("input");
        inputNameForm.placeholder = "Användarnamn";
        inputNameForm.type = "text";
        
        const inputPasswordForm = document.createElement("input");
        inputPasswordForm.placeholder = "Lösenord";
/* kan lägga till kod under för att få stjärnor istället för klartext, 
förstod det som det skulle vara klartext i denna uppgiften*/
// inputPasswordForm.type = "password"    
        
//knapp för att skapa ny användare

        const buttonNewUser = document.createElement("button");
        buttonNewUser.innerText = "Registrera ny användare",
        buttonNewUser.type = "submit";

        form.append(inputNameForm,inputPasswordForm,buttonNewUser);

        buttonNewUser.addEventListener("click", submitNewUser);
    
/*Skapa ny användare, submit stoppas från att ladda om sidan genom eventet preventdefault
Validering för: om textfält är tomt
                om användarnamn eller password är kortare än 3 bokstäver
                om användarnamn redan finns
Om ingen av dem är true, får man skapa en användare som pushas till array och lagras i 
local storage. Inputfältet töms därefter*/

            function submitNewUser(e) {
                e.preventDefault();
                let inputNameFormValue = inputNameForm.value;
                let inputPasswordFormValue = inputPasswordForm.value;

                validateForm()
                function validateForm() {
                    if (inputNameFormValue == "" || inputPasswordFormValue =="") {
                        alert("Text måste skrivas i fälten");
                        inputNameForm.value = "";
                        inputPasswordForm.value = "";
                        return }
                        
                        
                   if (inputNameForm.value.length < 3 || inputPasswordForm.value.length < 3)
                    { alert("Användarnamn och password ska bestå av minst 3 bokstäver")
                    inputNameForm.value = "";
                    inputPasswordForm.value = "";
                    return } 
                        
                    if (JSON.parse(localStorage.getItem("users")).some(person => person.name === inputNameFormValue))
                    {alert("Användarnamn är upptaget, försök med annat")}
                    else {
                        users.push(
                            {name: inputNameFormValue,
                            password: inputPasswordFormValue})
                        localStorage.setItem("users", JSON.stringify(users) );
                        inputNameForm.value = "";
                        inputPasswordForm.value = "";
                    }
                } 
            }
  
    
    
//knappen för att logga in som startar funktionen logga in

        button1.addEventListener("click", loggaIn);

/* funktion för att logga in användare
if-satsen :Om true loggas man in, om false så hamnar man på errorsidan*/

            function loggaIn() {
                
                let inputNameValue = inputName.value;
                let passwordValue = inputPassword.value;

/* localstorage skapar en key (title) med användarnamnet som kopplas till hälsnings-
frasen på huvudsidan*/
            
                localStorage.setItem("title", inputNameValue);

/*tar ut array från localStorage och kör map-funktion för att med hjälp av inputnamn ta reda på vilket index i arrayn namnet ligger i,
detta för att kunna jämföra med lösenord senare om de är samma i if-satsen*/

                let indexOfObjectName = JSON.parse(localStorage.getItem("users")).map(function(user) {return user.name;}).indexOf(inputNameValue);

/*tar reda på om det finns namn som har SAMMA lösenord, då får jag tillbaka flera index (om användare råkar registrera samma lösenord) i en lista genom for-loopen*/
                let arrayPassword = [];
                
                for (i=0;i<JSON.parse(localStorage.getItem("users")).length;i++) {
                if (JSON.parse(localStorage.getItem("users"))[i].password == passwordValue) {
                    arrayPassword.push(i);
                  
                }
            }
                
// arrayName = gör om index som returneras i indesOfObjectName till en lista för att kunna jämföra listor längre ned

                let arrayName = [indexOfObjectName];  

/*if-sats= om namn-index (kan bara finnas ett index då man inte får ha samma användarnamn) matchar ett av indexen 
i password-listan (kan vara flera då man teoretiskt sett kan
ha valt samma password), så loggas man in*/      

                if (!arrayName.some(users => !arrayPassword.includes(users)) == true )
                
/* vid inloggning sätts status som inloggad i local storage, denna kontrolleras sedan vid uppdatering
av sidan. Om status:inloggad finns i localStorage är man kvar på huvudsidan, om inte, hamnar man på start-sidan*/      

                    {localStorage.setItem("status", "inloggad");
                    
                    mainPage()} 

/* Om man inte uppfyller kraven hamnar man på error-sidan*/    

                    else
                    {errorPage()}
                    inputName.value = "" ;      
                    inputPassword.value = ""  ;

                }   
            }
           
    

//
//HUVUD-SIDAN
//

    function mainPage() {
        
//element
        
        containerStart.className = "containerStartNone";
        containerError.className = "containerErrorNone";
        inputContainer.innerHTML = "";
        
        containerPage.className = "containerPage";

        const containerLogOut = document.createElement("div");
        containerLogOut.className = "containerLogOut";

        const button2 = document.createElement("button");
        button2.innerText = "Logga ut";

        const mainPage = document.createElement("main");
        mainPage.className = "mainPage";

        const headingPage = document.createElement("h1");
        headingPage.className = "headingPage";
        headingPage.innerText = "Välkommen till min sida, " + localStorage.getItem("title") +"!";

        const footerPage = document.createElement("footer");
        footerPage.className = "footerPage";
        footerPage.innerText = "Copyright Footer";

        const picture = document.createElement("img");
        picture.src = "img/cat-g457fa44ed_1280.jpg";
        picture.className = "picture";

//element appendade

        root.append(containerPage);
        inputContainer.append(containerLogOut);
        containerLogOut.append(button2);

//Logga ut knappen

        button2.addEventListener("click", clearSite);

//content main page

        containerPage.append(mainPage);
        mainPage.append(headingPage);
        containerPage.append(footerPage);
        mainPage.append(picture);
    }

//
//ERROR-SIDAN
//

    function errorPage() {
        containerError.innerHTML = "";
     
        containerStart.className = "containerStartError";


        containerError.className = "containerError";
        const button3 = document.createElement("button");
        button3.innerText = "Tillbaka till Skapa användare";
        root.append(containerError);
        
        button3.addEventListener("click", clearSite);
        const pError = document.createElement("p");
        pError.innerText = "Det var fel användarnamn eller lösenord. \nVar vänlig försök igen eller klicka på \nknappen för att kunna skapa ny användare";
        pError.className ="pError";
        containerError.append(pError);
        containerError.append(button3);
    }
}

function clearSite () {

    const root = document.getElementById("root");
    localStorage.removeItem("status");
    localStorage.removeItem("title");
    root.innerHTML = "";
    
    rootPage()
}