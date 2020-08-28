class Rotor {
	constructor() {
		this.pins = [];
		this.knockpoint;
		this.position;
	}
}

class Reflector {
	constructor() {
		this.reflector = [];
	}
}

class Plugboard {
	constructor() {
		this.plugs = [];
	}
}

class Enigma {
	constructor() {
		this.useReflector = 0;
		this.usePlugboard = 0;
		this.rotorSettings = [];
		this.rotors = [];

		this.rotors[1] = new Rotor;
		this.rotors[2] = new Rotor;
		this.rotors[3] = new Rotor;
		this.rotors[4] = new Rotor;
		this.rotors[5] = new Rotor;
		this.rotors[6] = new Rotor;
		this.rotors[7] = new Rotor;
		this.rotors[8] = new Rotor;

		this.reflectorA = new Reflector;
		this.reflectorB = new Reflector;
		this.reflectorC = new Reflector;

		this.plugboardA = new Plugboard;
		this.plugboardB = new Plugboard;
		this.plugboardC = new Plugboard;

		this.initalizeHardware();
	}

	initalizeHardware() {
		this.initalizePlugboard('C'); //A,B,C
		this.initalizeRotorSettings(1,2,3); //1,2,3,4,5,6,7,8
		this.initalizeRotorPositions('A','A','A'); //A-Z
		this.initalizeReflectors('B'); //A,B,C
	}

