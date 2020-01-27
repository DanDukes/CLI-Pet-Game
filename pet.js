const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const clear = require("clear");
const clui = require("clui");

//Pet class constructor
const Pet = function(name, type) {
  this.name = name;
  this.type = type;
  this.hunger = 10;
  this.sleepiness = 2;
  this.boredom = 10;
  this.age = 1;
  this.location = "inside";
  this.houseCondition = 0;
  this.status = "";
};

//class method to feed pet
Pet.prototype.feed = function() {
  if (this.hunger >= 5) {
    this.status = "That was yummy";
    this.hunger -= 10;
    this.sleepiness += 8;
    bounder(this.hunger);
    bounder(this.sleepiness);
  } else {
    this.status = "No Thanks, I'm full!";
  }
};

//class method for sleep
Pet.prototype.sleep = function() {
  if (this.sleepiness >= 15) {
    this.status = "ZzZzZzZzZz!";
    this.sleepiness = 0;
    this.boredom += 15;
    bounder(this.sleepiness);
    bounder(this.boredom);
    this.increaseAge();
  } else {
    this.status = "No Way! I'm not tired!!";
  }
};

//class method to play
Pet.prototype.play = function() {
  if (this.boredom >= 5) {
    this.status = "Yay! Let's play!";
    this.boredom -= 5;
    this.hunger += 5;
    bounder(this.boredom);
    bounder(this.hunger);
  } else {
    this.status = "Not right now... Later?";
  }
};

//class method to increase age
Pet.prototype.increaseAge = function() {
  this.age += 1;
  this.status = `Happy Birthday to Me! I am ${this.age} years old!`;
};

//class method to bark
Pet.prototype.bark = function() {
  console.log("Woof! Woof!");
};

//class method to go outside
Pet.prototype.goOutside = function() {
  if (this.location === "inside") {
    this.status = "Yay! I love the outdoors!";
    this.location = "outside";
    this.bark();
  } else {
    this.status = "But we are already outside?!?!";
  }
};

//class method to go inside
Pet.prototype.goInside = function() {
  if (this.location === "outside") {
    this.status = "Do we have to?";
    this.location = "inside";
  } else {
    this.status = "But I'm already inside....";
  }
};

//class method to meow
Pet.prototype.meow = function() {
  console.log("Meow Meow!");
};

//class method to destroy furniture
Pet.prototype.destroyFurniture = function() {
  if (this.houseCondition < 20) {
    this.houseCondition += 10;
    bounder(this.houseCondition);
    this.status = "MUAHAHAHAHA Take that Furniture!";
    this.isBored = 0;
  }
};

//class method to buy new furniture
Pet.prototype.buyNewFurniture = function() {
  this.houseCondition -= 15;
  bounder(this.houseCondition);
  this.status = "Are you sure about that?";
};

function bounder(i) {
  if (i < 0) {
    i = 0;
  }
  if (i > 20) {
    i = 20;
  }
}

function namePet() {
  const name = inquirer.prompt({
    type: "input",
    message: "What is the name of your pet?",
    name: "petName"
  });
  return name;
}

function setPetType() {
  const type = inquirer.prompt({
    type: "list",
    name: "petType",
    message: "What type of animal is your pet?",
    choices: ["Cat", "Dog", "Bird", "Hamster"]
  });

  return type;
}

const statusCheck = function(pet) {
  let HungerGauge = clui.Gauge;
  let BoredomGauge = clui.Gauge;
  let SleepGauge = clui.Gauge;
  let HouseGauge = clui.Gauge;

  let max = 20;

  //Gauge(value, maxValue, gaugeWidth, dangerZone, suffix)
  clear();
  console.log(chalk.blue.bold(`${pet.name}'s Condition`));
  console.log(HungerGauge(pet.hunger, max, 20, 15, chalk.red("Hunger")));
  console.log(BoredomGauge(pet.boredom, max, 20, 15, chalk.yellow("Boredom")));
  console.log(
    SleepGauge(pet.sleepiness, max, 20, 15, chalk.magenta("Sleepiness"))
  );
  console.log(
    HouseGauge(
      pet.houseCondition,
      max,
      20,
      15,
      chalk.green("Destruction Level")
    )
  );
  console.log(`${pet.name}'s Location is ${pet.location}`);
  console.log(`${pet.name}'s Age is ${pet.age}`);
  if (pet.status) {
    console.log(chalk.blue.bold(pet.status));
  }
  methodCall(pet);
};

const setGameOption = function() {
  gameOption = inquirer.prompt({
    type: "list",
    name: "gameOption",
    message: `What would you like to do with ${pet.name}?`,
    choices: [
      "Feed",
      "Play",
      "Bed",
      "Go Outside",
      "Go Inside",
      "Rough House",
      "Repair House",
      "Quit"
    ]
  });
  return gameOption;
};

async function methodCall(pet) {
  try {
    let { gameOption } = await setGameOption();
    switch (gameOption) {
      case "Feed":
        pet.feed();
        break;
      case "Play":
        pet.play();
        break;
      case "Bed":
        pet.sleep();
        break;
      case "Go Outside":
        pet.goOutside();
        break;
      case "Go Inside":
        pet.goInside();
        break;
      case "Rough House":
        pet.destroyFurniture();
        break;
      case "Repair House":
        pet.buyNewFurniture();
        break;
      case "Quit":
        console.log("Quitting");
        clear();
        process.exit();
        break;
    }
    statusCheck(pet);
  } catch (err) {
    console.log(err);
  }
}

async function init() {
  try {
    console.log(figlet.textSync("Pet Game"));
    console.log(chalk.blue("Welcome to Pet Game!"));
    console.log(chalk.blue("Please create your new friend below!"));
    const { petName } = await namePet();
    const { petType } = await setPetType();
    pet = new Pet(petName, petType);
    clear();
    statusCheck(pet);
  } catch (err) {
    throw err;
  }
}

//runtime
init();
