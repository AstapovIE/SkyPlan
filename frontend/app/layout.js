import "./globals.css";
import { UserProvider} from "./contexts/context";
import Login from "./login/page";

export default function RootLayout({ children }) {
  return (
   
    <html lang="en" suppressHydrationWarning>
      <body className={'${inter.className} bg-[#110808]'}>
        {children}
      </body>
    </html>
    
  );
}
