let screen1 = document.getElementById("screen1");
let screen2 = document.getElementById("screen2");

let startButton = document.getElementById("startButton");
let startButtonWords = document.getElementById("startButtonWords");
let gameLetter = document.getElementById("gameLetter");
let progressBar = document.getElementById("progressBar");

let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let words = "OUI NON CLAIR TABLE FLEUR EAU PIERRE GRELOT SALADE DOUX CERISE POMME CIEL BRIQUE FRAISE SILLON MIROIR RAISIN BARIL PALMIER VILLAGE ROSSIGNOL CANNE CHEMISE MELON PANIER RENARD OLIVE ITALIE FRANCE ESPAGNE GALERIE BALLON LOSANGE LOUP AGNEAU PALOURDE LUCIOLE CAMION HIPPOCAMPE ALIMENT PHALANGE TENNIS COQUELICOT CHAPELLE MIRAGE SILENCE ORANGE VIOLET VERMEIL MONTAGNE COLLINE VOLCAN GAZELLE PANDA FAUCON TAPIS BRANCHE AVION BATEAU VOITURE GALETTE MANTEAU OREILLE BOIS NOIR MARRON GRIS BEIGE BLANC BLEU ROUGE SALON LIVRE STATUE PAPIER PINCE BRAISE PIVERT CANARD ANTILOPE BALEINE CHEVAL DAIM ELAN FURET GIRAFE HOMARD IGUANE JAGUAR KOALA LAPIN MERLE NARVAL OTARIE PHOQUE QUETZAL RAGONDIN SAUMON TAUREAU URUBU VAUTOUR WAPITI YACK".split(" ");

let currentLetter;

let countDownText = document.getElementById("countDownText");
let maxTime = 5;
let progressBarTime = 100;

let scoreText = document.getElementById("scoreText");
let finalScore = document.getElementById("finalScore");
let score = 0;

let lives = 3;
let livesAvailable = document.getElementsByClassName("heart1");
let livesLost = document.getElementsByClassName("heart2");

let wordProgress = document.getElementById("wordProgress");

let isGameOngoing = false;
let intervalID;

let mobileInput = document.getElementById("mobileInput");
let eventType = "keydown"




function getRandomInt(max) 
{
  return Math.floor(Math.random() * Math.floor(max));
}

startButton.addEventListener("click", startGame, false);
startButtonWords.addEventListener("click", startGameWords, false);


function startGame()
{
	screen1.style.display = "none";
	screen2.style.display = "flex";

	if (canvasDisplay == 'none') 
	{
		mobileInput.autofocus = true;
		// eventType = 'input';
	}

	isGameOngoing = true;

	currentLetter = alphabet[getRandomInt(alphabet.length)];
	gameLetter.textContent = currentLetter;

	progressBar.style.width = progressBarTime+"%";


	document.body.addEventListener(eventType, function(e) {
		if (isGameOngoing) 
		{
			if (e.key.toUpperCase() == currentLetter) 
			{
				score++;
				scoreText.textContent = "Score : " + score;

				correctAnswerAnim(alphabet);


				progressBarTime = 100;
				progressBar.style.width = progressBarTime+"%";
				

				if (score >= 10 && score % 10 == 0 && maxTime > 1) 
			 	{
			 		maxTime--
			 	}
			}

			else if (lives > 1) 
			{
				lives--;

				wrongAnswerAnim();
			}

			else
			{
				lives--;

				livesAvailable[lives].style.display = "none";
				livesLost[lives].style.display = "inline-block";


				isGameOngoing = false;
				
		 		gameOverAnim();

		 		clearInterval(intervalID);
			}
		}
	});


	intervalID = window.setInterval( function() {

		progressBarTime -= 100/maxTime/10;
		progressBar.style.width = progressBarTime+"%";

	 	if (progressBarTime < 0) 
	 	{
	 		isGameOngoing = false;
	 		
	 		gameOverAnim();

	 		clearInterval(intervalID);
	 	}
	}, 100);
}


/* ********************************************************************************** ANIMATIONS *************************************************************** */

function correctAnswerAnim(array)
{
	gameLetter.classList.add("disappearingLetter");
	gameLetter.style.color = "black";


	setTimeout(function() {
		currentLetter = array[getRandomInt(array.length)];
		gameLetter.textContent = currentLetter;

		gameLetter.classList.remove("disappearingLetter");
	}, 150);
}

function wrongAnswerAnim()
{
	gameLetter.classList.add("wrongLetter");
	gameLetter.style.color = "red";

	setTimeout(function() {
		gameLetter.classList.remove("wrongLetter");
	}, 100);

	livesAvailable[lives].style.display = "none";
	livesLost[lives].style.display = "inline-block";
}


function gameOverAnim()
{
	wordProgress.style.display = "none";

	gameLetter.style.color = "black";

	let message = "Game Over";
	gameLetter.textContent = "";
	let compteur = 0;
	gameLetter.classList.add("gameOver");

	let gameOverInterval = setInterval(function() 
	{
		if (compteur < message.length) 
		{
			gameLetter.textContent += message[compteur];
			compteur++;
		}
		else
		{
			clearInterval(gameOverInterval);
			finalScore.style.display = "block";
			finalScore.textContent += score;
		}
	}, 110);
}


/* ******************************************************************************* VERSION MOTS ******************************************************************** */


