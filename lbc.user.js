// ==UserScript==
// @name     Anonyme Script 508089
// @version  1
// @grant    none
// @include https://www.leboncoin.fr/ventes_immobilieres/*
// ==/UserScript==


firstScript=document.querySelector('script');
newScript=document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'https://raw.githubusercontent.com/jpcrevoisier/users.script/main/lbc.js';
