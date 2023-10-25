
export class OfferRide {
    id: number;
    offeredBy: number;
    startLocation: string;
    endLocation: string;
    bookingDate: string; 
    bookingTime: string; 
    stops: string[]; 
    availableSeats: number;
    pricePerSeat: number;
  
    constructor(args: any = {}) {
      args = args || {};
      this.id = args.id;
      this.offeredBy = args.offeredBy
      this.startLocation = args.startLocation ;
      this.endLocation = args.endLocation ;
      this.bookingDate = args.bookingDate ;
      this.bookingTime = args.bookingTime ;
      this.stops = args.stops || [];
      this.availableSeats = args.availableSeats ;
      this.pricePerSeat = args.pricePerSeat ;
    }
  }