import React from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

{
  /* <div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
<Image alt="logo" src={logo} width={40} className="" />
</div>
 */
}
export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            {/*             <Calendar className="h-8 w-8 text-purple-600" />
             */}{" "}
            {/*             <Image alt="logo" src={logo} width={40} className="" />
             */}{" "}
            <span className="text-xl font-bold text-gray-900">Agenda</span>
          </Link>
          <div className="max-md:hidden flex items-center space-x-6">
            <Link
              href="/agenda"
              className="text-gray-700 hover:text-purple-600"
            >
              Agenda
            </Link>
            <Link
              href="/events"
              className="text-gray-700 hover:text-purple-600"
            >
              Événements
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md"
            >
              Espace Admin
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
