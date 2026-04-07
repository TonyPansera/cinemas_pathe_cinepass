import { getSeancesData } from "@/lib/api";
import { DailyCalendar } from "@/components/DailyCalendar";

export default function Home() {
  const data = getSeancesData();
  const byDate = data.by_date || {};

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
          Au Programme
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          Parcourez la programmation des ressorties cinéma jour par jour, et trouvez les prochaines séances près de chez vous.
        </p>
      </div>

      <DailyCalendar data={byDate} />
    </div>
  );
}
