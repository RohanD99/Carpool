export class Stops {
    stopId: number;
    rideId: number;
    stopName: string;

    constructor(args: any = {}) {
        args = args || {};
        this.stopId = args.stopId;
        this.rideId = args.rideId;
        this.stopName = args.stopName;
  }
}