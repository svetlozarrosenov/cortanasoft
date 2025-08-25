import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { createDeviceMutate, generateQaTokenResellMutate, installDeviceSoftwareMutate, urls, useDevices } from './hooks';
import { mutate } from 'swr';
import { FaCopy, FaEye, FaEyeSlash, FaDownload } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

// Основен контейнер за страницата
const PageContainer = styled.div`
  background: linear-gradient(135deg, #6e8efb08, #a777e308);
  min-height: calc(100vh - 100px);
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(110, 142, 251, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: #2d3748;

  span {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  color: #4a5568;
  transition: all 0.2s ease;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #6e8efb;
    box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.1);
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  color: #4a5568;
  transition: all 0.2s ease;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #6e8efb;
    box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.1);
  }
`;

const CreateButton = styled.button`
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: linear-gradient(135deg, #38a169, #2f855a);
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  border-radius: 12px;
  scrollbar-width: thin;
  scrollbar-color: #6e8efb #e2e8f0;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #e2e8f0;
    border-radius: 8px;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 1300px;
  border-collapse: separate;
  border-spacing: 0;

  @media (max-width: 768px) {
    min-width: 1100px;
  }
`;

const TableHead = styled.thead``;

const TableBody = styled.tbody``;

const Th = styled.th`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  text-align: left;
  padding: 16px;
  font-weight: 500;
  position: sticky;
  top: 0;
  z-index: 1;

  &:first-child {
    width: 10%;
    border-top-left-radius: 12px;
  }
  &:nth-child(2) { 
    width: 15%;
  }
  &:nth-child(3) { width: 10%; }
  &:nth-child(4) { width: 10%; }
  &:nth-child(5) { width: 12%; }
  &:nth-child(6) { width: 10%; }
  &:nth-child(7) { width: 15%; }
  &:nth-child(8) { width: 15%; }
  &:nth-child(9) { width: 5%; }
  &:nth-child(10) { width: 5%; }
  &:nth-child(11) { width: 8%; }
  &:last-child {
    width: 10%;
    border-top-right-radius: 12px;
  }
`;

const Tr = styled.tr`
  background-color: white;
  transition: all 0.2s ease;

  &:nth-child(even) {
    background-color: rgba(110, 142, 251, 0.02);
  }

  &:hover {
    background-color: rgba(110, 142, 251, 0.05);
  }
`;

const Td = styled.td`
  padding: 16px;
  vertical-align: middle;
  line-height: 1.6;
  color: #4a5568;
  border-bottom: 1px solid rgba(110, 142, 251, 0.1);

  &:nth-child(2) {
    text-align: left;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${props =>
    props.status === 'active' ? '#4caf50' :
    props.status === 'inactive' ? '#e53e3e' :
    '#ff9800'};
  color: white;
`;

const SerialNumber = styled.span`
  font-family: monospace;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 500;
  display: inline-block;
  text-align: left;
  white-space: nowrap;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: linear-gradient(135deg, #5a75e0, #8f5ed0);
  }
`;

const QRContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const DownloadButton = styled.button`
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;

  &:hover {
    background: linear-gradient(135deg, #38a169, #2f855a);
  }
`;

const IdContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const IdActions = styled.div`
  display: flex;
  gap: 8px;
`;

const IdDisplay = styled.div`
  word-break: break-all;
  font-family: monospace;
  background-color: rgba(110, 142, 251, 0.05);
  padding: 8px;
  border-radius: 8px;
  color: #4a5568;
`;

const HiddenId = styled.div`
  font-family: monospace;
  letter-spacing: 2px;
  color: #6e8efb;
`;

const ConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ConfirmationDialog = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const DialogTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: #2d3748;
  text-align: center;
`;

const DialogContent = styled.p`
  color: #4a5568;
  margin-bottom: 25px;
  line-height: 1.6;
  text-align: center;
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const CancelButton = styled.button`
  background-color: #edf2f7;
  color: #4a5568;
  border: none;
  padding: 10px 25px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const ConfirmButton = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #5a75e0, #8f5ed0);
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #2d3748;
  font-weight: 500;
  font-size: 1rem;
`;