function startGameWords()
{
	screen1.style.display = "none";
	screen2.style.display = "flex";

	wordProgress.style.display = "block";

	if (canvasDisplay == 'none') 
	{
		mobileInput.autofocus = true;
		// eventType = 'input';
	}

	isGameOngoing = true;
	maxTime = 10;

	let word_I = 0;

	currentLetter = words[getRandomInt(words.length)];
	gameLetter.textContent = currentLetter;
	gameLetter.classList.add('wordsMode');

	progressBar.style.width = progressBarTime+"%";


	document.body.addEventListener(eventType, function(e) {
		if (isGameOngoing) 
		{
			if (e.key.toUpperCase() == currentLetter[word_I]) 
			{
				word_I++;
				wordProgress.style.width = (100/currentLetter.length * word_I) + "%";

				if (word_I == currentLetter.length) 
				{
					word_I = 0;
					wordProgress.style.width = 0 + "%";

					score++;
					scoreText.textContent = "Score : " + score;

					correctAnswerAnim(words);

					progressBarTime = 100;
					progressBar.style.width = progressBarTime+"%";

					if (score >= 10 && score % 10 == 0 && maxTime > 3) 
				 	{
				 		maxTime--;
				 	}
				}
			}

			else if (lives > 1) 
			{
				lives--;

				word_I = 0;
				wordProgress.style.width = 0 + "%";

				wrongAnswerAnim();
			}

			else
			{
				lives--;

				livesAvailable[lives].style.display = "none";
				livesLost[lives].style.display = "inline-block";


				isGameOngoing = false;
				
		 		gameOverAnim();

		 		clearInterval(intervalID);
			}
		}
	});


	intervalID = window.setInterval( function() {

		progressBarTime -= 100/maxTime/10;
		progressBar.style.width = progressBarTime+"%";

	 	if (progressBarTime < 0) 
	 	{
	 		isGameOngoing = false;
	 		
	 		gameOverAnim();

	 		clearInterval(intervalID);
	 	}
	}, 100);
}


/********************************************************************************* CANVAS *****************************************************************************/


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let canvasLetters = [];
let directions = [0 /* topLeft */, 1 /* topRight */, 2 /* bottomLeft */, 3 /* bottomRight */];

let canvasLettersObject = 
{
	initLetter: function(lettre, fontSize, direction, angle, x, y)
	{
		this.lettre = lettre;
		this.fontSize = fontSize;
		this.direction = direction;
		this.angle = angle;
		this.x = x;
		this.y = y;
	}
}

for (var i = 0; i < alphabet.length*4; i++) 
{
	canvasLetters[i] = Object.create(canvasLettersObject); // lettre [0], taille de police (14 à 36) [1], direction [2], angle (-40 à 40) [3], x [4], y [5]
	canvasLetters[i].initLetter(alphabet[i%26], getRandomInt(22)+14, getRandomInt(directions.length), getRandomInt(81)-40, 
						getRandomInt(canvas.width)-(canvas.width/2), getRandomInt(canvas.height)-(canvas.height/2));
}

/*
for (var i = 0; i < alphabet.length*4; i++) 
{											// lettre [0], taille de police (14 à 36) [1], direction [2], angle (-40 à 40) [3], x [4], y [5]
	canvasLetters[i] = [alphabet[i%26], getRandomInt(22)+14, getRandomInt(directions.length), getRandomInt(81)-40, 
						getRandomInt(canvas.width)-(canvas.width/2), getRandomInt(canvas.height)-(canvas.height/2)];
}
*/

function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);			// vide le canvas

	for (var i = 0; i < canvasLetters.length; i++) 
	{
		if (canvasLetters[i].x >= canvas.width/2) 				// change la direction lorsqu'on atteint le bord droit
		{
			canvasLetters[i].direction -= 1;
		}
		else if (canvasLetters[i].x <= 0 - canvas.width-2) 	// idem bord gauche
		{
			canvasLetters[i].direction += 1;
		}
		else if (canvasLetters[i].y >= canvas.height/2)		// bord bas
		{
			canvasLetters[i].direction -= 2;
		}
		else if (canvasLetters[i].y <= 0 - canvas.height/2) 	// bord haut
		{
			canvasLetters[i].direction += 2;
		}

		if (canvasLetters[i].direction == 0) 							// déplace vers topLeft
		{
			canvasLetters[i].x--;
			canvasLetters[i].y--;
		}
		else if (canvasLetters[i].direction == 1) 						// topRight
		{
			canvasLetters[i].x++;
			canvasLetters[i].y--;
		}
		else if (canvasLetters[i].direction == 2) 						// bottomLeft
		{
			canvasLetters[i].x--;
			canvasLetters[i].y++;
		}
		else 													// bottomRight
		{
			canvasLetters[i].x++;
			canvasLetters[i].y++; /*************************************************************************/
		}
		
		//canvasLetters[i][3]++;

		ctx.beginPath();										// sauvegarde, place l'axe de rotation au centre, pivote, trace le texte puis restaure
		ctx.save();
		ctx.translate(canvas.width/2, canvas.height/2);
		ctx.rotate(canvasLetters[i].angle * Math.PI / 180);
		ctx.font = canvasLetters[i].fontSize + "px Arial";
		ctx.fillStyle = "rgba(0,0,0,0.6)";
		ctx.fillText(canvasLetters[i].lettre, canvasLetters[i].x, canvasLetters[i].y);
		ctx.restore();
		ctx.closePath();
	}
}

let canvasDisplay = window.getComputedStyle(canvas, null).display;
console.log(canvasDisplay);

if (canvasDisplay != 'none') 
{
	let intervalID_Canvas = setInterval(draw, 50);
}