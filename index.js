// JavaScript Document
var inputMode=0;
var modMode=0;
var modModeErrFlag=0;
var currentSecID = 0;
var currentSubSecID = 0;

/**********************************************

***********************************************/
function show_tt_comment(comment) {
	if (comment!="") {
		document.getElementById("tbl_tt_comment").style.display = "";
		document.getElementById("tbl_tt_summary").style.display = "none";
		document.getElementById("lbl_tt_comment").innerHTML = comment;
	}
	else {
		hide_tt_comment();	
	}
}

function hide_tt_comment() {
	if (document.getElementById("tbl_tt_comment").style.display != "none") {
		document.getElementById("lbl_tt_comment").innerHTML = "&nbsp;";
		document.getElementById("tbl_tt_comment").style.display = "none";
		document.getElementById("tbl_tt_summary").style.display = "";
	}
}


/**********************************************

**********************************************/
function countChar(textareaName,spanName, length) {  
	if (document.getElementById(textareaName).value.length > length) { // if too long...trim it!
		document.getElementById(textareaName).value = document.getElementById(textareaName).value.substring(0, length);
	}
	else { // otherwise, update 'characters left' counter 
		document.getElementById(spanName).innerHTML = length - document.getElementById(textareaName).value.length;
	}
}  


/**********************************************

***********************************************/
function selectText() {
	if (inputMode==0) {
		if (document.getElementById("sellAt").value!="") {
			document.getElementById("sellAt").select();
		}
		else {
			document.getElementById("buyAt").select();
		}
	}
	else {
		if (document.getElementById("lotSize2").value=="") {
			document.getElementById("lotSize2").select();
		}
		else if (document.getElementById("sellAt_1").value!="") {
			document.getElementById("sellAt_1").select();
		}
		else {
			document.getElementById("buyAt_1").select();
		}	
	}
}

/**********************************************

***********************************************/
function setDeposit() {
	var slSec = document.getElementById("slSec");
	var secInfo = returnSecInfo();
	var subSecID = getSubSecID();
	var secParam = getSecParam(secInfo, subSecID);

	if (secParam[5]>0) {
		document.getElementById("cbDeposit").disabled = false;
		document.getElementById("cbDeposit").checked = true;
	}
	else {
		document.getElementById("cbDeposit").checked = false;
		document.getElementById("cbDeposit").disabled = true;
	}
}



/*********************************************

**********************************************/
function aimsSearching(e) {
	var key = window.event ? e.keyCode : e.which;
	var element=e.srcElement || e.target;
	if (key==13) {
		window.location.href='http://aims.waylonchan.net/searching_result.php?searching_scode='+document.getElementById('txtSearchAims').value;
	}
}

/*********************************************

**********************************************/
function catchKeyPress(e) {
	var key = window.event ? e.keyCode : e.which;
	var element=e.srcElement || e.target;
	if (key==13) {
		switch (element.id) {
			case 'buyAt':
				document.getElementById("sellAt").select();
				break;
			case 'sellAt':
				document.getElementById("lotSize").select();
				break;
			case 'lotSize':
				document.getElementById("numHand").select();
				break;
			case 'numHand':
				document.getElementById("buyAt").select();
				break;
		}
	}
	else {
		showResult(0);
	}
}

/*********************************************

**********************************************/
function catchKeyPress2(e) {
	var key = window.event ? e.keyCode : e.which;
	var element=e.srcElement || e.target;
	if (key==13) {
		switch (element.id) {
			case 'lotSize2':
				document.getElementById("buyAt_1").select();
				break;
			case 'buyAt_1':
				document.getElementById("buyNumHand_1").select();
				break;
			case 'buyAt_2':
				document.getElementById("buyNumHand_2").select();
				break;
			case 'buyAt_3':
				document.getElementById("buyNumHand_3").select();
				break;
			case 'buyAt_4':
				document.getElementById("buyNumHand_4").select();
				break;
			case 'buyAt_5':
				document.getElementById("buyNumHand_5").select();
				break;
			case 'buyNumHand_1':
				document.getElementById("sellAt_1").select();
				break;
			case 'buyNumHand_2':
				document.getElementById("sellAt_2").select();
				break;
			case 'buyNumHand_3':
				document.getElementById("sellAt_3").select();
				break;
			case 'buyNumHand_4':
				document.getElementById("sellAt_4").select();
				break;
			case 'buyNumHand_5':
				document.getElementById("sellAt_5").select();
				break;
			case 'sellAt_1':
				document.getElementById("sellNumHand_1").select();
				break;
			case 'sellAt_2':
				document.getElementById("sellNumHand_2").select();
				break;
			case 'sellAt_3':
				document.getElementById("sellNumHand_3").select();
				break;
			case 'sellAt_4':
				document.getElementById("sellNumHand_4").select();
				break;
			case 'sellAt_5':
				document.getElementById("sellNumHand_5").select();
				break;
			case 'sellNumHand_1':
				document.getElementById("buyAt_2").select();
				break;
			case 'sellNumHand_2':
				document.getElementById("buyAt_3").select();
				break;
			case 'sellNumHand_3':
				document.getElementById("buyAt_4").select();
				break;
			case 'sellNumHand_4':
				document.getElementById("buyAt_5").select();
				break;
			case 'sellNumHand_5':
				document.getElementById("lotSize2").select();
				break;
		}
	}
	else {
		showResult(1);
	}
}


/*********************************************
Auto increment functon
**********************************************/
function autoIncrement(target, isAdd) {
	var val = parseFloat(target.value);
	
	if (target.id=="numHand") {
		if (!isNaN(val) && val>=0 && isAdd) {
			//val = Math.round(floatAdd(val, priceInterval(val))*1000)/1000;
			val = Math.round(val + 1);
			target.value = val;
		}
		else if (!isNaN(val) && val>0 && !isAdd) {
			//val = Math.round(floatAdd(val, (priceInterval(val)*-1))*1000)/1000;
			val = Math.round(val - 1);
			target.value = val;	
		}
		else {
			target.value = 0;
		}		
	}
	else {
		if (!isNaN(val) && val>=0 && isAdd) {
			//val = Math.round(floatAdd(val, priceInterval(val))*1000)/1000;
			val = Math.round((val + priceInterval(val, isAdd))*1000)/1000;
			target.value = val;
		}
		else if (!isNaN(val) && val>0 && !isAdd) {
			//val = Math.round(floatAdd(val, (priceInterval(val)*-1))*1000)/1000;
			val = Math.round((val - priceInterval(val, isAdd))*1000)/1000;
			target.value = val;	
		}
		else {
			target.value = 0;
		}
	}
	
	if (inputMode==0) {
		showResult(0);
	}
			
	if (inputMode==1) {
		showResult(1);
	}
	target.select();
}

//價位表
function priceInterval(price, isAdd) {
	if (isAdd) {
		if (price>=0 && price<0.25) {
			return 0.001;
		}
		else if (price>=0.25 && price<0.5) {
			return 0.005;
		}
		else if (price>=0.5 && price<10) {
			return 0.01;
		}
		else if (price>=10 && price<20) {
			return 0.02;
		}
		else if (price>=20 && price<100) {
			return 0.05;
		}
		else if (price>=100 && price<200) {
			return 0.1;
		}
		else if (price>=200 && price<500) {
			return 0.2;
		}
		else if (price>=500 && price<1000) {
			return 0.5;
		}
		else if (price>=1000 && price<2000) {
			return 1;
		}
		else {
			return 10;
		}
	}
	else {
		if (price>=0 && price<=0.25) {
			return 0.001;
		}
		else if (price>0.25 && price<=0.5) {
			return 0.005;
		}
		else if (price>0.5 && price<=10) {
			return 0.01;
		}
		else if (price>10 && price<=20) {
			return 0.02;
		}
		else if (price>20 && price<=100) {
			return 0.05;
		}
		else if (price>100 && price<=200) {
			return 0.1;
		}
		else if (price>200 && price<=500) {
			return 0.2;
		}
		else if (price>500 && price<=1000) {
			return 0.5;
		}
		else if (price>1000 && price<=2000) {
			return 1;
		}
		else {
			return 10;
		}		
	}
}


/*********************************************

**********************************************/
function showDivAddTransItems() {
	document.getElementById('yrFrm_Trans').style.visibility="visible";
	document.getElementById('monFrm_Trans').style.visibility="visible";
	document.getElementById('dayFrm_Trans').style.visibility="visible";
	
	if (inputMode==0) {
		document.getElementById('txtStockCode_Trans').value=document.getElementById('hdStockCode').value;
		document.getElementById('txtShare_Trans').value=document.getElementById('hdTotalShare').value;
		document.getElementById('txtBuyAt_Trans').value=document.getElementById('buyAt').value;
		document.getElementById('txtSellAt_Trans').value=document.getElementById('sellAt').value;
	}
	
	if (inputMode==1) {
		document.getElementById('txtStockCode_Trans').value=document.getElementById('hdStockCode').value;
		document.getElementById('txtShare_Trans').value=document.getElementById('hdTotalShare2').value;
		document.getElementById('txtBuyAt_Trans').value=document.getElementById('hdAvgBuy').value;
		document.getElementById('txtSellAt_Trans').value=document.getElementById('hdAvgSell').value;	
	}

	if (document.getElementById('tbResult2').style.display=="none") {
		document.getElementById('txtBuyFee_Trans').value = document.getElementById('hdBuyCost').value;
		document.getElementById('txtSellFee_Trans').value = document.getElementById('hdSellCost').value;
	}
	else {
		document.getElementById('txtBuyFee_Trans').value = document.getElementById('hdBuyCost2').value;
		document.getElementById('txtSellFee_Trans').value = document.getElementById('hdSellCost2').value;
	}
	
	document.getElementById('txtStockCode_Trans').select();
}


