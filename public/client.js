const socket=io();
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");

const append=(message,position)=>{
        const messageElement=document.createElement('div');
        messageElement.innerText=message;
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
}
form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const msg=messageInput.value;
        append(`You: ${msg}`,'right');
        socket.emit('send',msg);
        messageInput.value='';
})
const names=prompt("Enter your name to join");

socket.emit('new-user-joined',names);

socket.on('user-joined',(names)=>{
append(`${names} joined the chat`,'left');
});

socket.on('receive',(data)=>{
        append(`${data.names}:${data.message}`,'left');
})


// socket.on('message',(message)=>{
//     const p=document.createElement('p');
//     p.innerText=message;
//     allmessages.appendChild(p);
// });
// sendBtn.addEventListener("click",(e)=>{
//     const message=messageInput.value;
//     socket.emit('user-message',message);
// });