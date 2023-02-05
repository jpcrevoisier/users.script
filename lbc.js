Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    try
    {
		return JSON.parse(value)||{};
	}
	catch(e)
	{
		return {};
	}
    return false;
}
var GET={}
var query = window.location.search.substring(1);
if(query!='')
{
	var vars = query.split('&');
	if(vars.length>0)
	{
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			GET[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
		}
	}
}
if(GET.quickStore!=undefined)
{
	localStorage.setObject('quickStore',JSON.parse(unescape(GET.quickStore)));
}
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
String.prototype.lpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}
String.prototype.rpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
}
String.prototype.trim=function()
{
  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  return this.replace(rtrim, '');
}
String.prototype.toUtf8=function()
{
	return unescape(encodeURIComponent(this))
}
String.prototype.fromUtf8=function()
{
	return decodeURIComponent(escape(this));
}
Date.prototype.asArray=function(time)
{
  return new Array(
    this.getFullYear().toString().trim().lpad('0',4),
    (this.getMonth()+1).toString().trim().lpad('0',2),
    this.getDate().toString().trim().lpad('0',2),
    this.getHours().toString().trim().lpad('0',2),
    this.getMinutes().toString().trim().lpad('0',2),
    this.getSeconds().toString().trim().lpad('0',2)
  );
}
Date.prototype.us=function(time)
{
  array=this.asArray();
  feedback=array[0]+'-'+array[1]+'-'+array[2];
  if(time)
  {
    feedback+=' '+array[3]+':'+array[4]+':'+array[5];
  }
  return feedback;
}
Date.prototype.fr=function(time,nosec)
{
  array=this.asArray();
  feedback=array[2]+'/'+array[1]+'/'+array[0];
  if(time)
  {
	if(nosec)
	{
		feedback+=' '+array[3]+':'+array[4];
	}
	else
	{
		feedback+=' '+array[3]+':'+array[4]+':'+array[5];
	}
  }
  return feedback;
}
Date.prototype.compact=function()
{
  return this.asArray().join('');
}
NodeList.prototype.walk=function(callback){
	[].forEach.call(
		this, 
		function(el){
			callback(el);
		}
	);
};
function findMyNode(content, filter)
{
	if(filter==undefined)
	{
		filter='*';
	}
	allNodes=document.querySelectorAll(filter);
	for(i in allNodes)
	{
		if(allNodes[i] && allNodes[i].innerHTML && typeof content=='string' && allNodes[i].innerHTML.toString().trim()==content)
		{
			return allNodes[i];
		}
		else if(allNodes[i] && allNodes[i].innerHTML && typeof content=='object' && allNodes[i].innerHTML.toString().trim().match(content))
		{
		  return allNodes[i];
		}
	}
	return false;
}

function selectMyContent(node)
{
	// console.log('selectMyContent');
	var selection = window.getSelection();            
	var range = document.createRange();
	range.selectNodeContents(node);
	selection.removeAllRanges();
	selection.addRange(range);
}
function findAllNode(content, filter)
{
	if(filter==undefined)
	{
		filter='*';
	}
	feedBack=new Array();
	allNodes=document.querySelectorAll(filter);
	// console.log(allNodes);
	for(i in allNodes)
	{
		if(allNodes[i] && allNodes[i].innerHTML && typeof content=='string' && allNodes[i].innerHTML==content)
		{
			feedBack[feedBack.length]=allNodes[i];
		}
		else if(allNodes[i] && allNodes[i].innerHTML && typeof content=='object' && allNodes[i].innerHTML.match(content))
		{
			feedBack[feedBack.length]=allNodes[i];
		}
	}
	if(feedBack.length==0)
	{
		return false;
	}
	return feedBack;
}
var getElementByXPath = function(a,b){b=document;return b.evaluate(a,b,null,9,null).singleNodeValue}

if(GET['searchString']!=undefined)
{
	window.find(GET['searchString']);
}

function selectMyContent(node)
{
	var selection = window.getSelection();            
	var range = document.createRange();
	range.selectNodeContents(node);
	// console.log(range);
	selection.removeAllRanges();
	selection.addRange(range);
	
}

function setSelectText(select, text)
{
    for (var i=0; i<select.length;i++) {
        if (select[i].childNodes[0].nodeValue === text){
			select.selectedIndex=i;
			select.onchange();
			return true;
        }
    }
    return false;	
}

