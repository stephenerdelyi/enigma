function initializeDataHandlers() {
	plugboardInitialize();
	rotorsInitialize();
	reflectorInitialize();
	encryptAInitialize();
	encryptBInitialize();
	settingsInitialize();
	lockInitialize();
}

/*  PLUGBOARD  */
function plugboardInitialize() {
	plugboardCreateEventHandlers();
	plugboardClearPlugDisplay();
	plugboardDownloadCookie();
	plugboardUpdatePlugNumber();
	plugboardUpdatePlugDisplay();
	plugboardUpdateCookie();
}

function plugboardCreateEventHandlers() {
	$("#plugboard-A").change(function() { plugboardUpdatePlugboardData("A") });
	$("#plugboard-B").change(function() { plugboardUpdatePlugboardData("B") });
	$("#plugboard-C").change(function() { plugboardUpdatePlugboardData("C") });
	$("#plugboard-D").change(function() { plugboardUpdatePlugboardData("D") });
	$("#plugboard-E").change(function() { plugboardUpdatePlugboardData("E") });
	$("#plugboard-F").change(function() { plugboardUpdatePlugboardData("F") });
	$("#plugboard-G").change(function() { plugboardUpdatePlugboardData("G") });
	$("#plugboard-H").change(function() { plugboardUpdatePlugboardData("H") });
	$("#plugboard-I").change(function() { plugboardUpdatePlugboardData("I") });
	$("#plugboard-J").change(function() { plugboardUpdatePlugboardData("J") });
	$("#plugboard-K").change(function() { plugboardUpdatePlugboardData("K") });
	$("#plugboard-L").change(function() { plugboardUpdatePlugboardData("L") });
	$("#plugboard-M").change(function() { plugboardUpdatePlugboardData("M") });
	$("#plugboard-N").change(function() { plugboardUpdatePlugboardData("N") });
	$("#plugboard-O").change(function() { plugboardUpdatePlugboardData("O") });
	$("#plugboard-P").change(function() { plugboardUpdatePlugboardData("P") });
	$("#plugboard-Q").change(function() { plugboardUpdatePlugboardData("Q") });
	$("#plugboard-R").change(function() { plugboardUpdatePlugboardData("R") });
	$("#plugboard-S").change(function() { plugboardUpdatePlugboardData("S") });
	$("#plugboard-T").change(function() { plugboardUpdatePlugboardData("T") });
	$("#plugboard-U").change(function() { plugboardUpdatePlugboardData("U") });
	$("#plugboard-V").change(function() { plugboardUpdatePlugboardData("V") });
	$("#plugboard-W").change(function() { plugboardUpdatePlugboardData("W") });
	$("#plugboard-X").change(function() { plugboardUpdatePlugboardData("X") });
	$("#plugboard-Y").change(function() { plugboardUpdatePlugboardData("Y") });
	$("#plugboard-Z").change(function() { plugboardUpdatePlugboardData("Z") });
	
	$('#erasebtn').click(function() { plugboardEraseData(); });
}

function plugboardUpdatePlugboardData(letterIndex) {
	letterValue = document.getElementById("plugboard-" + letterIndex).value.toUpperCase();
	document.getElementById("plugboard-" + letterIndex).value = letterValue; //ensure the letter is capitalized
	
	if (plugboardValidateLetter(letterIndex)) {
		if (document.getElementById("plugboard-" + letterValue).value == "" && plugboardUsedPlugNumber() <= 10) {
		document.getElementById("plugboard-" + letterValue).value = letterIndex;
		//disable the input field
		document.getElementById("plugboard-" + letterIndex).disabled = true;
		document.getElementById("plugboard-" + letterValue).disabled = true;
		
		plugboardUpdatePlugNumber();
		plugboardUpdatePlugDisplay();
		plugboardUpdateCookie();
		plugboardUpdateEnigmaData();
		
		} else {
			document.getElementById("plugboard-" + letterIndex).value = "";
		}
	} else {
		document.getElementById("plugboard-" + letterIndex).value = "";
	}
}

function plugboardClearPlugDisplay(option) {
	ulParentNode = document.getElementById("display-letters").getElementsByTagName("ul")[0];
	ulParentNode.innerHTML = "";
	
	if (option != "full") {
		textData = document.createTextNode("Plugboard disabled");
	    liData = document.createElement("li");
	    liData.appendChild(textData);
	    ulParentNode.appendChild(liData);
	}
}

function plugboardDownloadCookie() {
	dataString = $.cookie("plugboard");
	
	if (dataString) {
		for (i = 1; i <= 26; i++) {
			if (convertNumber(i) != dataString[i]) {
				document.getElementById("plugboard-" + convertNumber(i)).value = dataString[i];
				document.getElementById("plugboard-" + convertNumber(i)).disabled = true;
			}
		}
		plugboardUpdateEnigmaData();
	}
}

function plugboardUpdateCookie() {
	dataString = "-";
	j = 0;
	
	for (i = 1; i <= 26; i++) {
		if (document.getElementById("plugboard-" + convertNumber(i)).value != "") {
			dataString += document.getElementById("plugboard-" + convertNumber(i)).value;
			j++;
		} else {
			dataString += convertNumber(i);
		}
	}
	
	$.cookie("plugboard",dataString);
	
	if (j == 0) {
		plugboardClearPlugDisplay();
	}
}

function plugboardUpdatePlugNumber() {
	document.getElementById("plugboardNum").innerHTML = plugboardUsedPlugNumber();
}

function plugboardUpdatePlugDisplay() {
	dataArray = [];
	j = 0;
	
	for (i = 1; i <= 26; i++) {
    	if (document.getElementById("plugboard-" + convertNumber(i)).value != "" && (!dataArray.includes(convertNumber(i) + document.getElementById("plugboard-" + convertNumber(i)).value) && !dataArray.includes(document.getElementById("plugboard-" + convertNumber(i)).value + convertNumber(i)))) {
	    	dataArray[j] = convertNumber(i) + document.getElementById("plugboard-" + convertNumber(i)).value;
	    	j++;
    	}
    }
    
    ulParentNode = document.getElementById("display-letters").getElementsByTagName("ul")[0];
	plugboardClearPlugDisplay("full");
    
    for (i = 0; i < dataArray.length; i++) {
	    textData = document.createTextNode(dataArray[i]);
	    liData = document.createElement("li");
	    liData.appendChild(textData);
	    ulParentNode.appendChild(liData);
	}
}

