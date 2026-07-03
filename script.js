/* ===========================================
   FLAMES APP - script.js (PART 1)
=========================================== */

// ==============================
// GOOGLE APPS SCRIPT URL
// ==============================

// Replace this with your own deployed Google Apps Script URL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwDlt78Cd2sgKDHx3pSENYhG0c4uzYvICUFTtq2jC5_5MDM8v6bdB9e0f14K28_BWjE-g/exec";


// ==============================
// HTML ELEMENTS
// ==============================

const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");

const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");

const loader = document.getElementById("loader");

const shareBtn = document.getElementById("shareBtn");
const darkBtn = document.getElementById("darkBtn");

const clickSound = document.getElementById("clickSound");


// ==============================
// BUTTON CLICK
// ==============================

checkBtn.addEventListener("click", checkFlames);


// ==============================
// MAIN FUNCTION
// ==============================

function checkFlames() {

    const first = name1.value.trim();
    const second = name2.value.trim();

    if (first === "" || second === "") {

        shakeInputs();

        alert("Please enter both names.");

        return;
    }

    playClick();

    showLoader();

    setTimeout(() => {

        hideLoader();

        const answer = calculateFlames(first, second);

        showResult(answer);

        saveToGoogleSheet(first, second);

        launchConfetti();

        vibratePhone();

    }, 1800);

}



// ==============================
// LOADER
// ==============================

function showLoader(){

    loader.style.display="block";

    result.innerHTML="";

}

function hideLoader(){

    loader.style.display="none";

}



// ==============================
// PLAY SOUND
// ==============================

function playClick(){

    if(clickSound){

        clickSound.currentTime=0;

        clickSound.play().catch(()=>{});

    }

}



// ==============================
// SHAKE INPUT
// ==============================

function shakeInputs(){

    name1.classList.add("shake");
    name2.classList.add("shake");

    setTimeout(()=>{

        name1.classList.remove("shake");
        name2.classList.remove("shake");

    },500);

}
/* ===========================================
   FLAMES APP - script.js (PART 2)
=========================================== */

// ==============================
// FLAMES CALCULATION
// ==============================

function calculateFlames(nameOne, nameTwo){

    let n1 = nameOne.toLowerCase().replace(/\s+/g,"");
    let n2 = nameTwo.toLowerCase().replace(/\s+/g,"");

    let arr1 = n1.split("");
    let arr2 = n2.split("");

    for(let i=0;i<arr1.length;i++){

        let index = arr2.indexOf(arr1[i]);

        if(index !== -1){

            arr1[i] = "";
            arr2[index] = "";

        }

    }

    let count =
        arr1.join("").length +
        arr2.join("").length;

    return flamesResult(count);

}



// ==============================
// FLAMES LOGIC
// ==============================

function flamesResult(count){

    let flames = [
        "❤️ Friends",
        "💕 Love",
        "🥰 Affection",
        "💍 Marriage",
        "😡 Enemies",
        "👨‍👩‍👧 Siblings"
    ];

    while(flames.length > 1){

        let index =
        (count % flames.length) - 1;

        if(index >= 0){

            flames =
            flames
            .slice(index + 1)
            .concat(
            flames.slice(0,index));

        }

        else{

            flames.pop();

        }

    }

    return flames[0];

}



// ==============================
// SHOW RESULT
// ==============================

function showResult(answer){

    result.classList.remove("resultSuccess");

    void result.offsetWidth;

    result.classList.add("resultSuccess");

    result.innerHTML = `

        <h2>${answer}</h2>

    `;

}



// ==============================
// CONFETTI
// ==============================

function launchConfetti(){

    if(typeof confetti !== "undefined"){

        confetti({

            particleCount:180,

            spread:100,

            origin:{y:0.6}

        });

    }

}



// ==============================
// PHONE VIBRATION
// ==============================

function vibratePhone(){

    if(navigator.vibrate){

        navigator.vibrate([150,80,150]);

    }

}
/* ===========================================
   FLAMES APP - script.js (PART 3)
=========================================== */

