export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <div>
                <label htmlFor={'email'}>Email</label>
                <input type={'email'} name={'email'} id={'email'} />
            </div>
            <div>
                <label htmlFor={'password'}>Password</label>
                <input type={'password'} name={'password'} id={'password'} />
            </div>
            <button type={'submit'}>Submit</button>
            <a href={'/register'}>Register</a>
        </div>
    );
}
