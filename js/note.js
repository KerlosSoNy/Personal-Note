let addPageNote = document.querySelector(".addNotePage")
let showNotesButton = document.querySelector(".showNotsButton")
let showProfileButt = document.querySelector(".showProfileButt")
let showingAddNote = document.querySelector(".showingAddNote")
let showingnotes = document.querySelector(".showingnotes")
let showingProfile = document.querySelector(".showingProfile")

// Getting The Inputs Of Form
let noteHeads = document.querySelector(".noteHeadInput")
let notebody = document.querySelector(".noteBodyInput")

// Getting Data From Base
let loggedAccount = {}
if (JSON.parse(window.localStorage.getItem("LoggedAccount")) == null) {
    loggedAccount = {}
} else {
    loggedAccount = JSON.parse(window.localStorage.getItem("LoggedAccount"))
}

let all_account = []
if (window.localStorage.getItem("Accounts") === undefined) {
    all_account = []
} else {
    all_account = JSON.parse(window.localStorage.getItem("Accounts"))
}



// Update Data Base (Accounts , Logged Account)
document.forms[0].onsubmit = (e) => {
    let date = new Date()
    let cloneNotes = {
        noteHead: "",
        noteBody: "",
        time: "",
        id: Math.random()
    }
    let formValid = false
    if (noteHeads.value !== "" && noteHeads.value.length >= 5 && notebody.value !== "" && notebody.value.length >= 15) {
        cloneNotes.noteHead = noteHeads.value
        cloneNotes.noteBody = notebody.value;
        cloneNotes.time = `${date.getFullYear()}\/${date.getMonth()+1}\/${date.getDay()}  at ${date.getHours()}:${date.getMinutes()}`
        loggedAccount.notes.push(cloneNotes)
        window.localStorage.setItem("LoggedAccount", JSON.stringify(loggedAccount))
        for (let i = 0; i < all_account.length; i++) {
            if (all_account[i].userName == loggedAccount.userName) {
                all_account[i] = loggedAccount;
            }
        }
        window.localStorage.setItem("Accounts", JSON.stringify(all_account))
        formValid = true
    }
    if (formValid == false) {
        e.preventDefault()
    }
}

// Showing Information
let h2ForHi = document.querySelector(".userName")
h2ForHi.innerHTML = `Hello, ${loggedAccount.firstName} ${loggedAccount.secondName}`
let divOfProfile = document.querySelector(".mainProfile")
let firstNameSpan = document.createElement("p")
let secondNameSpan = document.createElement("p")
let userNameSpan = document.createElement("p")
let citySpan = document.createElement("p")
let phoneNumberSpan = document.createElement("p")
let passwordSpan = document.createElement("p")
let headFirstSpan = document.createElement("span")
let headsecondSpan = document.createElement("span")
let headuserNameSpan = document.createElement("span")
let headcitySpan = document.createElement("span")
let headphoneNumberSpan = document.createElement("span")
let headPasswordSpan = document.createElement("span")
firstNameSpan.innerHTML = `${loggedAccount.firstName}`
secondNameSpan.innerHTML = `${loggedAccount.secondName}`
userNameSpan.innerHTML = `${loggedAccount.userName}`
citySpan.innerHTML = `${loggedAccount.country}`
phoneNumberSpan.innerHTML = `${loggedAccount.phoneNumber}`
passwordSpan.innerHTML = `${loggedAccount.password}`
headFirstSpan.innerHTML = `First Name`
headsecondSpan.innerHTML = `Last Name`
headuserNameSpan.innerHTML = `UserName`
headcitySpan.innerHTML = `Country`
headphoneNumberSpan.innerHTML = `Phone Number`
headPasswordSpan.innerHTML = `Password`
divOfProfile.append(headFirstSpan, firstNameSpan, headsecondSpan, secondNameSpan, headuserNameSpan, userNameSpan, headcitySpan, citySpan, headphoneNumberSpan, phoneNumberSpan, headPasswordSpan, passwordSpan)


//Showing Notes
let showNotes = document.querySelector(".notes")
if (loggedAccount.notes.length == 0) {
    let spanNo = document.createElement("span")
    spanNo.classList.add("spanno")
    spanNo.innerHTML = "No Notes Yet O_O"
    showNotes.append(spanNo)
} else {
    for (let i = 0; i < loggedAccount.notes.length; i++) {
        let singleNote = document.createElement("div")
        singleNote.classList.add("singleNote")
        let deleteButton = document.createElement("button")
        let editButton = document.createElement("button")
        deleteButton.innerHTML = `Delete`
        editButton.innerHTML = `Edit`
        deleteButton.classList.add("deleteNote")
        editButton.classList.add("editNote")
        let h2HeadNote = document.createElement('input')
        h2HeadNote.classList.add("headofNote")
        h2HeadNote.setAttribute("disabled", "")
        h2HeadNote.value = `${loggedAccount.notes[i].noteHead}`
        let pbodyNote = document.createElement('textarea')
        pbodyNote.classList.add("bodyofNote")
        pbodyNote.setAttribute("disabled", "")
        let forofNotes = document.createElement('form')
        forofNotes.classList.add("forofNotes")
        pbodyNote.value = `${loggedAccount.notes[i].noteBody}`
        let spanTime = document.createElement('span')
        spanTime.classList.add("spanTime")
        spanTime.innerHTML = `${loggedAccount.notes[i].time}`
        forofNotes.append(h2HeadNote, pbodyNote, spanTime, editButton, deleteButton)
        singleNote.append(forofNotes)
        showNotes.append(singleNote)
    }
}


