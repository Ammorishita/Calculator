let app = {
	init: function() {
		this.setup();
		this.operatorCount = 0;
	},
	setup: function() {
		const calculator = document.getElementById('calculator');
		this.operators = document.querySelectorAll('.btn--operator');
		this.display = document.querySelector('.value');
		this.warning = document.querySelector('.warning');
		this.subDisplay = document.querySelector('.value--pending');
		calculator.addEventListener('click', this.displayInput.bind(this));
	},
	//Cannot have two divisions or multipliers in a row
	toggleOperators: function(e) {
		if(e === true) {
			this.operators.forEach(btn => {
				btn.classList.remove('btn--input');
			});
		} else {
			this.operators.forEach(btn => {
				btn.classList.add('btn--input');
			});			
		}
	},
	displayInput: function(e) {
		//Enter values as long as entry limit doesnt exceed 10 values
		this.currentInput = e.target.innerHTML;
		if(e.target.classList.contains('btn--input')) {
			this.currentButton = e.target;
			this.displayLength = this.display.value.length;
			this.lastValue = this.display.value.slice(-1);
			if(this.display.value === '0') {
				this.display.value = this.currentInput;
			} else if(this.displayLength < 10) {
				this.display.value += this.currentInput;
			}
		}
		if(e.target.classList.contains('btn--operator')) {
			this.toggleOperators(true);
		} else if(!e.target.classList.contains('btn--operator')) {
			this.toggleOperators(false);
		}
		//Debug the eval for errors
		try {
			this.pendingValue = eval(this.display.value);
			this.warning.value = '';
		} catch(err) {
			console.log(err)
		}
		this.subDisplay.value = this.pendingValue;
		if(this.subDisplay.value.length > 10) {
			this.subDisplay.value = this.subDisplay.value.substring(0,10);
		}
		//Test for errors on each individual button
		switch(this.currentInput) {
			case '+':
				if(this.lastValue === '+') {
					this.display.value = this.display.value.slice(0,-1);
				}
				break;
			case '-':
				if(this.lastValue === '-') {
					this.display.value = this.display.value.slice(0,-1);
				}
				break;
			case '*':
				if(this.lastValue === '*') {
					this.display.value = this.display.value.slice(0,-1);
				}					
				break;
			case '/':
				if(this.lastValue === '/') {
					this.display.value = this.display.value.slice(0,-1);
				}			
				break;
			case '.':
				if(this.lastValue === '.') {
					this.display.value = this.display.value.slice(0,-1);
				}			
				break;
			case '+/-':
				let sign = this.display.value[0];
				if(sign === '-') {
					this.display.value = this.display.value.slice(1);
				} else {
					this.display.value = '-' + this.display.value;
				}
				break;
			case 'CE':
				//Clear the last entry
				this.display.value = this.display.value.slice(0,-1);
				this.subDisplay.value = this.subDisplay.value.slice(0,-1);
				if(this.display.value === '') {
					this.display.value = '0';
					this.subDisplay.value = '0';
				}
				break;
			case 'AC':
				//Clear entire entry
				this.display.value = '0';
				this.subDisplay.value = '0';
				break;
			case '=':
				//Display only first 10 digits of evaluated value
				try {
					this.output = eval(this.display.value);
					this.output = this.output.toString().substring(0,10);
					this.display.value = this.output;
					this.subDisplay.value = '0';
				} catch(err) {
					this.warning.value = 'Invalid Expression';
					this.display.value = '0';
					this.pendingValue.value = ''
				}
				break;
			default:
				break;
		}
	}
}
app.init();