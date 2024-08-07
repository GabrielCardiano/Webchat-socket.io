const socket = window.io();

// Envia mensagem do frontend (input.value). 
const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientMessage', inputMessage.value);
  inputMessage.value = '';
  return false;
});

// Pega mensagem e renderiza no navegador
const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);  
};

socket.on('serverMessage', (message) => createMessage(message));

window.onbeforeunload = function (event) {
  socket.disconnect();
};