function plugboardValidateLetter(letterIndex) {
	regexSelector = /[a-zA-z]/;
	
	if (regexSelector.test(document.getElementById("plugboard-" + letterIndex).value)) {
		return true;
	} else {
		return false;
	}
}

function plugboardUsedPlugNumber() {
	numOfPlugs = 0;
	
	for (i = 1; i <= 26; i++) {
		if (document.getElementById("plugboard-" + convertNumber(i)).value != "") {
			numOfPlugs++;
		}
	}
	
	return numOfPlugs/2;
}

function plugboardUpdateEnigmaData() {
	enigma.resetPlugboardCData($.cookie("plugboard"));
}

function plugboardEraseData() {
	for (i = 1; i <= 26; i++) {
		document.getElementById("plugboard-" + convertNumber(i)).value = "";
		//enable the input fiend
		document.getElementById("plugboard-" + convertNumber(i)).disabled = false;
	}
	
	plugboardUpdatePlugNumber();
	plugboardClearPlugDisplay();
	plugboardUpdateCookie();
	plugboardUpdateEnigmaData();
}

/*  ROTORS  */
function rotorsInitialize() {
	rotorsPositionsCreateEventHandlers();
	rotorsPositionsDownloadCookie();
	rotorsSettingsDownloadCookie();
	makeDraggable("drag-item");
	makeDroppable("drop-item-container");
	rotorsSettingsCreateEventHandlers();
}

function rotorsSettingsCreateEventHandlers() {
	//reset button handler
	$('#rotorSettingResetBtn').click(function() { rotorsSettingsResetSettings(); });
	//rotor position on DOM change event handlers
	document.getElementById('currentRotorSetting3').addEventListener('DOMSubtreeModified', function() { rotorsSettingsUpdateRotorSetting("3"); }, false);
	document.getElementById('currentRotorSetting2').addEventListener('DOMSubtreeModified', function() { rotorsSettingsUpdateRotorSetting("2"); }, false);
	document.getElementById('currentRotorSetting1').addEventListener('DOMSubtreeModified', function() { rotorsSettingsUpdateRotorSetting("1"); }, false);
}

function rotorsSettingsResetSettings() {
	//clear currently inputted data of droppable boxes
	document.getElementById('currentRotorSetting3').innerHTML = "";
	document.getElementById('currentRotorSetting2').innerHTML = "";
	document.getElementById('currentRotorSetting1').innerHTML = "";
	
	//take care of the rest of the draggable boxes
	parentNode = document.getElementsByClassName("drag-item-container");
    
    for (i = 0; i < 8; i++) {
	    parentNode[i].innerHTML = ""; //clear the container data
	    textData = document.createTextNode(i+1);
	    divData = document.createElement("div");
	    divData.className = "drag-item";
	    divData.appendChild(textData); //append data (with class too)
	    parentNode[i].appendChild(divData); //place fresh draggable div inside container 
	}
	
	makeDraggable("drag-item"); //make all new drag items draggable again
	$.cookie("rotorSettings","-000"); //reset the cookie value to null
}

function rotorsSettingsUpdateCookie() {
	dataString = "-";
	
	//function called only once all items are filled or error will occur
	for (i = 3; i >= 1; i--) {
		dataString += document.getElementById("currentRotorSetting" + i).getElementsByClassName("drag-item")[0].innerHTML;
	}
	
	$.cookie("rotorSettings",dataString);
}

function rotorsSettingsDownloadCookie() {
	cookieVal = $.cookie("rotorSettings");
	
	if (cookieVal) {
		rotorSetting = ["-", cookieVal[3], cookieVal[2], cookieVal[1]];
		if (cookieVal != "-000") {
			for (i = 3; i >= 1; i--) {
				textData = document.createTextNode(rotorSetting[i]);
			    divData = document.createElement("div");
			    divData.className = "drag-item";
			    divData.appendChild(textData); //append data (with class too)
			    document.getElementById("currentRotorSetting" + i).appendChild(divData);
			}
			
			parentNode = document.getElementsByClassName("drag-item-container");
			
			for (i = 0; i < 8; i++) {
			    //console.log(i + " " + rotorPos.includes(parentNode[i].getElementsByClassName("drag-item")[0].innerHTML));
			    if (rotorSetting.includes(parentNode[i].getElementsByClassName("drag-item")[0].innerHTML)) {
				    parentNode[i].innerHTML = ""; //clear the container data
			    } else {
				    parentNode[i].innerHTML = ""; //clear the container data
				    textData = document.createTextNode(i+1);
				    divData = document.createElement("div");
				    divData.className = "drag-item";
				    divData.appendChild(textData); //append data (with class too)
				    parentNode[i].appendChild(divData); //place fresh draggable div inside container
			    }
			}
			
			enigma.initalizeRotorSettings(parseInt(cookieVal[1]), parseInt(cookieVal[2]), parseInt(cookieVal[3]));
			rotorsPositionsUpdateEnigma();
		}
	}
}

function rotorsSettingsUpdateRotorSetting(rotorIndex) {
	rotor1 = "";
	rotor2 = "";
	rotor3 = "";
	
	//if currentRotorPos "n" has a drag item inside it
	if (document.getElementById("currentRotorSetting1").getElementsByClassName("drag-item")[0]) {
		//set the value to rotor 1
		rotor1 = document.getElementById("currentRotorSetting1").getElementsByClassName("drag-item")[0].innerHTML;
	}
	if (document.getElementById("currentRotorSetting2").getElementsByClassName("drag-item")[0]) {
		rotor2 = document.getElementById("currentRotorSetting2").getElementsByClassName("drag-item")[0].innerHTML;
	}
	if (document.getElementById("currentRotorSetting3").getElementsByClassName("drag-item")[0]) {
		rotor3 = document.getElementById("currentRotorSetting3").getElementsByClassName("drag-item")[0].innerHTML;
	}
	
	//if rotor 1 2 and 3 are filled, update the cookie
	if (rotor1 != "" && rotor2 != "" && rotor3 != "") {
		rotorsSettingsUpdateCookie();
		enigma.initalizeRotorSettings(parseInt(rotor3), parseInt(rotor2), parseInt(rotor1));
		rotorsPositionsUpdateEnigma();
	}
}

function rotorsSettingsGetCurrentValue(rotorSelection) {
	if (document.getElementById("currentRotorSetting" + rotorSelection).getElementsByClassName("drag-item")[0]) {
		return document.getElementById("currentRotorSetting" + rotorSelection).getElementsByClassName("drag-item")[0].innerHTML;
	}
	
	return null;
}

