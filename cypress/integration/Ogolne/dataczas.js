var date = new Date();
var dd = String(date.getDate()).padStart(2, '0');
var mies = String(date.getMonth() + 1).padStart(2, '0');
console.log(mies);


var options = {year: 'numeric', month: 'long', day: 'numeric' };
	
console.log(new Intl.DateTimeFormat('pl-PL', options).format(date));