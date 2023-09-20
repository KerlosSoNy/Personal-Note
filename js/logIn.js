let userNameInput = document.querySelector("#userName")
let passWordInput = document.querySelector("#passWord")
let allAcounts = []
if (JSON.parse(window.localStorage.getItem("Accounts") == null)) {
    allAcounts = [];
} else {
    allAcounts = JSON.parse(window.localStorage.getItem("Accounts"))
}
console.log(allAcounts)
document.forms[0].onsubmit = function(e) {
    let formValid = false;
    for (let i = 0; i < allAcounts.length; i++) {
        console.log(allAcounts[i])
        if (allAcounts[i].userName == userNameInput.value && allAcounts[i].password == passWordInput.value) {
            window.localStorage.setItem("LoggedAccount", JSON.stringify(allAcounts[i]))
            console.log(allAcounts[i])
            formValid = true;
            break;
        }
    }
    if (formValid == false) {
        alert("Sorry Wrong Name Or password")
        e.preventDefault()
    }
}