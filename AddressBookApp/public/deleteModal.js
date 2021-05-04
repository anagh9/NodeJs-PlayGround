class DeleteModal{
	constructor(){
		this.events();
	}

	events(){
		let closeButtons = document.querySelectorAll(".dialog__close");
		if(closeButtons) closeButtons.forEach(btn => btn.addEventListener("click", this.closeDialog));

		let deleteBtns = document.querySelectorAll(".delete-group");
		if(deleteBtns) deleteBtns.forEach(btn => btn.addEventListener("click", this.openDialog));
	}

	openDialog(e){
		let dialog = document.querySelector(".dialog");
		dialog.classList.add("dialog--show");

		let groupID = e.target.closest(".group").dataset.group

		let deletePeopleForm = dialog.querySelector(".delete-people");
		let keepPeopleForm = dialog.querySelector(".keep-people");

		deletePeopleForm.action = `/group/${groupID}?_method=DELETE&deleteMembers=true`;
		keepPeopleForm.action = `/group/${groupID}?_method=DELETE`;
	}

	closeDialog(e){
		let dialog = e.target.closest(".dialog");

		let deletePeopleForm = dialog.querySelector(".delete-people");
		let keepPeopleForm = dialog.querySelector(".keep-people");

		deletePeopleForm.action = ``;
		keepPeopleForm.action = ``;

		dialog.classList.remove("dialog--show");
	}
}

let modal = new DeleteModal();