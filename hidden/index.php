<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	
	/*include('enigma.php');
		
	$enigma = new Enigma;
	$encryptedText = "";
		
	if(isset($_POST['SubmitButton'])) {
		$input = str_split($_POST['inputText']);
		for($i = 0; $i < sizeof($input); $i++) {
			if(ctype_alpha($input[$i])) {
				$encryptedText = $encryptedText . $enigma->encrypt($input[$i]);
			} else {
				$encryptedText = $encryptedText . $input[$i];
			}
		}
	} else {
		$encryptedText = "Encrypted/Decrypted text will go here when you push submit";
	}*/
?>

<html>
	<head>
		<title>Enigma Emulator</title>
		<style>
			body {
				background-color: #dddddd;
				text-align: center;
			}
			.wrapper {
				width: 350px;
				background-color: white;
				border-radius: 4px;
				padding: 20px;
				margin: 0 auto;
			}
			input[type=text] {
				width: 100%;
				height: 150px;
			}
			input[type=submit] {
				background-color: black;
			}
		</style>
		<script src="enigma.js"></script>
	</head>
	<body>
		<div class="wrapper">
			<h1>Enigma Emulator</h1>
			<form action="" method="post">
				<h3>Input your data to be encrypted:</h3>
				<input type="text" name="inputText"/>
				<input type="submit" name="SubmitButton"/>
			</form>
			<form action="" method="">
				<input type="text" value="<?php //echo $encryptedText; ?>"/>
			</form>
		</div>
	</body>
</html>  