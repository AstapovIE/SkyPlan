'use client'
import  {RegisterForm} from "../register/_components/RegisterForm"
import { NewProvider } from "../contexts/registercontext";

export default function Register() {
  return (
    <div>
      <NewProvider>
      <RegisterForm />
      </NewProvider>
    </div>
  );
}