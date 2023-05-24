import 'zone.js/dist/zone';
import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  seats: any[] = [];
  selectedSeats: number[] = [];
  totalSeats = 80;
  seatsPerRow = 7;
  column1: any[] = [];
  column2: any[] = [];
  column3: any[] = [];
  column4: any[] = [];
  column5: any[] = [];
  column6: any[] = [];
  column7: any[] = [];
  bookedSeat: number[] = [];
  flag = 0;

  constructor() {
    // Assume some seats are already occupied
    const occupiedSeats = [
      3, 5, 6, 7, 8, 9, 11, 12, 13, 14, 16, 18, 21, 23, 25, 26, 27, 28, 30, 31,
      32, 35, 38, 40, 41, 42, 46, 50, 53, 57, 60, 62, 66, 70, 71, 75, 77,
    ];

    // Initialize seats array
    for (let i = 1; i <= this.totalSeats; i++) {
      this.seats.push({
        column: (i - 1) % 7,
        number: i,
        isOccupied: occupiedSeats.includes(i),
      });
    }
    this.show();
  }

  //When user will put some number in input and click on Book Seats button, this function will trigger

  bookSeats(numSeats: number) {
  
    
    

    this.flag = 0;
    this.bookedSeat = [];

    for (let i = 0; i < this.seats.length; i++) {
      if (this.seats[i].isSelected) {
        this.seats[i].isOccupied = true;
        this.seats[i].isSelected = false;
      }
    }

        if (!numSeats) {

              alert('Please type number of seat required !');
              return;


        }

    if (numSeats > 7 || numSeats <= 0) {
      alert('Please select 1 to 7 seats only!');
      return;
    }

    const getSeats = this.findAvailableSeats(numSeats);
    if (
      getSeats.availableSeats.length === 0 &&
      getSeats.totalSeatAvailable > 0 
    ) {
      alert(
        getSeats.totalSeatAvailable +
          ' seat available only, Please try with less number of seat!'
      );
      return;
    }

    if (getSeats.availableSeats.length === 0) {
      alert('No available seats!');
      return;
    }

    if (getSeats.row === 1) {
      for (const seat of getSeats.availableSeats) {
        this.seats[seat - 1].isSelected = true;
        this.selectedSeats.push(seat - 1);
        console.log('Booked Seat Number : ' + seat);
        this.bookedSeat.push(seat);
      }
    } else {
      for (const seat of getSeats.availableSeats) {
        seat.isSelected = true;
        this.selectedSeats.push(seat.number);
        this.bookedSeat.push(seat.number);
        console.log('Booked Seat Number: ' + seat.number);
      }
    }
    this.flag = 1;
  }

  //This function will find available seats, and provide seats to be booked.

  findAvailableSeats(numSeats: number) {
    let startIndex = -1;
    let endIndex = 0;
    let count = 0;
    let row = 1;
    let totalSeatAvailable = 0;
    let tempSeats: any[] = [];

    const availableSeats: any[] = [];

    for (let i = 0; i < this.seats.length; i++) {
      if (!this.seats[i].isOccupied && !this.seats[i].isSelected) {
        if (count === 0) {
          startIndex = i;
        }
        count++;
      } else {
        count = 0;
      }

      if (count === numSeats) {
        endIndex = i;
        break;
      }
    }

    if (endIndex - startIndex === numSeats - 1) {
      availableSeats.push(...this.seats.slice(startIndex, endIndex + 1));
      row = 0;
    }

    if (row) {
      let dist = 100000;
      let index = 1000;
      for (let i = 0; i < this.seats.length; i++) {
        if (!this.seats[i].isOccupied && !this.seats[i].isSelected) {
          totalSeatAvailable++;
          tempSeats.push(this.seats[i].number);
        }
      }

      if (totalSeatAvailable >= numSeats) {
        for (let i = 0; i < tempSeats.length; i++) {
          let sum = 0;
          for (let j = i; j < i + numSeats - 1; j++) {
            sum = sum + tempSeats[j + 1] - tempSeats[j];
          }

          if (sum < dist && sum > 0) {
            dist = sum;
            index = i;
          }
        }
        for (let j = index; j < index + numSeats; j++) {
          availableSeats.push(tempSeats[j]);
        }
      }
    }

    return { availableSeats, row, totalSeatAvailable };
  }

  //This function is to arrange seats in coach of train

  show() {
    for (let i = 0; i < this.seats.length; i++) {
      if (this.seats[i].column === 0) {
        this.column1.push(this.seats[i]);
      }
      if (this.seats[i].column === 1) {
        this.column2.push(this.seats[i]);
      }
      if (this.seats[i].column === 2) {
        this.column3.push(this.seats[i]);
      }
      if (this.seats[i].column === 3) {
        this.column4.push(this.seats[i]);
      }
      if (this.seats[i].column === 4) {
        this.column5.push(this.seats[i]);
      }
      if (this.seats[i].column === 5) {
        this.column6.push(this.seats[i]);
      }
      if (this.seats[i].column === 6) {
        this.column7.push(this.seats[i]);
      }
    }
  }
}
