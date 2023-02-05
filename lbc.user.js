// ==UserScript==
// @name     Anonyme Script 508089
// @version  1
// @grant    none
// @include https://www.leboncoin.fr/*
// @require https://raw.githubusercontent.com/jpcrevoisier/users.script/main/lbc.js
// ==/UserScript==


firstScript=document.querySelector('script');
newScript=document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'https://raw.githubusercontent.com/jpcrevoisier/users.script/main/lbc.js';
// firstScript.parentNode.insertBefore(newScript, firstScript);