// ==============================
// SAVE TO GOOGLE SHEETS
// ==============================

async function saveToGoogleSheet(firstName, secondName){

    if(WEB_APP_URL === "https://script.google.com/macros/s/AKfycbwDlt78Cd2sgKDHx3pSENYhG0c4uzYvICUFTtq2jC5_5MDM8v6bdB9e0f14K28_BWjE-g/exec"){
        console.log("Google Apps Script URL not added.");
        return;
    }

    try{

        await fetch(WEB_APP_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name1:firstName,
                name2:secondName

            })

        });

        console.log("Saved Successfully");

    }

    catch(error){

        console.log(error);

    }

}



// ==============================
// DARK MODE
// ==============================

darkBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        darkBtn.innerHTML=
        '<i class="fa-solid fa-sun"></i> Light Mode';

    }

    else{

        darkBtn.innerHTML=
        '<i class="fa-solid fa-moon"></i> Dark Mode';

    }

});



// ==============================
// SHARE BUTTON
// ==============================

shareBtn.addEventListener("click",shareApp);

async function shareApp(){

    const shareData={

        title:"FLAMES ❤️",

        text:"Check your FLAMES relationship ❤️",

        url:window.location.href

    };

    if(navigator.share){

        try{

            await navigator.share(shareData);

        }

        catch(e){

            console.log(e);

        }

    }

    else{

        navigator.clipboard.writeText(window.location.href);

        alert("Link copied to clipboard!");

    }

}



// ==============================
// ENTER KEY SUPPORT
// ==============================

name1.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        name2.focus();

    }

});

name2.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        checkFlames();

    }

});



// ==============================
// CLEAR RESULT WHEN TYPING
// ==============================

name1.addEventListener("input",()=>{

    result.innerHTML="";

});

name2.addEventListener("input",()=>{

    result.innerHTML="";

});
/* ===========================================
   FLAMES APP - script.js (PART 4)
=========================================== */

// ==============================
// RESET FUNCTION
// ==============================

function resetApp(){

    name1.value = "";
    name2.value = "";

    result.innerHTML = "";

    loader.style.display = "none";

    name1.focus();

}

// Double click result to reset

result.addEventListener("dblclick", resetApp);


// ==============================
// AUTO CAPITALIZE
// ==============================

function capitalize(input){

    let words = input.value.split(" ");

    for(let i = 0; i < words.length; i++){

        if(words[i].length > 0){

            words[i] =
                words[i][0].toUpperCase() +
                words[i].substring(1).toLowerCase();

        }

    }

    input.value = words.join(" ");

}

name1.addEventListener("blur",()=>{

    capitalize(name1);

});

name2.addEventListener("blur",()=>{

    capitalize(name2);

});


// ==============================
// RANDOM PLACEHOLDERS
// ==============================

const placeholders = [

"lijo",
"Priya",
"joswa",
"breny",
"Karthik",
"Divya",
"Balaji",
"Ananya",
"shankar",
"ajay",
"Ramesh"
];

setInterval(()=>{

    let random1 =
    placeholders[Math.floor(Math.random()*placeholders.length)];

    let random2 =
    placeholders[Math.floor(Math.random()*placeholders.length)];

    if(name1.value==="")
        name1.placeholder=random1;

    if(name2.value==="")
        name2.placeholder=random2;

},4000);


// ==============================
// WELCOME MESSAGE
// ==============================

window.onload=()=>{

    result.innerHTML=
    "<small>❤️ Enter two names and press Check ❤️</small>";

};


// ==============================
// ENTER ANIMATION
// ==============================

document.body.style.opacity="0";

window.addEventListener("load",()=>{

    document.body.style.transition="1s";

    document.body.style.opacity="1";

});


// ==============================
// BUTTON EFFECT
// ==============================

checkBtn.addEventListener("mouseenter",()=>{

    checkBtn.style.transform="scale(1.03)";

});

checkBtn.addEventListener("mouseleave",()=>{

    checkBtn.style.transform="scale(1)";

});