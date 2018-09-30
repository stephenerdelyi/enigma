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
function plugboardInitialize() { }
function plugboardCreateEventHandlers() { }
function plugboardUpdatePlugboardData(letterIndex) { }
function plugboardClearPlugDisplay(option) { }
function plugboardDownloadCookie() { }
function plugboardUpdateCookie() { }
function plugboardUpdatePlugNumber() { }
function plugboardUpdatePlugDisplay() { }
function plugboardValidateLetter(letterIndex) { }
function plugboardUsedPlugNumber() { }
function plugboardUpdateEnigmaData() { }
function plugboardEraseData() { }

/*  ROTORS  */
function rotorsInitialize() { }
function rotorsSettingsCreateEventHandlers() { }
function rotorsSettingsResetSettings() { }
function rotorsSettingsUpdateCookie() { }
function rotorsSettingsDownloadCookie() { }
function rotorsSettingsUpdateRotorSetting(rotorIndex) { }
function rotorsSettingsGetCurrentValue(rotorSelection) { }
function rotorsPositionsCreateEventHandlers() { }
function rotorsPositionsUpdateRotorPosition(positionSelector) { }
function rotorsPositionsBtnClick(btnType, btnNum) { }
function rotorsPositionsUpdateCookie() { }
function rotorsPositionsDownloadCookie() { }
function rotorsPositionsUpdateEnigma() { }
function rotorsPositionsMakeCapital() { }
function rotorsPositionsIncrementLetter() { }

/*  REFLECTOR  */
function reflectorInitialize() { }
function reflectorCreateEventHandlers() { }
function reflectorBtnClick(btnEvent) { }
function reflectorUpdateCookie() { }
function reflectorDownloadCookie() { }
function reflectorUpdateEnigma() { }

/*  ENCRYPT  */
function encryptAInitialize() { }
function encryptACreateEventHandlers() { }
function encryptAEraseBtn() { }
function encryptACheckButton() { }
function encryptABtnClick() { }
function encryptARemoveStyles() { }
function encryptAUpdateDisplayValues() { }
function encryptBInitialize() { }
function encryptBCreateEventHandlers() { }
function encryptBErase() { }
function encryptBRemoveStyles() { }
function encryptBCheck() { }
function encryptBUpdateDisplayValues() { }
function encryptBAllowEncrypt() { }
function encryptBEncrypt(letter) { }
function encryptBDisallowEncrypt() { }

/*  SETTINGS  */
function settingsInitialize() { }
function checkPasswordUpdate() { }
function settingsCreateEventHandlers() { }
function settingsEraseAllData() { }
function settingsResetEraseMemoryBtn() { }
function settingsDisablePassword() { }
function settingsPinChanged() { }
function settingsHashPin(pin) { }
function settingsChangeEnigmaSettings(pinEnigma, usePlugboard, useRotorSettings, useRotorPositions, useReflector) { }

/*  LOCK  */
function lockInitialize() { }
function lockCreateEventHandlers() { }
function lockClearEnteredPin() { }
function lockUnhashPin(pin) { }
function lockPinChanged() { }