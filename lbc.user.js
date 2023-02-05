// ==UserScript==
// @name LeBonCoin
// @version  1
// @grant    none
// @run-at document-idle
// @include https://www.leboncoin.fr/*
// @downloadURL  https://raw.githubusercontent.com/jpcrevoisier/users.script/main/lbc.user.js
// @require https://raw.githubusercontent.com/jpcrevoisier/users.script/main/lbc.js
// ==/UserScript==

/*/
C'est vide  ... mais c'est éfficace 
/*/

// https://developer.mozilla.org/en/DOM/document.readyState
if ('loading' == document.readyState) {
  alert("This script is running at document-start time.");
} else {
  alert("This script is running with document.readyState: " + document.readyState);
}
