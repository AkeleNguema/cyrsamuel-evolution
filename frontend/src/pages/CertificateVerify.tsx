import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, Calendar, CheckCircle2, Loader2, ArrowLeft, Download, Sparkles } from 'lucide-react';
import { verifyCertificate, getCertificateDownloadUrl } from '../services/api';

export default function CertificateVerify() {
  const { token } = useParams<{ token: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [certData, setCertData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError('Aucun jeton de vérification fourni.');
      setLoading(false);
      return;
    }

    verifyCertificate(token)
      .then((data) => {
        setCertData(data);
      })
      .catch((err) => {
        console.error('Erreur vérification certificat :', err);
        setError(err.message || 'Certificat introuvable ou non authentifié.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 text-slate-800 flex flex-col justify-between p-4 sm:p-8 select-none">
      <header className="max-w-2xl mx-auto w-full flex items-center justify-between pb-6 border-b-2 border-amber-200">
        <Link to="/" className="text-sm font-black text-amber-800 hover:text-amber-950 flex items-center gap-2 transition-colors">
          <ArrowLeft className="h-4 w-4 stroke-[3]" />
          <span>WebDev Evolution • Sougoudzap-ville</span>
        </Link>
        <span className="text-xs font-black px-3 py-1 rounded-full bg-white/90 border-2 border-amber-300 text-amber-700 shadow-sm">
          Registre Officiel des Diplômes 🎓
        </span>
      </header>

      <main className="max-w-xl mx-auto w-full my-auto py-8">
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 text-amber-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-700 font-black text-lg">Recherche du parchemin dans le coffre aux trésors...</p>
          </div>
        ) : error || !certData?.isValid ? (
          <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white border-4 border-rose-300 text-center space-y-4 shadow-2xl">
            <div className="h-16 w-16 mx-auto rounded-3xl bg-rose-100 border-2 border-rose-300 text-rose-500 flex items-center justify-center text-3xl shadow-inner">
              <ShieldAlert className="h-8 w-8 text-rose-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">Certificat Introuvable</h2>
            <p className="text-sm text-slate-600 font-medium">
              Ce jeton ne correspond à aucun diplôme authentique délivré par la Haute Cour de Sougoudzap-ville.
            </p>
            <div className="pt-2">
              <Link
                to="/"
                className="inline-block px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-sm font-black text-white transition-all shadow-md"
              >
                Retour au Jardin d'enfants
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/95 border-4 border-amber-300 shadow-2xl shadow-amber-500/10 space-y-6 backdrop-blur-md relative overflow-hidden">
            {/* Décoration ruban doré */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-800 text-xs font-black uppercase tracking-wider shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Diplôme Officiel & Authentique
              </div>
              <ShieldCheck className="h-7 w-7 text-emerald-500" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                  Certificat de Maîtrise Web
                </h1>
                <Sparkles className="h-6 w-6 text-amber-500 fill-amber-400" />
              </div>
              <p className="text-xs text-amber-700 uppercase tracking-widest font-black">
                Parcours d'Éveil WebDev Evolution • 7 Niveaux Triomphés
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/70 border-2 border-amber-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Titulaire du titre suprême</span>
                <span className="font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg font-black">Tech Lead Certifié 👔</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-800">
                {certData.recipient}
              </p>

              <div className="pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs text-slate-600 font-bold">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-amber-600" /> Date d'obtention :
                </span>
                <span className="text-slate-800 font-black">
                  {new Date(certData.issuedAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-200 select-all">
              Jeton de vérification : <span className="text-slate-800 font-bold">{certData.verifyToken}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {token && (
                <a
                  href={getCertificateDownloadUrl(token)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 border-b-4 border-orange-600 transition-all"
                >
                  <Download className="h-5 w-5" />
                  <span>Télécharger le diplôme PDF officiel</span>
                </a>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="text-center text-xs font-bold text-slate-500 py-4 border-t border-amber-200/80">
        Haute Cour de Sougoudzap-ville • Registre d'intégrité et d'excellence Web
      </footer>
    </div>
  );
}
