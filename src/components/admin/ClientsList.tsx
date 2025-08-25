import React, { useState } from 'react';
import styled from 'styled-components';
import { useClients } from './hooks';

interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  devices: Device[];
}

interface Device {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  serialNumber: string;
  type: string;
  lastUpdated: string;
}

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
  min-width: 800px;
  border-collapse: separate;
  border-spacing: 0;
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
    width: 20%;
    border-top-left-radius: 12px;
  }
  &:nth-child(2) { width: 25%; }
  &:nth-child(3) { width: 25%; }
  &:nth-child(4) { width: 15%; }
  &:last-child {
    width: 15%;
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
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, #5a75e0, #8f5ed0);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(110, 142, 251, 0.3);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 20px;
    width: 95%;
  }
`;

const CloseButton = styled.button`
  float: right;
  background: none;
  border: none;
  font-size: 24px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #e53e3e;
  }
`;

const DeviceList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const DeviceItem = styled.li`
  margin-bottom: 16px;
  padding: 16px;
  background-color: rgba(110, 142, 251, 0.05);
  border-radius: 8px;
  color: #4a5568;
  font-size: 1rem;
`;

const DeviceDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
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

const Title = styled.h2`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 30px;
  text-align: center;

  span {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

const ClientsList: React.FC = () => {
  const { clients } = useClients();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleShowDevices = (client: Client) => {
    setSelectedClient(client);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
  };

  return (
    <div>
      <Title>Списък с <span>клиенти</span></Title>
      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <Th>Име</Th>
              <Th>Имейл</Th>
              <Th>Адрес</Th>
              <Th>Телефон</Th>
              <Th>Действия</Th>
            </tr>
          </TableHead>
          <TableBody>
            {clients && clients.map((client: Client) => (
              <Tr key={client.id}>
                <Td>{client.name}</Td>
                <Td>{client.email}</Td>
                <Td>{client.address}</Td>
                <Td>{client.phone}</Td>
                <Td>
                  <Button onClick={() => handleShowDevices(client)}>Устройства</Button>
                </Td>
              </Tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedClient && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <h3>Устройства на {selectedClient.name}</h3>
            <DeviceList>
              {selectedClient.devices.map(device => (
                <DeviceItem key={device.id}>
                  <DeviceDetail>
                    <strong>Име:</strong> {device.name}
                  </DeviceDetail>
                  <DeviceDetail>
                    <strong>Сериен номер:</strong> {device.serialNumber}
                  </DeviceDetail>
                  <DeviceDetail>
                    <strong>Тип:</strong> {device.type}
                  </DeviceDetail>
                  <DeviceDetail>
                    <strong>Статус:</strong>
                    <StatusBadge status={device.status}>
                      {device.status === 'active' ? 'Активно' :
                       device.status === 'inactive' ? 'Неактивно' :
                       'Изчакващо'}
                    </StatusBadge>
                  </DeviceDetail>
                  <DeviceDetail>
                    <strong>Последна актуализация:</strong> {new Date(device.lastUpdated).toLocaleDateString('bg-BG')}
                  </DeviceDetail>
                </DeviceItem>
              ))}
            </DeviceList>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default ClientsList;