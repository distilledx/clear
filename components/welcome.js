export default function _Home() {
    return (
        <div>
            <h1>Hi</h1>
            <a href={'/login'}>Login</a>
            <a href={'/register'}>Register</a>
            <button
                onClick={() => {
                    document.cookie = 'loggedIn=false';
                    window.localStorage.removeItem('session');
                }}
            >
                Logout
            </button>
        </div>
    );
}
