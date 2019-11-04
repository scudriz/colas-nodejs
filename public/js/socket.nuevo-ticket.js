// comando para establecerla conexion

var socket = io();
const label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
});

// los on son para escuchar
socket.on('disconnect', function() {
    console.log('perdimos conección con el servidor');
});

$('button').on('click', function() {

    socket.emit('siguienteTicket', (nuevoTicket) => {
        label.text(nuevoTicket);
    });

});