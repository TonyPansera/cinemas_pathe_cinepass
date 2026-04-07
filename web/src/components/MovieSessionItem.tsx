import { Seance } from "@/types";
import { Clock, Calendar } from "lucide-react";

export function MovieSessionItem({ seance }: { seance: Seance }) {
  const dateObj = new Date(seance.date);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 transition-colors group">
      <div className="flex flex-col gap-1 mb-3 sm:mb-0">
        <h4 className="text-slate-100 font-medium group-hover:text-white transition-colors">{seance.film}</h4>
        {seance.realisateur && (
          <span className="text-xs text-slate-400">{seance.realisateur}</span>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs font-medium">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900/80 text-emerald-400 border border-emerald-500/20">
          <Calendar className="w-3.5 h-3.5" />
          <span className="capitalize">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900/80 text-sky-400 border border-sky-500/20">
          <Clock className="w-3.5 h-3.5" />
          <span>{seance.heure}</span>
        </div>
      </div>
    </div>
  );
}
