import { UserProvider } from "@auth0/nextjs-auth0/client";

import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
//Components import
import Navbar from "@/components/Navbar/Navbar";
import BootstrapClient from "@/components/BootstrapClient";
import GetCurrentUser from "@/components/Context/GetCurrentUser";

export const metadata = {
  title: "Treads",
  description: "~~~",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <GetCurrentUser>
            <main>{children}</main>
          </GetCurrentUser>
        </UserProvider>
        {/* <footer>IF ANY</footer> */}
        <Navbar />

        {/* DO NOT REMOVE: THIS IS SO THAT BOOSTRAP JS WORKS */}
        <BootstrapClient />
      </body>
    </html>
  );
}
