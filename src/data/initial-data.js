const initialData = {
  teams: [
    { id: "red", name: "Red Wolves", score: "8", color: "red", teamRoster: [] },
    {
      id: "yellow",
      name: "Yellow Wolves",
      score: "2",
      color: "yellow",
      teamRoster: [],
    },
    {
      id: "green",
      name: "Green Wolves",
      score: "6",
      color: "green",
      teamRoster: [],
    },
    {
      id: "blue",
      name: "Blue Wolves",
      score: "7",
      color: "blue",
      teamRoster: [],
    },
  ],
  students: {
    1: { id: "1", name: "Jose M Gonzalez" },
    2: { id: "2", name: "Minh" },
    3: { id: "3", name: "Stacy" },
    4: { id: "4", name: "Marquis" },
  },
  roster: {
    droppableID: "0012",
    students: ["1", "2", "3", "4"],
  },
};

export default initialData;
