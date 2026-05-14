import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RefreshCw, CheckCircle2, ChevronRight, History } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface PhotoScannerProps {
  onDecoded: (data: any) => void;
  onClose: () => void;
}

export default function PhotoScanner({ onDecoded, onClose }: PhotoScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const startScan = async () => {
    setScanning(true);
    // In a real app, this would take a photo and send it to Gemini.
    // Here we simulate the AI "Decoding" process.
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Act as an expert epigraphist specializing in Kannada inscriptions. 
      Generate a fictional but highly realistic historical inscription details for a stone found in Karnataka.
      Return JSON with fields: title, description (English history), translationKannada, epoch (Dynasty), and a short fun fact.`
      });
      const text = response.text || '';
      
      // Attempt to parse JSON from response
      const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || '';
      const data = JSON.parse(jsonStr);
      
      setResult(data);
    } catch (error) {
      console.error("AI Decoding error:", error);
      // Fallback mock
      setResult({
        title: "New Discovery: Kudala Shasane",
        description: "A newly discovered inscription documenting the construction of a step-well for village pilgrims.",
        translationKannada: "ಕುಡಲ ಶಾಸನ: ಯಾತ್ರಿಕರಿಗಾಗಿ ಕಲ್ಯಾಣಿ ನಿರ್ಮಿಸಿದ ಬಗ್ಗೆ ಈ ಶಾಸನ ತಿಳಿಸುತ್ತದೆ.",
        epoch: "Hoysala Period",
        fact: "The stone was used as a foundation for a modern cowshed before being identified!"
      });
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-slate-900 text-slate-100 rounded-2xl overflow-hidden shadow-2xl relative border border-slate-700"
      >
        <div className="h-1.5 bg-slate-800 w-full overflow-hidden">
          {scanning && <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="h-full bg-blue-500 w-1/3"
          />}
        </div>

        <div className="p-8">
          {!result ? (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto border border-slate-700 shadow-inner">
                <Camera className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Inscription Decoder</h3>
                <p className="text-slate-400 mt-2 text-sm">Align the historical inscription stone within the frame to reveal its story.</p>
              </div>
              <button 
                onClick={startScan}
                disabled={scanning}
                className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition disabled:opacity-50 shadow-lg shadow-blue-900/20"
              >
                {scanning ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                {scanning ? 'Analyzing Epigraphical Data...' : 'Begin AI Scan'}
              </button>
              <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition text-xs font-bold uppercase tracking-widest">Dismiss</button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center gap-2 text-blue-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold tracking-widest uppercase text-[10px]">Decoding Successful</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white tracking-tight">{result.title}</h2>
                <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Dynasty/Epoch</p>
                  <p className="text-lg font-serif italic text-blue-100">{result.epoch}</p>
                </div>
                <div className="space-y-3">
                  <p className="text-slate-300 leading-relaxed text-sm">{result.description}</p>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-slate-100 font-kannada text-lg leading-relaxed">{result.translationKannada}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl flex gap-3">
                <History className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Historical Insight</p>
                  <p className="text-sm text-blue-100/80 leading-snug mt-1">{result.fact}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => onDecoded(result)}
                  className="flex-1 py-3.5 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition shadow-xl"
                >
                  Commit to Map
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setResult(null)}
                  className="px-6 py-3.5 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition"
                >
                  Retake
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-black/80 -z-10" onClick={onClose} />
    </div>
  );
}