function rotorsPositionsCreateEventHandlers() {
	$('#rotor-up-btn-3').click(function() { rotorsPositionsBtnClick("up", "3") });
	$('#rotor-up-btn-2').click(function() { rotorsPositionsBtnClick("up", "2") });
	$('#rotor-up-btn-1').click(function() { rotorsPositionsBtnClick("up", "1") });
	$('#rotor-down-btn-3').click(function() { rotorsPositionsBtnClick("down", "3") });
	$('#rotor-down-btn-2').click(function() { rotorsPositionsBtnClick("down", "2") });
	$('#rotor-down-btn-1').click(function() { rotorsPositionsBtnClick("down", "1") });
	$("#rotorPosition3").change(function() { rotorsPositionsUpdateRotorPosition("3"); });
	$("#rotorPosition2").change(function() { rotorsPositionsUpdateRotorPosition("2"); });
	$("#rotorPosition1").change(function() { rotorsPositionsUpdateRotorPosition("1"); });
}

function rotorsPositionsUpdateRotorPosition(positionSelector) {
	regexSelector = /[a-zA-z]/;
	
	if (regexSelector.test(document.getElementById("rotorPosition" + positionSelector).value)) {
		rotorsPositionsMakeCapital();
		rotorsPositionsUpdateCookie();
		rotorsPositionsUpdateEnigma();
	} else {
		document.getElementById("rotorPosition" + positionSelector).value = "";
	}
}

function rotorsPositionsBtnClick(btnType, btnNum) {
	if (document.getElementById("rotorPosition" + btnNum).value != "") {
		rotorsPositionsMakeCapital();
		currentLetterValue = document.getElementById("rotorPosition" + btnNum).value;
		newValue = "";
		if (btnType == "up") {
			if (currentLetterValue != "A") {
				newValue = convertNumber(convertLetter(currentLetterValue) - 1);
			} else {
				newValue = "Z";
			}
		} else if (btnType == "down") {
			if (currentLetterValue != "Z") {
				newValue = convertNumber(convertLetter(currentLetterValue) + 1);
			} else {
				newValue = "A";
			}
		}
		document.getElementById("rotorPosition" + btnNum).setAttribute("value", newValue);
		document.getElementById("rotorPosition" + btnNum).value = newValue;
		
		rotorsPositionsUpdateCookie();
		rotorsPositionsUpdateEnigma();
	}
}

function rotorsPositionsUpdateCookie() {
	dataString = "-";
	
	for (i = 3; i >= 1; i--) {
		dataString += document.getElementById("rotorPosition" + i).value;
	}
	
	if (dataString.length >= 4) {
		$.cookie("rotorPositions",dataString);
	}
}

function rotorsPositionsDownloadCookie() {
	cookieVal = $.cookie("rotorPositions");
	
	if (cookieVal) {
		rotorPos = ["-", cookieVal[1], cookieVal[2], cookieVal[3]];
		for (i = 3; i >= 1; i--) {
			document.getElementById("rotorPosition" + i).setAttribute("value", cookieVal[4 - i]);
		}
	}
}

function rotorsPositionsUpdateEnigma() {
	enigma.setRotorPosition(1, document.getElementById("rotorPosition1").value);
	enigma.setRotorPosition(2, document.getElementById("rotorPosition2").value);
	enigma.setRotorPosition(3, document.getElementById("rotorPosition3").value);
}

function rotorsPositionsMakeCapital() {
	for (i = 1; i <= 3; i++) {
		if (document.getElementById("rotorPosition" + i).value != "") {
			newChar = document.getElementById("rotorPosition" + i).value.toUpperCase();
			document.getElementById("rotorPosition" + i).setAttribute("value", newChar);
			document.getElementById("rotorPosition" + i).value = newChar;
		}
	}
}

function rotorsPositionsIncrementLetter() {
	currentRotor3Position = document.getElementById("currentRotorSetting3").getElementsByClassName("drag-item")[0].innerHTML;
	currentRotor2Position = document.getElementById("currentRotorSetting2").getElementsByClassName("drag-item")[0].innerHTML;
	currentRotor1Position = document.getElementById("currentRotorSetting1").getElementsByClassName("drag-item")[0].innerHTML;
	
	document.getElementById("rotorPosition3").value = convertNumber(enigma.rotors[currentRotor3Position].position);
	document.getElementById("rotorPosition3").setAttribute("value", convertNumber(enigma.rotors[currentRotor3Position].position));
	document.getElementById("rotorPosition2").value = convertNumber(enigma.rotors[currentRotor2Position].position);
	document.getElementById("rotorPosition2").setAttribute("value", convertNumber(enigma.rotors[currentRotor2Position].position));
	document.getElementById("rotorPosition1").value = convertNumber(enigma.rotors[currentRotor1Position].position);
	document.getElementById("rotorPosition1").setAttribute("value", convertNumber(enigma.rotors[currentRotor1Position].position));
}

/*  REFLECTOR  */
function reflectorInitialize() {
	reflectorCreateEventHandlers();
	reflectorDownloadCookie();
}

function reflectorCreateEventHandlers() {
	$('#reflector-btn-A').click(function() { reflectorBtnClick("A") });
	$('#reflector-btn-B').click(function() { reflectorBtnClick("B") });
	$('#reflector-btn-C').click(function() { reflectorBtnClick("C") });
}

function reflectorBtnClick(btnEvent) {
	beforeChange = "";
	
	//set before change value (used for reflector deselect)
	if (document.querySelector(".reflector-btn.active")) {
		beforeChange = document.querySelector(".reflector-btn.active").innerHTML;
	}
	
	//remove the active class on all reflector items
	for (i = 1; i <= 3; i++) {
		document.getElementById("reflector-btn-" + convertNumber(i)).className = document.getElementById("reflector-btn-" + convertNumber(i)).className.replace(" active","");
	}
	
	//if the user did not click on an already active reflector button
	if (beforeChange != btnEvent) {
		for (i = 1; i <= 3; i++) {
			if (document.getElementById("reflector-btn-" + convertNumber(i)).innerText == btnEvent) {
				document.getElementById("reflector-btn-" + convertNumber(i)).className += " active";
			}
		}
		reflectorUpdateEnigma();
		reflectorUpdateCookie();
	}
}

