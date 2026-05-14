import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Inscription, INITIAL_SHASANAS } from '../constants';
import { Loader2 } from 'lucide-react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

interface MapContainerProps {
  onSelect: (shasane: Inscription) => void;
}

export default function MapContainer({ onSelect }: MapContainerProps) {
  const [shasanas, setShasanas] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShasanas() {
      try {
        const querySnapshot = await getDocs(collection(db, 'inscriptions'));
        if (querySnapshot.empty) {
          setShasanas(INITIAL_SHASANAS);
        } else {
          const fetchedStore = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Inscription[];
          setShasanas(fetchedStore);
        }
      } catch (error) {
        console.error("Error fetching shasanas:", error);
        setShasanas(INITIAL_SHASANAS); // Fallback to initial
      } finally {
        setLoading(false);
      }
    }
    fetchShasanas();
  }, []);

  if (!API_KEY) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-100">
        <h2 className="text-xl font-bold mb-4">Google Maps API Key Missing</h2>
        <p className="max-w-md text-slate-600">Please add <code>GOOGLE_MAPS_PLATFORM_KEY</code> to your secrets to enable the interactive map.</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <div className="w-full h-full relative">
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
          </div>
        )}
        <Map
          defaultCenter={{ lat: 14.5, lng: 76.5 }} // Center of Karnataka
          defaultZoom={7}
          mapId="NAMMA_SHASANE_MAP"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          {shasanas.map((s, idx) => (
            <MarkerWithInfo 
                key={s.id || idx} 
                shasane={s} 
                onSelect={onSelect}
                isSelected={selectedId === (s.id || idx.toString())}
                onClickMarker={() => setSelectedId(s.id || idx.toString())}
                onCloseInfo={() => setSelectedId(null)}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}

function MarkerWithInfo({ 
    shasane, 
    onSelect, 
    isSelected, 
    onClickMarker, 
    onCloseInfo 
}: { 
    shasane: Inscription, 
    onSelect: (s: Inscription) => void,
    isSelected: boolean,
    onClickMarker: () => void,
    onCloseInfo: () => void
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={shasane.location}
        onClick={onClickMarker}
        title={shasane.title}
      >
        <Pin 
          background={shasane.status === 'damaged' ? '#ef4444' : '#2563eb'} 
          borderColor="#fff" 
          glyphColor="#fff" 
        />
      </AdvancedMarker>
      {isSelected && (
        <InfoWindow anchor={marker} onCloseClick={onCloseInfo}>
          <div className="p-3 max-w-[220px] bg-white rounded-lg shadow-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 leading-tight">{shasane.title}</h3>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{shasane.description}</p>
            <button 
              onClick={() => onSelect(shasane)}
              className="mt-3 w-full py-1.5 text-xs bg-slate-900 text-white rounded font-bold hover:bg-slate-800 transition"
            >
              Decode History
            </button>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
