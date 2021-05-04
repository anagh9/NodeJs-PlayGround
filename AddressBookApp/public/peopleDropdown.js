let dropdownBts = document.querySelectorAll(".person__down");

if(dropdownBts) dropdownBts.forEach(btn => btn.addEventListener("click", toggleDropdown));

function toggleDropdown(e){
	let person = e.target.closest(".person");
	person.classList.toggle("person--open");
}

window.addEventListener("resize", checkToggle);

function checkToggle(){
	let mq = window.matchMedia("(min-width:768px)");
	if(mq.matches){
		// Go through each person and ensure their dropdown is not open
		let people = document.querySelectorAll(".person");
		if(people){
			people.forEach(person => {
				person.classList.remove("person--open");
			});
		}
	}
}