let timeStart,
	timeElapsed,
	timeNext = 0,
	aNotes = [];

let track = {
	lines: [
		{
			color: [255, 0, 0],
			key: 'F'
		},
		{
			color: [0, 255, 0],
			key: 'G'
		},
		{
			color: [0, 0, 255],
			key: 'H'
		},
		{
			color: [255, 255, 0],
			key: 'J'
		},
		{
			color: [255, 0, 255],
			key: 'K'
		}
	],
	speed: 1,
	start: {
		spacing: 20,
		marginTop: 200,
		overflow: 100,
		size: 5
	},
	end: {
		spacing: 100,
		marginBottom: 200,
		size: 20,
		overflow: 50
	}
};


var img;

function preload() {
	img = loadImage('./img/worstTriangle.png');
	
	image(img, 0, 0);
}

/**
 * SETUP
 * Run once at begining
 */
function setup() {
	angleMode(DEGREES);

	let height = 200;

	createCanvas(windowWidth, height);

	background(color(255, 195, 77));

	timeStart = Date.now();

	//Calcul du x du début de la 1ere ligne
	track.start.firstPosX = height / 2

	//Calcul du x de la fin de la 1ere ligne
	track.end.firstPosX = (height - (track.end.spacing * (track.lines.length - 1))) / 2;
	
	//Calcul de l'angle de chaque piste
	for (var i = 0; i < track.lines.length; i++) {
		let startX = track.start.firstPosX,
			endX = track.end.firstPosX + (i * track.end.spacing);
		if (startX !== endX) {
			track.lines[i].tan = (height - track.start.marginTop - track.end.marginBottom) / (endX - startX);
		} else {
			track.lines[i].tan = null;
		}
	}

	
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

/**
 * DRAW
 * Run 60 times per second
 */
function draw() {
	
// 	//Temps écoulé depuis le début en milliseconde
// timeElapsed = Date.now() - timeStart;
// console.log(timeElapsed);
// 	if (timeElapsed > 10000) {
// 		noLoop();
// //		drawTitle();
// 	} else {
// 		clear();

// 		background(color(213, 232, 212));

// 		//Création d'une note
// 		if (timeNext <= timeElapsed) {
// 			aNotes.push(new Note());

// 			//Calcul de la prochaine note
// 			timeNext = timeElapsed + int(random (300, 1000));
// 		}

// 		//Affichage des notes
// 		drawPlay();
	// }
	
}

/**
 * DRAW TITLE
 * Draw the title state
 * Called 60 times/s in the draw() function
 */
function drawTitle() {
	noLoop();

	textSize(20);
	text("PRESS SPACE", width / 2, height / 2)
}

/**
 * 
 * Draw the play state
 * Called 60 times/s in the draw() function
 */
function drawPlay() {

	//Lignes verticales
	stroke(color(0));
	strokeWeight(2);
	for (var i=0; i < track.lines.length; i++) {
		line(height / 2, track.start.marginTop, track.end.firstPosX + (track.end.spacing * i), height - track.end.marginBottom);
	}

	noStroke();
	fill(color(213, 232, 212));
	rect(0, 0, width, track.start.marginTop + track.start.overflow)
	
	let finishLineWidth = (height - track.start.marginTop - track.end.marginBottom - track.end.overflow) / Math.abs(track.lines[0].tan);
	
	//Ligne d'arrivée
	line(
		0,
		height - track.end.marginBottom - track.end.overflow,
		width,
		height - track.end.marginBottom - track.end.overflow
	);

	line(0,10,20,30)

	aNotes.forEach((note) => {
	
		//Déplacement des notes visibles
		if (note.y - note.r < height) {
			note.move().display();
		}
	
	});
	
}

/**
 * NOTE constructor
 */
function Note() {
	this.key = int(random(0, track.lines.length));
	this.r = track.start.size;
	this.growingRate = (track.end.size - track.start.size) / ((height - track.start.marginTop - track.end.marginBottom) / track.speed);
	this.x = this.startX = width / 2;
	this.endX = track.end.firstPosX + (this.key * track.end.spacing);
	this.y = track.start.marginTop + track.start.overflow;

	//Affichage d'une note
	this.display = function() {
		stroke(0, 0, 200);
		strokeWeight(2);
		fill(color(track.lines[this.key].color));
		circle(this.x, this.y, this.r);
		return this;
	};

	//Déplacement d'une note
	this.move = function() {
		if (this.y < height - track.end.marginBottom) {
			this.r += this.growingRate;
			this.y += track.speed;
			if (track.lines[this.key].tan !== null) {
				this.x = this.startX + (this.y - track.start.marginTop) / track.lines[this.key].tan;
			}
		}
		return this;
	};
  
}

// /**
//  * KEYPRESSED
//  * run everytime a key is pressed
//  */
// function keyPressed() {  
//   if (gameState == "play") {
//     shot += 1;
//     if (notes.length > 0) {
//       for (let i = 0; i < notes.length; i++) {
//         //Test if a note is inside the target when key is pressed
//         if (dist(notes[i].x, notes[i].y, target.x, target.y) < target.r) {
//           if (notes[i].key === 0 && keyCode === LEFT_ARROW) {
//             notes[i].dirX = -1;
//             notes[i].dirY = 0;
//             notes[i].y = height / 4;
//             hit += 1;
//           }

//           if (notes[i].key === 1 && keyCode === RIGHT_ARROW) {
//             notes[i].dirX = 1;
//             notes[i].dirY = 0;
//             notes[i].y = height / 4;
//             hit += 1;
//           }

//           if (notes[i].key === 2 && (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW)) {
//             if (keyCode === LEFT_ARROW) {
//               notes[i].dirX = -1; 
//             }
//             if (keyCode === RIGHT_ARROW) {
//               notes[i].dirX = 1; 
//             }
//             notes[i].dirY = 0;
//             notes[i].y = height / 4;
//             hit += 1;
//           }

//           if (notes[i].key === 3 && keyCode === UP_ARROW) {
//             notes[i].dirX = 1;
//             notes[i].dirY = 0;
//             notes[i].y = height / 4;
//             hit += 1;
//           }

//           if (notes[i].key === 4 && keyCode === DOWN_ARROW) {
//             notes[i].dirX = 1;
//             notes[i].dirY = 0;
//             notes[i].y = height / 4;
//             hit += 1;
//           }
		  
//         }
//       }
//     }
//   }
  
//   if (keyCode === 32) { //SPACE
//     resetGame();
//     gameState = "play";
//   }
  
//   if (keyCode === 83) { //S
//     resetGame();
//     gameState = "title";
//   }
// }

/**
 * RESETGAME
 * reset all game variable to default value
 */
function resetGame() {
  frameCounted = 0;
  hit = 0;
  accuracy = 0;
  shot = 0;
  notesCount = 0;
  countDown = 3;
  notes = [];
}