function indexMatchingText(ele, text) {
    for (var i=0; i<ele.length;i++) {
        if (ele[i].childNodes[0].nodeValue.toLowerCase() === text.toLowerCase()){
            return i;
        }
        console.warn(ele[i].childNodes[0].nodeValue+'!='+text);
    }
    for (var i=0; i<ele.length;i++) {
        if (ele[i].childNodes[0].nodeValue.toUtf8().toLowerCase() === text.toLowerCase()){
            return i;
        }
        console.warn(ele[i].childNodes[0].nodeValue.toUtf8()+'!='+text);
    }
    return undefined;
}

function getObject(objectName)
{
	var request = new XMLHttpRequest();
	request.open('GET', 'https://192.168.106.150/gmus/store.php?auth_token='+auth_token+'&filename='+objectName+'.json&date='+new Date(), false);  // `false` makes the request synchronous
	request.send();

	if (request.status === 200) {
		data=(request.responseText!='')?request.responseText:'{}';
		return JSON.parse(data);
	}
	return false;
}

function setObject(objectName, object)
{
	var request = new XMLHttpRequest();
	request.open('GET', 'https://192.168.106.150/gmus/store.php?auth_token='+auth_token+'&filename='+objectName+'.json&content='+encodeURI(JSON.stringify(object))+'&date='+new Date(), false);  // `false` makes the request synchronous
	request.send(null);

	if (request.status === 200) {
	  return JSON.parse(request.responseText);
	}
	return false;
}

function getFile(filename)
{
	var request = new XMLHttpRequest();
	request.open('GET', 'https://192.168.106.150/gmus/store.php?auth_token='+auth_token+'&filename='+filename+'&date='+new Date(), false);  // `false` makes the request synchronous
	request.send(null);
	if (request.status === 200) {
		return request.responseText;
	}
	return false;
}
function setFile(filename, content)
{
	var request = new XMLHttpRequest();
	request.open('GET', 'https://192.168.106.150/gmus/store.php?auth_token='+auth_token+'&filename='+filename+'&content='+encodeURI(content)+'&date='+new Date(), false);  // `false` makes the request synchronous
	request.send(null);
	if (request.status === 200) {
		return request.responseText;
	}
	return false;
}

function getBinary(file){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", file, false);
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    xhr.send(null);
    return xhr.responseText;
}

function base64Encode(str) {
    var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out = "", i = 0, len = str.length, c1, c2, c3;
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
            out += CHARS.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += CHARS.charAt(c1 >> 2);
        out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += CHARS.charAt(c3 & 0x3F);
    }
    return out;
}
console.clear();


Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    try
    {
		return JSON.parse(value)||{};
	}
	catch(e)
	{
		return {};
	}
    return false;
}

if(window.location.pathname.match(/^\/ventes_immobilieres\/([0-9]*)\.(.*)/g)!=null)
{
	alert('ok');
	LBCDatas=localStorage.getObject('LBCDatas');
	if(LBCDatas.URLs==undefined)
	{
	  LBCDatas.URLs=new Array();
	}
	if(LBCDatas.URLs[document.URL]==undefined)
	{
	  LBCDatas.URLs[document.URL]=new Date().fr(true)+' ...'
	}
	document.getElementsByClassName('apn-vp').remove();

	article=document.getElementsByTagName('section')[0];
	div=document.createElement('div');
	div.contentEditable=true;
	content=document.createTextNode(LBCDatas.URLs[document.URL]);
	div.appendChild(content);
	div.appendChild(document.createElement('br'));
	div.appendChild(document.createElement('br'));
	button=document.createElement('button');
	button.value="Hide Me";
	button.addEventListener("click", function(ev){
	  console.clear();
	  console.log();
	  toogle(content);
	}, false);
	div.appendChild(button);
	div.appendChild(document.createElement('br'));
	div.appendChild(document.createElement('br'));
	article.insertBefore(div, article.firstChild);

	localStorage.setObject('LBCDatas',LBCDatas);
	console.clear();
	console.log(LBCDatas);
	// alert('toto');
	document.getElementsByClassName('apn-vp').remove();


	window.location.pathname.matchAll(/^\/ventes_immobilieres\/([0-9]*)\.(.*)/g)[0]
}