/*********************************************
Add transaction
**********************************************/
function add_trans() {
	var err = 0;
	var img = "&nbsp;&nbsp;<img src=\"images\/error.gif\" alt=\"錯誤\" width=\"16\" height=\"16\" border=\"0\" align=\"absmiddle\" \/>";
	var img2 = "&nbsp;&nbsp;<img src=\"images\/correct.png\" alt=\"正確\" width=\"16\" height=\"16\" border=\"0\" align=\"absmiddle\" \/>";
	
	document.getElementById("divAddTrans_lblDateErr").innerHTML = img2;
	document.getElementById("divAddTrans_lblCodeErr").innerHTML = img2;
	document.getElementById("divAddTrans_lblShareErr").innerHTML = img2;
	document.getElementById("divAddTrans_lblBuyErr").innerHTML = img2;
	document.getElementById("divAddTrans_lblSellErr").innerHTML = img2;
	document.getElementById("divAddTrans_lblBuyFeeErr").innerHTML = img2;
	document.getElementById("divAddTrans_lblSellFeeErr").innerHTML = img2;
		
		
	if (!isDate(document.getElementById('monFrm_Trans').options[document.getElementById('monFrm_Trans').selectedIndex].value+"/"+document.getElementById('dayFrm_Trans').options[document.getElementById('dayFrm_Trans').selectedIndex].value+"/"+document.getElementById('yrFrm_Trans').options[document.getElementById('yrFrm_Trans').selectedIndex].value)) {
		err++;
		document.getElementById("divAddTrans_lblDateErr").innerHTML = img; //日期不正確;
	}
		
	if(!isInt(document.getElementById('txtStockCode_Trans').value)) {
		err++;
		document.getElementById("divAddTrans_lblCodeErr").innerHTML = img;
	}
	else {
		if (parseInt(document.getElementById('txtStockCode_Trans').value, 10)<=0) {
			document.getElementById("divAddTrans_lblCodeErr").innerHTML = img;
			err++;
		}
	}

	if(!isInt(document.getElementById('txtShare_Trans').value)) {
		err++;
		document.getElementById("divAddTrans_lblShareErr").innerHTML = img;
	}
	else {
		if (parseInt(document.getElementById('txtShare_Trans').value)<=0) {
			err++;
			document.getElementById("divAddTrans_lblShareErr").innerHTML = img;
		}
	}

	if(isNaN(document.getElementById('txtBuyAt_Trans').value) || Trim(document.getElementById('txtBuyAt_Trans').value)=="") {
		err++;
		document.getElementById("divAddTrans_lblBuyErr").innerHTML = img;
	}
	else {
		if (parseFloat(document.getElementById('txtBuyAt_Trans').value)<=0) {
			err++;
			document.getElementById("divAddTrans_lblBuyErr").innerHTML = img+" 必須大於0";
		}
	}

	if(isNaN(document.getElementById('txtSellAt_Trans').value) || Trim(document.getElementById('txtSellAt_Trans').value)=="") {
		err++;
		document.getElementById("divAddTrans_lblSellErr").innerHTML = img;
	}
	else {
		if (parseFloat(document.getElementById('txtSellAt_Trans').value)<0) {
			err++;
			document.getElementById("divAddTrans_lblSellErr").innerHTML = img+" 不能是負數";
		}
	}

	if(isNaN(document.getElementById('txtBuyFee_Trans').value) || Trim(document.getElementById('txtBuyFee_Trans').value)=="") {
		err++;
		document.getElementById("divAddTrans_lblBuyFeeErr").innerHTML = img;
	}
	else {
		if (parseFloat(document.getElementById('txtBuyFee_Trans').value)<0) {
			err++;
			document.getElementById("divAddTrans_lblBuyFeeErr").innerHTML = img+"不能是負數";
		}
	}

	if(isNaN(document.getElementById('txtSellFee_Trans').value) || Trim(document.getElementById('txtSellFee_Trans').value)=="") {
		err++;
		document.getElementById("divAddTrans_lblSellFeeErr").innerHTML = img;
	}
	else {
		if (parseFloat(document.getElementById('txtSellFee_Trans').value)<0) {
			err++;
			document.getElementById("divAddTrans_lblSellFeeErr").innerHTML = img+"不能是負數";
		}
	}
		
		
	if (err==0) {
		window.location = "record.php?txtCode="+document.getElementById('txtStockCode_Trans').value
									+"&txtShare="+document.getElementById('txtShare_Trans').value
									+"&txtBuy="+document.getElementById('txtBuyAt_Trans').value
									+"&txtSell="+document.getElementById('txtSellAt_Trans').value
									+"&txtBuyFee="+document.getElementById('txtBuyFee_Trans').value
									+"&txtSellFee="+document.getElementById('txtSellFee_Trans').value
									+"&txtDate="+document.getElementById('yrFrm_Trans').options[document.getElementById('yrFrm_Trans').selectedIndex].value+"-"+document.getElementById('monFrm_Trans').options[document.getElementById('monFrm_Trans').selectedIndex].value+"-"+document.getElementById('dayFrm_Trans').options[document.getElementById('dayFrm_Trans').selectedIndex].value;
	}
}


/*********************************************

**********************************************/
function prev_rdSubSec() {
	var secInfo = returnSecInfo();
	
	if (secInfo[secInfo.length-1][1]==999999) {
		if(document.getElementById('slSec').selectedIndex==0) {
			document.getElementById('slSec').options[document.getElementById('slSec').options.length-2].selected=true;
		}
		else {
			document.getElementById('slSec').options[document.getElementById('slSec').selectedIndex-1].selected=true;
		}
	}
	else {
		if(document.getElementById('slSec').selectedIndex==0) {
			document.getElementById('slSec').options[document.getElementById('slSec').options.length-1].selected=true;
		}
		else {
			document.getElementById('slSec').options[document.getElementById('slSec').selectedIndex-1].selected=true;
		}	
	}
	
	change_rdSubSec(document.getElementById('slSec').options[document.getElementById('slSec').selectedIndex].value); 
	setDeposit();
	showResult(inputMode); 
	showSecInfo();
}


/*********************************************

**********************************************/
function next_rdSubSec() {
	var secInfo = returnSecInfo();
	
	if (secInfo[secInfo.length-1][1]==999999) {
		if(document.getElementById('slSec').selectedIndex>=document.getElementById('slSec').options.length-2) {
			document.getElementById('slSec').options[0].selected=true;
		}
		else {
			document.getElementById('slSec').options[document.getElementById('slSec').selectedIndex+1].selected=true;
		}
	}
	else {
		if(document.getElementById('slSec').selectedIndex==document.getElementById('slSec').options.length-1) {
			document.getElementById('slSec').options[0].selected=true;
		}
		else {
			document.getElementById('slSec').options[document.getElementById('slSec').selectedIndex+1].selected=true;
		}	
	}
	
	change_rdSubSec(document.getElementById('slSec').options[document.getElementById('slSec').selectedIndex].value); 
	setDeposit();
	showResult(inputMode); 
	showSecInfo();
}


/*********************************************
Show edit tt button
modaldbox.js
always_on_top.js
*********************************************/
function editTT(offset) {
	if (document.getElementById('hdEditTT').value==0) {
		for (var i=1; i<=offset; i++) {
			document.getElementById('imgModTT_'+i).style.display="";
			document.getElementById('imgDelTT_'+i).style.display="";
			document.getElementById('imgEditTT').src="images/btnSettingClose.png";
			document.getElementById('hdEditTT').value=1;
		}
	}
	else {
		for (var i=1; i<=offset; i++) {
			document.getElementById('imgModTT_'+i).style.display="none";
			document.getElementById('imgDelTT_'+i).style.display="none";
			document.getElementById('imgEditTT').src="images/btnSetting.png";
			document.getElementById('hdEditTT').value=0;
			modMode=0;
			hideIt();
			if (inputMode==0) {
				showResult(0);
			}
			
			if (inputMode==1) {
				showResult(1);
			}
		}
	}
}


/*********************************************
MUST WITH
modaldbox.js
always_on_top.js
**********************************************/
function checkMod() {
	modModeErrFlag=1;
	if (modMode==0) {
		showIt();
		modMode=1;
		
		if (inputMode==0) {
			showResult(0);
		}
		
		if (inputMode==1) {
			showResult(1);
		}
	}
	else {
		alert("在修改模式下，當你選取了其中一筆暫存資料後，你便不能選擇另一筆暫存資料。");
	}
}


/********************************************
MUST WITH
modaldbox.js
always_on_top.js
**********************************************/
function checkDel(tt_id) {
	if (modMode==0 && tt_id>0) {
		sm('divDelTT',300,130);
		document.getElementById('hdTTID').value = tt_id;
	}
	else {
		alert("在修改模式下，當你選取了其中一筆暫存資料後，你便不能選擇另一筆暫存資料。");
		modModeErrFlag=1;
	}
}


/*********************************************

**********************************************/
function newly_question() {
	var xmlhttp;
	var queryString;
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
  	}
	else {
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}

	xmlhttp.onreadystatechange=function() {
		switch(xmlhttp.readyState) {
			case 4:
				if (xmlhttp.status == 200) {
					document.getElementById("newly_question").innerHTML=xmlhttp.responseText;
				}
				else {
					document.getElementById("newly_question").innerHTML="An error occured. Please try again.";
				}
				break;
			default:
				document.getElementById("newly_question").innerHTML="&#36039;&#26009;&#35712;&#21462;&#20013;...";
  		}
		
	}

	xmlhttp.open("GET","newly_question.php",true);
	xmlhttp.send(null);	
}


/*********************************************
Pass divDelTT data to del_tt.php 
**********************************************/
function del_tt(tt_id) {
	var xmlhttp;
	var queryString;
	var tt_id = document.getElementById('hdTTID').value;
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
  	}
	else {
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	
	queryString = "tt_id="+tt_id;

	xmlhttp.onreadystatechange=function() {
		switch(xmlhttp.readyState) {
			case 4:
				if (xmlhttp.status == 200) {
					//document.getElementById("test").innerHTML=xmlhttp.responseText;
				}
				else {
					//document.getElementById("test").innerHTML="An error occured. Please try again.";
				}
				break;
			default:
				//document.getElementById("test").innerHTML="&#36039;&#26009;&#35712;&#21462;&#20013;...";
  		}
		
	}

	xmlhttp.open("GET","del_tt.php?"+queryString,true);
	xmlhttp.send(null);	
	
	show_tt_table();
}


/*********************************************
Pass divModTT data to mod_tt.php 
**********************************************/
function mod_tt() {
	var xmlhttp;
	var queryString;
	var tt_id = document.getElementById('hdTTID').value;
	var stock_code = document.getElementById('txtStockCode_TT2').value;
	var input_mode = document.getElementById('hdInputMode2').value;
	var input_data = document.getElementById('hdInputData2').value;
	var param = document.getElementById('hdParam2').value;
	var sub_sec_id = document.getElementById('hdSubSecID2').value;
	var self_sec_id = document.getElementById('hdSelfSecID2').value;
	var buy_amt = document.getElementById('hdBuyAmt2').value;
	var sell_amt = document.getElementById('hdSellAmt2').value;
	var trans_cost = document.getElementById('hdTransCost2').value;
	var net_profit = document.getElementById('hdNetProfit2').value;
	var comment = encodeURIComponent(Trim(document.getElementById('txtA_comment_TT2').value));
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
  	}
	else {
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	
	queryString = "tt_id="+tt_id+"&input_mode="+input_mode+"&input_data="+input_data+"&param="+param+"&sub_sec_id="+sub_sec_id+"&self_sec_id="+self_sec_id+"&buy_amt="+buy_amt+"&sell_amt="+sell_amt+"&trans_cost="+trans_cost+"&net_profit="+net_profit+"&comment="+comment;

	xmlhttp.onreadystatechange=function() {
		switch(xmlhttp.readyState) {
			case 4:
				if (xmlhttp.status == 200) {
					//document.getElementById("test").innerHTML=xmlhttp.responseText;
				}
				else {
					//document.getElementById("test").innerHTML="An error occured. Please try again.";
				}
				break;
			default:
				//document.getElementById("test").innerHTML="&#36039;&#26009;&#35712;&#21462;&#20013;...";
  		}
		
	}

	xmlhttp.open("GET","mod_tt.php?"+queryString,true);
	xmlhttp.send(null);	
	
	show_tt_table();

	cancelMod();
}


/*********************************************
Cancel mod mode
**********************************************/
function cancelMod() {
	modMode=0;
	hideIt();

	if (inputMode==0) {
		showResult(0);
	}
	
	if (inputMode==1) {
		showResult(1);
	}
}

/*********************************************
Hide tt summary
**********************************************/
function hide_tt_summary() {
	var xmlhttp;
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
  	}
	else {
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	

	xmlhttp.onreadystatechange=function() {
		switch(xmlhttp.readyState) {
			case 4:
				if (xmlhttp.status == 200) {
					//document.getElementById("test").innerHTML=xmlhttp.responseText;
				}
				else {
					//document.getElementById("test").innerHTML="An error occured. Please try again.";
				}
				break;
			default:
				//document.getElementById("test").innerHTML="&#36039;&#26009;&#35712;&#21462;&#20013;...";
  		}
		
	}

	xmlhttp.open("GET","hide_tt_summary.php");
	xmlhttp.send(null);	
	
	show_tt_table();
}


