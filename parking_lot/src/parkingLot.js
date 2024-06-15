const Table = require("cli-table");

class ParkingLot {
  constructor() {
    this.capacity = 0;
    this.slots = [];
  }

  createParkingLot(capacity) {
    this.capacity = capacity;
    this.slots = Array(capacity).fill(null);
    return `Created a parking lot with ${capacity} slots`;
  }

  park(registrationNumber, color) {
    if (!registrationNumber || !color) {
      return "Invalid input. Please provide both registration number and color.";
    }

    if (this.capacity === 0) {
      return "Parking lot not created. Please create a parking lot first.";
    }

    if (
      this.slots.some(
        (car) => car && car.registrationNumber === registrationNumber
      )
    ) {
      return `Car with registration number ${registrationNumber} is already parked.`;
    }

    const availableSlot = this.slots.indexOf(null);
    if (availableSlot === -1) {
      return "Sorry, parking lot is full";
    }

    const car = new Car(registrationNumber, color);
    this.slots[availableSlot] = car;
    return `Allocated slot number: ${availableSlot + 1}`;
  }

  leave(slotNumber) {
    if (this.capacity === 0) {
      return "Parking lot not created. Please create a parking lot first.";
    }

    if (slotNumber > this.capacity || this.slots[slotNumber - 1] === null) {
      return `Slot number ${slotNumber} is already empty`;
    }

    this.slots[slotNumber - 1] = null;
    return `Slot number ${slotNumber} is free`;
  }

  status() {
    if (this.capacity === 0) {
      return "No data to show. Parking lot not created. Please create a parking lot first.";
    }

    const header = "Slot No.    Registration No    Colour";
    const body = this.slots
      .map((car, index) => {
        if (car) {
          return `${index + 1}           ${car.registrationNumber}      ${
            car.color
          }`;
        }
        return null;
      })
      .filter(Boolean)
      .join("\n");

    return `${header}\n${body}`;
  }

  // status() {
  //   if (this.capacity === 0) {
  //     return "No data to show. Parking lot not created. Please create a parking lot first.";
  //   }

  //   const table = new Table({
  //     head: ["Slot No.", "Registration No", "Colour"],
  //     colWidths: [10, 20, 15],
  //   });

  //   this.slots.forEach((car, index) => {
  //     if (car) {
  //       table.push([index + 1, car.registrationNumber, car.color]);
  //     }
  //   });

  //   return table.toString();
  // }

  registrationNumbersForCarsWithColour(color) {
    let slots = this.slots
      .filter((car) => car && car.color.toLowerCase() === color.toLowerCase())
      .map((car) => car.registrationNumber)
      .join(", ");

    return slots.length === 0 ? "Not Found" : slots;
  }

  slotNumbersForCarsWithColour(color) {
    let slots = this.slots
      .map((car, index) =>
        car && car.color.toLowerCase() === color.toLowerCase()
          ? index + 1
          : null
      )
      .filter(Boolean)
      .join(", ");

    return slots.length === 0 ? "Not Found" : slots;
  }

  slotNumberForRegistrationNumber(registrationNumber) {
    const slot = this.slots.findIndex(
      (car) => car && car.registrationNumber === registrationNumber
    );

    return slot !== -1 ? slot + 1 : "Not found";
  }
}

class Car {
  constructor(registrationNumber, color) {
    this.registrationNumber = registrationNumber;
    this.color = color;
  }
}

module.exports = ParkingLot;
