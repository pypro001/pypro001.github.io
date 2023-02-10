// ==UserScript==
// @name         pypro001 :)
// @namespace    http*://*/*
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("running..");
   async function getAns(ques){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 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");

    var raw = JSON.stringify({
      "model": "text-davinci-003",
      "prompt": ques,
      "temperature": 0.5,
      "user": "1",
      "max_tokens": 100,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "stop": [
        "#"
      ]
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try{
        let res = await fetch("https://api.openai.com/v1/completions", requestOptions);
        let data = await res.json();
        let ans = data.choices?.[0]?.text;
        return ans;
    }catch{
        return "error";
    }
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
function print(ans){
    let body = document.querySelector("body");
    let tempElm = `<p class="ans">${ans}</p>`;
    body.insertAdjacentHTML('afterend',tempElm);
}
function clear(){
    let ansElm = document.querySelectorAll(".ans");
    if(ansElm.length > 0){
        ansElm.forEach(elm=>elm.remove());
    }
}

document.addEventListener('keypress',async(e)=>{
    let key = e.key.toLowerCase();

    if(key == 'a'){
        let ques = getSelectionText();
        if(ques){
            let ans = await getAns(ques);
            print(ans);
            console.log(ans);
        }
    }
     if(key == 'c'){
        clear();
    }
})

})();