/*********************************************
Pass divAddTT data to add_tt.php 
**********************************************/
function add_tt() {
	var xmlhttp;
	var queryString;
	var stock_code = document.getElementById('txtStockCode_TT').value;
	var input_mode = document.getElementById('hdInputMode').value;
	var input_data = document.getElementById('hdInputData').value;
	var param = document.getElementById('hdParam').value;
	var sub_sec_id = document.getElementById('hdSubSecID').value;
	var self_sec_id = document.getElementById('hdSelfSecID').value;
	var buy_amt = document.getElementById('hdBuyAmt').value;
	var sell_amt = document.getElementById('hdSellAmt').value;
	var trans_cost = document.getElementById('hdTransCost').value;
	var net_profit = document.getElementById('hdNetProfit').value;
	var comment = encodeURIComponent(Trim(document.getElementById('txtA_comment_TT').value));
	
	var err = 0;
	var img = "&nbsp;&nbsp;<img src=\"images\/error.gif\" alt=\"錯誤\" width=\"16\" height=\"16\" border=\"0\" align=\"absmiddle\" \/>";
	var img2 = "&nbsp;&nbsp;<img src=\"images\/correct.png\" alt=\"正確\" width=\"16\" height=\"16\" border=\"0\" align=\"absmiddle\" \/>";
	
	document.getElementById("divAddTT_lblCodeErr").innerHTML = img2;

		
	if(!isInt(document.getElementById('txtStockCode_TT').value)) {
		err++;
		document.getElementById("divAddTT_lblCodeErr").innerHTML = img;
	}
	else {
		if (parseInt(document.getElementById('txtStockCode_TT').value, 10)<=0) {
			document.getElementById("divAddTT_lblCodeErr").innerHTML = img;
			err++;
		}
	}
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
  	}
	else {
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	
	queryString = "stock_code="+stock_code+"&input_mode="+input_mode+"&input_data="+input_data+"&param="+param+"&sub_sec_id="+sub_sec_id+"&self_sec_id="+self_sec_id+"&buy_amt="+buy_amt+"&sell_amt="+sell_amt+"&trans_cost="+trans_cost+"&net_profit="+net_profit+"&comment="+comment;

	xmlhttp.onreadystatechange=function() {
		switch(xmlhttp.readyState) {
			case 4:
				if (xmlhttp.status == 200) {
					//document.getElementById("test").innerHTML=xmlhttp.responseText;
				}
				else {
					//document.getElementById("test").innerHTML="An error occured. Please try again.";
				}
				break;
			default:
				//document.getElementById("test").innerHTML="&#36039;&#26009;&#35712;&#21462;&#20013;...";
  		}
		
	}

	if (err==0) {
		xmlhttp.open("GET","add_tt.php?"+queryString,true);
		xmlhttp.send(null);	
		
		show_tt_table();
		hm('divAddTT');
	}
	else {
		document.getElementById('txtStockCode_TT').select();
	}
}


/*********************************************
Show TT table
**********************************************/
function show_tt_table() {
	var xmlhttp;
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
  	}
	else {
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}

	xmlhttp.onreadystatechange=function() {
		switch(xmlhttp.readyState) {
			case 4:
				if (xmlhttp.status == 200) {
					document.getElementById("lbl_tt_table").innerHTML=xmlhttp.responseText;
				}
				else {
					document.getElementById("lbl_tt_table").innerHTML="<table id=\"tbWatching\" width=\"98%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><th>資料暫存表<\/th><\/tr><tr><td align=\"center\" style=\"color:#FF0000;\"><img src=\"images/progressing.gif\" alt=\"更新中\" width=\"20\" height=\"20\" align=\"absmiddle\"> 發生錯誤！<\/td><\/tr><\/table><table width=\"98%\"border=\"0\"cellpadding=\"0\"cellspacing=\"0\"bgcolor=\"#E9EBED\"style=\"padding:1px 2px 1px 2px;\"><tr><td align=\"left\" style=\"color:#474F74;\" height=60>連線可能出現錯誤，請嘗試重新載入整個網頁<\/td><\/tr><\/table>";
				}
				break;
			default:
				document.getElementById("lbl_tt_table").innerHTML="<table id=\"tbWatching\" width=\"98%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><th>資料暫存表<\/th><\/tr><tr><td align=\"center\"><img src=\"images/progressing.gif\" alt=\"更新中\" width=\"20\" height=\"20\" align=\"absmiddle\"> 取得資料中...<\/td><\/tr><\/table><table width=\"98%\"border=\"0\"cellpadding=\"0\"cellspacing=\"0\"bgcolor=\"#E9EBED\"style=\"padding:1px 2px 1px 2px;\"><tr><td align=\"left\" style=\"color:#474F74;\" height=60>如果數秒內仍未取得資料，請嘗試重新載入整個網頁。<\/td><\/tr><\/table>";
  		}
		
	}

	xmlhttp.open("GET","tt_table.php",true);
	xmlhttp.send(null);
}


/*********************************************
Fetch data into divModTT
**********************************************/
function fetchData_divModTT() {	
	document.getElementById('hdInputData2').value = getInputData();
	document.getElementById('hdParam2').value = getParam();
	if (document.getElementById('slSec').options[document.getElementById('slSec').selectedIndex].value == "999") {
		document.getElementById('hdSelfSecID2').value = getSubSecID();
		document.getElementById('hdSubSecID2').value = 0;
	}
	else {
		document.getElementById('hdSubSecID2').value = getSubSecID();
		document.getElementById('hdSelfSecID2').value = 0;
	}
	document.getElementById('hdInputMode2').value = inputMode;
	document.getElementById('txtStockCode_TT2').value =document.getElementById('hdStockCode').value;
	document.getElementById('txtA_comment_TT2').value = document.getElementById('hdComment').value;
	
	if (document.getElementById('tbResult2').style.display=="none") {
		document.getElementById('hdBuyAmt2').value = document.getElementById('hdBuyAmount').value;
		document.getElementById('hdSellAmt2').value = document.getElementById('hdSellAmount').value;
		document.getElementById('hdTransCost2').value = document.getElementById('hdTotalCost').value;
		document.getElementById('hdNetProfit2').value = document.getElementById('hdBalence').value;
	}
	else {
		document.getElementById('hdBuyAmt2').value = document.getElementById('hdBuyAmount2').value;
		document.getElementById('hdSellAmt2').value = document.getElementById('hdSellAmount2').value;
		document.getElementById('hdTransCost2').value = document.getElementById('hdTotalCost2').value;
		document.getElementById('hdNetProfit2').value = document.getElementById('hdBalence2').value;
	}
}

/*********************************************
Fetch data into divAddTT
**********************************************/
function fetchData_divAddTT() {	
	document.getElementById('hdInputData').value = getInputData();
	document.getElementById('hdParam').value = getParam();
	if (document.getElementById('slSec').options[document.getElementById('slSec').selectedIndex].value == "999") {
		document.getElementById('hdSelfSecID').value = getSubSecID();
		document.getElementById('hdSubSecID').value = 0;
	}
	else {
		document.getElementById('hdSubSecID').value = getSubSecID();
		document.getElementById('hdSelfSecID').value = 0;
	}
	
	document.getElementById('hdInputMode').value = inputMode;
	
	if (document.getElementById('tbResult2').style.display=="none") {
		document.getElementById('hdBuyAmt').value = document.getElementById('hdBuyAmount').value;
		document.getElementById('hdSellAmt').value = document.getElementById('hdSellAmount').value;
		document.getElementById('hdTransCost').value = document.getElementById('hdTotalCost').value;
		document.getElementById('hdNetProfit').value = document.getElementById('hdBalence').value;
	}
	else {
		document.getElementById('hdBuyAmt').value = document.getElementById('hdBuyAmount2').value;
		document.getElementById('hdSellAmt').value = document.getElementById('hdSellAmount2').value;
		document.getElementById('hdTransCost').value = document.getElementById('hdTotalCost2').value;
		document.getElementById('hdNetProfit').value = document.getElementById('hdBalence2').value;
	}
}


/*********************************************
Get Input data
**********************************************/
function getInputData() {
	var input_data="";
	var i, x;
	
	if (inputMode==1) {
		for (i=1; i<=5; i++) {
			if (i==1) {
				input_data = Trim(document.getElementById('buyAt_1').value);
			}
			else {
				input_data = input_data+","+Trim(document.getElementById('buyAt_'+i).value);
			}
			input_data = input_data+","+Trim(document.getElementById('lotSize2').value);
			input_data = input_data+","+Trim(document.getElementById('buyNumHand_'+i).value);
			input_data = input_data+","+Trim(document.getElementById('sellAt_'+i).value);
			input_data = input_data+","+Trim(document.getElementById('lotSize2').value);
			input_data = input_data+","+Trim(document.getElementById('sellNumHand_'+i).value);
		}
	}
	
	if (inputMode==0) {
		input_data = Trim(document.getElementById('buyAt').value);
		input_data = input_data+","+Trim(document.getElementById('sellAt').value);
		input_data = input_data+","+Trim(document.getElementById('lotSize').value);
		input_data = input_data+","+Trim(document.getElementById('numHand').value);
	}
	
	return input_data;
}

/*********************************************
Get Param
**********************************************/
function getParam() {
	var param="";
	var strWarrant = "0";
	var strDeposit = "0";
	var strSellRef = "0";
	
	if (inputMode==1) {
		if (document.getElementById('cbWarrant2').checked) {
			strWarrant = "1";
		}
		if (document.getElementById('cbDeposit2').checked) {
			strDeposit = "1";
		}
		if (document.getElementById('cbSellAtRef2').checked) {
			strSellRef = "1";
		}
		
		param = strWarrant+','+strDeposit+','+strSellRef+','+Trim(document.getElementById('sellAtRef2').value);
	}
	
	if (inputMode==0) {
		if (document.getElementById('cbWarrant').checked) {
			strWarrant = "1";
		}
		if (document.getElementById('cbDeposit').checked) {
			strDeposit = "1";
		}
		if (document.getElementById('cbSellAtRef').checked) {
			strSellRef = "1";
		}
		
		param = strWarrant+','+strDeposit+','+strSellRef+','+Trim(document.getElementById('sellAtRef').value);
	}
	
	return param;
}

