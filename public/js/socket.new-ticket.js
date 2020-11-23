// Comando para establecer la conexión
var socket = io();

var label = $('#lblNewTicket');


socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// on 'estadoActual'
socket.on('actualState', function(resp) {

    label.text(resp.actual);

});


$('#btn_new_ticket').on('click', function() {

    socket.emit('newTicket', null, function(newTicket) {

        label.text("Ticket "+newTicket);

    });


});