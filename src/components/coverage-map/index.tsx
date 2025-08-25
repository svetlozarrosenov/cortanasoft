import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../header';
import Footer from '../Footer';
import Intro from '../Intro';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
import { useDevicesLocations } from './hooks';

// Стиловете остават непроменени
const CoverageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  color: #2d3748;
  padding: 0 16px;
  
  span {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    line-height: 1.3;
    margin: 16px 0;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: #4a5568;
  padding: 0 16px;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 24px;
    padding: 0 16px;
  }
`;

const MapSection = styled.section`
  margin: 48px 0;
  padding: 48px 0;
  background: linear-gradient(135deg, #6e8efb08, #a777e308);
  border-radius: 20px;
  
  @media (max-width: 768px) {
    margin: 24px -10px;
    padding: 24px 0;
    border-radius: 0;
  }
`;

const MapWrapper = styled.div`
  height: 500px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(110, 142, 251, 0.1);
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const InfoText = styled.div`
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const NoDevicesMessage = styled.div`
  text-align: center;
  color: #4a5568;
  font-size: 1.2rem;
  padding: 20px;
`;

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
      <Header />
      <Intro />
      <CoverageContainer>
        <Title>
          <span>Sentinel</span> Обхват
        </Title>
        <Subtitle>Вижте покритието на нашите алармени системи в реално време</Subtitle>

        <MapSection>
          <MapWrapper>
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
          </MapWrapper>
          {deviceLocations.length === 0 ? (
            <NoDevicesMessage>
              Все още няма активни устройства в мрежата. Присъединете се, за да разширим покритието!
            </NoDevicesMessage>
          ) : (
            <InfoText>
              Всяко устройство Sentinel има обхват от 1 километър. Кръговете показват зоната на покритие около всеки приемник.
              Колкото повече клиенти се присъединят, толкова по-голяма става мрежата ни!
            </InfoText>
          )}
        </MapSection>
      </CoverageContainer>
      <Footer />
    </>
  );
};

export default CoverageMap;