/*********************************************
Push transient_transaction input data into input panel
**********************************************/
function pushData(input_data, param, input_mode, sub_sec_id, self_sec_id, tt_id, stock_code,comment) {	
	var arrData = input_data.split(',');
	var arrParam = param.split(',');
	var buyAt = new Array();
	var sellAt = new Array();
	var buyLotSize = new Array();
	var sellLotSize = new Array();
	var buyNumHand = new Array();
	var sellNumHand = new Array();
	var i,x;
	
	if (modMode>0) {
		if (modModeErrFlag>0) {
			modModeErrFlag=0;
		}
		else {
			alert("在修改模式下，當你選取了其中一筆暫存資料後，你便不能選擇另一筆暫存資料。");
		}
		return;
	}
	
	selectSec(sub_sec_id, self_sec_id);
	
	if (inputMode!=input_mode) {
		changeInputMode();
	}
	
	document.getElementById('hdTTID').value=tt_id;
	document.getElementById('hdStockCode').value=stock_code;
	document.getElementById('hdComment').value=comment;
	
	if (input_mode==0 && arrData.length==4 && arrParam.length==4) {
		buyAt[0] = arrData[0];
		sellAt[0] = arrData[1];
		buyLotSize[0] = arrData[2];
		buyNumHand[0] = arrData[3];
		
		document.getElementById('buyAt').value = buyAt[0];
		document.getElementById('sellAt').value = sellAt[0];
		document.getElementById('lotSize').value = buyLotSize[0];
		document.getElementById('numHand').value = buyNumHand[0];
		
		if (arrParam[0]==1) {
			document.getElementById('cbWarrant').checked = true;
		}
		else {
			document.getElementById('cbWarrant').checked = false;
		}

		if (arrParam[1]==1) {
			document.getElementById('cbDeposit').checked = true;
		}
		else {
			document.getElementById('cbDeposit').checked = false;
		}

		if (arrParam[2]==1) {
			document.getElementById('cbSellAtRef').checked = true;
			document.getElementById('sellAtRef').disabled = false;
			document.getElementById('sellAtRef').value = arrParam[3];
		}
		else {
			document.getElementById('cbSellAtRef').checked = false;
			document.getElementById('sellAtRef').disabled = true;
			document.getElementById('sellAtRef').value = "";
		}
		
		showResult(0);
	}
	
	if (input_mode==1 && arrData.length==30 && arrParam.length==4) {
		for (i=0, x=0; i<arrData.length; i+=6, x++) {
			buyAt[x] = arrData[i];
			buyLotSize[x] = arrData[i+1];
			buyNumHand[x] = arrData[i+2];
			sellAt[x] = arrData[i+3];
			sellLotSize[x] = arrData[i+4];
			sellNumHand[x] = arrData[i+5];

			document.getElementById('lotSize2').value = buyLotSize[0];
			document.getElementById('buyAt_'+(x+1)).value = buyAt[x];
			document.getElementById('sellAt_'+(x+1)).value = sellAt[x];
			document.getElementById('buyNumHand_'+(x+1)).value = buyNumHand[x];
			document.getElementById('sellNumHand_'+(x+1)).value = sellNumHand[x];
		}
		
		if (arrParam[0]==1) {
			document.getElementById('cbWarrant2').checked = true;
		}
		else {
			document.getElementById('cbWarrant2').checked = false;
		}

		if (arrParam[1]==1) {
			document.getElementById('cbDeposit2').checked = true;
		}
		else {
			document.getElementById('cbDeposit2').checked = false;
		}

		if (arrParam[2]==1) {
			document.getElementById('cbSellAtRef2').checked = true;
			document.getElementById('sellAtRef2').disabled = false;
			document.getElementById('sellAtRef2').value = arrParam[3];
		}
		else {
			document.getElementById('cbSellAtRef2').checked = false;
			document.getElementById('sellAtRef2').disabled = true;
			document.getElementById('sellAtRef2').value = "";
		}

		showResult(1);
	}
}


/*********************************************
Show aims intro
**********************************************/
function showAimsIntro() {
	var xmlhttp;
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
  	}
	else {
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}

	xmlhttp.onreadystatechange=function() {
		switch(xmlhttp.readyState) {
			case 4:
				document.getElementById("lblAims").innerHTML=xmlhttp.responseText;
				break;
			default:
				document.getElementById("lblAims").innerHTML="&#36039;&#26009;&#35712;&#21462;&#20013;...";
  		}
		
	}

	xmlhttp.open("GET","getAimsIntro.php",true);
	xmlhttp.send(null);
}

/*********************************************
Show signs intro
**********************************************/
function showSignsIntro() {
	var xmlhttp;
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
  	}
	else {
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}

	xmlhttp.onreadystatechange=function() {
		switch(xmlhttp.readyState) {
			case 4:
				if (xmlhttp.status == 200) {
					document.getElementById("lblSigns").innerHTML=xmlhttp.responseText;
				}
				else {
					document.getElementById("lblSigns").innerHTML="An error occured. Please try again.";
				}
				break;
			default:
				document.getElementById("lblSigns").innerHTML="&#36039;&#26009;&#35712;&#21462;&#20013;...";
  		}
		
	}

	xmlhttp.open("GET","getSignsIntro.php",true);
	xmlhttp.send(null);
}

/*********************************************
Show securities info
**********************************************/
function showSecInfo() {
	var xmlhttp;
	var secID;
	var subSecID;

	secID = document.getElementById("slSec").options[document.getElementById("slSec").selectedIndex].value;
	subSecID = getSubSecID();
	
	if (currentSecID==secID && currentSubSecID==subSecID) {
		return;
	}
	else {
		currentSubSecID=subSecID;
		currentSecID=secID;
	}
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
  	}
	else {
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}

	xmlhttp.onreadystatechange=function() {
		switch(xmlhttp.readyState) {
			case 4:
				if (xmlhttp.status == 200) {
					document.getElementById("lblSecInfo").innerHTML=xmlhttp.responseText;
				}
				else {
					document.getElementById("lblSecInfo").innerHTML="<table width=\"98%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td bgcolor=\"#FFCC33\" style=\"padding:4px 4px 4px 4px; color:#993300\" align=\"center\">An error occured. Please try again.<\/td><\/tr><\/table>";
				}
				break;
			default:
				document.getElementById("lblSecInfo").innerHTML="<table width=\"99%\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\" style=\"color:#333333\"><tr><td height=\"30\" align=\"left\" bgcolor=\"#BFBFFF\">&nbsp;<\/td><\/tr><tr><td height=\"120\" align=\"center\" valign=\"middle\" bgcolor=\"#E8E8E8\"><img src=\"images\/progressing.gif\" width=\"20\" height=\"20\" align=\"absmiddle\" \/> 取得券商資料中......<p>( 如未能在數秒內顯示有關資料，請重新載入本網站 )<\/p><\/td><\/tr><tr><td height=\"30\" align=\"left\" bgcolor=\"#D7D7FF\" style=\"color:#666666\">&nbsp;<\/td><\/tr><\/table>";
  		}
		
	}

	xmlhttp.open("GET","getSecInfo.php?secID="+secID+"&subSecID="+subSecID,true);
	xmlhttp.send(null);
}

/*********************************************
Change rdSubSec
**********************************************/
function change_rdSubSec(secID) {
	var secInfo = returnSecInfo();
	var subSecInfo=new Array();
	var numSubSec=0;
	var i;
	
	document.getElementById('rdSubSec1').style.display="none";
	document.getElementById('rdSubSec2').style.display="none";
	document.getElementById('rdSubSec3').style.display="none";
	
	document.getElementById('lblSubSec1').innerHTML = "&nbsp;";
	document.getElementById('lblSubSec2').innerHTML = "&nbsp;";
	document.getElementById('lblSubSec3').innerHTML = "&nbsp;";
	
	for (i=0; i<secInfo.length; i++) {
		if (secInfo[i][0]==secID) {			
			subSecInfo[numSubSec] = new Array(2);
			subSecInfo[numSubSec][0] = secInfo[i][1];	//sub_sec_id
			subSecInfo[numSubSec][1] = secInfo[i][2];	//sub_sec_name
			numSubSec++;
		}
	}
	
	
	for (i=1; i<=numSubSec; i++) {
		document.getElementById('rdSubSec'+i).style.display="";
		document.getElementById('rdSubSec'+i).value = subSecInfo[i-1][0];
		document.getElementById('lblSubSec'+i).innerHTML = subSecInfo[i-1][1];
		if (i==1) {
			document.getElementById('rdSubSec'+i).checked=true;
		}
	}

	if (secID==999 && subSecInfo[0][0]==999999) {
		sm('divNoteSelfSec',300,130);
	}
}


/*********************************************
Change input mode
**********************************************/
function changeInputMode(){
	var buyAt;
	var sellAt;
	var lotSize;
	var numHand;
	var isChecked_cbWarrant=false;
	var isChecked_cbDeposit=false;
	var isChecked_cbSellAtRef=false;
	
	if (inputMode==0) {
		inputMode=1;
		
		buyAt = document.getElementById('buyAt').value;
		sellAt = document.getElementById('sellAt').value;
		lotSize = document.getElementById('lotSize').value;
		numHand = document.getElementById('numHand').value;
		
		if (document.getElementById('cbWarrant').checked) {
			isChecked_cbWarrant=true;
		}

		if (document.getElementById('cbDeposit').checked) {
			isChecked_cbDeposit=true;
		}

		if (document.getElementById('cbSellAtRef').checked) {
			isChecked_cbSellAtRef=true;
		}
		
		reset_tblInput1();
		
		document.getElementById('tbInput1').style.display = "none";
		document.getElementById('tbInput2').style.display = "";
		
		document.getElementById('buyAt_1').value = buyAt;
		document.getElementById('sellAt_1').value = sellAt;
		document.getElementById('lotSize2').value = lotSize;
		document.getElementById('buyNumHand_1').value = numHand;
		document.getElementById('sellNumHand_1').value = numHand;
		document.getElementById('cbWarrant2').checked = isChecked_cbWarrant;
		document.getElementById('cbDeposit2').checked = isChecked_cbDeposit;
		document.getElementById('cbSellAtRef2').checked = isChecked_cbSellAtRef;
		
		
		showResult(1);
	}
	else {
		inputMode=0;
		reset_tblInput2();
		document.getElementById('tbInput1').style.display = "";
		document.getElementById('tbInput2').style.display = "none";
		showResult(0);
	}
}


/*********************************************
Reset tbInput1 value
**********************************************/
function reset_tblInput1() {
	document.getElementById('buyAt').value="";
	document.getElementById('sellAt').value="";
	document.getElementById('lotSize').value="";
	document.getElementById('numHand').value="";
	document.getElementById('sellAtRef').value="";
	document.getElementById('sellAtRef').disabled=true;
	document.getElementById('cbWarrant').checked=false;
	document.getElementById('cbDeposit').checked=false;
	document.getElementById('cbSellAtRef').checked=false;
	display_tbInput1();
}

/*********************************************
Reset tbInput2 value
**********************************************/
function reset_tblInput2() {
	var i;
	
	for(i=1; i<=5; i++) {
		document.getElementById('buyAt_'+i).value="";
		document.getElementById('sellAt_'+i).value="";
		document.getElementById('buyNumHand_'+i).value="";
		document.getElementById('sellNumHand_'+i).value="";
	}
	document.getElementById('lotSize2').value="";
	document.getElementById('sellAtRef2').value="";
	document.getElementById('sellAtRef2').disabled=true;
	document.getElementById('cbWarrant2').checked=false;
	document.getElementById('cbDeposit2').checked=false;
	document.getElementById('cbSellAtRef2').checked=false;
	display_tbInput2();
}


