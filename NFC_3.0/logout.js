function confirmLogout() {
    const confirmation = confirm("Are you sure you want to logout?");
    if (confirmation) {
        logout();
    }
}

// Function to handle logout
function logout() {
    // Simulate logging out process
    document.getElementById('logout-message').classList.remove('hidden');

    // Redirect to home page after a delay (optional)
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000); // 2 seconds delay before redirecting
}