import Image from "next/image";
import Link from "next/link";
import home from "../public/home.jpg";
import { ArrowRight } from "lucide-react";
import logo from "../public/logoicc5.webp";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <main className=" max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className=" flex flex-col max-md:flex-col-reverse lg:flex-row items-center justify-between ">
          <div className="max-w-xl">
            <h1 className="max-md:hidden text-4xl font-bold text-gray-900 mb-4">
              Agenda annuel du Campus ICC Bruxelles
            </h1>
            <p className="md:text-lg max-md:text-center p-2 text-gray-600 mb-8">
              {
                "Restez informé et impliqué dans la vie de notre campus ! Retrouvez les dates clés de toutes les célébrations, réunions et activités programmées tout au long de l'année."
              }
            </p>
            <div className="flex max-md:flex-col space-x-4 gap-2">
              <Link
                href="/agenda"
                className="text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <p className="flex justify-center items-center gap-2">
                  {"Consulter l'agenda"} <ArrowRight />
                </p>
              </Link>

              <Link
                href="/events"
                className="px-6 py-3 text-center text-gray-500  rounded-lg hover:bg-gray-800 transition-colors"
              >
                Voir tous nos Événements
              </Link>
            </div>
          </div>
          <div className="md:mt-8 lg:mt-0 ">
            <div className=" md:hidden text-center text-4xl font-bold text-sky-800 mb-2">
              <p>Agenda Annuel</p>
            </div>
            <div></div>

            <p className="md:hidden text-center mb-4">ICC Bruxelles</p>
            <div className="relative">
              <div className="rounded-lg max-md:max-h-48 overflow-hidden">
                <Image
                  src={home}
                  alt="Church Calendar with Events"
                  className="w-full max-w-md rounded-lg shadow-lg"
                  width={400}
                  height={400}
                />
              </div>

              <div className="m-8 z-50 absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
                <Image
                  alt="logo"
                  src={logo}
                  width={60}
                  className=" rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
