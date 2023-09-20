let firstNameInput = document.querySelector(".firstName")
let secondNameInput = document.querySelector(".secondName")
let userNameInput = document.querySelector(".UserName")
let phoneNumberInput = document.querySelector(".phoneNumber")
let countryInput = document.querySelector(".country")
let passWordInput = document.querySelector(".passWord")
let submitBttn = document.querySelector(".bttnSubmit")

// Main Account Object
let accountDetails = {
        firstName: "",
        secondName: "",
        userName: "",
        country: "",
        phoneNumber: "",
        password: "",
        notes: []
    }
    //Data Base Of Accounts
let allAcounts = []
if (JSON.parse(window.localStorage.getItem("Accounts") == null)) {
    allAcounts = [];
} else {
    allAcounts = JSON.parse(window.localStorage.getItem("Accounts"))
}

document.forms[0].onsubmit = function(e) {
    let formValid = false
    let cloneAccountDetails = {...accountDetails }
    if (firstNameInput.value.length >= 3 && secondNameInput.value.length >= 3 && userNameInput.value.length >= 8 && phoneNumberInput.value.length >= 9 && countryInput.value.length >= 3 && passWordInput.value.length >= 8) {
        cloneAccountDetails.firstName = firstNameInput.value;
        cloneAccountDetails.secondName = secondNameInput.value;
        cloneAccountDetails.userName = userNameInput.value;
        cloneAccountDetails.country = countryInput.value;
        cloneAccountDetails.phoneNumber = phoneNumberInput.value;
        cloneAccountDetails.password = passWordInput.value;
        cloneAccountDetails.notes = [];
        allAcounts.push(cloneAccountDetails)
        window.localStorage.setItem("LoggedAccount", JSON.stringify(cloneAccountDetails))
        window.localStorage.setItem("Accounts", JSON.stringify(allAcounts))
        formValid = true;
    }
    if (formValid === false) {
        e.preventDefault()
    }
}