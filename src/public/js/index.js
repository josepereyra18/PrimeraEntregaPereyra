const socket = io();

socket.on ('enviar-mensajes-cliente', data =>{
    console.log(data)
})

const input = document.querySelector('#textInput')
const mensajesDiv = document.querySelector('#mensajesDiv')


input.addEventListener('keyup', (event) =>{
    if (event.key === 'Enter'){
        socket.emit('enviar-mensajes-servidor', input.value)
        input.value = ''
    }
})

socket.on ('mensaje-recibido-cliente',arrayMensajes =>{
    // console.log(arrayMensajes)
    let mensajes = ''
    arrayMensajes.forEach(mensaje => {
        mensajes += `<div>
                        <strong>${mensaje.id} :</strong>
                        <span>${mensaje.mensaje}</span>
                    </div>`
    });
    mensajesDiv.innerHTML = mensajes
})