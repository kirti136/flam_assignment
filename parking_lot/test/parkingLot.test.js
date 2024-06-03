const ParkingLot = require("../src/parkingLot");
const assert = require("assert");

describe("ParkingLot", () => {
  let parkingLot;

  beforeEach(() => {
    parkingLot = new ParkingLot();
  });

  it("should not allow parking without creating a parking lot", () => {
    const result = parkingLot.park("KA-01-HH-1234", "White");
    assert.strictEqual(
      result,
      "Parking lot not created. Please create a parking lot first."
    );
  });

  it("should not allow parking of a car with a duplicate registration number", () => {
    parkingLot.createParkingLot(2);
    parkingLot.park("KA-01-HH-1234", "White");
    const result = parkingLot.park("KA-01-HH-1234", "Black");
    assert.strictEqual(
      result,
      "Car with registration number KA-01-HH-1234 is already parked."
    );
  });

  it("should create a parking lot with given capacity", () => {
    const result = parkingLot.createParkingLot(6);
    assert.strictEqual(result, "Created a parking lot with 6 slots");
  });

  it("should park a car and allocate a slot", () => {
    parkingLot.createParkingLot(1);
    const result = parkingLot.park("KA-01-HH-1234", "White");
    assert.strictEqual(result, "Allocated slot number: 1");
  });

  it("should not park a car if the parking lot is full", () => {
    parkingLot.createParkingLot(1);
    parkingLot.park("KA-01-HH-1234", "White");
    const result = parkingLot.park("KA-01-HH-9999", "White");
    assert.strictEqual(result, "Sorry, parking lot is full");
  });

  it("should free a slot when a car leaves", () => {
    parkingLot.createParkingLot(1);
    parkingLot.park("KA-01-HH-1234", "White");
    const result = parkingLot.leave(1);
    assert.strictEqual(result, "Slot number 1 is free");
  });

  it("should show the status of the parking lot", () => {
    parkingLot.createParkingLot(2);
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "White");
    const result = parkingLot.status();
    const expectedStatus =
      "Slot No.    Registration No    Colour\n1           KA-01-HH-1234      White\n2           KA-01-HH-9999      White";
    assert.strictEqual(result, expectedStatus);
  });

  it("should return registration numbers for cars with a given color", () => {
    parkingLot.createParkingLot(2);
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "Black");
    const result = parkingLot.registrationNumbersForCarsWithColour("White");
    assert.strictEqual(result, "KA-01-HH-1234");
  });

  it("should return slot numbers for cars with a given color", () => {
    parkingLot.createParkingLot(2);
    parkingLot.park("KA-01-HH-1234", "White");
    parkingLot.park("KA-01-HH-9999", "Black");
    const result = parkingLot.slotNumbersForCarsWithColour("White");
    assert.strictEqual(result, "1");
  });

  it("should return slot number for a given registration number", () => {
    parkingLot.createParkingLot(2);
    parkingLot.park("KA-01-HH-1234", "White");
    const result = parkingLot.slotNumberForRegistrationNumber("KA-01-HH-1234");
    assert.strictEqual(result, 1);
  });

  it('should return "Not found" if the registration number is not found', () => {
    parkingLot.createParkingLot(2);
    parkingLot.park("KA-01-HH-1234", "White");
    const result = parkingLot.slotNumberForRegistrationNumber("MH-04-AY-1111");
    assert.strictEqual(result, "Not found");
  });
});
