"use client";

import { useState } from "react";
import { SeancesByDate, Seance } from "@/types";
import { ChevronLeft, ChevronRight, MapPin, Film, Clock, CheckCircle2 } from "lucide-react";

const ALLOWED_CINEMAS = [
  "Pathé BNP Paribas", "Luminor", "Ecoles", "Epée de bois", "Panthéon",
  "Espace Saint Michel", "Filmothèque", "Grand Action", "Christine", "Nouvel Odéon",
  "Saint-Germain-des-Prés", "Studio des Ursulines", "3 Luxembourg", "Elysées Lincoln",
  "Publiciscinémas", "Balzac", "Cinq Caumartin", "Max Linder", "Pathé Palace",
  "Le Brady", "Fauvettes", "L'Entrepôt", "Chaplin Denfert", "Pathé Alésia",
  "Pathé Montparnos", "Pathé Parnasse", "7 Parnassiens", "Chaplin Saint-Lambert",
  "Pathé Convention", "Pathé Aquaboulevard", "Pathé Beaugrenelle", "Cinéastes",
  "Mac-Mahon", "7 Batignolles", "Pathé Wepler", "Pathé La Géode", "Pathé La Villette",
  "Pathé Boulogne", "Pathé Seguin", "Landowski", "La Pléiade", "Pathé Conflans",
  "Hémisphère", "Pathé Dammarie", "Pathé Quai d'Ivry", "Pathé Saint-Denis",
  "Pathé Levallois", "Pathé Carré Sénart", "Pathé Disney Village", "Ciné Massy",
  "Pathé Massy", "Pathé Aéroville", "Espace 1789", "Le Capitole", "Pathé Belle Epine",
  "Robespierre"
];

function isCinemaAllowed(cinemaName: string) {
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedName = norm(cinemaName);
  return ALLOWED_CINEMAS.some(allowed => normalizedName.includes(norm(allowed)));
}

export function DailyCalendar({ data }: { data: SeancesByDate }) {
  const allDates = Object.keys(data).sort();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterEnabled, setFilterEnabled] = useState(false);

  if (allDates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
        <Film className="w-12 h-12 text-slate-600 mb-4" />
        <h3 className="text-xl font-medium text-slate-300">Aucune donnée trouvée</h3>
        <p className="text-slate-500 mt-2 max-w-md">Vérifiez que le backend Python a tourné.</p>
      </div>
    );
  }

  const currentDate = allDates[currentIndex];
  let currentSeances = data[currentDate] || [];
  
  if (filterEnabled) {
    currentSeances = currentSeances.filter(s => isCinemaAllowed(s.cinema));
  }

  const dateObj = new Date(currentDate);
  const formattedDate = dateObj.toLocaleDateString("fr-FR", { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  });

  const goNext = () => setCurrentIndex(i => Math.min(allDates.length - 1, i + 1));
  const goPrev = () => setCurrentIndex(i => Math.max(0, i - 1));

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header Navigateur de Jours */}
      <div className="flex flex-col gap-4 sticky top-24 z-40">
        <div className="flex items-center justify-between glass-card p-4 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/5">
          <button 
             onClick={goPrev} 
             disabled={currentIndex === 0}
             className="p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all ring-1 ring-white/10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <h2 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200 capitalize text-center">
            {formattedDate}
          </h2>
          
          <button 
             onClick={goNext} 
             disabled={currentIndex === allDates.length - 1}
             className="p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all ring-1 ring-white/10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Filtre Cinémas */}
        <div className="flex justify-center md:justify-end">
          <label className="flex items-center gap-3 cursor-pointer group bg-slate-900/50 px-4 py-2.5 rounded-xl border border-white/5 hover:bg-slate-800/50 transition-colors">
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={filterEnabled} 
                onChange={(e) => setFilterEnabled(e.target.checked)} 
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${filterEnabled ? 'bg-orange-500' : 'bg-slate-700'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${filterEnabled ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
              Uniquement mes cinémas éligibles
            </div>
          </label>
        </div>
      </div>

      {/* Liste Chronologique des Films pour la journée */}
      <div className="flex flex-col gap-4">
        {currentSeances.length === 0 ? (
          <div className="text-slate-500 text-center p-8 glass rounded-xl italic">
            Aucune séance pour cette sélection.
          </div>
        ) : (
          currentSeances.map((s, idx) => (
             <div key={idx} className="glass rounded-xl p-5 hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center gap-4">
                
                <div className="text-3xl font-black text-sky-400 shrink-0 flex items-center md:justify-center gap-2 md:w-32 py-2">
                  <Clock className="w-5 h-5 text-sky-500/50 hidden md:block" />
                  {s.heure}
                </div>
                
                <div className="flex-grow flex flex-col gap-1.5 md:border-l border-slate-700/50 md:pl-6">
                   <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-2xl font-bold text-slate-100">{s.film}</h3>
                      {s.annee && String(s.annee).toLowerCase() !== "inconnu" && (
                         <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-600">
                            {s.annee}
                         </span>
                      )}
                   </div>
                   {s.realisateur && String(s.realisateur).toLowerCase() !== "inconnu" && (
                       <div className="text-sm text-slate-400 font-medium">
                          De {s.realisateur}
                       </div>
                   )}
                </div>
                
                <div className="flex items-center gap-2 text-sm font-semibold px-4 py-3 bg-orange-500/10 text-orange-400 rounded-xl shrink-0 border border-orange-500/20">
                   <MapPin className="w-4 h-4" />
                   <span>{s.cinema}</span>
                   {s.zipcode && <span className="opacity-60 pl-1">({s.zipcode})</span>}
                </div>
             </div>
          ))
        )}
      </div>
    </div>
  );
}