/*********************************************
Get totalShare from tbbInput2
**********************************************/
function getTotalShare_tbInput2() {
	var totalShare = [0,0];
	var buyLotSize = [0,0,0,0,0];
	var sellLotSize = [0,0,0,0,0];
	var buyShare = [0,0,0,0,0];
	var sellShare =  [0,0,0,0,0];
	var buyNumHand = [0,0,0,0,0];
	var sellNumHand = [0,0,0,0,0];
	var totalBuyShare=0;
	var totalSellShare=0;
	var i;
	
	for (i=1; i<=5; i++) {
		if (checkBuy_tbInput2(i)) {
			buyLotSize[i-1] = document.getElementById('lotSize2').value;
			buyNumHand[i-1] = document.getElementById('buyNumHand_'+i).value;
			
			buyShare[i-1] = parseInt(buyLotSize[i-1])*parseInt(buyNumHand[i-1]);
			totalBuyShare = totalBuyShare+(parseInt(buyLotSize[i-1])*parseInt(buyNumHand[i-1]));
		}

		if (checkSell_tbInput2(i)) {
			sellLotSize[i-1] = document.getElementById('lotSize2').value;
			sellNumHand[i-1] = document.getElementById('sellNumHand_'+i).value;
			
			sellShare[i-1] = parseInt(sellLotSize[i-1])*parseInt(sellNumHand[i-1]);
			totalSellShare = totalSellShare+(parseInt(sellLotSize[i-1])*parseInt(sellNumHand[i-1]));
		}
	}
	
	totalShare[0] = totalBuyShare;
	totalShare[1] = totalSellShare;	
	
	return totalShare;
}


/*********************************************
To display info in tbInput1
**********************************************/
function display_tbInput1() {
	var totalShare=0;
	var lotSize = document.getElementById('lotSize').value;
	var numHand = document.getElementById('numHand').value;
	
	if (checkShare_tbInput1()) {
		totalShare = parseInt(lotSize)*parseInt(numHand);
	}
	
	document.getElementById('lblTotalShare').innerHTML = addCommas(totalShare);	
	document.getElementById('hdTotalShare').value = totalShare;		
}


/*********************************************
To display info in tbInput2
**********************************************/
function display_tbInput2() {
	var buyAt = [0,0,0,0,0];
	var sellAt = [0,0,0,0,0];
	var avgBuyAt = 0;
	var avgSellAt = 0;
	var buyShare = [0,0,0,0,0];
	var sellShare = [0,0,0,0,0];
	var totalBuyShare=0;
	var totalSellShare=0;
	var buyLotSize = new Array(5);
	var buyNumHand = new Array(5);
	var sellLotSize = new Array(5);
	var sellNumHand = new Array(5);
	var totalShare = new Array();
	var transParam = new Array(3);
	var totalBuyNetCost=0;
	var totalSellNetCost=0;
	var totalValidBuyShare=0;
	var totalValidSellShare=0;
	
	var i, x;

	for (i=1; i<=5; i++) {
		if (checkBuyShare_tbInput2(i)) {
			buyLotSize[i-1] = document.getElementById('lotSize2').value;
			buyNumHand[i-1] = document.getElementById('buyNumHand_'+i).value;
			
			buyShare[i-1] = parseInt(buyLotSize[i-1])*parseInt(buyNumHand[i-1]);
			//totalBuyShare = totalBuyShare+(parseInt(buyLotSize[i-1])*parseInt(buyNumHand[i-1]));
		}

		if (checkSellShare_tbInput2(i)) {
			sellLotSize[i-1] = document.getElementById('lotSize2').value;
			sellNumHand[i-1] = document.getElementById('sellNumHand_'+i).value;
			
			sellShare[i-1] = parseInt(sellLotSize[i-1])*parseInt(sellNumHand[i-1]);
			//totalSellShare = totalSellShare+(parseInt(sellLotSize[i-1])*parseInt(sellNumHand[i-1]));
		}
		
		document.getElementById('lblTotalBuyShare_'+i).innerHTML = addCommas(buyShare[i-1]);	
		document.getElementById('lblTotalSellShare_'+i).innerHTML = addCommas(sellShare[i-1]);	
	}
	
	totalShare = getTotalShare_tbInput2();
	totalBuyShare = totalShare[0];
	totalSellShare = totalShare[1];
	
	if (totalBuyShare==totalSellShare) {
		document.getElementById('lblTotalShare2').innerHTML = addCommas(totalBuyShare);
		document.getElementById('hdTotalShare2').value = totalBuyShare;
	}
	else {
		document.getElementById('lblTotalShare2').innerHTML = "N/A";
		document.getElementById('hdTotalShare2').value = "";
	}
	
	

	for (i=1; i<=5; i++) {
		if (checkBuy_tbInput2(i)) {
			transParam = getTransParam_tbInput2(0, i);
			totalBuyNetCost = totalBuyNetCost+(transParam[0]*transParam[1]*transParam[2]);
			totalValidBuyShare = totalValidBuyShare+(transParam[1]*transParam[2]);
		}		
		if (checkSell_tbInput2(i)) {
			transParam = getTransParam_tbInput2(1, i);
			totalSellNetCost = totalSellNetCost+(transParam[0]*transParam[1]*transParam[2]);
			totalValidSellShare = totalValidSellShare+(transParam[1]*transParam[2]);
		}
	}

	if (totalBuyNetCost>0) {
		avgBuyAt = (totalBuyNetCost/totalValidBuyShare).toFixed(3);
		document.getElementById('lblAvgBuy').innerHTML = addCommas(avgBuyAt);
		document.getElementById('hdAvgBuy').value = avgBuyAt;
	}
	else {
		document.getElementById('lblAvgBuy').innerHTML = "N/A";
		document.getElementById('hdAvgBuy').value = "";
	}

	if (totalSellNetCost>0) {
		avgSellAt = (totalSellNetCost/totalValidSellShare).toFixed(3);
		document.getElementById('lblAvgSell').innerHTML = addCommas(avgSellAt);
		document.getElementById('hdAvgSell').value = avgSellAt;
	}
	else {
		document.getElementById('lblAvgSell').innerHTML = "N/A";
		document.getElementById('hdAvgSell').value = "";
	}
}

/*********************************************
Get sub sec id
**********************************************/
function getSubSecID() {
	var subSecID;
	var i;
	
	for (i=0; i<document.getElementsByName('rdSubSec').length; i++) {
		if (document.getElementsByName('rdSubSec')[i].checked) {
			subSecID = document.getElementsByName('rdSubSec')[i].value;
		}
	}
	
	return subSecID;
}

/*********************************************
select by sub sec id
**********************************************/
function selectSec(subSecID, selfSecID) {
	var secInfo = returnSecInfo();
	var secID;
	var i, x;
	
	if (subSecID==0) {
		subSecID = selfSecID;
		secID = 999;
	}
	else {
		for (i=0; i<secInfo.length; i++) {
			if (secInfo[i][1]==subSecID) {
				secID = secInfo[i][0];
				break;
			}
		}
	}
	
	for (i=0; i<document.getElementById('slSec').options.length; i++) {
		if (document.getElementById('slSec').options[i].value==secID) {
			document.getElementById('slSec').options[i].selected = true;
			change_rdSubSec(secID);
			break;
		}
	}
	
	for (i=1; i<=3; i++) {
		if (document.getElementById('rdSubSec'+i).value==subSecID) {
			document.getElementById('rdSubSec'+i).checked = true;
			break;
		}
	}
}


/*********************************************
To check and display result

opt
0: tbInput1
1: tbInput2
**********************************************/
function showResult(opt) {
	var transBuyResult = [0,0,0,0,0,0,0,0,0,0];
	var transSellResult = [0,0,0,0,0,0,0,0,0,0];
	var transSellRefResult = [0,0,0,0,0,0,0,0,0,0];
	var tmp_transBuyResult = [0,0,0,0,0,0,0,0,0,0];
	var tmp_transSellResult = [0,0,0,0,0,0,0,0,0,0];
	var tmp_transSellRefResult = [0,0,0,0,0,0,0,0,0,0];
	var slSec = document.getElementById("slSec");
	var secID = slSec.options[slSec.selectedIndex].value;
	var subSecID;
	var secInfo = returnSecInfo();
	var haveStampDuty=true;
	var haveDeposit=false;
	var haveSellRef=false;
	var i, x;

	subSecID = getSubSecID();
	
	//showSecInfo(subSecID);
	
	switch (opt) {
		case 0:
			display_tbInput1();
		
			if (document.getElementById('cbWarrant').checked) {
				haveStampDuty=false;
			}

			if (document.getElementById('cbDeposit').checked) {
				haveDeposit=true;
			}

			if (document.getElementById('cbSellAtRef').checked) {
				haveSellRef=true;
				document.getElementById('sellAtRef').disabled=false;
				document.getElementById('tbResult1').style.display="none";
				document.getElementById('tbResult2').style.display="";
			}
			else {
				document.getElementById('sellAtRef').disabled=true;
				document.getElementById('tbResult1').style.display="";
				document.getElementById('tbResult2').style.display="none";
			}

			if (checkBuy_tbInput1()) {
				transBuyResult = calcTrans(getTransParam_tbInput1(0), getSecParam(secInfo, subSecID), true, haveStampDuty, haveDeposit);
			}
			
			if (checkSell_tbInput1()) {
				transSellResult = calcTrans(getTransParam_tbInput1(1), getSecParam(secInfo, subSecID), false, haveStampDuty, haveDeposit);
			}			

			if (haveSellRef) {
				if (checkSellRef_tbInput1()) {
					transSellRefResult = calcTrans(getTransParam_tbInput1(2), getSecParam(secInfo, subSecID), false, haveStampDuty, haveDeposit);
				}
				display_tbResult2(transBuyResult, transSellResult, transSellRefResult);
			}
			else {
				display_tbResult1(transBuyResult, transSellResult);
			}
			break;
		case 1:
			display_tbInput2();
		
			if (document.getElementById('cbWarrant2').checked) {
				haveStampDuty=false;
			}

			if (document.getElementById('cbDeposit2').checked) {
				haveDeposit=true;
			}

			if (document.getElementById('cbSellAtRef2').checked) {
				haveSellRef=true;
				document.getElementById('sellAtRef2').disabled=false;
				document.getElementById('tbResult1').style.display="none";
				document.getElementById('tbResult2').style.display="";
			}
			else {
				document.getElementById('sellAtRef2').disabled=true;
				document.getElementById('tbResult1').style.display="";
				document.getElementById('tbResult2').style.display="none";
			}

			for (i=1; i<=5; i++) {
				if (checkBuy_tbInput2(i)) {
					tmp_transBuyResult = calcTrans(getTransParam_tbInput2(0, i), getSecParam(secInfo, subSecID), true, haveStampDuty, haveDeposit);
					for (x=0; x<transBuyResult.length; x++) {
						transBuyResult[x] = transBuyResult[x] + tmp_transBuyResult[x];
					}
				}
				
				if (checkSell_tbInput2(i)) {
					tmp_transSellResult = calcTrans(getTransParam_tbInput2(1, i), getSecParam(secInfo, subSecID), false, haveStampDuty, haveDeposit);
					for (x=0; x<transSellResult.length; x++) {
						transSellResult[x] = transSellResult[x] + tmp_transSellResult[x];
					}
				}
			}			

			if (haveSellRef) {
				for (i=1; i<=5; i++) {
					if (checkSellRef_tbInput2(i)) {
						tmp_transSellRefResult = calcTrans(getTransParam_tbInput2(2, i), getSecParam(secInfo, subSecID), false, haveStampDuty, haveDeposit);
						for (x=0; x<transSellRefResult.length; x++) {
							transSellRefResult[x] = transSellRefResult[x] + tmp_transSellRefResult[x];
						}
					}
				}
				
				for (i=0; i<transSellRefResult.length; i++) {
					//alert(transSellRefResult[i]);
				}
				
				display_tbResult2(transBuyResult, transSellResult, transSellRefResult);
			}
			else {
				display_tbResult1(transBuyResult, transSellResult);
			}
			break;
	}
}


