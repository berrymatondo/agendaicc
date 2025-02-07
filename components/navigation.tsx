"use client";

import { Home, Calendar, Clock, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation({
  onAddClick,
}: {
  onAddClick?: () => void;
}) {
  const pathname = usePathname();
  // const isHome = pathname === "/";

  console.log("pathname:", pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white">
      <div className="flex justify-around p-4 max-w-lg mx-auto">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className={pathname == "/" ? "text-black " : "text-gray-300"}
          >
            <div className="flex flex-col items-center justify-end text-xs">
              <Home className="h-6 w-6" />
              Accuiel
            </div>
          </Button>
        </Link>
        <Link href="/agenda">
          <Button
            variant="ghost"
            size="icon"
            className={pathname == "/agenda" ? "text-black" : "text-gray-300"}
          >
            <div className="flex flex-col items-center justify-end text-xs">
              <Calendar className="h-6 w-6" /> Agenda
            </div>
          </Button>
        </Link>
        {/*         <Button
          variant="ghost"
          size="icon"
          className="bg-black text-white rounded-full hover:bg-gray-800"
          onClick={onAddClick}
        >
          <Plus className="h-6 w-6" />
        </Button> */}

        <Link href="/events">
          <Button
            variant="ghost"
            size="icon"
            className={pathname == "/events" ? "text-black" : "text-gray-300"}
          >
            <div className="flex flex-col items-center justify-end text-xs">
              <Clock className="h-6 w-6" /> Evénements
            </div>
          </Button>
        </Link>

        <Button variant="ghost" size="icon">
          <div className="flex flex-col items-center justify-end text-xs">
            <User className="h-6 w-6" />
            Connexion
          </div>
        </Button>
      </div>
    </div>
  );
}
