let app = {
	init: function() {
		this.setup();
	},
	setup: function() {
		let calculator = document.getElementById('calculator');
		this.display = document.querySelector('.value');
		this.subDisplay = document.querySelector('.value--final');
		calculator.addEventListener('click', this.displayInput.bind(this));
	},
	displayInput: function(e) {
		this.currentInput = e.target.innerHTML;
		this.currentLength = this.display.value.length;
		if(e.target.classList.contains('btn--input') && this.currentLength < 10) {
			this.display.value += this.currentInput;
			console.log(typeof this.display.value)
		} else {
			console.log('not an input')
		}
		switch(this.currentInput) {
			case "=":
				this.output = eval(this.display.value);
				this.display.value = this.output;
				break;
			default:
				break;
		}
	}
}
app.init();