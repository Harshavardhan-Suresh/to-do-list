let data = []
if (localStorage.getItem("data") !== null)
	data = JSON.parse(localStorage.getItem("data"));
const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list_el = document.querySelector("#tasks");

const actions = Array.from(document.querySelectorAll('[data-action]'));
actions.forEach(action => {
	action.addEventListener('click', () => {
		const action_name = action.dataset.action;
		if (action_name == 'clear') {
			localStorage.removeItem('data');
			data = [];	
			document.location.reload(true);
		}
	});
});
 

if (data != []) {
	data.forEach(task => {
		const task_el = document.createElement('div');
		task_el.classList.add('task');
	
		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');
	
		task_el.appendChild(task_content_el);
	
		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');
		
		task_content_el.appendChild(task_input_el);
		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');

		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);
		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				var old_text = task_input_el.value;
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();	
			} else {
				if (!task_input_el.value) {
					alert("Please do not leave the task empty");
					return;
				}
				idx = data.indexOf(old_text);
				data.splice(idx, 1, task_input_el.value);
				localStorage.setItem('data', JSON.stringify(data));
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});
	
		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
			data.splice(data.indexOf(task_input_el.value), 1);
			localStorage.setItem('data', JSON.stringify(data));
		});
	});
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const task = input.value;
	if (!task) {
		alert("Please fill out the task");
		return;
	}
	const task_el = document.createElement('div');
	task_el.classList.add('task');

	const task_content_el = document.createElement('div');
	task_content_el.classList.add('content');

	task_el.appendChild(task_content_el);

	const task_input_el = document.createElement('input');
	task_input_el.classList.add('text');
	task_input_el.type = 'text';
	task_input_el.value = task;
	task_input_el.setAttribute('readonly', 'readonly');
	data.push(task);
	localStorage.setItem('data', JSON.stringify(data));
	task_content_el.appendChild(task_input_el);

	const task_actions_el = document.createElement('div');
	task_actions_el.classList.add('actions');
	
	const task_edit_el = document.createElement('button');
	task_edit_el.classList.add('edit');
	task_edit_el.innerText = 'Edit';

	const task_delete_el = document.createElement('button');
	task_delete_el.classList.add('delete');
	task_delete_el.innerText = 'Delete';

	task_actions_el.appendChild(task_edit_el);
	task_actions_el.appendChild(task_delete_el);

	task_el.appendChild(task_actions_el);

	list_el.appendChild(task_el);
	input.value = '';
	task_edit_el.addEventListener('click', (e) => {
		if (task_edit_el.innerText.toLowerCase() == "edit") {
			var old_text = task_input_el.value;
			task_edit_el.innerText = "Save";
			task_input_el.removeAttribute("readonly");
			task_input_el.focus();	
		} else {
			if (!task_input_el.value) {
				alert("Please do not leave the task empty");
				return;
			}
			idx = data.indexOf(old_text);
			data.splice(idx, 1, task_input_el.value);
			localStorage.setItem('data', JSON.stringify(data));
			task_edit_el.innerText = "Edit";
			task_input_el.setAttribute("readonly", "readonly");
		}
	});

	task_delete_el.addEventListener('click', (e) => {
		list_el.removeChild(task_el);
		data.splice(data.indexOf(task_input_el.value), 1);
		localStorage.setItem('data', JSON.stringify(data));
	});
});

