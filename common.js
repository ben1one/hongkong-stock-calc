// JavaScript Document
// Commond javascript function
function floatAdd(arg1,arg2) {
	var r1,r2,m;
	try {
		r1=arg1.toString().split(".")[1].length;
	}
	catch(e) {
		r1=0;
	}
        
	try {
		r2=arg2.toString().split(".")[1].length;
	}
	catch(e) {
		r2=0;
	}
	
	m=Math.pow(10,Math.max(r1,r2));
	return (arg1*m+arg2*m)/m;
}



/********** Unicode *****************/
function unicode(s){ 
	var len=s.length; 
	var rs=""; 
	for(var i=0;i<len;i++){ 
		var k=s.substring(i,i+1); 
		rs+="&#"+s.charCodeAt(i)+";"; 
	} 
	return rs; 
} 

function deunicode(s){ 
	var k = s.split(";"); 
	var rs=""; 
	for(i=0;i<k.length;i++){ 
		var m = k[i].replace(/&#/,""); 
		rs+=String.fromCharCode(m); 
	} 
	return rs; 
} 


/*********** Open Windows ***************/
function openCenterDialog(src,theWidth,theHeight){
	var theTop=(screen.height/2)-(theHeight/2);
	var theLeft=(screen.width/2)-(theWidth/2);
	var features='height='+theHeight+',width='+theWidth+',top='+theTop+',left='+theLeft+",scrollbars=no,resizable=no,toolbar=no,location=no,status=no,menubar=no,modal=yes";
	//var obj = new Object;             
	var winFeatures = "dialogHeight:"+theHeight+"px; dialogWidth:"+theWidth+"px; dialogTop:theTop; dialogLeft:theLeft";        
	
	//if (window.showModalDialog) {
		//window.showModalDialog(src, obj, winFeatures); 
	//}
	//else {
  		var obj = window.open(src,'a',features);
		obj.resizeTo (theWidth, theHeight);
		obj.focus();
	//}
}



/********** Cookies functions ***********/
function getCookieVal(offset){
//Get Parameters
	var endstr = document.cookie.indexOf (";", offset);
	
	if (endstr == -1) {
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset, endstr));
}

//Set Cookie's value
function setCookie(name, value){
	var expdate = new Date();
	var argv = setCookie.arguments;
	var argc = setCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	if(expires!=null) {
		expdate.setTime(expdate.getTime() + ( expires * 1000 ));
	}

	document.cookie = name + "=" + escape(value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))+((secure == true) ? "; secure" : "");
}

//Delete Cookie
function delCookie(name) {
	var exp = new Date();
	exp.setTime (exp.getTime() - 1);
	var cval = getCookie (name);
	document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString();
}


//Get Cookie's value
function getCookie(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
		return getCookieVal (j);
		
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) {
			break;
		}
	}
	
	return null;
}

/*********** Check Mail Address Syntax **********/
function isValidEmail(str) {
   return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
}

/*********** Check value is integer or not **********/
function isInt(s)
{
      var i;

      if (isEmpty(s))
      if (isInt.arguments.length == 1) return 0;
      else return (isInteger.arguments[1] == true);

      for (i = 0; i < s.length; i++)
      {
         var c = s.charAt(i);

         if (!isDigit(c)) return false;
      }

      return true;
}

function isEmpty(s) {
      return ((s == null) || (s.length == 0))
}

function isDigit (c) {
      return ((c >= "0") && (c <= "9"))
}

/********** Check for white space **************/
function hasWhiteSpace(s) 
{
/*    reWhiteSpace = new RegExp(/^\s+$/);
 
     // Check for white space
     if (reWhiteSpace.test(s)) {
          return false;
     }
	 
	return true;*/
	
	var invalid = " "; // Invalid character is a space

	if (s.indexOf(invalid) > -1) {
		return true;
	}
	else {
		return false;
   }
}


/********** Check for valid decimal number *****************/
// The text field accept a number specified decimal places.
function IsValidNum(val ,numberOfDecimal) {
	// define how many decimal places number are accepted.
	acceptLength = numberOfDecimal;
	
	if (isNaN(val) || Trim(val)=="") {
		return false;
	}
	else {
		if (val.indexOf('.') == -1) {
			return (true);
		}
		else {
			restText = val.substring(val.indexOf('.')+1, val.length);
			if (restText.length>0 && restText.length<=acceptLength) {
				return (true);
			}
			else {
				return (false);
			}
		}
	}
}

