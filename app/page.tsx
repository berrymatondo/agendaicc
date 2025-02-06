import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Agenda annuel du Campus ICC Bruxelles
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Restez informé et impliqué dans la vie de notre campus ! Retrouvez
              les dates clés de toutes les célébrations, réunions et activités
              programmées tout au long de l'année.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/events"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Nos Événements
              </Link>
              <Link
                href="/agenda"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Notre agenda
              </Link>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1635859890085-ec8cb5466806"
              alt="Church Calendar with Events"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
