// login.js

const database = {
    students: {}
};

let currentStudent = null;

function login() {
    const studentId = document.getElementById('student-id').value;
    const password = document.getElementById('password').value;
    
    if (studentId && password) {
        if (!database.students[studentId]) {
            database.students[studentId] = {
                name: `Student ${studentId}`,
                subjects: [],
                attendanceData: {}
            };
        }
        currentStudent = studentId;
        
        document.getElementById('login-form').classList.add('hidden');
        
        // Redirect to home page immediately after logging in
        window.location.href = 'student_teacher.html';
    } else {
        alert('Please enter both Student ID and Password');
    }
}
