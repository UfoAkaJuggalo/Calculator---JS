var calculator = {
	operand: 0,
	kropka: 0,
	dzialanie: 0,
	memory: 0,
	clearDisplay: 1,
	display: 0,
	init(){
		this.display = document.querySelector('.display');
		this.initListeners();
	},
	initListeners(){
		var numButtons = document.getElementsByClassName('numButt');
		var memButtons = document.getElementsByClassName('memButt');
		var operButtons = document.getElementsByClassName('operButt');
		var defButtons = document.getElementsByClassName('defButt');
		var kalkulatorElem = document.querySelector('.kalkulator');
		var display = document.querySelector('.display');
		var keyHandler = function(e){
			if ((e.keyCode === 49)||(e.keyCode === 97)) {
				calculator.numButton(1);
			}
			if ((e.keyCode === 50)||(e.keyCode === 98)) {
				calculator.numButton(2);
			}			
			if ((e.keyCode === 51)||(e.keyCode === 99)) {
				calculator.numButton(3);
			}
			if ((e.keyCode === 52)||(e.keyCode === 100)) {
				calculator.numButton(4);
			}
			if ((e.keyCode === 53)||(e.keyCode === 101)) {
				calculator.numButton(5);
			}
			if ((e.keyCode === 54)||(e.keyCode === 102)) {
				calculator.numButton(6);
			}
			if ((e.keyCode === 55)||(e.keyCode === 103)) {
				calculator.numButton(7);
			}
			if ((e.keyCode === 56)||(e.keyCode === 104)) {
				calculator.numButton(8);
			}
			if ((e.keyCode === 57)||(e.keyCode === 105)) {
				calculator.numButton(9);
			}
			if ((e.keyCode === 48)||(e.keyCode === 96)) {
				calculator.numButton(0);
			}
			if (e.keyCode === 27) {
				calculator.clearAll();
			}
			if ((e.keyCode === 107)||(e.keyCode === 187)) {
				calculator.policz(1);
			}
			if ((e.keyCode === 109)||(e.keyCode === 189)) {
				calculator.policz(2);
			}
			if (e.keyCode === 106) {
				calculator.policz(3);
			}
			if ((e.keyCode === 111)||(e.keyCode === 191)) {
				calculator.policz(4);
			}
			if (e.keyCode === 13) {
				calculator.wynik();
			}
			if ((e.keyCode === 110)||(e.keyCode === 190)) {
				calculator.dotPress();
			}
		};

		kalkulatorElem.addEventListener("mouseenter", function(){
			window.addEventListener("keydown", keyHandler);
		});

		kalkulatorElem.addEventListener("mouseleave", function(){
			window.removeEventListener("keydown", keyHandler, false);
		});

		for (var i = 0; i < numButtons.length; i++) {
			numButtons[i].addEventListener("click", function(){
				calculator.numButton(this.innerHTML);
			});
		}

		document.querySelector('[name=kasuj]').addEventListener("click", function(){
			calculator.clearAll();
		});

		document.querySelector('[name=zapamietaj]').addEventListener("click", function(){
			calculator.memory = display.innerHTML;
		});

		document.querySelector('[name=pamiec]').addEventListener("click", function(){
			display.innerHTML = calculator.memory;
			calculator.kropkaCheck();
		});

		document.querySelector('[name=dot]').addEventListener("click", function(){
			calculator.dotPress();
		});

		document.querySelector('[name=znak]').addEventListener("click", function(){
			calculator.signChange();
		});

		document.querySelector('[name=plus]').addEventListener("click", function(){
			calculator.policz(1);
		});

		document.querySelector('[name=minus]').addEventListener("click", function(){
			calculator.policz(2);
		});

		document.querySelector('[name=mnoz]').addEventListener("click", function(){
			calculator.policz(3);
		});

		document.querySelector('[name=dziel]').addEventListener("click", function(){
			calculator.policz(4);
		});

		document.querySelector('[name=wynik]').addEventListener("click", function(){
			calculator.wynik();
		});

	},

	numButton(numB){
		if (this.display.innerHTML.length < 18) {
			if (this.clearDisplay === 0) {
				this.display.innerHTML += numB;
			}
			if (this.clearDisplay === 1) {
				this.display.innerHTML = numB;
				this.clearDisplay = 0;
			}
		}
		if (this.display.innerHTML == '00') {
			this.display.innerHTML = '0';
		}
		if (this.display.innerHTML == '0') {
			this.clearDisplay = 1;
		}
	},

	kropkaCheck(){
		if (this.display.innerHTML.includes(".")){
			this.kropka = 1;
		}else{
			this.kropka = 0;
		}
	},

	clearAll(){
			this.operand = 0;
			this.kropka = 0;
			this.dzialanie = 0;
			this.memory = 0;
			this.clearDisplay = 1;
			this.display.innerHTML = "0";
	},

	dotPress(){
		if (calculator.kropka == 0) {
			if (this.display.innerHTML.length < 18) {
				if (calculator.clearDisplay === 0) {
					this.display.innerHTML += ".";
				}
				if (calculator.clearDisplay === 1) {
					this.display.innerHTML = "0.";
					calculator.clearDisplay = 0;
				}
			}
			calculator.kropka = 1;
		}
	},

	signChange(){
		if (this.display.innerHTML != 0) {
			this.display.innerHTML = -1*this.display.innerHTML;
			this.kropkaCheck();
		}
	},

	wynik(){
		if (this.dzialanie > 0){
			var operandB = 1*this.display.innerHTML;
			this.operand = this.operation(this.operand, operandB, this.dzialanie);
			this.display.innerHTML = this.operand;
			this.dzialanie = 0;
			this.clearDisplay = 1;
			this.kropka = 0;
		}
	},

	policz(rodzajDzialania){
		var display = document.querySelector('.display');
		var operandB = 1*this.display.innerHTML;

		if (this.dzialanie === 0){
			this.operand = operandB;
			this.clearDisplay = 1;
			this.kropka = 0;
			this.dzialanie = rodzajDzialania;
		}else{
			if (this.dzialanie === rodzajDzialania) {
				this.operand = this.operation(this.operand, operandB, this.dzialanie);
				this.display.innerHTML = this.operand;
				this.clearDisplay = 1;
				this.kropka = 0;
			}else{
				if (this.clearDisplay === 1) {
					this.dzialanie = rodzajDzialania;
				}
				else{
					this.operand = this.operation(this.operand, operandB, this.dzialanie);
					this.display.innerHTML = this.operand;
					this.clearDisplay = 1;
					this.kropka = 0;
					this.dzialanie =rodzajDzialania;
				}
			}
		}
	},

	operation(operA, operB, operType){
		var result = 0;

		operA *=1;
		operB *=1;

		switch(operType){
			case 1:
				result = operA + operB;
				break;
			case 2:
				result = operA - operB;
				break;
			case 3:
				result = operA * operB;
				break;
			case 4:
				result = operA / operB;
				break;
		}

		return result;
	}	

}

window.onload = function(){
	calculator.init();
};

