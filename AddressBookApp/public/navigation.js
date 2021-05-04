const headers = document.querySelectorAll(".filter__header");

headers.forEach(header => header.addEventListener("click", openDropdown));

function openDropdown(e){
	let dropdown = e.currentTarget.closest(".filter");
	dropdown.classList.toggle("filter--open");
}

const navToggle = document.querySelector('.nav__toggle');
navToggle.addEventListener('click', () => {
	let nav = document.querySelector('.nav');
	nav.classList.toggle('nav--open');
});