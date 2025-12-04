'use client';

import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import type { LatLngBoundsExpression } from 'leaflet';

export default function AutoZoom({ locations }: { locations: { lat: number; lng: number }[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || locations.length === 0) return;

    if (locations.length === 1) {
      const loc = locations[0];
      if (loc.lat && loc.lng) {
        map.setView([loc.lat, loc.lng], 14);
      }
    } else {
      const lats = locations.map(l => l.lat);
      const lngs = locations.map(l => l.lng);
      const bounds: LatLngBoundsExpression = [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)]
      ];
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, locations]);

  return null;
}