/*********************************************
tbInput1 data (Share) Validation
**********************************************/
function checkShare_tbInput1() {
	var elementIDSet = ['lotSize','numHand'];
	var i;
	
	for (i=0; i<elementIDSet.length; i++) {
		if(isNaN(document.getElementById(elementIDSet[i]).value) || Trim(document.getElementById(elementIDSet[i]).value)=="" || document.getElementById(elementIDSet[i]).value<=0 || !isInt(document.getElementById(elementIDSet[i]).value)) {
			return false;
			break;
		}
	}
	
	return true;
}

/*********************************************
tbInput2 data (Buy Share) Validation
**********************************************/
function checkBuyShare_tbInput2(offset) {
	var elementIDSet = ['buyNumHand_'];
	var i;

	for (i=0; i<elementIDSet.length; i++) {
		if(isNaN(document.getElementById(elementIDSet[i]+offset).value) || Trim(document.getElementById(elementIDSet[i]+offset).value)=="" || document.getElementById(elementIDSet[i]+offset).value<=0 || !isInt(document.getElementById(elementIDSet[i]+offset).value)) {
			return false;
			break;
		}
	}
			
	if (isNaN(document.getElementById('lotSize2').value) || !isInt(document.getElementById('lotSize2').value) || Trim(document.getElementById('lotSize2').value)=="" || document.getElementById('lotSize2').value<=0) {
		return false;
	}
			
	return true;
}


/*********************************************
tbInput2 data (Sell Share) Validation
**********************************************/
function checkSellShare_tbInput2(offset) {
	var elementIDSet = ['sellNumHand_'];
	var i;

	for (i=0; i<elementIDSet.length; i++) {
		if(isNaN(document.getElementById(elementIDSet[i]+offset).value) || Trim(document.getElementById(elementIDSet[i]+offset).value)=="" || document.getElementById(elementIDSet[i]+offset).value<=0 || !isInt(document.getElementById(elementIDSet[i]+offset).value)) {
			return false;
			break;
		}
	}
			
	if (isNaN(document.getElementById('lotSize2').value) || !isInt(document.getElementById('lotSize2').value) || Trim(document.getElementById('lotSize2').value)=="" || document.getElementById('lotSize2').value<=0) {
		return false;
	}
			
	return true;
}



/*********************************************
tbInput1 data (Buy) Validation
**********************************************/
function checkBuy_tbInput1() {
	var elementIDSet = ['buyAt','lotSize','numHand'];
	var i;
	
	for (i=0; i<elementIDSet.length; i++) {
		if(isNaN(document.getElementById(elementIDSet[i]).value) || Trim(document.getElementById(elementIDSet[i]).value)=="" || document.getElementById(elementIDSet[i]).value<=0) {
			return false;
			break;
		}
				
		if (i>0) {
			if (!isInt(document.getElementById(elementIDSet[i]).value)) {
				return false;
				break;
			}
		}
	}
	
	return true;
}


/*********************************************
tbInput2 data (Buy) Validation
**********************************************/
function checkBuy_tbInput2(offset) {
	var elementIDSet = ['buyAt_','buyNumHand_'];
	var i;

	for (i=0; i<elementIDSet.length; i++) {
		if(isNaN(document.getElementById(elementIDSet[i]+offset).value) || Trim(document.getElementById(elementIDSet[i]+offset).value)=="" || document.getElementById(elementIDSet[i]+offset).value<=0) {
			return false;
			break;
		}
				
		if (i>0) {
			if (!isInt(document.getElementById(elementIDSet[i]+offset).value)) {
				return false;
				break;
			}
		}
	}
			
	if (isNaN(document.getElementById('lotSize2').value) || !isInt(document.getElementById('lotSize2').value) || Trim(document.getElementById('lotSize2').value)=="" || document.getElementById('lotSize2').value<=0) {
		return false;
	}
			
	return true;
}


/*********************************************
tbInput1 data (Sell) Validation
**********************************************/
function checkSell_tbInput1() {
	if(isNaN(document.getElementById('sellAt').value) || Trim(document.getElementById('sellAt').value)=="" || document.getElementById('sellAt').value<0) {
		return false;
	}

	if(isNaN(document.getElementById('lotSize').value) || Trim(document.getElementById('lotSize').value)=="" || document.getElementById('lotSize').value<=0 || !isInt(document.getElementById('lotSize').value)) {
		return false;
	}

	if(isNaN(document.getElementById('numHand').value) || Trim(document.getElementById('numHand').value)=="" || document.getElementById('numHand').value<=0 || !isInt(document.getElementById('numHand').value)) {
		return false;
	}
	
	return true;
}


/*********************************************
tbInput2 data (Sell) Validation
**********************************************/
function checkSell_tbInput2(offset) {
	if(isNaN(document.getElementById('sellAt_'+offset).value) || Trim(document.getElementById('sellAt_'+offset).value)=="" || document.getElementById('sellAt_'+offset).value<0) {
		return false;
	}
				
	if(isNaN(document.getElementById('sellNumHand_'+offset).value) || Trim(document.getElementById('sellNumHand_'+offset).value)=="" || document.getElementById('sellNumHand_'+offset).value<0 || document.getElementById('sellNumHand_'+offset).value<=0) {
		return false;
	}
			
	if (isNaN(document.getElementById('lotSize2').value) || !isInt(document.getElementById('lotSize2').value) || Trim(document.getElementById('lotSize2').value)=="" || document.getElementById('lotSize2').value<=0) {
		return false;
	}
	
	return true;
}


/*********************************************
tbInput1 data (Sell Ref) Validation
**********************************************/
function checkSellRef_tbInput1() {
	if(isNaN(document.getElementById('sellAtRef').value) || Trim(document.getElementById('sellAtRef').value)=="" || document.getElementById('sellAtRef').value<0) {
		return false;
	}
				
	if(isNaN(document.getElementById('lotSize').value) || Trim(document.getElementById('lotSize').value)=="" || document.getElementById('lotSize').value<=0 || !isInt(document.getElementById('lotSize').value)) {
		return false;
	}

	if(isNaN(document.getElementById('numHand').value) || Trim(document.getElementById('numHand').value)=="" || document.getElementById('numHand').value<=0 || !isInt(document.getElementById('numHand').value)) {
		return false;
	}
	
	return true;
}


/*********************************************
tbInput2 data (Sell Ref2) Validation
**********************************************/
function checkSellRef_tbInput2(offset) {
	if(isNaN(document.getElementById('sellNumHand_'+offset).value) || Trim(document.getElementById('sellNumHand_'+offset).value)=="" || document.getElementById('sellNumHand_'+offset).value<=0 || !isInt(document.getElementById('sellNumHand_'+offset).value)) {
		return false;
	}

	if (isNaN(document.getElementById('sellAtRef2').value) || Trim(document.getElementById('sellAtRef2').value)=="" || document.getElementById('sellAtRef2').value<0) {
		return false;
	}

	if (isNaN(document.getElementById('lotSize2').value) || !isInt(document.getElementById('lotSize2').value) || Trim(document.getElementById('lotSize2').value)=="" || document.getElementById('lotSize2').value<=0) {
		return false;
	}
	
	return true;
}


/*********************************************
To display tbResult1 from transResult 
**********************************************/
function display_tbResult1(transBuyResult, transSellResult) {
	var totalFee=0;
	var balance=0;
	var balancePersent=0;
	var authZeroSell= false;
	var i;
	var totalShare = new Array();
	var isEqual_buySellShare = true;
	
	if (inputMode==0) {
		if (checkSell_tbInput1()) {
			authZeroSell = true;
		}
	}
	
	if (inputMode==1) {
		for (i=1; i<=5; i++) {
			if (checkSell_tbInput2(i)) {
				authZeroSell = true;
			}
		}
	}

	if (inputMode==1) {
		totalShare = getTotalShare_tbInput2();
		
		if (totalShare[0]!=totalShare[1] || totalShare[0]<=0) {
			isEqual_buySellShare = false;
		}
	}
	
	//Buy
	if (transBuyResult[0]>0) {
		document.getElementById('lblBuyAmt').innerHTML = addCommas(transBuyResult[0].toFixed(2));
		document.getElementById('lblBuyComm').innerHTML = addCommas(transBuyResult[1].toFixed(2));
		document.getElementById('lblBuyTLFee').innerHTML = addCommas(transBuyResult[2].toFixed(2));
		document.getElementById('lblBuyHTFee').innerHTML = addCommas(transBuyResult[3].toFixed(2));
		document.getElementById('lblBuyStamp').innerHTML = addCommas(transBuyResult[4].toFixed(2));
		document.getElementById('lblBuySFee').innerHTML = addCommas(transBuyResult[5].toFixed(2));
		document.getElementById('lblBuyFee').innerHTML = addCommas(transBuyResult[6].toFixed(2));
		document.getElementById('lblBuyDFee').innerHTML = addCommas(transBuyResult[7].toFixed(2));
		document.getElementById('lblBuyCost').innerHTML = addCommas(transBuyResult[8].toFixed(2));
		document.getElementById('lblRealOut').innerHTML = addCommas(transBuyResult[9].toFixed(2));
		
		document.getElementById('hdBuyAmount').value = transBuyResult[0].toFixed(2);
		document.getElementById('hdBuyCost').value = transBuyResult[8].toFixed(2);
	}
	else {
		document.getElementById('lblBuyAmt').innerHTML = "N/A";
		document.getElementById('lblBuyComm').innerHTML = "N/A";
		document.getElementById('lblBuyTLFee').innerHTML = "N/A";
		document.getElementById('lblBuyHTFee').innerHTML = "N/A";
		document.getElementById('lblBuyStamp').innerHTML = "N/A";
		document.getElementById('lblBuySFee').innerHTML = "N/A";
		document.getElementById('lblBuyFee').innerHTML = "N/A";
		document.getElementById('lblBuyDFee').innerHTML = "N/A";
		document.getElementById('lblBuyCost').innerHTML = "N/A";
		document.getElementById('lblRealOut').innerHTML = "N/A";
		
		document.getElementById('hdBuyAmount').value = "";
		document.getElementById('hdBuyCost').value = "";
	}
	
	//Sell
	if (transSellResult[0]>=0 && authZeroSell) {
		document.getElementById('lblSellAmt').innerHTML = addCommas(transSellResult[0].toFixed(2));
		document.getElementById('lblSellComm').innerHTML = addCommas(transSellResult[1].toFixed(2));
		document.getElementById('lblSellTLFee').innerHTML = addCommas(transSellResult[2].toFixed(2));
		document.getElementById('lblSellHTFee').innerHTML = addCommas(transSellResult[3].toFixed(2));
		document.getElementById('lblSellStamp').innerHTML = addCommas(transSellResult[4].toFixed(2));
		document.getElementById('lblSellSFee').innerHTML = addCommas(transSellResult[5].toFixed(2));
		document.getElementById('lblSellFee').innerHTML = addCommas(transSellResult[6].toFixed(2));
		//document.getElementById('lblSellDFee').innerHTML = addCommas(transSellResult[7].toFixed(2));
		document.getElementById('lblSellCost').innerHTML = addCommas(transSellResult[8].toFixed(2));
		document.getElementById('lblRealIn').innerHTML = addCommas(transSellResult[9].toFixed(2));
		
		document.getElementById('hdSellAmount').value = transSellResult[0].toFixed(2);
		document.getElementById('hdSellCost').value = transSellResult[8].toFixed(2);
	}
	else {
		document.getElementById('lblSellAmt').innerHTML = "N/A";
		document.getElementById('lblSellComm').innerHTML = "N/A";
		document.getElementById('lblSellTLFee').innerHTML = "N/A";
		document.getElementById('lblSellHTFee').innerHTML = "N/A";
		document.getElementById('lblSellStamp').innerHTML = "N/A";
		document.getElementById('lblSellSFee').innerHTML = "N/A";
		document.getElementById('lblSellFee').innerHTML = "N/A";
		//document.getElementById('lblSellDFee').innerHTML = "N/A";
		document.getElementById('lblSellCost').innerHTML = "N/A";
		document.getElementById('lblRealIn').innerHTML = "N/A";	
		
		document.getElementById('hdSellAmount').value = "";
		document.getElementById('hdSellCost').value = "";
	}
		
	//Summary (Buy - Sell)
	if (transBuyResult[0]>0 && transSellResult[0]>=0 && authZeroSell && isEqual_buySellShare) {
		totalFee = transBuyResult[8] + transSellResult[8];
		balance = transSellResult[9]-transBuyResult[9];
		balancePersent = addCommas((balance/transBuyResult[9]*100).toFixed(2));

		document.getElementById('lblTotalFee').innerHTML = addCommas(totalFee.toFixed(2));	
		
		if (balance>=0) {
			document.getElementById('lblBalance').innerHTML = addCommas(balance.toFixed(2));
			document.getElementById('lblBalancePersent').innerHTML = "("+addCommas(balancePersent)+"%)";
			
			//Ben added
			var theIncrease = (document.getElementById('sellAt').value-document.getElementById('buyAt').value)/document.getElementById('buyAt').value;
			document.getElementById('perInc').innerHTML = (theIncrease*100).toFixed(2)+"%";
			document.getElementById('perInc').style.color = "green";

		}
		else {
			document.getElementById('lblBalance').innerHTML = "<font color='red'>"+addCommas(balance.toFixed(2))+"</font>";
			document.getElementById('lblBalancePersent').innerHTML = "<font color='red'>"+"("+addCommas(balancePersent)+"%)"+"</font>";	
			
			//Ben added
			var theIncrease = (document.getElementById('sellAt').value-document.getElementById('buyAt').value)/document.getElementById('buyAt').value;
			document.getElementById('perInc').innerHTML = (theIncrease*100).toFixed(2)+"%";
			document.getElementById('perInc').style.color = "red";
			
			if(document.getElementById('sellAt').value == document.getElementById('buyAt').value){
					document.getElementById('perInc').style.color = "gray";
			}
		}

		document.getElementById('hdTotalCost').value = totalFee.toFixed(2);
		document.getElementById('hdBalence').value = balance.toFixed(2);
		
		if(modMode==0) {
			document.getElementById('btnAddTT').style.display = "";
			document.getElementById('btnSaveChange').style.display = "none";
			document.getElementById('btnAddTrans').style.display = "";
			document.getElementById('btnCancelChange').style.display = "none";
		}
		else {
			document.getElementById('btnSaveChange').style.display = "";
			document.getElementById('btnCancelChange').style.display = "";
			document.getElementById('btnAddTT').style.display = "none";
			document.getElementById('btnAddTrans').style.display = "none";
		}
	}
	else {
		document.getElementById('lblTotalFee').innerHTML = "N/A";	
		document.getElementById('lblBalance').innerHTML = "N/A";	
		document.getElementById('lblBalancePersent').innerHTML = "&nbsp;";

		document.getElementById('hdTotalCost').value = "";
		document.getElementById('hdBalence').value = "";

		document.getElementById('btnSaveChange').style.display = "none";
		document.getElementById('btnAddTT').style.display = "none";
		document.getElementById('btnAddTrans').style.display = "none";
		document.getElementById('btnCancelChange').style.display = "none";

	}
}



