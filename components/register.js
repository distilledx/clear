export default function Register() {
    return (
        <div>
            <h1>Register</h1>
            <form action={'/api/register'} method={'post'}>
                <div>
                    <label htmlFor={'name'}>Name</label>
                    <input type={'name'} name={'username'} id={'name'} />
                </div>
                <div>
                    <label htmlFor={'email'}>Email</label>
                    <input type={'email'} name={'email'} id={'email'} />
                </div>
                <div>
                    <label htmlFor={'password'}>Password</label>
                    <input type={'password'} name={'password'} id={'password'} />
                </div>
                <button type={'submit'}>Submit</button>
            </form>
            <a href={'/login'}>Login</a>
        </div>
    );
}
