'use client'
import  {LoginForm} from "./_components/LoginForm";
import { UserProvider } from "../contexts/context";

export default function Login() {
  return (
    <div>
      <UserProvider>
      <LoginForm />
      </UserProvider>
    </div>
  );
}