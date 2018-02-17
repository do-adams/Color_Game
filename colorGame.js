"use strict";

let game = (() => {
	let _numSquares = 6;
	let _colors = [];
	let _pickedColor;

	let _squares = document.querySelectorAll(".square");
	let _colorDisplay = document.getElementById("colorDisplay");
	let _messageDisplay = document.querySelector("#message");
	let _h1 = document.querySelector("h1");

	let _resetButton = document.querySelector("#reset");
	let _modeButtons = document.querySelectorAll(".mode");

	function init() {
		_setupModeButtons();
		_setupSquares();
		_resetButton.addEventListener("click", function() {
			reset();
		});

		reset();
	}

	function _setupModeButtons() {
		for(let i = 0; i < _modeButtons.length; i++) {
			_modeButtons[i].addEventListener("click", function() {
				_modeButtons[0].classList.remove("selected");
				_modeButtons[1].classList.remove("selected");
				this.classList.add('selected');

				_numSquares = this.textContent.toLowerCase() === "easy" ? 3 : 6;
				reset();
			});
		}
	};

	function _setupSquares() {
		for(let i = 0; i < _squares.length; i++) {
			_squares[i].addEventListener("click", function() {
				let clickedColor = this.style.backgroundColor;

				if (clickedColor === _pickedColor) {
					_messageDisplay.textContent = "Correct!";
					_resetButton.textContent = "Play Again?";

					_changeColors(clickedColor);
					_h1.style.backgroundColor = clickedColor;
				} else {
					// set to the original background color
					this.style.backgroundColor = "#232323";
					_messageDisplay.textContent = "Try Again";
				}
			});
		}
	};

	// pick and set colors and page text
	function reset() {
		_colors = _generateRandomColors(_numSquares);
		_pickedColor = _pickColor();

		_colorDisplay.textContent = _pickedColor;
		_resetButton.textContent = "New Colors";
		_messageDisplay.textContent = "";	

		for(let i = 0; i < _squares.length; i++) {
			if (_colors[i]) {
				_squares[i].style.display = "block";
				_squares[i].style.backgroundColor = _colors[i];
			} else {
				_squares[i].style.display = "none";
			}
		}
		
		_h1.style.backgroundColor = "steelblue"; // original bg color
	}

	function _changeColors(color) {
		for(let i = 0; i < _squares.length; i++) {
			_squares[i].style.backgroundColor = color;
		}
	}

	function _pickColor() {
		let random = Math.floor(Math.random() * _colors.length);
		return _colors[random];	
	}

	function _generateRandomColors(num) {
		let arr = [];
		for(let i = 0; i < num; i++) {
			arr.push(_randomColor());
		}
		return arr;
	}

	function _randomColor() {
		let r = Math.floor(Math.random() * 256);
		let g = Math.floor(Math.random() * 256);
		let b = Math.floor(Math.random() * 256);
		return `rgb(${r}, ${g}, ${b})`;
	}

	return {
		init: init,
		reset: reset
	};
})();

game.init();
