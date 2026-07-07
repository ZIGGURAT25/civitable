window.courseData = {
    "CE23711": {
        title: "Estimation, Costing and Valuation Engineering",
        shortCode: "ECV",
        staff: "Madhava Perumal R",
        staffCode: "CE_MP",
        credits: "4",
        type: "theory"
    },
    "CE23712": {
        title: "Hydrology",
        shortCode: "HYD",
        staff: "Goutham Priya M",
        staffCode: "CE_GP",
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
    },
    "CE23A12": {
        title: "Maintenance, Repair and Rehabilitation of Structures",
        shortCode: "MRR",
        staff: "M Umamaguesvari",
        staffCode: "CE_MU",
        credits: "3",
        type: "theory"
    },
    "CE23F11": {
        title: "Intelligent Transport System",
        shortCode: "ITS",
        staff: "Yugasini S",
        staffCode: "CE_YS",
        credits: "3",
        type: "theory"
    }
};

window.timetableData = {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    schedule: {
        Monday: [],
        Tuesday: [
            { period: "L2", time: "10:00 AM - 11:40 AM", courseCode: "CE23721", room: "TIFAC I01", batches: [1, 2] },
            { period: 4, time: "12:00 PM - 12:50 PM", courseCode: "CE23F11", room: "A311", batches: [1] },
            { period: 6, time: "2:10 PM - 3:00 PM", courseCode: "CE23712", room: "A311", batches: [1, 2] },
            { period: 7, time: "3:00 PM - 3:50 PM", courseCode: "CE23711", room: "A311", batches: [1, 2] },
            { period: 8, time: "4:00 PM - 4:50 PM", courseCode: "CE23F11", room: "A311", batches: [1] },
            { period: 8, time: "4:00 PM - 4:50 PM", courseCode: "CE23A12", room: "A309", batches: [2] }
        ],
        Wednesday: [
            { period: 0, time: "8:00 AM - 8:50 AM", courseCode: "CE23A12", room: "A311", batches: [2] },
            { period: 1, time: "9:00 AM - 9:50 AM", courseCode: "CE23712", room: "A311", batches: [1, 2] },
            { period: "L2", time: "10:00 AM - 11:40 AM", courseCode: "CE23721", room: "TIFAC I01", batches: [1, 2] },
            { period: 5, time: "1:20 PM - 2:10 PM", courseCode: "CE23711", room: "A311", batches: [1, 2] },
            { period: 6, time: "2:10 PM - 3:00 PM", courseCode: "CE23711", room: "A311", batches: [1, 2] }
        ],
        Thursday: [
            { period: 0, time: "8:00 AM - 8:50 AM", courseCode: "CE23712", room: "A311", batches: [1, 2] },
            { period: 1, time: "9:00 AM - 9:50 AM", courseCode: "CE23712", room: "A311", batches: [1, 2] },
            { period: "L2", time: "10:00 AM - 11:40 AM", courseCode: "CE23721", room: "TIFAC I01", batches: [1, 2] },
            { period: "L4", time: "1:20 PM - 3:00 PM", courseCode: "CE23721", room: "TIFAC I01", batches: [1, 2] }
        ],
        Friday: [
            { period: 3, time: "11:00 AM - 11:50 AM", courseCode: "CE23A12", room: "A311", batches: [2] },
            { period: 5, time: "1:20 PM - 2:10 PM", courseCode: "CE23712", room: "A311", batches: [1, 2] },
            { period: 6, time: "2:10 PM - 3:00 PM", courseCode: "CE23711", room: "A311", batches: [1, 2] },
            { period: 7, time: "3:00 PM - 3:50 PM", courseCode: "CE23F11", room: "A311", batches: [1] },
            { period: 7, time: "3:00 PM - 3:50 PM", courseCode: "CE23A12", room: "A309", batches: [2] },
            { period: 8, time: "4:00 PM - 4:50 PM", courseCode: "CE23F11", room: "A311", batches: [1] }
        ],
        Saturday: [
            { period: 0, time: "8:00 AM - 8:50 AM", courseCode: "CE23712", room: "A311", batches: [1, 2] },
            { period: 1, time: "9:00 AM - 9:50 AM", courseCode: "CE23711", room: "A311", batches: [1, 2] },
            { period: 2, time: "10:00 AM - 10:50 AM", courseCode: "CE23711", room: "A311", batches: [1, 2] },
            { period: 3, time: "11:00 AM - 11:50 AM", courseCode: "CE23F11", room: "A311", batches: [1] },
            { period: 3, time: "11:00 AM - 11:50 AM", courseCode: "CE23A12", room: "A309", batches: [2] },
            { period: 4, time: "12:00 PM - 12:50 PM", courseCode: "CE23F11", room: "A311", batches: [1] },
            { period: 4, time: "12:00 PM - 12:50 PM", courseCode: "CE23A12", room: "A309", batches: [2] }
        ],
        Sunday: []
    }
};

window.lastUpdatedDate = '2026-06-21T06:09:26';