/*********************************************
To display tbResult2 from transResult 
**********************************************/
function display_tbResult2(transBuyResult, transSellResult, transSellRefResult) {
	var totalFee=0;
	var totalFeeRef=0;
	var balance=0;
	var balanceRef=0;
	var balancePersent=0;
	var balanceRefPersent=0;
	var diff=0;
	var authZeroSell= false;
	var authZeroSellRef= false;
	var totalShare = new Array();
	var isEqual_buySellShare = true;
	
	if (inputMode==0) {
		if (checkSell_tbInput1()) {
			authZeroSell = true;
		}
		if (checkSellRef_tbInput1()) {
			authZeroSellRef = true;
		}
	}
	
	if (inputMode==1) {
		for (i=1; i<=5; i++) {
			if (checkSell_tbInput2(i)) {
				authZeroSell = true;
			}
			if (checkSellRef_tbInput2(i)) {
				authZeroSellRef = true;
			}
		}

		totalShare = getTotalShare_tbInput2();
		
		if (totalShare[0]!=totalShare[1] || totalShare[0]<=0) {
			isEqual_buySellShare = false;
		}
	}
	
	//Buy
	if (transBuyResult[0]>0) {
		document.getElementById('lblBuyAmt2').innerHTML = addCommas(transBuyResult[0].toFixed(2));
		document.getElementById('lblBuyComm2').innerHTML = addCommas(transBuyResult[1].toFixed(2));
		document.getElementById('lblBuyTLFee2').innerHTML = addCommas(transBuyResult[2].toFixed(2));
		document.getElementById('lblBuyHTFee2').innerHTML = addCommas(transBuyResult[3].toFixed(2));
		document.getElementById('lblBuyStamp2').innerHTML = addCommas(transBuyResult[4].toFixed(2));
		document.getElementById('lblBuySFee2').innerHTML = addCommas(transBuyResult[5].toFixed(2));
		document.getElementById('lblBuyFee2').innerHTML = addCommas(transBuyResult[6].toFixed(2));
		document.getElementById('lblBuyDFee2').innerHTML = addCommas(transBuyResult[7].toFixed(2));
		document.getElementById('lblBuyCost2').innerHTML = addCommas(transBuyResult[8].toFixed(2));
		document.getElementById('lblRealOut2').innerHTML = addCommas(transBuyResult[9].toFixed(2));
		
		document.getElementById('hdBuyAmount2').value = transBuyResult[0].toFixed(2);
		document.getElementById('hdBuyCost2').value = transBuyResult[8].toFixed(2);
	}
	else {
		document.getElementById('lblBuyAmt2').innerHTML = "N/A";
		document.getElementById('lblBuyComm2').innerHTML = "N/A";
		document.getElementById('lblBuyTLFee2').innerHTML = "N/A";
		document.getElementById('lblBuyHTFee2').innerHTML = "N/A";
		document.getElementById('lblBuyStamp2').innerHTML = "N/A";
		document.getElementById('lblBuySFee2').innerHTML = "N/A";
		document.getElementById('lblBuyFee2').innerHTML = "N/A";
		document.getElementById('lblBuyDFee2').innerHTML = "N/A";
		document.getElementById('lblBuyCost2').innerHTML = "N/A";
		document.getElementById('lblRealOut2').innerHTML = "N/A";
		
		document.getElementById('hdBuyAmount2').value = "";
		document.getElementById('hdBuyCost2').value = "";
	}
	
	//Sell
	if (transSellResult[0]>=0 && authZeroSell) {
		document.getElementById('lblSellAmt2').innerHTML = addCommas(transSellResult[0].toFixed(2));
		document.getElementById('lblSellComm2').innerHTML = addCommas(transSellResult[1].toFixed(2));
		document.getElementById('lblSellTLFee2').innerHTML = addCommas(transSellResult[2].toFixed(2));
		document.getElementById('lblSellHTFee2').innerHTML = addCommas(transSellResult[3].toFixed(2));
		document.getElementById('lblSellStamp2').innerHTML = addCommas(transSellResult[4].toFixed(2));
		document.getElementById('lblSellSFee2').innerHTML = addCommas(transSellResult[5].toFixed(2));
		document.getElementById('lblSellFee2').innerHTML = addCommas(transSellResult[6].toFixed(2));
		//document.getElementById('lblSellDFee2').innerHTML = addCommas(transSellResult[7].toFixed(2));
		document.getElementById('lblSellCost2').innerHTML = addCommas(transSellResult[8].toFixed(2));
		document.getElementById('lblRealIn2').innerHTML = addCommas(transSellResult[9].toFixed(2));
		
		document.getElementById('hdSellAmount2').value = transSellResult[0].toFixed(2);
		document.getElementById('hdSellCost2').value = transSellResult[8].toFixed(2);
	}
	else {
		document.getElementById('lblSellAmt2').innerHTML = "N/A";
		document.getElementById('lblSellComm2').innerHTML = "N/A";
		document.getElementById('lblSellTLFee2').innerHTML = "N/A";
		document.getElementById('lblSellHTFee2').innerHTML = "N/A";
		document.getElementById('lblSellStamp2').innerHTML = "N/A";
		document.getElementById('lblSellSFee2').innerHTML = "N/A";
		document.getElementById('lblSellFee2').innerHTML = "N/A";
		//document.getElementById('lblSellDFee2').innerHTML = "N/A";
		document.getElementById('lblSellCost2').innerHTML = "N/A";
		document.getElementById('lblRealIn2').innerHTML = "N/A";	
		
		document.getElementById('hdSellAmount2').value = "";
		document.getElementById('hdSellCost2').value = "";
	}
	
	//SellRef
	if (transSellRefResult[0]>=0 && authZeroSellRef) {
		document.getElementById('lblSellAmtRef').innerHTML = addCommas(transSellRefResult[0].toFixed(2));
		document.getElementById('lblSellCommRef').innerHTML = addCommas(transSellRefResult[1].toFixed(2));
		document.getElementById('lblSellTLFeeRef').innerHTML = addCommas(transSellRefResult[2].toFixed(2));
		document.getElementById('lblSellHTFeeRef').innerHTML = addCommas(transSellRefResult[3].toFixed(2));
		document.getElementById('lblSellStampRef').innerHTML = addCommas(transSellRefResult[4].toFixed(2));
		document.getElementById('lblSellSFeeRef').innerHTML = addCommas(transSellRefResult[5].toFixed(2));
		document.getElementById('lblSellFeeRef').innerHTML = addCommas(transSellRefResult[6].toFixed(2));
		//document.getElementById('lblSellDFeeRef').innerHTML = addCommas(transSellRefResult[7].toFixed(2));
		document.getElementById('lblSellCostRef').innerHTML = addCommas(transSellRefResult[8].toFixed(2));
		document.getElementById('lblRealInRef').innerHTML = addCommas(transSellRefResult[9].toFixed(2));
	}
	else {
		document.getElementById('lblSellAmtRef').innerHTML = "N/A";
		document.getElementById('lblSellCommRef').innerHTML = "N/A";
		document.getElementById('lblSellTLFeeRef').innerHTML = "N/A";
		document.getElementById('lblSellHTFeeRef').innerHTML = "N/A";
		document.getElementById('lblSellStampRef').innerHTML = "N/A";
		document.getElementById('lblSellSFeeRef').innerHTML = "N/A";
		document.getElementById('lblSellFeeRef').innerHTML = "N/A";
		//document.getElementById('lblSellDFeeRef').innerHTML = "N/A";
		document.getElementById('lblSellCostRef').innerHTML = "N/A";
		document.getElementById('lblRealInRef').innerHTML = "N/A";	
	}
	
	//Summary (Buy - Sell)
	if (transBuyResult[0]>0 && transSellResult[0]>=0 && authZeroSell && isEqual_buySellShare) {
		totalFee = transBuyResult[8] + transSellResult[8];
		balance = transSellResult[9]-transBuyResult[9];
		balancePersent = addCommas((balance/transBuyResult[9]*100).toFixed(2));

		document.getElementById('lblTotalFee2').innerHTML = addCommas(totalFee.toFixed(2));	
	
		if (balance>=0) {
			document.getElementById('lblBalance2').innerHTML = addCommas(balance.toFixed(2));
			document.getElementById('lblBalancePersent2').innerHTML = "("+addCommas(balancePersent)+"%)";	
		}
		else {
			document.getElementById('lblBalance2').innerHTML = "<font color='red'>"+addCommas(balance.toFixed(2))+"</font>";
			document.getElementById('lblBalancePersent2').innerHTML = "<font color='red'>"+"("+addCommas(balancePersent)+"%)"+"</font>";	
		}
		
		document.getElementById('hdTotalCost2').value = totalFee.toFixed(2);
		document.getElementById('hdBalence2').value = balance.toFixed(2);

		if(modMode==0) {
			document.getElementById('btnAddTT2').style.display = "";
			document.getElementById('btnSaveChange2').style.display = "none";
			document.getElementById('btnAddTrans2').style.display = "";
			document.getElementById('btnCancelChange2').style.display = "none";
		}
		else {
			document.getElementById('btnSaveChange2').style.display = "";
			document.getElementById('btnCancelChange2').style.display = "";
			document.getElementById('btnAddTT2').style.display = "none";
			document.getElementById('btnAddTrans2').style.display = "none";
		}
	}
	else {
		document.getElementById('lblTotalFee2').innerHTML = "N/A";	
		document.getElementById('lblBalance2').innerHTML = "N/A";	
		document.getElementById('lblBalancePersent2').innerHTML = "&nbsp;";		

		document.getElementById('hdTotalCost2').value = "";
		document.getElementById('hdBalence2').value = "";
		
		document.getElementById('btnSaveChange2').style.display = "none";
		document.getElementById('btnAddTT2').style.display = "none";
		document.getElementById('btnAddTrans2').style.display = "none";
		document.getElementById('btnCancelChange2').style.display = "none";
	}

	//Summary (Buy - Sell Ref)
	if (transBuyResult[0]>0 && transSellRefResult[0]>=0 && authZeroSellRef && isEqual_buySellShare) {
		totalFeeRef = transBuyResult[8] + transSellRefResult[8];
		balanceRef = transSellRefResult[9]-transBuyResult[9];
		balancePersentRef = addCommas((balanceRef/transBuyResult[9]*100).toFixed(2));
		
		document.getElementById('lblTotalFeeRef').innerHTML = addCommas(totalFeeRef.toFixed(2));	
		document.getElementById('lblBalanceRef').innerHTML = addCommas(balanceRef.toFixed(2));	
		document.getElementById('lblBalancePersentRef').innerHTML = "("+balancePersentRef+"%)";	
	}
	else {
		document.getElementById('lblTotalFeeRef').innerHTML = "N/A";	
		document.getElementById('lblBalanceRef').innerHTML = "N/A";	
		document.getElementById('lblBalancePersentRef').innerHTML = "&nbsp;";	
	}
	
	//Summary (Sell - Sell Ref)
	if (transSellResult[0]>=0 && transSellRefResult[0]>=0 && authZeroSell && authZeroSellRef) {
		diff = transSellRefResult[9]-transSellResult[9];
		diffPersent =((diff/balance)*100).toFixed(2);
		document.getElementById('lblDiff').innerHTML = addCommas(diff.toFixed(2));		
	}
	else {
		document.getElementById('lblDiff').innerHTML = "N/A";	
	}
}



