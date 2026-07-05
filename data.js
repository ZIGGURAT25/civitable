window.courseData = {
    "CE23712": {
        title: "Hydrology",
        shortCode: "HYD",
        staff: "Goutham Priya M",
        staffCode: "CE_GP",
        credits: "3",
        type: "theory"
    },
    "CE23711": {
        title: "Estimation, Costing and Valuation Engineering",
        shortCode: "ECV",
        staff: "Madhava Perumal R",
        staffCode: "CE_MP",
        credits: "4",
        type: "theory"
    },
    "CE23F11": {
        title: "Intelligent Transport System",
        shortCode: "ITS",
        staff: "Yugasini S",
        staffCode: "CE_YS",
        credits: "3",
        type: "theory"
    },
    "CE23721": {
        title: "Building Information Modelling",
        shortCode: "BIM",
        staff: "Madhava Perumal R",
        staffCode: "CE_MP",
        credits: "2",
        type: "lab"
    }
};

window.timetableData = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  schedule: {
    Monday: [],
    Tuesday: [
      { period: 1, time: "10:00 AM - 11:40 AM", courseCode: "CE23721", room: "TIFAC I01", subType: "lab" },
      { period: 2, time: "12:00 PM - 12:50 PM", courseCode: "CE23F11", room: "A311" },
      { period: 3, time: "2:10 PM - 3:00 PM", courseCode: "CE23712", room: "A311" },
      { period: 4, time: "3:00 PM - 3:50 PM", courseCode: "CE23711", room: "A311" },
      { period: 5, time: "4:00 PM - 4:50 PM", courseCode: "CE23F11", room: "A311" }
    ],
    Wednesday: [
      { period: 1, time: "9:00 AM - 9:50 AM", courseCode: "CE23712", room: "A311" },
      { period: 2, time: "10:00 AM - 11:40 AM", courseCode: "CE23721", room: "TIFAC I01", subType: "lab" },
      { period: 3, time: "1:20 PM - 2:10 PM", courseCode: "CE23711", room: "A311" },
      { period: 4, time: "2:10 PM - 3:00 PM", courseCode: "CE23711", room: "A311" }
    ],
    Thursday: [
      { period: 1, time: "8:00 AM - 8:50 AM", courseCode: "CE23712", room: "A311" },
      { period: 2, time: "9:00 AM - 9:50 AM", courseCode: "CE23712", room: "A311" },
      { period: 3, time: "10:00 AM - 11:40 AM", courseCode: "CE23721", room: "TIFAC I01", subType: "lab" },
      { period: 4, time: "1:20 PM - 3:00 PM", courseCode: "CE23721", room: "TIFAC I01", subType: "lab" }
    ],
    Friday: [
      { period: 1, time: "1:20 PM - 2:10 PM", courseCode: "CE23712", room: "A311" },
      { period: 2, time: "2:10 PM - 3:00 PM", courseCode: "CE23711", room: "A311" },
      { period: 3, time: "3:00 PM - 3:50 PM", courseCode: "CE23F11", room: "A311" },
      { period: 4, time: "4:00 PM - 4:50 PM", courseCode: "CE23F11", room: "A311" }
    ],
    Saturday: [
      { period: 1, time: "8:00 AM - 8:50 AM", courseCode: "CE23712", room: "A311" },
      { period: 2, time: "9:00 AM - 9:50 AM", courseCode: "CE23711", room: "A311" },
      { period: 3, time: "10:00 AM - 10:50 AM", courseCode: "CE23711", room: "A311" },
      { period: 4, time: "11:00 AM - 11:50 AM", courseCode: "CE23F11", room: "A311" },
      { period: 5, time: "12:00 PM - 12:50 PM", courseCode: "CE23F11", room: "A311" }
    ],
    Sunday: []
  }
};

window.lastUpdatedDate = '2026-07-05T09:21:00';
