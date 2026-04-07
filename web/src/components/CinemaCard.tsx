import { Seance } from "@/types";
import { MovieSessionItem } from "./MovieSessionItem";
import { MapPin } from "lucide-react";

interface CinemaCardProps {
  name: string;
  seances: Seance[];
}

export function CinemaCard({ name, seances }: CinemaCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col h-full relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/50 relative z-10">
        <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20">
          <MapPin className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
          {name}
        </h2>
      </div>
      
      <div className="flex flex-col gap-1 flex-grow relative z-10">
        {seances.map((s, idx) => (
          <MovieSessionItem key={`${s.film}-${s.date}-${s.heure}-${idx}`} seance={s} />
        ))}
        {seances.length === 0 && (
          <div className="text-sm text-slate-500 italic p-4 text-center">Aucune séance prévue</div>
        )}
      </div>
    </div>
  );
}
