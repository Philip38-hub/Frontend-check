// Assuming you are using fetch or another HTTP library

const baseUrl = 'http://192.168.1.102:8000';
const SignOut = async () => {
    const AuthToken = localStorage.getItem('AuthToken')
    try {
        const response = await fetch(`${baseUrl}/api/auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthToken}`,
            },
        });

        if (response.ok) {
            // Handle successful logout, such as redirecting the user or clearing local storage
            window.location.replace("/");
        } else {
            // Handle logout failure
        }
    } catch (error) {
        // Handle network errors or other issues
    }
};
SignOut()
// Call the logout function when the user triggers the logout action
// export default SignOut();

