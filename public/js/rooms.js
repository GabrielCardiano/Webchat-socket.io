const socket = window.io();

// A `lib` expõe a constante `Qs`, que utilizaremos dessa forma no nosso exemplo
// permite acessar parâmetros via query string do lado do front-end.
//  É através dessa lib que  acessamos os valores enviados pelo formulário da página entrar.html.
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Renderiza mensagem na tela
const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

const chatMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}

const serverMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  const i = document.createElement('i');
  i.innerText = message;
  li.appendChild(i);
  messagesUl.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}

// Emite mensagem do frontend quando entra na sala
socket.emit('joinRoom', { username, room });

// Envia mensagem do frontend quando submete form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = inputMessage.value;
  socket.emit('roomClientMessage', { room, message });
  inputMessage.value = '';
  return false;
});

// Fica escutando para receber mensagem do Backend
socket.on('serverMessage', (message) => serverMessage(message))
socket.on('chatMessage', (message) => {
  console.log('frontend aqui')
  chatMessage(message);
  // window.scrollTo(0, document.body.scrollHeight);

});

window.onbeforeunload = function (event) {
  socket.disconnect();
};