function reflectorUpdateCookie() {
	$.cookie("reflectorChoice",document.querySelectorAll(".reflector-btn.active")[0].innerHTML);
}

function reflectorDownloadCookie() {
	if ($.cookie("reflectorChoice")) {
		reflectorBtnClick($.cookie("reflectorChoice"));
		reflectorUpdateEnigma();
	}
}

function reflectorUpdateEnigma() {
	enigma.useReflector = document.querySelectorAll(".reflector-btn.active")[0].innerHTML;
}

/*  ENCRYPT  */
function encryptAInitialize() {
	encryptACreateEventHandlers();
}

function encryptACreateEventHandlers() {
	$('#encrypt-btn').click(function() { encryptABtnClick(); });
	$('#verify-btn').click(function() { encryptACheckButton(); });
	$('#erasebtnA').click(function() { encryptAEraseBtn(); });
	$('#downloadbtnA').click(function() { encryptADownloadData(); });
	$('#settingsbtn').click(function() { changeTab(null, "settings"); });
	$('#switchA').click(function() { changeTab(null, "encryptB"); });
}

function encryptAEraseBtn() {
	document.getElementById("encrypt-input").value = "";
	document.getElementById("encrypt-output").value = "";
	document.getElementById("textbox-updater").innerHTML = "Output:";
	
	if (document.getElementById("copybtnA").className != "hide") {
		document.getElementById("copybtnA").className += "hide";	
	}
	if (document.getElementById("downloadbtnA").className != "hide") {
		document.getElementById("downloadbtnA").className += "hide";	
	}
	
	encryptARemoveStyles();
	encryptAClearFormValues();
	disableButton("encrypt-btn");
}

function encryptAUpdateFormValues() {
	rotorSettingsArr = $.cookie("rotorSettings");
	RotorSettings1 = rotorSettingsArr[1];
	RotorSettings2 = rotorSettingsArr[2];
	RotorSettings3 = rotorSettingsArr[3];
	finalRotorSettings = RotorSettings1 + " " + RotorSettings2 + " " + RotorSettings3;
	
	rotorPositionsArr = $.cookie("rotorPositions");
	rotorPositions1 = rotorPositionsArr[1];
	rotorPositions2 = rotorPositionsArr[2];
	rotorPositions3 = rotorPositionsArr[3];
	finalRotorPositions = rotorPositions1 + " " + rotorPositions2 + " " + rotorPositions3;
		
	document.getElementById("plugboardData").value = encryptAGetPlugboardPrintout();
	document.getElementById("rotorSettingsData").value = finalRotorSettings;
	document.getElementById("rotorPositionsData").value = finalRotorPositions;
	document.getElementById("reflectorData").value = $.cookie("reflectorChoice");
}

function encryptAClearFormValues() {
	document.getElementById("plugboardData").value = "";
	document.getElementById("rotorSettingsData").value = "";
	document.getElementById("rotorPositionsData").value = "";
	document.getElementById("reflectorData").value = "";
}

function encryptADownloadData() {
	unencryptedText = document.getElementById("encrypt-input").value.toUpperCase();
	encryptedText = document.getElementById("encrypt-output").value;
	plugboard = document.getElementById("plugboardData").value;
	rotorSettings = document.getElementById("rotorSettingsData").value;
	rotorPositions = document.getElementById("rotorPositionsData").value;
	reflector = document.getElementById("reflectorData").value;
	
	downloadText = "ENIGMA ENCRYPTION:\n";
	downloadText += "-----------------------------------------------------\n";
	downloadText += "PLUGBOARD:      " + plugboard + "\nROTOR SETTING:  " + rotorSettings + "\nROTOR POSITION: " + rotorPositions + "\nREFLECTOR:      " + reflector + "\n";
	downloadText += "-----------------------------------------------------\n";
	downloadText += "INPUT: " + unencryptedText + "\n";
	downloadText += "-----------------------------------------------------\n";
	downloadText += "-----------------------------------------------------\n";
	downloadText += "OUTPUT: " + encryptedText;
	
	download("enigma-encryption.txt", downloadText);
}

function encryptAGetPlugboardPrintout() {
	returnText = "";
	dataArray = $.cookie("plugboard");
    
    for (i = 1; i <= 26; i++) {
        if (returnText.indexOf(convertNumber(i)) > -1) {
	        hasDuplicate = true;
        } else {
	        hasDuplicate = false;
        }
        if (dataArray[i] != convertNumber(i) && !hasDuplicate) {
            returnText = returnText + "[" + convertNumber(i) + dataArray[i] + "]";
        }
    }
    
    if (returnText != "") {
	    return returnText;
    } else {
	    return "Plugboard Disabled";
    }
}

