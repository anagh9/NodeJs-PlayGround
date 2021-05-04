class Sort{
	constructor(){
		this.people = [...document.querySelectorAll(".person")];

		this.events();
	}

	events(){
		let sortButtons = document.querySelectorAll(".sort");
		if(sortButtons){
			sortButtons.forEach(btn => btn.addEventListener("click", this.sort.bind(this)));
		}
	}

	sort(e){
		let category = e.currentTarget.dataset.category;
		let order = e.currentTarget.dataset.order;
		let isASC = order === 'ASC';
		let sorted = [];

		let alpha = ["name", "address", "postcode","mobile", "homePhone"];
		let numeric = ["age"];

		if(alpha.includes(category)){
			sorted = this.sortAlpha(category, isASC);
		} else if(numeric.includes(category)){
			sorted = this.sortNum(category, isASC);
		} else if(category == 'birthday'){
			sorted = this.sortDate(category, isASC);
		} else if(category == 'groups'){
			sorted = this.sortGroups(isASC);
		}

		// Clear the current table
		document.querySelector(".table tbody").innerHTML = '';

		// Add sorted people
		for(let i = 0; i < sorted.length; i++){
			document.querySelector(".table tbody").appendChild(sorted[i]);
		}

		if(order == 'ASC'){
			e.currentTarget.dataset.order = 'DESC';
			e.currentTarget.querySelector(".sort__icon").classList.remove('fa-sort-up');
			e.currentTarget.querySelector(".sort__icon").classList.add('fa-sort-down');
		} else{
			e.currentTarget.dataset.order = 'ASC';
			e.currentTarget.querySelector(".sort__icon").classList.remove('fa-sort-down');
			e.currentTarget.querySelector(".sort__icon").classList.add('fa-sort-up');
		}
	}

	sortAlpha(category, isASC){
		let sorted = this.people;

		sorted.sort((p1, p2) => {
			let data = p1.querySelector(`td[data-category='${category}']`).innerText;
			let data2 = p2.querySelector(`td[data-category='${category}']`).innerText;
			
			return data.localeCompare(data2);
		});

		if(isASC) return sorted;
		return sorted.reverse();
	}

	sortNum(category, isASC){
		let sorted = this.people;

		sorted.sort((p1, p2) => {
			let data = parseInt(p1.querySelector(`td[data-category='${category}']`).innerText);
			let data2 = parseInt(p2.querySelector(`td[data-category='${category}']`).innerText);

			if(data == data2) return 0;
			return (data < data2) ? -1 : 1;
		});

		if(isASC) return sorted;
		return sorted.reverse();
	}

	sortDate(category, isASC){
		let sorted = this.people;

		sorted.sort((p1, p2) => {
			let text = p1.querySelector(`td[data-category='${category}']`).innerText;
			let text2 = p2.querySelector(`td[data-category='${category}']`).innerText;

			let date = new Date(text);
			let date2 = new Date(text2);

			if(date == date2) return 0;
			return (date < date2) ? -1 : 1;
		});

		if(isASC) return sorted;
		return sorted.reverse();
	}

	sortGroups(isASC){
		let sorted = this.people;

		sorted.sort((p1, p2) => {
			let groups = p1.querySelector(`td[data-category='groups']`).querySelectorAll(".group");
			let groups2 = p2.querySelector(`td[data-category='groups']`).querySelectorAll(".group");

			// Sort through groups

			if(date == date2) return 0;
			return (date < date2) ? -1 : 1;
		});

		if(isASC) return sorted;
		return sorted.reverse();
	}
}

let s = new Sort();