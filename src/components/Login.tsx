import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from './Ui/button'

const LoginComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button size={'lg'} className='w-[300px] h-[50px]' onClick={() => void signIn()}>Zaloguj</Button>
    </div>
  )
}

const LogoutComponent = () => {
  return <Button onClick={() => void signOut()}>Wyloguj</Button>
}

const Login = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <>
      {user == null ? <LoginComponent /> : <LogoutComponent />}
    </>
  )
}

export default Login