function encryptACheckButton() {
	flagCount = 0;
	errorString = "";
	
	for (i = 0; i < 4; i++) {
		document.getElementsByClassName("data-pt")[i].className = document.getElementsByClassName("data-pt")[i].className.replace(" not-verified","");
		document.getElementsByClassName("data-pt")[i].className = document.getElementsByClassName("data-pt")[i].className.replace(" verified","");
		document.getElementsByClassName("data-pt")[i].className += " verified";
	}
	
	document.getElementById("encrypt-input").className = document.getElementById("encrypt-input").className.replace(" not-verified", "");
	document.getElementById("encrypt-input").className = document.getElementById("encrypt-input").className.replace(" verified", "");
	document.getElementById("encrypt-input").className += " verified-text";
	
	if (document.getElementById("currentRotorSetting3").innerHTML == "") {
		errorString += "Rotor setting 3 not placed\n";
		document.getElementsByClassName("data-pt")[1].className = document.getElementsByClassName("data-pt")[1].className.replace(" not-verified","");
		document.getElementsByClassName("data-pt")[1].className = document.getElementsByClassName("data-pt")[1].className.replace(" verified","");
		document.getElementsByClassName("data-pt")[1].className += " not-verified";
		flagCount++;
	}
	if (document.getElementById("currentRotorSetting2").innerHTML == "") {
		errorString += "Rotor setting 2 not placed\n";
		document.getElementsByClassName("data-pt")[1].className = document.getElementsByClassName("data-pt")[1].className.replace(" not-verified","");
		document.getElementsByClassName("data-pt")[1].className = document.getElementsByClassName("data-pt")[1].className.replace(" verified","");
		document.getElementsByClassName("data-pt")[1].className += " not-verified";
		flagCount++;
	}
	if (document.getElementById("currentRotorSetting1").innerHTML == "") {
		errorString += "Rotor setting 1 not placed\n";
		document.getElementsByClassName("data-pt")[1].className = document.getElementsByClassName("data-pt")[1].className.replace(" not-verified","");
		document.getElementsByClassName("data-pt")[1].className = document.getElementsByClassName("data-pt")[1].className.replace(" verified","");
		document.getElementsByClassName("data-pt")[1].className += " not-verified";
		flagCount++;
	}
	if (document.getElementById("rotorPosition3").value == "") {
		errorString += "Rotor position 3 not filled out\n";
		document.getElementsByClassName("data-pt")[2].className = document.getElementsByClassName("data-pt")[2].className.replace(" not-verified","");
		document.getElementsByClassName("data-pt")[2].className = document.getElementsByClassName("data-pt")[2].className.replace(" verified","");
		document.getElementsByClassName("data-pt")[2].className += " not-verified";
		flagCount++;
	}
	if (document.getElementById("rotorPosition2").value == "") {
		errorString += "Rotor position 2 not filled out\n";
		document.getElementsByClassName("data-pt")[2].className = document.getElementsByClassName("data-pt")[2].className.replace(" not-verified","");
		document.getElementsByClassName("data-pt")[2].className = document.getElementsByClassName("data-pt")[2].className.replace(" verified","");
		document.getElementsByClassName("data-pt")[2].className += " not-verified";
		flagCount++;
	}
	if (document.getElementById("rotorPosition1").value == "") {
		errorString += "Rotor position 1 not filled out\n";
		document.getElementsByClassName("data-pt")[2].className = document.getElementsByClassName("data-pt")[2].className.replace(" not-verified","");
		document.getElementsByClassName("data-pt")[2].className = document.getElementsByClassName("data-pt")[2].className.replace(" verified","");
		document.getElementsByClassName("data-pt")[2].className += " not-verified";
		flagCount++;
	}
	if (document.querySelector(".reflector-btn.active") == null) {
		errorString += "No reflector selected\n";
		document.getElementsByClassName("data-pt")[3].className = document.getElementsByClassName("data-pt")[3].className.replace(" not-verified","");
		document.getElementsByClassName("data-pt")[3].className = document.getElementsByClassName("data-pt")[3].className.replace(" verified","");
		document.getElementsByClassName("data-pt")[3].className += " not-verified";
		flagCount++;
	}
	if (document.getElementById("encrypt-input").value == "") {
		errorString += "No text to encrypt\n";
		document.getElementById("encrypt-input").className = document.getElementById("encrypt-input").className.replace(" verified-text","");
		document.getElementById("encrypt-input").className += " not-verified-text";
		flagCount++;
	}
		
	if (flagCount > 0) {
		disableButton("encrypt-btn");
		document.getElementById("encrypt-output").value = errorString;
		document.getElementById("textbox-updater").innerHTML = "Errors:";
	} else {
		enableButton("encrypt-btn");
		encryptAUpdateFormValues();
		document.getElementById("encrypt-output").value = "Ready to encrypt";
		document.getElementById("textbox-updater").innerHTML = "Output:";
	}
}

function encryptABtnClick() {
	document.getElementById("copybtnA").className = document.getElementById("copybtnA").className.replace("hide","");
	document.getElementById("downloadbtnA").className = document.getElementById("downloadbtnA").className.replace("hide","");
	unencryptedText = document.getElementById("encrypt-input").value.toUpperCase();
	encryptedText = "";
	regexSelector = /[a-zA-z]/;
	
	for (i = 0; i < unencryptedText.length; i++) {
		if (regexSelector.test(unencryptedText[i])) {
			encryptedText += enigma.encrypt(unencryptedText[i]);
			rotorsPositionsIncrementLetter();
		} else {
			encryptedText += unencryptedText[i];
		}
	}
	
	document.getElementById("encrypt-output").value = encryptedText;
	rotorsPositionsUpdateCookie();
	encryptAUpdateDisplayValues();
	disableButton("encrypt-btn");
}

function encryptARemoveStyles() {
	for (i = 0; i < 4; i++) {
		document.getElementsByClassName("data-pt")[i].className = document.getElementsByClassName("data-pt")[i].className.replace(" not-verified","");
		document.getElementsByClassName("data-pt")[i].className = document.getElementsByClassName("data-pt")[i].className.replace(" verified","");
	}
	
	document.getElementById("encrypt-input").className = document.getElementById("encrypt-input").className.replace(" not-verified", "");
	document.getElementById("encrypt-input").className = document.getElementById("encrypt-input").className.replace(" verified", "");
}

function encryptAUpdateDisplayValues() {
	usedPlugboardNum = plugboardUsedPlugNumber().toString();
	rotorSetting3 = "-";
	rotorSetting2 = "-";
	rotorSetting1 = "-";
	rotorPosition3 = "-";
	rotorPosition2 = "-";
	rotorPosition1 = "-";
	useReflector = "-";
	
	if (document.getElementById("currentRotorSetting3").innerHTML != "") {
		rotorSetting3 = document.getElementById("currentRotorSetting3").getElementsByClassName("drag-item")[0].innerHTML;
	}
	if (document.getElementById("currentRotorSetting2").innerHTML != "") {
		rotorSetting2 = document.getElementById("currentRotorSetting2").getElementsByClassName("drag-item")[0].innerHTML;
	}
	if (document.getElementById("currentRotorSetting1").innerHTML != "") {
		rotorSetting1 = document.getElementById("currentRotorSetting1").getElementsByClassName("drag-item")[0].innerHTML;
	}
	if (document.getElementById("rotorPosition3").value != "") {
		rotorPosition3 = document.getElementById("rotorPosition3").value;
	}
	if (document.getElementById("rotorPosition2").value != "") {
		rotorPosition2 = document.getElementById("rotorPosition2").value;
	}
	if (document.getElementById("rotorPosition1").value != "") {
		rotorPosition1 = document.getElementById("rotorPosition1").value;
	}
	if (document.querySelector(".reflector-btn.active")) {
		useReflector = document.querySelector(".reflector-btn.active").innerHTML;
	}
	
	document.getElementsByClassName("data-pt")[0].innerHTML = usedPlugboardNum + "/10";
	document.getElementsByClassName("data-pt")[1].innerHTML = rotorSetting3 + " " + rotorSetting2 + " " + rotorSetting1;
	document.getElementsByClassName("data-pt")[2].innerHTML = rotorPosition3 + " " + rotorPosition2 + " " + rotorPosition1;
	document.getElementsByClassName("data-pt")[3].innerHTML = useReflector;
}

