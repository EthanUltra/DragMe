// variables
var draggable = document.getElementById('draggable');
var posX = 0, posY = 0, mouseX = 0, mouseY = 0;

// functions
draggable.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

function mouseDown(e) {
    e.preventDefault();
    posX = e.clientX - draggable.offsetLeft;
    posY = e.clientY - draggable.offsetTop;
    window.addEventListener('mousemove', moveElement, false);
}

function mouseUp() {
    window.removeEventListener('mousemove', moveElement, false);
}

function moveElement(e) {
    mouseX = e.clientX - posX;
    mouseY = e.clientY - posY;
    draggable.style.left = mouseX + 'px';
    draggable.style.top = mouseY + 'px';
}

function startDrag(event) {
    const draggable = event.target.closest('.draggable');

    if (!draggable) return;

    let offsetX = event.clientX - draggable.getBoundingClientRect().left;
    let offsetY = event.clientX - draggable.getBoundingClientRect().top;
    
    function moveElement(event) {
        draggable.style.left = event.clientX - offsetX + 'px';
        draggable.style.top = event.clientY - offsetY + 'px';
    }

    function stopDrag() {
        document.removeEventListener('mousemove', moveElement);
        document.removeEventListener('mouseup', stopDrag);
    }
    
    document.addEventListener('mousemove', moveElement);
    document.addEventListener('mouseup', stopDrag);
}

function startDragForNewElement(event) {
    const newDraggable = event.target.closest('.draggable');

    if (!newDraggable) return;

    let offsetX = event.clientX - newDraggable.getBoundingClientRect().left;
    let offsetY = event.clientY - newDraggable.getBoundingClientRect().top;

    function moveElement(event) {
        newDraggable.style.left = event.clientX - offsetX + 'px';
        newDraggable.style.top = event.clientY - offsetY + 'px';
    }

    function stopDrag() {
        document.removeEventListener('mousemove', moveElement);
        document.removeEventListener('mouseup', stopDrag)
    }

    document.addEventListener('mousemove', moveElement);
    document.addEventListener('mouseup', stopDrag);
}

function addNewForm() {
  const newDraggable = document.createElement('div');
    newDraggable.classList.add('draggable');
    newDraggable.innerHTML = 'New Form';

    newDraggable.style.position = 'absolute';
    newDraggable.style.width = '150px';
    newDraggable.style.height = '150px';
    newDraggable.style.display = 'flex';
    newDraggable.style.flexDirection = 'column';
    newDraggable.style.justifyContent = 'center';
    newDraggable.style.alignItems = 'center';
    newDraggable.style.backgroundColor = '#fff';
    newDraggable.style.borderRadius = '5px';
    newDraggable.style.fontSize = '24px';
    newDraggable.style.lineHeight = '1.5';
    newDraggable.style.boxShadow = '0px 0px 5px 0px rgba(0, 0, 0, 0.5)';
    newDraggable.style.cursor = 'move';

	/* 
	const newButton = document.createElement('button');
    newButton.innerHTML = 'Add';
    newButton.style.animation = 'blink .7s steps(2, start) infinite';
    newButton.style.background = '#E1FF5F';
    newButton.style.borderRadius = '2px';
    newButton.style.color = '#202020';
    newButton.style.cursor = 'pointer';
    newButton.style.fontSize = '20px';
    newButton.style.marginTop = '10px';
	*/

  const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.style.background = '#FF6961';
    deleteButton.style.borderRadius = '2px';
    deleteButton.style.color = '#202020';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.fontSize = '20px';
    deleteButton.style.marginTop = '10px';

    // Event listener for the delete button
    deleteButton.onclick = function() {
      document.body.removeChild(newDraggable);
    };

		// newDraggable.appendChild(newButton);
    newDraggable.appendChild(deleteButton);
      
    newDraggable.onmousedown = startDragForNewElement;

    document.body.appendChild(newDraggable);
}

