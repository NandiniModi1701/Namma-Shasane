import { useState } from 'react';
import MapContainer from './components/MapContainer';
import DecoderView from './components/DecoderView';
import PhotoScanner from './components/PhotoScanner';
import { Inscription } from './constants';
import { Camera, ScrollText, Map as MapIcon, Info, Search, Save, BarChart3, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from './lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [selectedShasane, setSelectedShasane] = useState<Inscription | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const handleAddInscription = async (data: any) => {
    const newInscription: Inscription = {
      title: data.title,
      description: data.description,
      translationKannada: data.translationKannada,
      location: { 
        lat: 12.9 + (Math.random() - 0.5) * 2, 
        lng: 77.5 + (Math.random() - 0.5) * 2 
      },
      epoch: data.epoch,
      status: 'normal',
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'inscriptions'), newInscription);
      setShowScanner(false);
    } catch (error) {
      console.error("Error adding inscription:", error);
      setShowScanner(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-slate-50 font-sans text-slate-900">
      {/* Sidebar - Inspired by Professional Polish */}
      <aside className="w-72 bg-slate-900 flex flex-col border-r border-slate-800 z-50">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <ScrollText className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">NAMMA SHASANE</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Heritage Trail</div>
          
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 bg-blue-600/10 text-blue-400 rounded-lg font-medium border border-blue-600/20 shadow-sm">
            <MapIcon className="w-5 h-5" />
            <span>Territory View</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg font-medium transition-colors">
            <Save className="w-5 h-5" />
            <span>Saved Decodes</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg font-medium transition-colors">
            <BarChart3 className="w-5 h-5" />
            <span>Preservation Stats</span>
          </button>

          <div className="pt-4 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Resources</div>
          
          <button 
            onClick={() => setShowIntro(true)}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg font-medium transition-colors"
          >
            <Info className="w-5 h-5" />
            <span>About Project</span>
          </button>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
              <Key className="w-3 h-3" />
              Active System
            </div>
            <div className="text-xs text-blue-400 font-mono truncate">AI-Epigraphist-v1.5</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm shrink-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-4 h-4 text-slate-400" />
              </span>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="Search inscriptions, dynasties, or locations..."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowScanner(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Tag New Inscription
            </button>
          </div>
        </header>

        {/* Map Area */}
        <div className="flex-1 relative bg-slate-200">
          <MapContainer onSelect={(s) => setSelectedShasane(s)} />
          
          {/* Map Overlay info (Professional Polish style) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white flex items-center space-x-8 z-40">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-slate-700">Digital Bridge Live</span>
            </div>
            <div className="h-4 w-px bg-slate-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-700">National Pride Active</span>
            </div>
          </div>
        </div>
      </main>

      {/* Slide-out Decoder View */}
      <DecoderView 
        shasane={selectedShasane} 
        onClose={() => setSelectedShasane(null)} 
        onUpdate={(updated) => setSelectedShasane(updated)}
      />

      {/* Modal Scanner */}
      <AnimatePresence>
        {showScanner && (
          <PhotoScanner 
            onDecoded={handleAddInscription}
            onClose={() => setShowScanner(false)}
          />
        )}
      </AnimatePresence>

      {/* Intro Splash Screen */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
            >
              <div className="p-10 text-center space-y-6">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                  <ScrollText className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold tracking-tight text-slate-900">Namma Shasane</h2>
                  <p className="text-slate-500 mt-4 text-lg font-medium">
                    Decoding Karnataka's "Old Rocks" into Talking History.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <MapIcon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-800">Heritage Trail</p>
                    <p className="text-[11px] text-slate-500 mt-1">Discover documented inscriptions nearby.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <Camera className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-800">Image Decoder</p>
                    <p className="text-[11px] text-slate-500 mt-1">AI-powered reading of ancient text.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <ScrollText className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-800">Talking History</p>
                    <p className="text-[11px] text-slate-500 mt-1">Connect with the legacy of ancestors.</p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowIntro(false)}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-lg shrink-0"
                >
                  Enter Platform
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