// Edit In Note
let editNote = document.querySelectorAll(".editNote")
let allFormsOfNotes = document.querySelectorAll('.forofNotes')
editNote.forEach((e) => {
    e.addEventListener("click", (e) => {
        let headInput = e.currentTarget.parentNode[0]
        let bodyTextArea = e.currentTarget.parentNode[1]
        if (headInput.hasAttribute("disabled") && bodyTextArea.hasAttribute("disabled")) {
            headInput.removeAttribute("disabled")
            bodyTextArea.removeAttribute("disabled")
            headInput.style.border = "1px solid black"
            bodyTextArea.style.border = "1px solid black"
        } else {
            headInput.setAttribute("disabled", "")
            bodyTextArea.setAttribute("disabled", "")
        }
        let id = "";
        for (let i = 0; i < loggedAccount.notes.length; i++) {
            if (loggedAccount.notes[i].noteHead === headInput.value) {
                id = loggedAccount.notes[i].id
            }
        }
        for (let i = 0; i < loggedAccount.notes.length; i++) {
            if (loggedAccount.notes[i].id === id) {
                if (loggedAccount.notes[i].noteHead === headInput.value) {
                    if (headInput.hasAttribute("disabled") && bodyTextArea.hasAttribute("disabled")) {
                        location.reload();
                    }
                }
            } else {
                loggedAccount.notes[i].noteHead = headInput.value;
                loggedAccount.notes[i].noteBody = bodyTextArea.value;
                alert(`Update`)
                window.localStorage.setItem("LoggedAccount", JSON.stringify(loggedAccount));
                location.reload()
            }
        }
    })
})
console.log(loggedAccount)
    // DeleteNote 
let deleteNodes = document.querySelectorAll('.deleteNote')
allFormsOfNotes.forEach((e) => {
    e.onsubmit = function(e) {
        let formValid = false
        deleteNodes.forEach((e) => {
            e.addEventListener("click", (e) => {
                let mainNoteHead = e.currentTarget.parentNode.children[0].value;
                let cloneNotesArray = loggedAccount.notes.filter((e) => {
                    if (e.noteHead == mainNoteHead) {
                        return "";
                    } else {
                        return e;
                    }
                })
                loggedAccount.notes = cloneNotesArray;
                window.localStorage.setItem("LoggedAccount", JSON.stringify(loggedAccount))
                location.reload()
                formValid = true
            })
        })
        if (formValid == false) {
            e.preventDefault()
        }
    }
})

// deleteNodes.forEach((e) => {
//     e.addEventListener("click", (e) => {
//         let mainNoteHead = e.currentTarget.parentNode.children[0].innerHTML;
//         let cloneNotesArray = loggedAccount.notes.filter((e) => {
//             if (e.noteHead == mainNoteHead) {
//                 return "";
//             } else {
//                 return e;
//             }
//         })
//         loggedAccount.notes = cloneNotesArray;
//         window.localStorage.setItem("LoggedAccount", JSON.stringify(loggedAccount))
//         location.reload()
//     })
// })


// Clear All Notes
let clearNotesBttn = document.querySelector(".clearALlNotes")
clearNotesBttn.addEventListener("click", (e) => {
    loggedAccount.notes = [];
    window.localStorage.setItem("LoggedAccount", JSON.stringify(loggedAccount))
    location.reload()
})

//upDate Data Base 
let cloneAll_Account = all_account.map((e) => {
    if (e.userName === loggedAccount.userName) {
        return e = loggedAccount;
    } else {
        return e;
    }
})
all_account = cloneAll_Account;
window.localStorage.setItem("Accounts", JSON.stringify(all_account))


// Showing And Hidding Sections
addPageNote.addEventListener("click", (e) => {
    if (showingAddNote.classList.contains("d-none")) {
        showingAddNote.classList.toggle("d-none")
    }
    if (!showingnotes.classList.contains("d-none") && !showingProfile.classList.contains("d-none")) {
        showingnotes.classList.add("d-none")
        showingProfile.classList.add("d-none")
    } else {
        showingnotes.classList.add("d-none")
        showingProfile.classList.add("d-none")
    }
})
showNotesButton.addEventListener("click", (e) => {
    if (showingnotes.classList.contains("d-none")) {
        showingnotes.classList.toggle("d-none")
    }
    if (!showingAddNote.classList.contains("d-none") && !showingProfile.classList.contains("d-none")) {
        showingAddNote.classList.add("d-none")
        showingProfile.classList.add("d-none")
    } else {
        showingAddNote.classList.add("d-none")
        showingProfile.classList.add("d-none")
    }
})
showProfileButt.addEventListener("click", (e) => {
    if (showingProfile.classList.contains("d-none")) {
        showingProfile.classList.toggle("d-none")
    }
    if (!showingAddNote.classList.contains("d-none") && !showingnotes.classList.contains("d-none")) {
        showingAddNote.classList.add("d-none")
        showingnotes.classList.add("d-none")
    } else {
        showingAddNote.classList.add("d-none")
        showingnotes.classList.add("d-none")
    }
})