function encryptBInitialize() {
	encryptBCreateEventHandlers();
}

function encryptBCreateEventHandlers() {
	$('#verifyB-btn').click(function() { encryptBCheck(); });
	$('#erasebtnB').click(function() { encryptBErase(); });
	$('#switchB').click(function() { changeTab(null, "encryptA"); });
}

function encryptBErase() {
	for (i = 1; i <= 26; i++) {
		document.getElementById("lampboard-" + convertNumber(i)).className = document.getElementById("lampboard-" + convertNumber(i)).className.replace(" active", "");
	}
	
	encryptBRemoveStyles();
	encryptBDisallowEncrypt();
}

function encryptBRemoveStyles() {
	for (i = 0; i < 4; i++) {
		document.getElementsByClassName("dataB-pt")[i].className = document.getElementsByClassName("dataB-pt")[i].className.replace(" not-verified","");
		document.getElementsByClassName("dataB-pt")[i].className = document.getElementsByClassName("dataB-pt")[i].className.replace(" verified","");
	}
}

function encryptBCheck() {
	flagCount = 0;
	
	for (i = 0; i < 4; i++) {
		document.getElementsByClassName("dataB-pt")[i].className = document.getElementsByClassName("dataB-pt")[i].className.replace(" not-verified","");
		document.getElementsByClassName("dataB-pt")[i].className = document.getElementsByClassName("dataB-pt")[i].className.replace(" verified","");
		document.getElementsByClassName("dataB-pt")[i].className += " verified";
	}
	
	if (document.getElementById("currentRotorSetting3").innerHTML == "") {
		document.getElementsByClassName("dataB-pt")[1].className = document.getElementsByClassName("dataB-pt")[1].className.replace(" not-verified","");
		document.getElementsByClassName("dataB-pt")[1].className = document.getElementsByClassName("dataB-pt")[1].className.replace(" verified","");
		document.getElementsByClassName("dataB-pt")[1].className += " not-verified";
		flagCount++;
	}
	if (document.getElementById("currentRotorSetting2").innerHTML == "") {
		document.getElementsByClassName("dataB-pt")[1].className = document.getElementsByClassName("dataB-pt")[1].className.replace(" not-verified","");
		document.getElementsByClassName("dataB-pt")[1].className = document.getElementsByClassName("dataB-pt")[1].className.replace(" verified","");
		document.getElementsByClassName("dataB-pt")[1].className += " not-verified";
		flagCount++;
	}
	if (document.getElementById("currentRotorSetting1").innerHTML == "") {
		document.getElementsByClassName("dataB-pt")[1].className = document.getElementsByClassName("dataB-pt")[1].className.replace(" not-verified","");
		document.getElementsByClassName("dataB-pt")[1].className = document.getElementsByClassName("dataB-pt")[1].className.replace(" verified","");
		document.getElementsByClassName("dataB-pt")[1].className += " not-verified";
		flagCount++;
	}
	if (document.getElementById("rotorPosition3").value == "") {
		document.getElementsByClassName("dataB-pt")[2].className = document.getElementsByClassName("dataB-pt")[2].className.replace(" not-verified","");
		document.getElementsByClassName("dataB-pt")[2].className = document.getElementsByClassName("dataB-pt")[2].className.replace(" verified","");
		document.getElementsByClassName("dataB-pt")[2].className += " not-verified";
		flagCount++;
	}
	if (document.getElementById("rotorPosition2").value == "") {
		document.getElementsByClassName("dataB-pt")[2].className = document.getElementsByClassName("dataB-pt")[2].className.replace(" not-verified","");
		document.getElementsByClassName("dataB-pt")[2].className = document.getElementsByClassName("dataB-pt")[2].className.replace(" verified","");
		document.getElementsByClassName("dataB-pt")[2].className += " not-verified";
		flagCount++;
	}
	if (document.getElementById("rotorPosition1").value == "") {
		document.getElementsByClassName("dataB-pt")[2].className = document.getElementsByClassName("dataB-pt")[2].className.replace(" not-verified","");
		document.getElementsByClassName("dataB-pt")[2].className = document.getElementsByClassName("dataB-pt")[2].className.replace(" verified","");
		document.getElementsByClassName("dataB-pt")[2].className += " not-verified";
		flagCount++;
	}
	if (document.querySelector(".reflector-btn.active") == null) {
		document.getElementsByClassName("dataB-pt")[3].className = document.getElementsByClassName("dataB-pt")[3].className.replace(" not-verified","");
		document.getElementsByClassName("dataB-pt")[3].className = document.getElementsByClassName("dataB-pt")[3].className.replace(" verified","");
		document.getElementsByClassName("dataB-pt")[3].className += " not-verified";
		flagCount++;
	}
		
	if (flagCount > 0) {
		encryptBDisallowEncrypt();
	} else {
		encryptBAllowEncrypt();
	}
}

function encryptBUpdateDisplayValues() {
	usedPlugboardNum = plugboardUsedPlugNumber().toString();
	rotorSetting3 = "-";
	rotorSetting2 = "-";
	rotorSetting1 = "-";
	rotorPosition3 = "-";
	rotorPosition2 = "-";
	rotorPosition1 = "-";
	useReflector = "-";
	
	if (document.getElementById("currentRotorSetting3").innerHTML != "") {
		rotorSetting3 = document.getElementById("currentRotorSetting3").getElementsByClassName("drag-item")[0].innerHTML;
	}
	if (document.getElementById("currentRotorSetting2").innerHTML != "") {
		rotorSetting2 = document.getElementById("currentRotorSetting2").getElementsByClassName("drag-item")[0].innerHTML;
	}
	if (document.getElementById("currentRotorSetting1").innerHTML != "") {
		rotorSetting1 = document.getElementById("currentRotorSetting1").getElementsByClassName("drag-item")[0].innerHTML;
	}
	if (document.getElementById("rotorPosition3").value != "") {
		rotorPosition3 = document.getElementById("rotorPosition3").value;
	}
	if (document.getElementById("rotorPosition2").value != "") {
		rotorPosition2 = document.getElementById("rotorPosition2").value;
	}
	if (document.getElementById("rotorPosition1").value != "") {
		rotorPosition1 = document.getElementById("rotorPosition1").value;
	}
	if (document.querySelector(".reflector-btn.active")) {
		useReflector = document.querySelector(".reflector-btn.active").innerHTML;
	}
	
	document.getElementsByClassName("dataB-pt")[0].innerHTML = usedPlugboardNum + "/10";
	document.getElementsByClassName("dataB-pt")[1].innerHTML = rotorSetting3 + " " + rotorSetting2 + " " + rotorSetting1;
	document.getElementsByClassName("dataB-pt")[2].innerHTML = rotorPosition3 + " " + rotorPosition2 + " " + rotorPosition1;
	document.getElementsByClassName("dataB-pt")[3].innerHTML = useReflector;
}

