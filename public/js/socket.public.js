// Comando para establecer la conexión
var socket = io();

//Data ultimos 4 atenciones
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesktop1 = $('#lblDesktop1');
var lblDesktop2 = $('#lblDesktop2');
var lblDesktop3 = $('#lblDesktop3');
var lblDesktop4 = $('#lblDesktop4');


var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesktops = [lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4];


socket.on('actualState', function(data) {
    updateHTML(data.last_4);
});

socket.on('last4', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    updateHTML(data.ultimos4);
});


function updateHTML(last_4) {

    for (var i = 0; i <= last_4.length - 1; i++) {

        lblTickets[i].text('Ticket ' + last_4[i].number);
        lblDesktops[i].text('Escritorio ' + last_4[i].desktop);
    }

}