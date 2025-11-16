'use client';

import React, { useEffect, useState } from 'react';
import styles from './map.module.css';
import Intro from '@/components/Intro';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
import { useDevicesLocations } from '@/app/map/hooks';

const AutoZoom: React.FC<{ locations: { lat: number; lng: number }[] }> = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || locations.length === 0) {
      map.setView([0, 0], 2);
      return;
    }

    if (locations.length === 1) {
      const singleLocation = locations[0];
      if(!singleLocation.lat || !singleLocation.lng) {
        return;
      }
      map.setView([singleLocation.lat, singleLocation.lng], 14);
    } else {
      const bounds: LatLngBoundsExpression = [
        [Math.min(...locations.map(loc => loc.lat)), Math.min(...locations.map(loc => loc.lng))],
        [Math.max(...locations.map(loc => loc.lat)), Math.max(...locations.map(loc => loc.lng))],
      ];
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, locations]);

  return null;
};

const CoverageMap: React.FC = () => {
  const { locations } = useDevicesLocations();
  const [deviceLocations, setDeviceLocations] = useState<{ lat: number; lng: number }[]>([]);
  console.log('crb_locations', locations)
  useEffect(() => {
    if (locations && locations.length > 0) {
      setDeviceLocations(
        locations.map((device: any) => ({
          lat: device.location.latitude,
          lng: device.location.longitude,
        })),
      );
    } else {
      setDeviceLocations([]);
    }
  }, [locations]);

  const defaultCenter: LatLngExpression = [0, 0];

  return (
    <>
      <Intro />
      <div className={styles.coverageContainer}>
        <h1 className={styles.title}>
          <span>Sentinel</span> Обхват
        </h1>
        <h2 className={styles.subtitle}>Вижте покритието на нашите алармени системи в реално време</h2>

        <section className={styles.mapSection}>
          <div className={styles.mapWrapper}>
            <MapContainer
              center={defaultCenter}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {deviceLocations.length > 0 &&
                deviceLocations.map((location, index) => location.lat && location.lng && (
                  <Circle
                    key={index}
                    center={[location.lat, location.lng]}
                    radius={900}
                    pathOptions={{
                      color: '#6e8efb',
                      fillColor: '#6e8efb',
                      fillOpacity: 0.2,
                      weight: 7,
                    }}
                  />
                ))}
              <AutoZoom locations={deviceLocations} />
            </MapContainer>
          </div>
          {deviceLocations.length === 0 ? (
            <div className={styles.noDevicesMessage}>
              Все още няма активни устройства в мрежата. Присъединете се, за да разширим покритието!
            </div>
          ) : (
            <div className={styles.infoText}>
              Всяко устройство Sentinel има обхват от 1 километър. Кръговете показват зоната на покритие около всеки приемник.
              Колкото повече клиенти се присъединят, толкова по-голяма става мрежата ни!
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default CoverageMap;