function encryptBAllowEncrypt() {
	document.getElementById("encrypt-ready-message").innerHTML = "Encryption Ready";
	$("body").keypress(function(event) { encryptBEncrypt(event.key.toUpperCase()); })
}

function encryptBEncrypt(letter) {
	regexSelector = /[a-zA-z]/;
	
	if (regexSelector.test(letter)) {
		encryptedLetter = enigma.encrypt(letter);
		
		for (i = 1; i <= 26; i++) {
			document.getElementById("lampboard-" + convertNumber(i)).className = document.getElementById("lampboard-" + convertNumber(i)).className.replace(" active", "");
			if (document.getElementById("lampboard-" + convertNumber(i)).getElementsByTagName("p")[0].innerHTML == encryptedLetter) {
				document.getElementById("lampboard-" + convertNumber(i)).className += " active";
			}
		}
		
		for (i = 3; i >= 1; i--) {
			document.getElementById("rotorPosition" + i).value = convertNumber(enigma.rotors[enigma.rotorSettings[i]].position);
		}
		
		rotorsPositionsUpdateCookie();
		encryptBUpdateDisplayValues();
	}
}

function encryptBDisallowEncrypt() {
	document.getElementById("encrypt-ready-message").innerHTML = "Encryption Not Ready";
	$("body").off();
}

/*  SETTINGS  */

function settingsInitialize() {
	enableAutoTab("form.password input");
	settingsCreateEventHandlers();
	checkPasswordUpdate();
}

function checkPasswordUpdate() {
	pinDot = "*";
	if ($.cookie("pin")) {
		document.getElementById("pin-1").value = pinDot;
		document.getElementById("pin-2").value = pinDot;
		document.getElementById("pin-3").value = pinDot;
		document.getElementById("pin-4").value = pinDot;
	}
	if ($.cookie("usePassword")) {
		if ($.cookie("usePassword") == "yes") {
			document.getElementById("password-enabled").innerHTML = "yes";
			document.getElementById("disable-pass-btn").className = document.getElementById("disable-pass-btn").className.replace(" disabled", "");
		} else {
			document.getElementById("password-enabled").innerHTML = "no";
			document.getElementById("disable-pass-btn").className += " disabled";
		}
	} else {
		document.getElementById("password-enabled").innerHTML = "no";
	}
}

function settingsCreateEventHandlers() {
	$("#pin-1").change(function() { settingsPinChanged(); });
	$("#pin-2").change(function() { settingsPinChanged(); });
	$("#pin-3").change(function() { settingsPinChanged(); });
	$("#pin-4").change(function() { settingsPinChanged(); });
	$("#disable-pass-btn").click(function() { settingsDisablePassword(); });
	$("#erase-memory").click(function() { settingsEraseAllData(); });
}

function settingsEraseAllData(override) {
	handle = document.getElementById("erase-memory");
	if (handle.getAttribute("data-chance") == "0" && override == null) {
		handle.setAttribute("data-chance", "1");
		handle.className += " alert";
		handle.innerHTML = "Are you sure?";
	} else if (handle.getAttribute("data-chance") == "1" || override == 1) {
		$.removeCookie("lastUsedTab");
		$.removeCookie("pin");
		$.removeCookie("plugboard");
		$.removeCookie("reflectorChoice");
		$.removeCookie("rotorSettings");
		$.removeCookie("rotorPositions");
		$.removeCookie("usePassword");
		$.removeCookie("isLocked");
		location.reload();
	}
}

function settingsResetEraseMemoryBtn() {
	handle = document.getElementById("erase-memory");
	handle.setAttribute("data-chance", "0");
	handle.innerHTML = "Erase All Memory";
	handle.className = handle.className.replace(" alert","");
}

function settingsDisablePassword() {
	if ($.cookie("usePassword")) {
		$.cookie("usePassword","no");
	}
	if ($.cookie("pin")) {
		$.removeCookie("pin");
	}
	for (i = 1; i <= 4; i++) {
		document.getElementById("pin-" + i).value = "";
		document.getElementById("pin-" + i).setAttribute("value", "");
	}
	document.getElementById("password-enabled").innerHTML = "no";
	document.getElementById("disable-pass-btn").className += " disabled";
	document.getElementById("pin-1").className = document.getElementById("pin-1").className.replace(" disabled", "");
	document.getElementById("pin-2").className = document.getElementById("pin-2").className.replace(" disabled", "");
	document.getElementById("pin-3").className = document.getElementById("pin-3").className.replace(" disabled", "");
	document.getElementById("pin-4").className = document.getElementById("pin-4").className.replace(" disabled", "");
	swal({
		title: "Password Disabled.",
		text: " ",
		icon: "success",
		buttons: false,
		timer: 2000,
	});
}

function settingsPinChanged() {
	pin1Val = document.getElementById("pin-1").value;
	pin2Val = document.getElementById("pin-2").value;
	pin3Val = document.getElementById("pin-3").value;
	pin4Val = document.getElementById("pin-4").value;
	pinDot = "*";
	
	if (pin1Val != "" && pin2Val != "" && pin3Val != "" && pin4Val != "" && pin1Val != pinDot && pin2Val != pinDot && pin3Val != pinDot && pin4Val != pinDot) {
		$.cookie("usePassword","yes");
		pin = pin1Val + pin2Val + pin3Val + pin4Val;
		pin = settingsHashPin(pin);
		$.cookie("pin",pin);
		document.getElementById("password-enabled").innerHTML = "yes";
		document.getElementById("pin-1").value = pinDot;
		document.getElementById("pin-2").value = pinDot;
		document.getElementById("pin-3").value = pinDot;
		document.getElementById("pin-4").value = pinDot;
		document.getElementById("pin-1").className += " disabled";
		document.getElementById("pin-2").className += " disabled";
		document.getElementById("pin-3").className += " disabled";
		document.getElementById("pin-4").className += " disabled";
		document.getElementById("disable-pass-btn").className = document.getElementById("disable-pass-btn").className.replace(" disabled", "");
		swal({
			title: "Password Enabled.",
			text: "Your pin is: " + lockUnhashPin(pin) + ".",
			icon: "success",
		});
	} else {
		$.cookie("usePassword","no");
		$.removeCookie("pin");
		document.getElementById("password-enabled").innerHTML = "no";
	}
}

