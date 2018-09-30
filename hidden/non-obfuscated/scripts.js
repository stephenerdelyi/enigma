if (!$.cookie("lastUsedTab")) {
	$.cookie("lastUsedTab","encryptA");
}
if (!$.cookie("usePassword")) {
	$.cookie("usePassword","no");
}
var lastUsedEncryptionTab = "encryptA";

function changeTab(evt, name) {
    // Declare all variables
    var i, tabcontent, tablinks;
	
	if (name) {
	    // Get all elements with class="tabcontent" and hide them
	    tabcontent = document.getElementsByClassName("tabcontent");
	    for (i = 0; i < tabcontent.length; i++) {
	        tabcontent[i].style.display = "none";
	    }
	
	    // Get all elements with class="tablinks" and remove the class "active"
	    tablinks = document.getElementsByClassName("tablink");
	    for (i = 0; i < tablinks.length; i++) {
	        tablinks[i].className = tablinks[i].className.replace(" active", "");
	    }
	
	    // Show the current tab, and add an "active" class to the button that opened the tab
	    document.getElementById(name).style.display = "block";
	    
	    // Save the last used tab
	    if (name != 'lock') {
		    onTabOut($.cookie("lastUsedTab"));
		    $.cookie("lastUsedTab",name);
		    onTabIn($.cookie("lastUsedTab"));
	    }
    } else {
	    // Get all elements with class="tabcontent" and hide them
	    tabcontent = document.getElementsByClassName("tabcontent");
	    for (i = 0; i < tabcontent.length; i++) {
	        tabcontent[i].style.display = "none";
	    }
	    
	    // Get all elements with class="tablinks" and remove the class "active"
	    tablinks = document.getElementsByClassName("tablink");
	    for (i = 0; i < tablinks.length; i++) {
	        tablinks[i].className = tablinks[i].className.replace(" active", "");
	    }
    }
    
    if (evt) {
    	evt.currentTarget.className += " active";
    } else {
	    if (name != 'lock') {
			if (name == "encryptA" || name == "encryptB") {
				lastUsedEncryptionTab = name;
			    name = "encrypt";
		    }
		    for (i = 0; i < document.getElementsByClassName("tablink").length; i++) {
			    if (document.getElementsByClassName("tablink")[i].getElementsByTagName("li")[0].innerText.toLowerCase().includes(name)) {
			    	document.getElementsByClassName("tablink")[i].className += " active";
		    	}
		    }
	    }
    }
    onTabChange();
}

function onTabIn(tab) {
	if (tab == "encryptB") {
		encryptBUpdateDisplayValues();
	}
}

function onTabOut(tab) {
	if (tab == "settings") {
		settingsResetEraseMemoryBtn();
	} else if (tab == "encryptB") {
		encryptBDisallowEncrypt();
	}
}

function onTabChange() {
	disableButton("encrypt-btn");
    encryptAUpdateDisplayValues();
}

function lockScreen() {
	if ($.cookie("usePassword")) {
		if ($.cookie("usePassword") == "yes") {
			$.cookie("isLocked","yes");
			changeTab(null, null);
			changeTab(null, 'lock');
			//add disabled class to sidebar
			document.getElementById('sidebar').className += " disabled";
		} else {
			lockAlert();
		}
	} else {
		lockAlert();
	}
}

function lockSuccessfulLock() {
	if ($.cookie("isLocked") == "yes") {
		swal({
			title: "Enigma locked",
			text: " ",
			icon: "success",
			timer: 2000,
			button: false,
		});
	}
}

function lockAlert() {
	swal({
		title: "Wait a second...",
		text: "Please enable a password in settings to lock Enigma.",
		icon: "error",
		buttons: ["Cancel", "Go to Settings"],
	}).then((value) => {
		if (value == true) {
			changeTab(null, "settings");
		}
	});
}

function unlockScreen() {
	lockClearEnteredPin();
	
	$.cookie("isLocked","no");
	changeTab(null, $.cookie("lastUsedTab"));
	//remove diabled class from sidebar
	document.getElementById('sidebar').className = document.getElementById('sidebar').className.replace(" disabled", "");
}

function disableButton(buttonName) {
	if (!document.getElementById(buttonName).className.includes(" disabled")) {
		document.getElementById(buttonName).className += " disabled";
	}
}

function enableButton(buttonName) {
	document.getElementById(buttonName).className = document.getElementById(buttonName).className.replace(" disabled","");
}

function convertLetter(letter) {
	return letter.charCodeAt(0) - 64;
}
	
function convertNumber(number) {
	return String.fromCharCode(number + 64);
}

function makeDraggable(className) {
	$("." + className).draggable({snap:'.ui-droppable', snapMode:'inner', revert:true});
}

function makeDroppable(className) {
	$('.' + className).droppable({drop:function(ev, ui)
           {$(ui.draggable).appendTo($(this))
               .css({position:'static', left:'0px', top:'0px'})
               .draggable('option', 'disabled', false)
               .css({position:'relative'});
           }
    	}
    );
}

function enableAutoTab(selector) {
	$(selector).bind("input", function() {
        var $this = $(this);
        setTimeout(function() {
            if ( $this.val().length >= parseInt($this.attr("maxlength"),10) )
                $this.next("input").focus();
        },0);
    });
}

function checkForSupportedBrowser() {
	currentBrowser = getBrowserName();
	supportedBrowsers = ['Safari','Opera','Chrome','Firefox'];
	flag = 0;
	
	//legacy for loop so that IE can use this method too
	for (i = 0; i < supportedBrowsers.length; i++) {
		if (supportedBrowsers[i] == currentBrowser) {
			flag++;
		}
	}
	if (isMobileOrTablet()) {
		flag = 0;
	}
	if (flag == 0) {
		document.getElementsByClassName("center")[0].setAttribute("style", "display: none;");
		document.getElementsByClassName("wrapper")[0].setAttribute("style", "display: none;");
		swal({
			title: "Not Supported.",
			text: "Sorry, but your browser or device is not supported at this time.",
			icon: "error",
			button: false,
			closeOnClickOutside: false,
			closeOnEsc: false,
		});
	}
}

function isMobileOrTablet() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

function getBrowserName() {
	if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
        return "Opera";
    } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
        return "Chrome";
    } else if(navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
    } else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
        return "Firefox";
    } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true)) {
    	return "IE"; 
    } else {
    	return "Unknown";
    }
}

function setUserAgentClass() {
	if (navigator.userAgent.indexOf('Mac OS X') != -1) {
		$("body").addClass("mac");
	} else {
		$("body").addClass("pc");
	}
}

function hideLoader() {
	document.getElementById("loader").classList += "hide";
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
		
window.onload = function() {
	initializeSystem();
}

function initializeSystem() {
	enigma = new Enigma;
	new Clipboard('#copybtnA');
	
	setUserAgentClass();
	initializeDataHandlers();

	hideLoader();
	changeTab(null, $.cookie("lastUsedTab"));
	
	if ($.cookie("usePassword")) {
		if ($.cookie("usePassword") == "yes") {
			lockScreen();
		}
	}
}

checkForSupportedBrowser();