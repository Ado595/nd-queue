const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('newTicket', (data, callback) => {

        let newTck = ticketControl.newTicket();
        callback(newTck);
    });


    client.emit('actualState', {
        actual: ticketControl.getLastTicket(),
        last_4: ticketControl.getLast4()
    });

    client.on('tendTicket', (data, callback) => {

        let tendTicket = ticketControl.tendTicket(data.desktop);

        if (tendTicket == 'err') {
            return callback({
                err: true,
                mensaje: 'No se han creado tickets nuevos'
            });
        }

        callback(tendTicket);

        // update/ notify change public.html
        client.broadcast.emit('last4', {
            ultimos4: ticketControl.getLast4()
        });


     });
 });