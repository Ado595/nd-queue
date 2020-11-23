const fs = require('fs');

class Ticket {

    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }

}



class TicketControl {

    constructor() {

        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last_4 = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {

            this.last = data.last;
            this.tickets = data.tickets;
            this.last_4 = data.last_4;

        } else {
            this.Restart();
        }

    }

    newTicket() {

        this.last += 1;

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.RecordFile();

        return this.last;

    }

    getLastTicket() {
        return `Ticket ${ this.last }`;
    }

    getLast4() {
        return this.last_4;
    }

    tendTicket(desktop) {

        if (this.tickets.length === 0) {
            return "err";
        }

        //first element
        let numberTicket = this.tickets[0].number;
        //delete first element
        this.tickets.shift();

        let antendTicket = new Ticket(numberTicket, desktop);

        //add element in first position
        this.last_4.unshift(antendTicket);

         if (this.last_4.length > 4) {
             //delete the last element
             this.last_4.splice(-1, 1);
         }

        this.RecordFile();

        return antendTicket;

     }


    Restart(){

        this.last = 0;
        this.tickets = [];
        this.last_4 = [];

        console.log('Se ha inicializado el sistema');
        this.RecordFile();

    }


    RecordFile() {

        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last_4: this.last_4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }



}



module.exports = {
    TicketControl
}