function settingsHashPin(pin) {
	pinEnigma = new Enigma;
	encryptedText = "";
	
	setOneLetters = settingsMakeLetterSettings();
	setTwoLetters = settingsMakeLetterSettings();
	setThreeLetters = settingsMakeLetterSettings();
	
	settingsChangeEnigmaSettings(pinEnigma, "B", "341", setOneLetters, "A");
	for (i = 0; i < pin.length; i++) {
		useLetter = convertNumber(parseInt(pin[i]) + 1);
		encryptedText += pinEnigma.encrypt(useLetter);
	}
	
	settingsChangeEnigmaSettings(pinEnigma, "C", "674", setTwoLetters, "B");
	for (i = 0; i < pin.length; i++) {
		useLetter = convertNumber(parseInt(pin[i]) + 1);
		encryptedText += pinEnigma.encrypt(useLetter);
	}
	
	settingsChangeEnigmaSettings(pinEnigma, "A", "825", setThreeLetters, "C");
	for (i = 0; i < pin.length; i++) {
		useLetter = convertNumber(parseInt(pin[i]) + 1);
		encryptedText += pinEnigma.encrypt(useLetter);
	}
	
	encryptedText+= setOneLetters + setTwoLetters + setThreeLetters;
			
	return encryptedText;
}

function settingsMakeLetterSettings() {
	letterSettings = "";
	for (i = 0; i < 3; i++) {
		letterSettings += convertNumber(Math.floor(Math.random()*26) + 1);
	}
	return letterSettings;
}

function settingsChangeEnigmaSettings(pinEnigma, usePlugboard, useRotorSettings, useRotorPositions, useReflector) {
	pinEnigma.usePlugboard = usePlugboard;
	pinEnigma.rotorSettings[3] = parseInt(useRotorSettings[2]);
	pinEnigma.rotorSettings[2] = parseInt(useRotorSettings[1]);
	pinEnigma.rotorSettings[1] = parseInt(useRotorSettings[0]);
	pinEnigma.setRotorPosition(3,useRotorPositions[2]);
	pinEnigma.setRotorPosition(2,useRotorPositions[1]);
	pinEnigma.setRotorPosition(1,useRotorPositions[0]);
	pinEnigma.useReflector = useReflector;
}

/*  LOCK  */
function lockInitialize() {
	enableAutoTab("form.password input");
	lockCreateEventHandlers();
}

function lockCreateEventHandlers() {
	$("#pinL-1").change(function() { lockPinChanged(); });
	$("#pinL-2").change(function() { lockPinChanged(); });
	$("#pinL-3").change(function() { lockPinChanged(); });
	$("#pinL-4").change(function() { lockPinChanged(); });
	$("#clear-btn").click(function() { lockClearEnteredPin(); });
	$("#unlock-btn").click(function() { $("#unlock-btn").effect("shake",{times: 1, distance: 5}); });
	$('#lockbtn').click(function() { lockScreen(); lockSuccessfulLock(); });
	$("#lockbtn").pressAndHold({progressIndicatorOpacity: 0});
	
	$("#lockbtn").on('complete.pressAndHold', function(event) {
		lockForgotPassword();
	});
}

function lockForgotPassword() {
	if ($.cookie("isLocked") == "yes") {
		swal({
			title: "Forgot Password?",
			text: "You can erase your personal data to unlock Enigma.\nWould you like to do this?",
			icon: "warning",
			buttons: ["Cancel","Erase"],
			dangerMode: true,
		}).then((value) => {
			if (value == true) {
				settingsEraseAllData(1);
			}
		});
	}
}

function lockClearEnteredPin() {
	for (i = 1; i <= 4; i++) {
		document.getElementById("pinL-" + i).value = "";
		document.getElementById("pinL-" + i).setAttribute("value", "");
	}
	
	document.getElementById("pinL-1").select();
}

function lockUnhashPin(pin) {
	pinEnigma = new Enigma;
	unencryptedText1 = "";
	unencryptedText2 = "";
	unencryptedText3 = "";
	
	setOneLetters = pin.charAt(12) + pin.charAt(13) + pin.charAt(14);
	setTwoLetters = pin.charAt(15) + pin.charAt(16) + pin.charAt(17);
	setThreeLetters = pin.charAt(18) + pin.charAt(19) + pin.charAt(20);
	
	settingsChangeEnigmaSettings(pinEnigma, "B", "341", setOneLetters, "A");
	for (i = 0; i <= 3; i++) {	
		useLetter = pinEnigma.encrypt(pin[i]);
		unencryptedText1 += convertLetter(useLetter) - 1;
	} 
	
	settingsChangeEnigmaSettings(pinEnigma, "C", "674", setTwoLetters, "B");
	for (i = 4; i <= 7; i++) {
		useLetter = pinEnigma.encrypt(pin[i]);
		unencryptedText2 += convertLetter(useLetter) - 1;
	}
	
	settingsChangeEnigmaSettings(pinEnigma, "A", "825", setThreeLetters, "C");
	for (i = 8; i <= 11; i++) {
		useLetter = pinEnigma.encrypt(pin[i]);
		unencryptedText3 += convertLetter(useLetter) - 1;
	}
	
	if (unencryptedText1 == unencryptedText2 && unencryptedText2 == unencryptedText3 && unencryptedText1 == unencryptedText3) {
		return unencryptedText1;
	} else {
		return "error";
	}
}

function lockPinChanged() {
	pin1Val = document.getElementById("pinL-1").value;
	pin2Val = document.getElementById("pinL-2").value;
	pin3Val = document.getElementById("pinL-3").value;
	pin4Val = document.getElementById("pinL-4").value;
	pin = pin1Val + pin2Val + pin3Val + pin4Val;
	pinDot = "*";
	
	if (pin1Val != "" && pin2Val != "" && pin3Val != "" && pin4Val != "" && $.cookie("pin")) {
		if (lockUnhashPin($.cookie("pin")) == pin) {
			unlockScreen();
		} else {
			$("#unlock-btn").effect("shake",{times: 1, distance: 5});
		}
	}
}