/********** Add Commas for numeric value ****************/
function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}


/**********************************************************/
function ChgImage(imgName, imgSrc) {
	document.fm.elements[imgName].src="images/"+imgSrc;
}


/*********** Check value is valid string or not **********/
function IsValidChar(val) {
	//var mikExp = /[$\\@\\\#%\^\&\*\(\)\[\]\+\_\{\}\`\~\=\|\!\?\;\'\"\,\.\/]/;
	var mikExp = /[$\\@\\\#%\^\&\*\[\]\+\_\{\}\`\~\=\|\!\?\;\'\"\,\.\/]/;
	var str = val;
	var strLength = str.length;
	
	for (a=1; a<=strLength; a++) {
		var lchar = val.charAt((strLength) - a);
		if(lchar.search(mikExp) == -1) {
		}
		else {
			return (0);
		}
	}
	return (1);
}

/*********Round up the number to have a specified number of decimal************/
function roundUp(val, numDec) {
	return (Math.round(val*Math.pow(10, numDec))/Math.pow(10, numDec));
}


/********Date Validation************************************/
/*
	example: mm/dd/yyyy
*/
function isDate(mmddyyyy) {
    var RegExPattern = /^(?=\d)(?:(?:(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})|(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))|(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2}))($|\ (?=\d)))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\ [AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;

    if ((mmddyyyy.match(RegExPattern)) && (mmddyyyy!='')) {
        return true;
    } else {
        return false;
    } 
}



/********* Trim ********************/
function Trim(TRIM_VALUE){
	if(TRIM_VALUE.length < 1){
		return"";
	}
	TRIM_VALUE = RTrim(TRIM_VALUE);
	TRIM_VALUE = LTrim(TRIM_VALUE);
	if(TRIM_VALUE==""){
		return "";
	}
	else{
		return TRIM_VALUE;
	}
}

function RTrim(VALUE){
	var w_space = String.fromCharCode(32);
	var v_length = VALUE.length;
	var strTemp = "";
	if(v_length < 0){
		return"";
	}
	var iTemp = v_length -1;

	while(iTemp > -1){
		if(VALUE.charAt(iTemp) == w_space){
		}
		else{
			strTemp = VALUE.substring(0,iTemp +1);
			break;
		}
		iTemp = iTemp-1;
	} //End While
	return strTemp;
} //End Function


function LTrim(VALUE){
	var w_space = String.fromCharCode(32);
	if(v_length < 1){
		return"";
	}
	var v_length = VALUE.length;
	var strTemp = "";

	var iTemp = 0;

	while(iTemp < v_length){
		if(VALUE.charAt(iTemp) == w_space){
		}
		else{
			strTemp = VALUE.substring(iTemp,v_length);
		break;
		}
		iTemp = iTemp + 1;
	} //End While
	return strTemp;
} //End Function


//**************************************************************************************************
// Set iFrame Height
//**************************************************************************************************
var getFFVersion=navigator.userAgent.substring(navigator.userAgent.indexOf("Firefox")).split("/")[1]   
  
//extra height in px to add to iframe in FireFox 1.0+ browsers   
  
var FFextraHeight=getFFVersion>=0.1? 16 : 0    
  
  
function dyniframesize(iframename) {   
  
  var pTar = null;   
  
  if (document.getElementById){   
  
    pTar = document.getElementById(iframename);   
  
  }   
  
  else{   
  
    eval('pTar = ' + iframename + ';');   
  
  }   
  
  if (pTar && !window.opera){   
  
    //begin resizing iframe   
  
    pTar.style.display="block"  
  
       
  
    if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){   
  
      //ns6 syntax   
  
      pTar.height = pTar.contentDocument.body.offsetHeight+FFextraHeight;    
  
    }   
  
    else if (pTar.Document && pTar.Document.body.scrollHeight){   
  
      //ie5+ syntax   
  
      pTar.height = pTar.Document.body.scrollHeight;   
  
    }   
  
  }   
  
}   
//***********************************************************************************************


/**
*
*  UTF-8 data encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var Utf8 = {
 
	// public method for url encoding
	encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// public method for url decoding
	decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}