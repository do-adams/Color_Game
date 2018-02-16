"use strict";

let numSquares = 6;
let colors = [];
let pickedColor;

let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");

let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	// mode buttons event listeners
	for(let i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add('selected');

			numSquares = this.textContent.toLowerCase() === "easy" ? 3 : 6;
			reset();
		});
	}

	// squares event listeners
	for(let i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			let clickedColor = this.style.backgroundColor;

			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";

				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				// set to the original background color
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}

	resetButton.addEventListener("click", function() {
		reset();
	});

	// pick and set colors and page text
	reset();
}

function reset() {
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();

	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";	

	for(let i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	
	h1.style.backgroundColor = "steelblue"; // original bg color
}

function changeColors(color) {
	for(let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];	
}

function generateRandomColors(num) {
	let arr = [];
	for(let i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return `rgb(${r}, ${g}, ${b})`;
}