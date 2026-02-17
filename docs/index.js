
window.addEventListener("beforeunload", (e) => {
    console.log("🚨 PAGE IS RELOADING");
});

import configFile from "./config/config.js"

const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');
const fileName = document.getElementById('file-name');
const uploadBox = document.getElementById('upload-box');
const uploadBtn = document.getElementById('upload-btn');
const extractedText = document.getElementById('extracted-text');
const wordCount = document.getElementById('word-count-number bold-number');
const hashtagCount = document.getElementById('hashtags-number bold-number');
const ctaCount = document.getElementById('cta-number bold-number');
const sentimentCount = document.getElementById('sentiment-number bold-number');
const recommendationTextCont = document.getElementById('recommendation-text-cont');
let myForm = document.getElementById('form');

if (!myForm) {
    throw new Error("Form not found in DOM");
}

let myFile = null;


browseBtn.addEventListener("click", () => {
    console.log("fileInput clicked");
    fileInput.click();
})


fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        myFile = fileInput.files[0];
        if (myFile.size > 5 * 1024 * 1024) {
            alert("Too large file size sir!!");
        }
        console.log("fileInput change");
        console.log(myFile.name);
        console.log(`${configFile.backendURL}`);
        fileName.textContent = myFile.name;
    }
})

uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.remove('non-dragged-bg');
    uploadBox.classList.add('dragged-bg');
})

uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('dragged-bg');
    uploadBox.classList.add('non-dragged-bg');
})

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;
    myFile = fileInput.files[0];
    fileName.textContent = myFile.name;
    uploadBox.classList.remove('dragged-bg');
    uploadBox.classList.add('non-dragged-bg');
})




myForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    //e.stopPropagation();
    console.log("STEP 1");

    if (!myFile) {
        console.log("No file");
        alert("Select a file sirr!!");
        return;
    }

    console.log("STEP 2");

    const formData = new FormData();
    formData.append("myFile", myFile);

    console.log(formData);
    try {
        const response = await fetch(`${configFile.backendURL}/api/analyze`, {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        extractedText.textContent = data.text;
        wordCount.textContent = data.Analysis.wordCount;
        hashtagCount.textContent = data.Analysis.hashtagCount;
        ctaCount.textContent = data.Analysis.CTACount;
        sentimentCount.textContent = data.Analysis.sentiment;
        updateRecommendations(data.Analysis.suggestions)
    }
    catch (err) {
        console.log("Fetching error : ", err);
    }

})


async function updateRecommendations(suggestions){
    suggestions.forEach((suggestion,ind) => {
        const ele = document.createElement('div');
        ele.classList.add('recommendation-item');
        ele.textContent = suggestions[ind];
        recommendationTextCont.appendChild(ele);
    });
}




/* 

async function sendFormData(myFile) {
    const myForm = new FormData();
    myForm.append("myFile", myFile);
    const response = await fetch(`${configFile.backendURL}/api/analyze`, {
        method: "POST",
        body: myForm
    })

    const data = await response.json();
    return data;
} */