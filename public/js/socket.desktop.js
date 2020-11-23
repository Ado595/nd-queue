// Comando para establecer la conexión
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var desktop = searchParams.get('desktop');
var label = $('#lbTicket');

$('h1').text('Escritorio ' + desktop);

$('#btn_tend').on('click', function() {

    socket.emit('tendTicket', { desktop: desktop }, function(resp) {

        if (resp.err) {
            alert(resp.mensaje);
            return;
        }

        label.text('Ticket ' + resp.number);

    });

});