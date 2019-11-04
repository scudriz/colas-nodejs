const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (callback) => {

        let nuevoTicket = ticketControl.siguiente();
        console.log(nuevoTicket);
        callback(nuevoTicket);

    });


    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });



    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        if (atenderTicket === 'No hay tickets') return

        client.broadcast.emit('estadoActual', {
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimos4()
        });

    });
});