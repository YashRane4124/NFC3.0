// attendance.js

const database = {
    students: {}
};

let currentStudent = null;

function logout() {
    currentStudent = null;
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('student-id').value = '';
    document.getElementById('password').value = '';
    document.getElementById('subject-name').value = '';
    document.getElementById('lectures-per-day').value = '';
    document.getElementById('attendance-date').value = '';
    document.getElementById('attendance-body').innerHTML = '';
    document.getElementById('summary-body').innerHTML = '';
}

function addSubject() {
    const subjectName = document.getElementById('subject-name').value;
    const lecturesPerDay = parseInt(document.getElementById('lectures-per-day').value);
    
    if (subjectName && lecturesPerDay) {
        database.students[currentStudent].subjects.push({ name: subjectName, lecturesPerDay });
        updateAttendanceTable();
        updateSummaryTable();
        document.getElementById('subject-name').value = '';
        document.getElementById('lectures-per-day').value = '';
    } else {
        alert('Please fill in both Subject Name and Lectures per Day');
    }
}

function updateAttendanceTable() {
    const tbody = document.getElementById('attendance-body');
    tbody.innerHTML = '';
    database.students[currentStudent].subjects.forEach(subject => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = subject.name;
        const statusCell = row.insertCell(1);
        const select = document.createElement('select');
        select.innerHTML = `
            <option value="present">Present</option>
            <option value="absent">Absent</option>
        `;
        statusCell.appendChild(select);
    });
}

function saveAttendance() {
    const date = document.getElementById('attendance-date').value;
    if (!date) {
        alert('Please select a date');
        return;
    }

    const attendance = {};
    database.students[currentStudent].subjects.forEach((subject, index) => {
        const status = document.getElementById('attendance-body').rows[index].cells[1].firstChild.value;
        attendance[subject.name] = status;
    });

    database.students[currentStudent].attendanceData[date] = attendance;
    updateSummaryTable();
    alert('Attendance saved successfully');
}

function updateSummaryTable() {
    const tbody = document.getElementById('summary-body');
    tbody.innerHTML = '';
    database.students[currentStudent].subjects.forEach(subject => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = subject.name;
        
        let attended = 0;
        let total = 0;
        
        for (const date in database.students[currentStudent].attendanceData) {
            if (database.students[currentStudent].attendanceData[date][subject.name] === 'present') {
                attended += subject.lecturesPerDay;
            }
            total += subject.lecturesPerDay;
        }
        
        row.insertCell(1).textContent = attended;
        row.insertCell(2).textContent = total;
        const percentage = total > 0 ? (attended / total * 100).toFixed(2) : '0.00';
        row.insertCell(3).textContent = `${percentage}%`;
    });
}