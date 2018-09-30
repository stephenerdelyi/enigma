<?php
	class RotorE {
		public $pins = array();
		public $knockpoint;
		public $position;
	}
	
	class ReflectorE {
		public $reflector = array();
	}
	
	class PlugboardE {
		public $plugs = array();
	}
	
	class Enigma {
		public $useReflector;
		public $usePlugboard;
		public $rotorSettings = array();
		public $rotors = array();
		
		public $reflectorA, $reflectorB, $reflectorC;
		public $plugboardA, $plugboardB, $plugboardC;
	
		function __construct() {
			$this->reflectorA = new ReflectorE();
			$this->reflectorB = new ReflectorE();
			$this->reflectorC = new ReflectorE();
			
			$this->rotors[1] = new RotorE();
			$this->rotors[2] = new RotorE();
			$this->rotors[3] = new RotorE();
			$this->rotors[4] = new RotorE();
			$this->rotors[5] = new RotorE();
			$this->rotors[6] = new RotorE();
			$this->rotors[7] = new RotorE();
			$this->rotors[8] = new RotorE();
			
			$this->plugboardA = new PlugboardE();
			$this->plugboardB = new PlugboardE();
			$this->plugboardC = new PlugboardE();
			
			$this->initalizeHardware();
		}
		
		private function initalizeHardware() {
			$this->initalizePlugboard('A'); //A,B,C
		    $this->initalizeRotorSettings(1,2,3); //1,2,3,4,5,6,7,8
		    $this->initalizeRotorPositions('A','A','A'); //A-Z
		    $this->initalizeReflectors('A'); //A,B,C
		}
		
		private function initalizePlugboard($plugboardSetting) {
		    $this->usePlugboard = $plugboardSetting;
		
		    $plugboardAData = array('-','L','B','C','K','E','F','I','H','G','Z','D','A','O','X','M','S','W','Y','P','T','V','U','Q','N','R','J');
		    $plugboardBData = array('-','A','M','C','D','E','F','K','H','I','J','G','L','B','S','O','P','Q','R','N','T','Z','V','W','X','Y','U');
		    $plugboardCData = array('-','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
			
			$this->copyArray($plugboardAData, $this->plugboardA->plugs);
			$this->copyArray($plugboardBData, $this->plugboardB->plugs);
			$this->copyArray($plugboardCData, $this->plugboardC->plugs);
		}
		
		private function initalizeRotorSettings($rotorSetting3, $rotorSetting2, $rotorSetting1) {
		    $this->rotorSettings[1] = $rotorSetting1;
		    $this->rotorSettings[2] = $rotorSetting2;
		    $this->rotorSettings[3] = $rotorSetting3;
		}
		
		private function initalizeRotorPositions($rotorPosition3, $rotorPosition2, $rotorPosition1) {
		    $this->rotors[1]->knockpoint = 17; //Q
		    $this->rotors[2]->knockpoint = 5;  //E
		    $this->rotors[3]->knockpoint = 22; //V
		    $this->rotors[4]->knockpoint = 10; //J
		    $this->rotors[5]->knockpoint = 26; //Z
		    $this->rotors[6]->knockpoint = 16; //P
		    $this->rotors[7]->knockpoint = 3;  //C
		    $this->rotors[8]->knockpoint = 18; //R
		
		    for ($i = 1; $i < 9; $i++) {
		        $this->rotors[$i]->position = $this->convertLetter('A');
		    }
		
		    $this->setRotorPosition(3,$rotorPosition3);
		    $this->setRotorPosition(2,$rotorPosition2);
		    $this->setRotorPosition(1,$rotorPosition1);
		
		    $this->initalizeRotorPins();
		}
		
		private function initalizeReflectors($reflectorSetting) {
		    $this->useReflector = $reflectorSetting;
		
		    $reflectorAData = array('-','E','J','M','Z','A','L','Y','X','V','B','W','F','C','R','Q','U','O','N','T','S','P','I','K','H','G','D');
		    $reflectorBData = array('-','Y','R','U','H','Q','S','L','D','P','X','N','G','O','K','M','I','E','B','F','Z','C','W','V','J','A','T');
		    $reflectorCData = array('-','F','V','P','J','I','A','O','Y','E','D','R','Z','X','W','G','C','T','K','U','Q','S','B','N','M','H','L');
		
		    $this->copyArray($reflectorAData, $this->reflectorA->reflector);
		    $this->copyArray($reflectorBData, $this->reflectorB->reflector);
			$this->copyArray($reflectorCData, $this->reflectorC->reflector);
		}
		
		private function initalizeRotorPins() {
		    $pin1Array = array('-','E','K','M','F','L','G','D','Q','V','Z','N','T','O','W','Y','H','X','U','S','P','A','I','B','R','C','J');
		    $pin2Array = array('-','A','J','D','K','S','I','R','U','X','B','L','H','W','T','M','C','Q','G','Z','N','P','Y','F','V','O','E');
		    $pin3Array = array('-','B','D','F','H','J','L','C','P','R','T','X','V','Z','N','Y','E','I','W','G','A','K','M','U','S','Q','O');
		    $pin4Array = array('-','E','S','O','V','P','Z','J','A','Y','Q','U','I','R','H','X','L','N','F','T','G','K','D','C','M','W','B');
		    $pin5Array = array('-','V','Z','B','R','G','I','T','Y','U','P','S','D','N','H','L','X','A','W','M','J','Q','O','F','E','C','K');
		    $pin6Array = array('-','J','P','G','V','O','U','M','F','Y','Q','B','E','N','H','Z','R','D','K','A','S','X','L','I','C','T','W');
		    $pin7Array = array('-','N','Z','J','H','G','R','C','X','M','Y','S','W','B','O','U','F','A','I','V','L','P','E','K','Q','D','T');
		    $pin8Array = array('-','F','K','Q','H','T','L','X','O','C','B','J','S','P','D','Z','R','A','M','E','W','N','I','U','Y','G','V');
		
			$this->copyArray($pin1Array, $this->rotors[1]->pins);
			$this->copyArray($pin2Array, $this->rotors[2]->pins);
			$this->copyArray($pin3Array, $this->rotors[3]->pins);
			$this->copyArray($pin4Array, $this->rotors[4]->pins);
			$this->copyArray($pin5Array, $this->rotors[5]->pins);
			$this->copyArray($pin6Array, $this->rotors[6]->pins);
			$this->copyArray($pin7Array, $this->rotors[7]->pins);
			$this->copyArray($pin8Array, $this->rotors[8]->pins);
		}
		
		private function setRotorPosition($rotorSelection, $setLetter) {
		    $loopFor;
			
		    if($this->rotors[$this->rotorSettings[$rotorSelection]]->position <= $this->convertLetter($setLetter)) {
		        $loopFor = $this->convertLetter($setLetter) - $this->rotors[$this->rotorSettings[$rotorSelection]]->position;
		    } else {
		        $loopFor = 26 - $this->rotors[$this->rotorSettings[$rotorSelection]]->position + $this->convertLetter($setLetter);
		    }
		
		    for($i = 1; $i <= $loopFor; $i++) {
		        $this->rotors[$this->rotorSettings[$rotorSelection]]->position++;
		        if($this->rotors[$this->rotorSettings[$rotorSelection]]->position >= 27) {
		            $this->rotors[$this->rotorSettings[$rotorSelection]]->position %= 26;
		        }
		        $this->rotateArray($this->rotorSettings[$rotorSelection]);
		    }
		}
		
		public function encrypt($letter) {
		    $this->incrementRotors();
		    $letter = strtoupper($letter);
		    $letter = $this->passThroughPlugboard($letter);
		    $letter = $this->passThroughRotor($this->rotorSettings[1], $letter);
		    $letter = $this->passThroughRotor($this->rotorSettings[2], $letter);
		    $letter = $this->passThroughRotor($this->rotorSettings[3], $letter);
		    $letter = $this->passThroughReflector($letter);
		    $letter = $this->passThroughRotorReverse($this->rotorSettings[3], $letter);
		    $letter = $this->passThroughRotorReverse($this->rotorSettings[2], $letter);
		    $letter = $this->passThroughRotorReverse($this->rotorSettings[1], $letter);
		    $letter = $this->passThroughPlugboard($letter);
		
		    return $letter;
		}
		
		private function incrementRotors() {
		    //increment rotor in position 1
		    $this->rotors[$this->rotorSettings[1]]->position += 1;
		    if ($this->rotors[$this->rotorSettings[1]]->position > 26) {
		        $this->rotors[$this->rotorSettings[1]]->position %= 26;
		    }
		    $this->rotateArray($this->rotorSettings[1]);
		    //if rotor in position 1 reaches a knockpoint
		    if (($this->rotors[$this->rotorSettings[1]]->position - 1) == $this->rotors[$this->rotorSettings[1]]->knockpoint) {
		        //increment rotor in position 2
		        $this->rotors[$this->rotorSettings[2]]->position += 1;
		        if ($this->rotors[$this->rotorSettings[2]]->position > 26) {
		            $this->rotors[$this->rotorSettings[2]]->position %= 26;
		        }
		        $this->rotateArray($this->rotorSettings[2]);
		        //if rotor in position 2 reaches a knockpoint
		        if (($this->rotors[$this->rotorSettings[2]]->position - 1) == $this->rotors[$this->rotorSettings[2]]->knockpoint) {
		            //increment rotor in position 3
		            $this->rotors[$this->rotorSettings[3]]->position += 1;
		            if ($this->rotors[$this->rotorSettings[3]]->position > 26) {
		                $this->rotors[$this->rotorSettings[3]]->position %= 26;
		            }
		            $this->rotateArray($this->rotorSettings[3]);
		        }
		    }
		    //echo "Rotors now:" . $this->convertNumber($this->rotors[$this->rotorSettings[3]]->position) . " " . $this->convertNumber($this->rotors[$this->rotorSettings[2]]->position) . " " . $this->convertNumber($this->rotors[$this->rotorSettings[1]]->position);
		}
		
		private function rotateArray($rotorSelection) {
		    //revolve values one-by-one
		    $savedLetterFront = $this->rotors[$rotorSelection]->pins[1];
		    for($i = 1; $i < 26; $i++) {
		        $this->rotors[$rotorSelection]->pins[$i] = $this->rotors[$rotorSelection]->pins[$i + 1];
		    }
		    $this->rotors[$rotorSelection]->pins[26] = $savedLetterFront;
		    //update values to n - 1 to reflect shift
		    for($i = 1; $i < 27; $i++) {
		        if($this->rotors[$rotorSelection]->pins[$i] != 'A') {
		            $this->rotors[$rotorSelection]->pins[$i] = $this->convertNumber($this->convertLetter(($this->rotors[$rotorSelection]->pins[$i])) - 1);
		        } else {
		            $this->rotors[$rotorSelection]->pins[$i] = 'Z';
		        }
		    }
		}
		
		private function passThroughPlugboard($letter) {
		    if ($this->usePlugboard == 'A') {
		        return $this->plugboardA->plugs[$this->convertLetter($letter)];
		    } else if ($this->usePlugboard == 'B') {
		        return $this->plugboardB->plugs[$this->convertLetter($letter)];
		    } else if ($this->usePlugboard == 'C') {
		        return $this->plugboardC->plugs[$this->convertLetter($letter)];
		    }
		}
		
		private function passThroughRotor($rotorSelection, $letter) {
		    return $this->rotors[$rotorSelection]->pins[$this->convertLetter($letter)];
		}
		
		private function passThroughReflector($letter) {
		    if ($this->useReflector == 'A') {
		        return $this->reflectorA->reflector[$this->convertLetter($letter)];
		    } else if ($this->useReflector == 'B') {
		        return $this->reflectorB->reflector[$this->convertLetter($letter)];
		    } else if ($this->useReflector == 'C') {
		        return $this->reflectorC->reflector[$this->convertLetter($letter)];
		    }
		}
		
		private function passThroughRotorReverse($rotorSelection, $letter) {
		    for ($i = 1; $i < 27; $i++) {
		        if ($this->rotors[$rotorSelection]->pins[$i] == $letter) {
		            return $this->convertNumber($i);
		        }
		    }
		}
				
		//HELPER FUNCTIONS:
		private function copyArray($copyFrom, &$copyTo) {
			for($i = 0; $i < sizeof($copyFrom); $i++) {
				$copyTo[$i] = $copyFrom[$i];
			}
		}
		
		private function convertLetter($letter) {
		    return ord($letter) - 64;
		}
		
		private function convertNumber($number) {
		    return chr($number + 64);
		}
	}	
?>