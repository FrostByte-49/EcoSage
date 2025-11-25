import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";
import { LocateFixed, MapPin, Navigation } from "lucide-react";

import "leaflet/dist/leaflet.css";
import StarsBackground from "../components/StarsBackground";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

interface RecyclingCenter {
  name: string;
  lat: number;
  lon: number;
  address: string;
}

interface Props {
  onNavigate: (page: string) => void;
  currentPage: string;
}

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const RecyclingMapPage: React.FC<Props> = ({ onNavigate, currentPage }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [centers, setCenters] = useState<RecyclingCenter[]>([]);
  const [loading, setLoading] = useState(true);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        setUserLocation([18.5204, 73.8567]); // fallback: Pune
      }
    );
  }, []);

  // Fetch recycling centers (Nominatim API)
  useEffect(() => {
    if (!userLocation) return;

    const fetchCenters = async () => {
      setLoading(true);
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=recycling&addressdetails=1&limit=10&viewbox=`;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=recycling%20center&limit=10&bounded=1&polygon_geojson=0&viewbox=`
        );
        const data = await response.json();

        const mappedCenters = data.map((item: any) => ({
          name: item.display_name.split(",")[0],
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          address: item.display_name,
        }));

        setCenters(mappedCenters);
      } catch (e) {
        console.error("Failed to load recycling centers", e);
      }
      setLoading(false);
    };

    fetchCenters();
  }, [userLocation]);

  return (
    <div className="min-h-screen relative bg-black text-white overflow-hidden">
      <StarsBackground />

      <div className="relative z-10 pb-20">
        <Header title="Recycling Spots" />

        <div className="px-6 mt-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-2"
          >
            Find Recycling Centers Near You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-sm mb-4"
          >
            Discover locations where you can recycle responsibly.
          </motion.p>

          {/* MAP CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden border border-gray-800 shadow-xl"
            style={{ height: "460px" }}
          >
            {userLocation ? (
              <MapContainer
                center={userLocation}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution=""
                />

                {/* User location marker */}
                <Marker position={userLocation}>
                  <Popup>
                    <b>You are here</b>
                  </Popup>
                </Marker>

                {/* Recycling centers */}
                {centers.map((c, i) => (
                  <Marker key={i} position={[c.lat, c.lon]}>
                    <Popup>
                      <div className="text-black">
                        <b>{c.name}</b>
                        <br />
                        <span className="text-xs">{c.address}</span>
                        <br />
                        <a
                          className="text-blue-600 underline text-xs"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lon}`}
                        >
                          Navigate
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Locating you...</p>
              </div>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 grid grid-cols-3 gap-4 text-center"
          >
            <div className="bg-gray-900/40 rounded-xl p-3">
              <div className="text-white font-bold text-sm">
                {centers.length}
              </div>
              <div className="text-gray-400 text-xs">Centers Found</div>
            </div>
            <div className="bg-gray-900/40 rounded-xl p-3">
              <div className="text-white font-bold text-sm">100%</div>
              <div className="text-gray-400 text-xs">Eco Impact</div>
            </div>
            <div className="bg-gray-900/40 rounded-xl p-3">
              <div className="text-white font-bold text-sm">AI</div>
              <div className="text-gray-400 text-xs">Enhanced</div>
            </div>
          </motion.div>
        </div>
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
};

export default RecyclingMapPage;
