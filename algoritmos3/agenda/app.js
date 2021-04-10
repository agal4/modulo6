//Agenda

// Constantes
var WORK_HOURS = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

// Datos
var myTeam = [
  {
    name: "María",
    availability: new Array(8).fill(true),
  },
  {
    name: "Pedro",
    availability: new Array(8).fill(true),
  },
  {
    name: "Esther",
    availability: new Array(8).fill(true),
  },
  {
    name: "Marcos",
    availability: new Array(8).fill(true),
  },
];

var randomizeSchedule = () => {
  for (const member of myTeam) {
    for (var i = 0; i < member.availability.length; i++) {
      member.availability[i] = getRandom(true, false);
    }
  }
};

var getRandom = (a, b) => (Math.random() < 0.5 ? a : b);

var isAvailable = (availability) => {
  return availability ? "Sí" : "No";
};

var printTeamSchedule = () => {
  for (const member of myTeam) {
    printSchedule(member);
  }
};

var printSchedule = (member) => {
  console.log("Disponibilidad de: " + member.name);
  for (var i = 0; i < WORK_HOURS.length; i++) {
    console.log(WORK_HOURS[i] + ": " + isAvailable(member.availability[i]));
  }
};

var findFreeTimeSlot = () => {
  var i = 0;
  var freeTimeSlot;
  var foundTimeSlot = false;
  //Initialize an array to track availability for all members
  var availabilityTracker = new Array(myTeam.length).fill(false);
  //Initialize another array to true: what the availabilityTracker should look like when a free timeslot is found
  var timeSlotFreeForEveryone = new Array(myTeam.length).fill(true);

  do {
    //Main loop (i) iterates thorugh every timeslot in WORK_HOURS until it ends or finds a free timeslot for all
    for (var j = 0; j < myTeam.length; j++) {
      //Inner loop (j) goes through all members of the team and checks the availability of current timeslot
      availabilityTracker[j] = myTeam[j].availability[i] ? true : false;
    }
    //Check if the current timeslot is available for all members
    if (availabilityTracker.toString() === timeSlotFreeForEveryone.toString()) {
      //Get the current timeslot and end the loop
      freeTimeSlot = WORK_HOURS[i];
      foundTimeSlot = true;
    } else {
      //Reset the tracker
      availabilityTracker.fill(false);
    }
    i++;
  } while (i < WORK_HOURS.length && foundTimeSlot === false);

  if (foundTimeSlot) {
    console.log("Hueco encontrado en el horario " + freeTimeSlot);
  } else {
    console.log("Lo siento, No hay hueco disponible en el equipo");
  }
};

randomizeSchedule();
printTeamSchedule();
findFreeTimeSlot();