	initalizePlugboard(plugboardSetting) {
	    //this.usePlugboard = plugboardSetting;
	    this.usePlugboard = "C"; //default to use plugboard C for this program

	    var plugboardAData = ['-','L','B','C','K','E','F','I','H','G','Z','D','A','O','X','M','S','W','Y','P','T','V','U','Q','N','R','J'];
		var plugboardBData = ['-','A','M','C','D','E','F','K','H','I','J','G','L','B','S','O','P','Q','R','N','T','Z','V','W','X','Y','U'];
	    var plugboardCData = ['-','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

		this.copyArray(plugboardAData, this.plugboardA.plugs);
		this.copyArray(plugboardBData, this.plugboardB.plugs);
		this.copyArray(plugboardCData, this.plugboardC.plugs);
	}

	initalizeRotorSettings(rotorSetting3, rotorSetting2, rotorSetting1) {
	    this.rotorSettings[1] = rotorSetting1;
	    this.rotorSettings[2] = rotorSetting2;
	    this.rotorSettings[3] = rotorSetting3;
	}

	initalizeRotorPositions(rotorPosition3, rotorPosition2, rotorPosition1) {
	    this.rotors[1].knockpoint = this.convertLetter('Q');
	    this.rotors[2].knockpoint = this.convertLetter('E');
	    this.rotors[3].knockpoint = this.convertLetter('V');
	    this.rotors[4].knockpoint = this.convertLetter('J');
	    this.rotors[5].knockpoint = this.convertLetter('Z');
	    this.rotors[6].knockpoint = this.convertLetter('P');
	    this.rotors[7].knockpoint = this.convertLetter('C');
	    this.rotors[8].knockpoint = this.convertLetter('R');

	    for(var i = 1; i < 9; i++) {
	        this.rotors[i].position = this.convertLetter('A');
	    }

	    this.setRotorPosition(3,rotorPosition3);
	    this.setRotorPosition(2,rotorPosition2);
	    this.setRotorPosition(1,rotorPosition1);

	    this.initalizeRotorPins();
	}

	initalizeReflectors(reflectorSetting) {
	    this.useReflector = reflectorSetting;

	    var reflectorAData = ['-','E','J','M','Z','A','L','Y','X','V','B','W','F','C','R','Q','U','O','N','T','S','P','I','K','H','G','D'];
	    var reflectorBData = ['-','Y','R','U','H','Q','S','L','D','P','X','N','G','O','K','M','I','E','B','F','Z','C','W','V','J','A','T'];
	    var reflectorCData = ['-','F','V','P','J','I','A','O','Y','E','D','R','Z','X','W','G','C','T','K','U','Q','S','B','N','M','H','L'];

	    this.copyArray(reflectorAData, this.reflectorA.reflector);
	    this.copyArray(reflectorBData, this.reflectorB.reflector);
		this.copyArray(reflectorCData, this.reflectorC.reflector);
	}

	initalizeRotorPins() {
	    var pin1Array = ['-','E','K','M','F','L','G','D','Q','V','Z','N','T','O','W','Y','H','X','U','S','P','A','I','B','R','C','J'];
	    var pin2Array = ['-','A','J','D','K','S','I','R','U','X','B','L','H','W','T','M','C','Q','G','Z','N','P','Y','F','V','O','E'];
	    var pin3Array = ['-','B','D','F','H','J','L','C','P','R','T','X','V','Z','N','Y','E','I','W','G','A','K','M','U','S','Q','O'];
	    var pin4Array = ['-','E','S','O','V','P','Z','J','A','Y','Q','U','I','R','H','X','L','N','F','T','G','K','D','C','M','W','B'];
	    var pin5Array = ['-','V','Z','B','R','G','I','T','Y','U','P','S','D','N','H','L','X','A','W','M','J','Q','O','F','E','C','K'];
	    var pin6Array = ['-','J','P','G','V','O','U','M','F','Y','Q','B','E','N','H','Z','R','D','K','A','S','X','L','I','C','T','W'];
	    var pin7Array = ['-','N','Z','J','H','G','R','C','X','M','Y','S','W','B','O','U','F','A','I','V','L','P','E','K','Q','D','T'];
	    var pin8Array = ['-','F','K','Q','H','T','L','X','O','C','B','J','S','P','D','Z','R','A','M','E','W','N','I','U','Y','G','V'];

		this.copyArray(pin1Array, this.rotors[1].pins);
		this.copyArray(pin2Array, this.rotors[2].pins);
		this.copyArray(pin3Array, this.rotors[3].pins);
		this.copyArray(pin4Array, this.rotors[4].pins);
		this.copyArray(pin5Array, this.rotors[5].pins);
		this.copyArray(pin6Array, this.rotors[6].pins);
		this.copyArray(pin7Array, this.rotors[7].pins);
		this.copyArray(pin8Array, this.rotors[8].pins);
	}

	setRotorPosition(rotorSelection, setLetter) {
	    var loopFor;

	    if(this.rotors[this.rotorSettings[rotorSelection]].position <= this.convertLetter(setLetter)) {
	        loopFor = this.convertLetter(setLetter) - this.rotors[this.rotorSettings[rotorSelection]].position;
	    } else {
	        loopFor = 26 - this.rotors[this.rotorSettings[rotorSelection]].position + this.convertLetter(setLetter);
	    }

	    for(var i = 1; i <= loopFor; i++) {
	        this.rotors[this.rotorSettings[rotorSelection]].position++;
	        if(this.rotors[this.rotorSettings[rotorSelection]].position >= 27) {
	            this.rotors[this.rotorSettings[rotorSelection]].position %= 26;
	        }
	        this.rotateArray(this.rotorSettings[rotorSelection]);
	    }
	}

	encrypt(letter) {
	    this.incrementRotors();
	    letter = letter.toUpperCase();
	    letter = this.passThroughPlugboard(letter);
	    letter = this.passThroughRotor(this.rotorSettings[1], letter);
	    letter = this.passThroughRotor(this.rotorSettings[2], letter);
	    letter = this.passThroughRotor(this.rotorSettings[3], letter);
	    letter = this.passThroughReflector(letter);
	    letter = this.passThroughRotorReverse(this.rotorSettings[3], letter);
	    letter = this.passThroughRotorReverse(this.rotorSettings[2], letter);
	    letter = this.passThroughRotorReverse(this.rotorSettings[1], letter);
	    letter = this.passThroughPlugboard(letter);

	    return letter;
	}

	incrementRotors() {
		this.incrementRotor(1);
	}

	incrementRotor(step) {
		//increment rotor in position n
	    this.rotors[this.rotorSettings[step]].position += 1;
	    if (this.rotors[this.rotorSettings[step]].position > 26) {
	        this.rotors[this.rotorSettings[step]].position %= 26;
	    }
	    this.rotateArray(this.rotorSettings[step]);

	    var position = this.rotors[this.rotorSettings[step]].position;
		var knockpoint = this.rotors[this.rotorSettings[step]].knockpoint;

	    //if rotor in position n reaches a knockpoint
	    if (position == knockpoint) {
	        //if the rotor exists, increment rotor n + 1
	        if (this.numRotorsUsable > step) {
	            this.incrementRotor(step + 1);
	        }
	    }
	    //echo "Rotors now:" . this.convertNumber(this.rotors[this.rotorSettings[3]].position) . " " . this.convertNumber(this.rotors[this.rotorSettings[2]].position) . " " . this.convertNumber(this.rotors[this.rotorSettings[1]].position);
	}

	rotateArray(rotorSelection) {
	    //revolve values one-by-one
	    var savedLetterFront = this.rotors[rotorSelection].pins[1];
	    for(var i = 1; i < 26; i++) {
	        this.rotors[rotorSelection].pins[i] = this.rotors[rotorSelection].pins[i + 1];
	    }
	    this.rotors[rotorSelection].pins[26] = savedLetterFront;
	    //update values to n - 1 to reflect shift
	    for(var i = 1; i < 27; i++) {
	        if(this.rotors[rotorSelection].pins[i] != 'A') {
	            this.rotors[rotorSelection].pins[i] = this.convertNumber(this.convertLetter((this.rotors[rotorSelection].pins[i])) - 1);
	        } else {
	            this.rotors[rotorSelection].pins[i] = 'Z';
	        }
	    }
	}

	passThroughPlugboard(letter) {
	    if(this.usePlugboard == 'A') {
	        return this.plugboardA.plugs[this.convertLetter(letter)];
	    } else if(this.usePlugboard == 'B') {
	        return this.plugboardB.plugs[this.convertLetter(letter)];
	    } else if(this.usePlugboard == 'C') {
	        return this.plugboardC.plugs[this.convertLetter(letter)];
	    }
	}

	passThroughRotor(rotorSelection, letter) {
	    return this.rotors[rotorSelection].pins[this.convertLetter(letter)];
	}

	passThroughReflector(letter) {
	    if(this.useReflector == 'A') {
	        return this.reflectorA.reflector[this.convertLetter(letter)];
	    } else if(this.useReflector == 'B') {
	        return this.reflectorB.reflector[this.convertLetter(letter)];
	    } else if(this.useReflector == 'C') {
	        return this.reflectorC.reflector[this.convertLetter(letter)];
	    }
	}

	passThroughRotorReverse(rotorSelection, letter) {
	    for(var i = 1; i < 27; i++) {
	        if(this.rotors[rotorSelection].pins[i] == letter) {
	            return this.convertNumber(i);
	        }
	    }
	}

	//HELPER PLUGBOARD FUNCTION:
	resetPlugboardCData(array) {
		this.copyArray(array, this.plugboardC.plugs);
	}

	//HELPER FUNCTIONS:
	copyArray(copyFrom, copyTo) {
		for(var i = 0; i < copyFrom.length; i++) {
			copyTo[i] = copyFrom[i];
		}
	}

	convertLetter(letter) {
		return letter.charCodeAt(0) - 64;
	}

	convertNumber(number) {
		return String.fromCharCode(number + 64);
	}
}
