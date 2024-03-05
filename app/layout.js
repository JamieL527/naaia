
import "../css/tailwind.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";
import { Toaster } from "../components/ui/toaster";

export const metadata = {
  title: "North America Artificial Intelligence (AI) Association",
  description: "Welcome to NAAIA"
}

  export default function RootLayout({ children}) {
    return (
      <html lang="en">
       <body>
        <Navbar/>
        <Breadcrumb 
          homeElement={"Home"}
          separator={<span> / </span>}
          activeClasses="text-indigo-600"
          containerClasses="flex ml-[72px] mt-10 pl-20"
          listClasses="capitalize hover:underline mx-2"
          capitalizeLinks
        />
        <main>{children}</main>
        <Toaster/>
        <Footer />
      </body>
      </html>
    )
  }

  