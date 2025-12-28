window.courseData = {
    "CE23611": {
        title: "Design of Steel Structures",
        shortCode: "DSS",
        staff: "S Geetha",
        staffCode: "CE_SG",
        credits: "4",
        type: "theory"
    },
    "CE23612": {
        title: "Construction, Planning, Scheduling and Management",
        shortCode: "CPM",
        staff: "M Umamaguesvari",
        staffCode: "CE_MU",
        credits: "3",
        type: "theory"
    },
    "CE23613": {
        title: "Structural Dynamics and Earthquake Engineering",
        shortCode: "SDE",
        staff: "Balkis Banu W",
        staffCode: "CE_BB",
        credits: "3",
        type: "theory"
    },
    "CE23631": {
        title: "Structural Design and Drawing",
        shortCode: "SDD",
        staff: "Mahamood Ul Hasan N",
        staffCode: "CE_MH",
        credits: "4",
        type: "lot"
    },
    "CE23632": {
        title: "Design Thinking andInnovation",
        shortCode: "DTI",
        staff: "Jeya Arthi A J",
        staffCode: "CE_JA",
        credits: "3",
        type: "theory"
    }
};

window.timetableData = {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    schedule: {
        Monday: [
            { period: 1, time: "8:00 AM - 8:50 AM", courseCode: "CE23631", room: "A204 (A Block)", batches: [1, 2] },
            { period: 2, time: "9:00 AM - 9:50 AM", courseCode: "CE23613", room: "A310 (A Block)", batches: [1, 2] },
            { period: 3, time: "10:00 AM - 10:50 AM", courseCode: "CE23611", room: "A311 (A Block)", batches: [1, 2] },
            { period: 4, time: "11:00 AM - 11:50 AM", courseCode: "CE23613", room: "A303 (A Block)", batches: [1, 2] },
            { period: 5, time: "12:00 PM - 12:50 PM", courseCode: "CE23631", room: "A108 (A Block)", batches: [1, 2] },
            { period: 6, time: "2:10 PM - 3:00 PM", courseCode: "CE23612", room: "A303 (A Block)", batches: [1, 2] }
        ],
        Tuesday: [
            { period: 1, time: "11:00 AM - 11:50 AM", courseCode: "CE23612", room: "A108 (A Block)", batches: [1, 2] },
            { period: 2, time: "12:00 PM - 12:50 PM", courseCode: "CE23611", room: "A309 (A Block)", batches: [1, 2] },
            { period: 3, time: "3:00 PM - 3:50 PM", courseCode: "CE23632", room: "A309 (A Block)",  subType: "lab",batches: [1, 2] },
            { period: 4, time: "4:00 PM - 4:50 PM", courseCode: "CE23632", room: "A309 (A Block)",  subType: "lab",batches: [1, 2] }
        ],
        Wednesday: [
            { period: 1, time: "08:00 AM - 09:40 AM", courseCode: "CE23631", room: "JR2", subType: "lab", batches: [1] },
            { period: 5, time: "12:00 PM - 12:50 PM", courseCode: "CE23611", room: "A308 (A Block)", batches: [1, 2] }
        ],
        Thursday: [
            { period: 1, time: "1:20 PM - 2:10 PM", courseCode: "CE23611", room: "A108 (A Block)", batches: [1, 2] },
            { period: 2, time: "3:00 PM - 3:50 PM", courseCode: "CE23632", room: "A203 (A Block)",  subType: "lab",batches: [1, 2] },
            { period: 3, time: "4:00 PM - 4:50 PM", courseCode: "CE23632", room: "A203 (A Block)",  subType: "lab",batches: [1, 2] }
        ],
        Friday: [
            { period: 1, time: "8:00 AM - 8:50 AM", courseCode: "CE23631", room: "A303 (A Block)", batches: [1, 2] },
            { period: 2, time: "9:00 AM - 9:50 AM", courseCode: "CE23613", room: "A202 (A Block)", batches: [1, 2] },
            { period: 3, time: "11:00 AM - 11:50 AM", courseCode: "CE23612", room: "A203 (A Block)", batches: [1, 2] },
            { period: 4, time: "11:50 AM - 1:20 PM", courseCode: "CE23631", room: "TLGL4 (Techlounge)", subType: "lab", batches: [2] }
        ],
        Saturday: [],
        Sunday: []
    }
};

window.lastUpdatedDate = '2025-12-28T08:15:00';
