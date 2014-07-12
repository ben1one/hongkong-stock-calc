// JavaScript Document
<!-- ALWAYS ON TOP FLOATING LAYER POP-UP -->
<!-- Copyright 2003, Sandeep Gangadharan -->
<!-- For more free scripts go to http://sivamdesign.com/scripts/ -->

var y1 = 0;   // change the # on the left to adjuct the Y co-ordinate
(document.getElementById) ? dom = true : dom = false;

function hideIt() {
  if (dom) {document.getElementById("layer1").style.display='none';}
}

function showIt() {
  if (dom) {
	  document.getElementById("layer1").style.display='';
	}
	
}

function placeIt() {
	if (dom && !document.all) {
	  	document.getElementById("layer1").style.top = window.pageYOffset + (window.innerHeight - (window.innerHeight-y1)) + "px";
	}
	
	if (document.all) {
			document.all["layer1"].style.top = document.documentElement.scrollTop + (document.documentElement.clientHeight - (document.documentElement.clientHeight-y1)) + "px";
	}
	window.setTimeout("placeIt()", 10);
}
