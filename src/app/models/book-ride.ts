export class Booking {
    id: number;
    bookedBy: number;
    startLocation: string;
    endLocation: string;
    bookingDate: string;
    bookingTime: string;
  
    constructor(args: any = {}) {
      args = args || {};
      this.id = args.id ? args.id : 0;
      this.bookedBy = args.bookedBy ;
      this.startLocation = args.startLocation ;
      this.endLocation = args.endLocation ;
      this.bookingDate = args.bookingDate ;
      this.bookingTime = args.bookingTime ;
    }
  }
  