/*********************************************
Get Transation inputs from tbInput1
**********************************************/
function getTransParam_tbInput1(target) {
	var transParam = new Array();
	var price;
	var lotSize;
	var numHand;
	
	switch (target) {
		case 0:	
			price = document.getElementById('buyAt').value;
			break;
		case 1:
			price = document.getElementById('sellAt').value;
			break;
		case 2:
			price = document.getElementById('sellAtRef').value;
			break;
	}
	
	lotSize = document.getElementById('lotSize').value;
	numHand = document.getElementById('numHand').value;
	
	transParam[0] = parseFloat(price);
	transParam[1] = parseInt(lotSize);
	transParam[2] = parseInt(numHand);
	
	return transParam;
}

/*********************************************
Get Transation inputs from tbInput2
**********************************************/
function getTransParam_tbInput2(target, itemNo) {
	var transParam = new Array();
	var price;
	var lotSize;
	var numHand;
	
	switch (target) {
		case 0:	
			price = document.getElementById('buyAt_'+itemNo).value;
			numHand = document.getElementById('buyNumHand_'+itemNo).value;
			break;
		case 1:
			price = document.getElementById('sellAt_'+itemNo).value;
			numHand = document.getElementById('sellNumHand_'+itemNo).value;
			break;
		case 2:
			price = document.getElementById('sellAtRef2').value;
			numHand = document.getElementById('sellNumHand_'+itemNo).value;
			break;
	}
	lotSize = document.getElementById('lotSize2').value;
	
	transParam[0] = parseFloat(price);
	transParam[1] = parseInt(lotSize);
	transParam[2] = parseInt(numHand);
	
	return transParam;
}


/*********************************************
Get securities charging parameters
**********************************************/
function getSecParam(secInfo, subSecID) {
	var secParam = new Array(10);
	var commissionRate=0;					
	var commissionLowestCharge=0;			
	var settleRate=0;
	var settleLowestCharge=0;
	var depositChargeForEachHands=0;
	var depositLowestCharge=0;
	var depositHighestCharge=0;	
	var settleHighestCharge=0;
	var transactionFee=0;
	var transactionFeeSell=0;
	var i;
	
	for (i=0; i<secInfo.length; i++) {
		if (secInfo[i][1]==subSecID) {
			commissionRate = secInfo[i][5];
			commissionLowestCharge = secInfo[i][6];
			settleRate = secInfo[i][7];
			settleLowestCharge = secInfo[i][8]; 
			settleHighestCharge = secInfo[i][9];
			depositChargeForEachHands = secInfo[i][10];
			depositLowestCharge = secInfo[i][11];
			depositHighestCharge = secInfo[i][12];
			transactionFee = secInfo[i][13];
			transactionFeeSell = secInfo[i][14];
			break;
		}
	}
	
	secParam[0] = commissionRate;
	secParam[1] = commissionLowestCharge;
	secParam[2] = settleRate;
	secParam[3] = settleLowestCharge;
	secParam[4] = settleHighestCharge;
	secParam[5] = depositChargeForEachHands;
	secParam[6] = depositLowestCharge;
	secParam[7] = depositHighestCharge;
	secParam[8] = transactionFee;
	secParam[9] = transactionFeeSell;
	
	for(i=0; i<secParam.length; i++) {
		secParam[i] = parseFloat(secParam[i]);
	}
	
	return secParam;
}


/*********************************************
Calculate the fee of various items and return 
the transaction (buy or sell) detail

transParam -- Transaction input parameters (Array)
secParam -- Securities charging parameters (Array)
isBuy -- Is buy or not, i.e. sell (Boolean)
haveStampDuty -- Have to calculated with stamp duty (Boolean)
haveDeposit -- Have to calculated with Deposit fee (Boolean)

Return: calcTransResult[]
[0]: Net Amount
[1]: Commission
[2]: Transaction Levy
[3]: HKExTradingFee
[4]: Stamp duty
[5]: Settle Fee
[6]: Transation fee
[7]: Deposit Fee
[8]: Total charge
[9]: Balance
**********************************************/
function calcTrans(transParam, secParam, isBuy, haveStampDuty, haveDeposit) {
	var calcTransResult = [0,0,0,0,0,0,0,0,0,0];
	var price;
	var lotSize;
	var numHand;
	var netAmount;
	var commissionRate;					
	var commissionLowestCharge;			
	var settleRate;
	var settleLowestCharge;
	var depositChargeForEachHands;
	var depositLowestCharge;
	var depositHighestCharge;	
	var transactionLevy = 0.00003; 	//collected for the Securities & Futures Commission of Hong Kong
	var HKExTradingFee = 0.00005 	//collected for the Stock Exchange of Hong Kong Ltd.
	var stampDuty = 1;				//Will be charged for transaction net amount less than $1,000
	var settleHighestCharge;
	var transactionFee;
	var transactionFeeSell;
	var i;

	//Allocate the initial values from correspoding array elements
	price = transParam[0];
	lotSize = transParam[1];
	numHand = transParam[2];
	
	//Allocate the initial values from correspoding array elements
	commissionRate = secParam[0];
	commissionLowestCharge = secParam[1];
	settleRate = secParam[2];
	settleLowestCharge = secParam[3];
	settleHighestCharge = secParam[4];
	depositChargeForEachHands = secParam[5];
	depositLowestCharge = secParam[6];
	depositHighestCharge = secParam[7];
	transactionFee = secParam[8];
	transactionFeeSell = secParam[9];
	
	
	netAmount = price*lotSize*numHand;
	
	//Net Amount
	calcTransResult[0] = netAmount;		
	
	//Commission
	if ((netAmount*commissionRate)<=commissionLowestCharge) {					
		calcTransResult[1] = commissionLowestCharge;
	}
	else {
		calcTransResult[1] = roundUp((netAmount*commissionRate),2);
	}
	
	calcTransResult[1] = calcTransResult[1];
	
	//Transaction Levy
	calcTransResult[2] = roundUp((netAmount*transactionLevy),2);			

	//HKEx Trading Fee
	calcTransResult[3] = roundUp((netAmount*HKExTradingFee),2);	
	
	
	//Stamp Duty
	if (haveStampDuty) {
		calcTransResult[4] = Math.ceil (netAmount/1000) * stampDuty;
	}
	else {
		calcTransResult[4] = 0;
	}

	//Settle Fee
	if ((netAmount*settleRate)<=settleLowestCharge) {						
		calcTransResult[5] = settleLowestCharge;
	}
	else if ((netAmount*settleRate)>=settleHighestCharge) {
		calcTransResult[5] = settleHighestCharge;
	}
	else {
		calcTransResult[5] = roundUp((netAmount*settleRate),2);
	}	

	//Transaction fee
	if (isBuy) {
		calcTransResult[6] = transactionFee;
	}
	else {
		calcTransResult[6] = transactionFeeSell;
	}

	//Deposit Fee
	if (isBuy && haveDeposit) {
		if (numHand*depositChargeForEachHands<=depositLowestCharge) {
			calcTransResult[7] = depositLowestCharge;
		}
		else if (numHand*depositChargeForEachHands>=depositHighestCharge) {
			calcTransResult[7] = depositHighestCharge;
		}
		else {
			calcTransResult[7] = numHand*depositChargeForEachHands;
		}
	}
	else {
		calcTransResult[7] = 0;
	}

	//Total Charged
	calcTransResult[8] = calcTransResult[1]+calcTransResult[2]+calcTransResult[3]+calcTransResult[4]+calcTransResult[5]+calcTransResult[6]+calcTransResult[7];

	//Balance
	if (isBuy) {
		calcTransResult[9] = calcTransResult[0]+calcTransResult[8];
	}
	else {
		calcTransResult[9] = calcTransResult[0]-calcTransResult[8];
	}
	
	//Handle 0 amount case
	if (calcTransResult[0]<=0) {
		calcTransResult = [0,0,0,0,0,0,0,0,0,0];
	}
	
		
	return (calcTransResult);
}