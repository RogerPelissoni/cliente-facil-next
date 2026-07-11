import { Separator } from "@/components/ui/separator";
import { EventCalendar } from "@/src/modules/event/EventCalendar";

export default function Home() {
  return (
    <>
      <div className="mx-4">
        <div className="flex justify-center mt-8">
          <h2>
            Bem vindo ao <b>GesTex</b> - Sistema de Gestão Empresarial
          </h2>
        </div>

        <Separator className="mb-4" />

        <EventCalendar />
      </div>
    </>
  );
}
