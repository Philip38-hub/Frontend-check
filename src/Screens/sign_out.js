// Assuming you are using fetch or another HTTP library


const baseUrl = 'http://192.168.7.152:8000'; //laptop ip address
const localhost = 'http://127.0.0.1:8000'; //local ip address

function SignOut(){
    const handleSignOut = async () => {
        // const AuthToken = localStorage.getItem('authToken')
        // try {
        //     console.log('Tesssssssssssssst2222222222222');
        //     const response = await fetch(`${baseUrl}/api/auth/logout/`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${AuthToken}`,
        //         },
        //         body: JSON.stringify({ refresh_token: AuthToken.refresh_token, test: 'bad' }),
        //     });
        //         console.log('Tesssssssssssssst');
        //     if (response.ok) {
        //         // Handle successful logout, such as redirecting the user or clearing local storage
        //         // localStorage.removeItem('authToken')
        //         console.log('successssssssssssssssssssssssshhhggf')
        //         localStorage.clear();
        //         window.location.replace("/");
        //     } else {
        //         // Handle logout failure
        //         console.log('errrrrrrrrrrrrrrrrrrrrr9999999999')
        //     }
        // } catch (error) {
        //     // Handle network errors or other issues
        //     console.log('llllllllllllllllllllllll')
        // }
        localStorage.clear()
        window.location.replace('/')
    };
    // return handleSignOut;
    handleSignOut();
}
// SignOut()
    // Call the logout function when the user triggers the logout action
export default SignOut;