interface Device {
  _id: string;
  name: string;
  user: any;
  software: boolean;
  encryptedId: string;
  serialNumber: string;
  privateKey: string;
  dateCreated: Date;
  status: 'active' | 'inactive' | 'pending';
  resellId: string;
  type: string;
}

interface IdCellProps {
  encryptedId: string;
}

const IdCell: React.FC<IdCellProps> = ({ encryptedId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(encryptedId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Грешка при копиране:', err);
    }
  };

  return (
    <IdContainer>
      <IdActions>
        <ActionButton onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <FaEyeSlash /> : <FaEye />}
          {isVisible ? ' Скрий' : ' Покажи'}
        </ActionButton>
        <ActionButton onClick={handleCopy}>
          <FaCopy />
          {copied ? ' Копирано!' : ' Копирай'}
        </ActionButton>
      </IdActions>
      {isVisible ? <IdDisplay>{encryptedId}</IdDisplay> : <HiddenId>{'•'.repeat(20)}</HiddenId>}
    </IdContainer>
  );
};

const DevicesList: React.FC = () => {
  const { devices } = useDevices();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    type: '',
  });
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    name: '',
    serialNumber: '',
    email: '',
  });

  const filteredDevices = useMemo(() => {
    if (!devices) return [];
    
    return devices.filter((device: Device) => {
      const matchesStatus = filters.status ? device.status === filters.status : true;
      const matchesType = filters.type ? device.type === filters.type : true;
      const matchesName = filters.name ? device.name === filters.name : true;
      const matchesSerialNumber = filters.serialNumber 
        ? device.serialNumber.toLowerCase().includes(filters.serialNumber.toLowerCase())
        : true;
      const matchesEmail = filters.email 
        ? device.user?.email && device.user.email.toLowerCase().includes(filters.email.toLowerCase())
        : true;
      
      return matchesStatus && matchesType && matchesName && matchesSerialNumber && matchesEmail;
    });
  }, [devices, filters]);

  const handleConfirmAddSoftware = async () => {
    if (!selectedDevice) return;
    await installDeviceSoftwareMutate(selectedDevice._id);
    mutate(urls.fetchDevices);
    setSelectedDevice(null);
  };

  const handleDownloadQR = async (deviceId: string, deviceName: string) => {
    const qrElement = document.getElementById(`qr-${deviceId}`);
    if (!qrElement) {
      console.error('QR код елементът не е намерен');
      return;
    }

    try {
      const canvas = await html2canvas(qrElement, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR-${deviceName}-${deviceId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    } catch (error) {
      console.error('Грешка при изтегляне на QR код:', error);
      alert('Грешка при изтегляне на QR кода');
    }
  };

  const handleCreateDevice = async () => {
    if (!newDevice.type) {
      alert('Моля, изберете тип на устройството');
      return;
    }
    try {
      await createDeviceMutate(newDevice.type);
      mutate(urls.fetchDevices);
      setIsCreateModalOpen(false);
      setNewDevice({ type: '' });
    } catch (error) {
      console.error('Грешка при създаване на устройство:', error);
      alert('Грешка при създаване на устройство');
    }
  };

  return (
    <PageContainer>
      <ContentContainer>
        <HeaderContainer>
          <Title>Списък с <span>устройства</span></Title>
          <CreateButton onClick={() => setIsCreateModalOpen(true)}>
            Създай устройство
          </CreateButton>
        </HeaderContainer>
        <FilterContainer>
          <FilterField>
            <Label>Статус</Label>
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">Всички статуси</option>
              <option value="active">Активно</option>
              <option value="inactive">Неактивно</option>
              <option value="pending">Изчакващо</option>
            </Select>
          </FilterField>
          <FilterField>
            <Label>Тип устройство</Label>
            <Select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">Всички типове</option>
              <option value="sensor">Сензор</option>
              <option value="receiver">Приемник</option>
            </Select>
          </FilterField>
          <FilterField>
            <Label>Сериен номер</Label>
            <Input
              type="text"
              placeholder="Търси по сериен номер..."
              value={filters.serialNumber}
              onChange={(e) => setFilters({ ...filters, serialNumber: e.target.value })}
            />
          </FilterField>
          <FilterField>
            <Label>Имейл на клиент</Label>
            <Input
              type="text"
              placeholder="Търси по имейл..."
              value={filters.email}
              onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            />
          </FilterField>
        </FilterContainer>
        <TableContainer>
          <Table>
            <TableHead>
              <tr>
                <Th>Име</Th>
                <Th>Сериен номер</Th>
                <Th>Дата на поръчка</Th>
                <Th>Клиент</Th>
                <Th>Имейл</Th>
                <Th>Телефон</Th>
                <Th>ID на устройство</Th>
                <Th>Ключ</Th>
                <Th>Софтуер</Th>
                <Th>Статус</Th>
                <Th>Действия</Th>
                <Th>QR Код</Th>
              </tr>
            </TableHead>
            <TableBody>
              {filteredDevices.map((device: Device) => (
                <Tr key={device._id}>
                  <Td>{device.name}</Td>
                  <Td>
                    <SerialNumber>{device.serialNumber}</SerialNumber>
                  </Td>
                  <Td>{format(new Date(device.dateCreated), 'dd.MM.yyyy')}</Td>
                  <Td>{device.user?.firstName + ' ' + device.user?.lastName}</Td>
                  <Td>{device.user?.email}</Td>
                  <Td>{device.user?.phone}</Td>
                  <Td>
                    <IdCell encryptedId={device.encryptedId} />
                  </Td>
                  <Td>
                    <IdCell encryptedId={device.privateKey} />
                  </Td>
                  <Td>{device.software ? 'Да' : 'Не'}</Td>
                  <Td>
                    <StatusBadge status={device.status}>
                      {device.status === 'active' ? 'Активно' :
                       device.status === 'inactive' ? 'Неактивно' :
                       'Изчакващо'}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {!device.software && (
                        <ActionButton onClick={() => setSelectedDevice(device)}>
                          Добави софтуер
                        </ActionButton>
                      )}
                      <ActionButton onClick={async () => {
                        await generateQaTokenResellMutate(device._id);
                        mutate(urls.fetchDevices);
                      }}>
                        Генерирай QR
                      </ActionButton>
                    </div>
                  </Td>
                  <Td>
                    {device.resellId && (
                      <QRContainer>
                        <div id={`qr-${device._id}`}>
                          <QRCodeSVG
                            value={device.resellId}
                            size={150}
                          />
                        </div>
                        <DownloadButton onClick={() => handleDownloadQR(device._id, device.name)}>
                          <FaDownload /> Изтегли
                        </DownloadButton>
                      </QRContainer>
                    )}
                  </Td>
                </Tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedDevice && (
          <ConfirmationOverlay>
            <ConfirmationDialog>
              <DialogTitle>Потвърждение</DialogTitle>
              <DialogContent>
                Сигурни ли сте, че искате да добавите софтуер за устройство {selectedDevice.name}?
              </DialogContent>
              <DialogActions>
                <CancelButton onClick={() => setSelectedDevice(null)}>Не</CancelButton>
                <ConfirmButton onClick={handleConfirmAddSoftware}>Да</ConfirmButton>
              </DialogActions>
            </ConfirmationDialog>
          </ConfirmationOverlay>
        )}

        {isCreateModalOpen && (
          <ConfirmationOverlay>
            <ConfirmationDialog>
              <DialogTitle>Създай ново устройство</DialogTitle>
              <FormContainer>
                <FormField>
                  <Label>Тип на устройството</Label>
                  <Select
                    value={newDevice.type}
                    onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                    required
                  >
                    <option value="">Изберете тип</option>
                    <option value="sensor">Сензор</option>
                    <option value="receiver">Приемник</option>
                  </Select>
                </FormField>
              </FormContainer>
              <DialogActions>
                <CancelButton onClick={() => setIsCreateModalOpen(false)}>Отказ</CancelButton>
                <ConfirmButton onClick={handleCreateDevice}>Създай</ConfirmButton>
              </DialogActions>
            </ConfirmationDialog>
          </ConfirmationOverlay>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default DevicesList;