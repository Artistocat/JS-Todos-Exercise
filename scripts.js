console.log("new scripts.js");
class ListNode {
    constructor(value) {
        this.value = value;
        this.checked = false;
        this.next = null;
        this.previous = null;
    }
};
class LinkedList {
    constructor(node) {
        this.head = node
        this.tail = node
    }
};

let domTodosList = document.getElementById('todos');


//Parse local storage for saved todos
let todosListLocalStorage = localStorage.getItem('todosList');
let todosList = new LinkedList();
if (todosListLocalStorage != null) {
    todosList = JSON.parse(todosListLocalStorage);
    let currentNode = todosList.head;
    while (currentNode != null) {
        let newLi = createLI(currentNode.value);
        if (currentNode.checked) {
            newLi.lastChild.checked = true;
            newLi.classList.toggle('checked');
        }
        console.log(currentNode.value);
        currentNode = currentNode.next;
    }
}

//Create todos submission form
let myForm = document.querySelector('form');
myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log(myForm.firstElementChild.value);

    let textContent = myForm.firstElementChild.value;
    let newNode = new ListNode(textContent);
    if (todosList.head == null) {
        todosList.head = newNode;
        todosList.tail = newNode;
    }
    else {
        todosList.tail.next = newNode;
        todosList.tail = newNode;
    }
    let newLi = createLI(textContent);

    saveListToLocalStorage();

    myForm.reset();
});

//Create todos list element and adds it to the page. Includes the delete button and checkbox functionality
function createLI(textContent) {
    let newLi = document.createElement('li');
    newLi.textContent = textContent;

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.onclick = () => {
        console.log('delete me plz');
        newLi.remove();

        let currentNode = todosList.head;
        while (currentNode.value != textContent) {
            currentNode = currentNode.next;
        }
        currentNode.previous = currentNode.next;

        saveListToLocalStorage();
    };
    newLi.append(deleteButton);

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = () => {
        let currentNode = todosList.head;
        while (currentNode.value != textContent) {
            currentNode = currentNode.next;
        }
        currentNode.checked = newLi.classList.toggle('checked');
        newLi.remove();
        domTodosList.append(newLi);
        console.log(currentNode.checked);
        saveListToLocalStorage();
    };
    newLi.append(checkbox);
    domTodosList.append(newLi);

    return newLi;
}

//Called each time any change is made to the todos list.
function saveListToLocalStorage() {
    localStorage.setItem('todosList', JSON.stringify(todosList));
    console.log(todosList);
}