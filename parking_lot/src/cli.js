const fs = require("fs");
const readline = require("readline");
const ParkingLot = require("./parkingLot");

const parkingLot = new ParkingLot();

const showMenu = () => {
  console.log(`
+-------------------------------------------------------------------+
|                      Please choose an option                      |
+-------------------------------------------------------------------+
| 1. Create parking lot                                             |
| 2. Park a car                                                     |
| 3. Leave a slot                                                   |
| 4. Show status                                                    |
| 5. Show registration numbers for cars with a specific color       |
| 6. Show slot numbers for cars with a specific color               |
| 7. Show slot number for a car with a specific registration number |
| 8. Exit                                                           |
+-------------------------------------------------------------------+
  `);
};

const processCommand = (command) => {
  const trimmedCommand = command.trim();
  console.log("》 Processing command:", trimmedCommand);
  const [action, ...params] = trimmedCommand.split(/\s+/);
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
      console.log("Exiting parking lot system.");
      process.exit(0);
    default:
      console.log("Invalid command");
  }
};

const handleOption = (option) => {
  switch (option) {
    case "1":
      rl.question("Enter the number of slots: ", (slots) => {
        console.log(parkingLot.createParkingLot(Number(slots)));
        showMenu();
        rl.prompt();
      });
      break;
    case "2":
      rl.question(
        "Enter the registration number and color (e.g., KA-01-HH-1234 White): ",
        (input) => {
          const [regNumber, color] = input.split(" ");
          console.log(parkingLot.park(regNumber, color));
          showMenu();
          rl.prompt();
        }
      );
      break;
    case "3":
      rl.question("Enter the slot number to leave: ", (slotNumber) => {
        console.log(parkingLot.leave(Number(slotNumber)));
        showMenu();
        rl.prompt();
      });
      break;
    case "4":
      console.log(parkingLot.status());
      showMenu();
      rl.prompt();
      break;
    case "5":
      rl.question("Enter the color: ", (color) => {
        console.log(parkingLot.registrationNumbersForCarsWithColour(color));
        showMenu();
        rl.prompt();
      });
      break;
    case "6":
      rl.question("Enter the color: ", (color) => {
        console.log(parkingLot.slotNumbersForCarsWithColour(color));
        showMenu();
        rl.prompt();
      });
      break;
    case "7":
      rl.question("Enter the registration number: ", (regNumber) => {
        console.log(parkingLot.slotNumberForRegistrationNumber(regNumber));
        showMenu();
        rl.prompt();
      });
      break;
    case "8":
      console.log("Exiting parking lot system.");
      process.exit(0);
    default:
      console.log("Invalid option. Please choose a number between 1 and 8.");
      showMenu();
      rl.prompt();
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
    global.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "> ",
    });

    rl.prompt();

    rl.on("line", (line) => {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        handleOption(trimmedLine);
      } else {
        showMenu();
        rl.prompt();
      }
    }).on("close", () => {
      console.log("Exiting parking lot system.");
      process.exit(0);
    });

    showMenu();
    rl.prompt();
  }
};
