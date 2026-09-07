import { Separator } from "@/components/ui/separator";
import { EventCalendar } from "@/src/modules/event/EventCalendar";

export default function Home() {
  return (
    <>
      <div className="mx-4">
        <div className="mt-8 flex justify-center">
          <h2>
            Bem vindo ao <b>Cliente Fácil</b> - Sistema de Gestão Empresarial
          </h2>
        </div>

        <Separator className="mb-4" />

        <EventCalendar />
      </div>
    </>
  );
}
