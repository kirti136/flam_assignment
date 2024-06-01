const fs = require("fs");
const readline = require("readline");
const ParkingLot = require("./parkingLot");

const parkingLot = new ParkingLot();

const processCommand = (command) => {
  const [action, ...params] = command.split(" ");
  switch (action) {
    case "create_parking_lot":
      console.log(parkingLot.createParkingLot(Number(params[0])));
      break;
    case "park":
      console.log(parkingLot.park(params[0], params[1]));
      break;
    case "leave":
      console.log(parkingLot.leave(Number(params[0])));
      break;
    case "status":
      console.log(parkingLot.status());
      break;
    case "registration_numbers_for_cars_with_colour":
      console.log(parkingLot.registrationNumbersForCarsWithColour(params[0]));
      break;
    case "slot_numbers_for_cars_with_colour":
      console.log(parkingLot.slotNumbersForCarsWithColour(params[0]));
      break;
    case "slot_number_for_registration_number":
      console.log(parkingLot.slotNumberForRegistrationNumber(params[0]));
      break;
    case "exit":
      process.exit(0);
    default:
      console.log("Invalid command");
  }
};

module.exports = (filePath) => {
  if (filePath) {
    // File mode
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const commands = fileContent.split("\n").filter(Boolean);

    commands.forEach((command) => {
      processCommand(command);
    });
  } else {
    // Interactive mode
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "> ",
    });

    rl.prompt();

    rl.on("line", (line) => {
      processCommand(line.trim());
      rl.prompt();
    }).on("close", () => {
      console.log("Exiting parking lot system.");
      process.exit(0);
    });
  }
};
