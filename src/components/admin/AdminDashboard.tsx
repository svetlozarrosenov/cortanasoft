import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import Header from '../header';
import Footer from '../Footer';
import { useCreateProduct, useProducts } from '../products/hooks';
import { urls as productApiUrls } from '../products/hooks';
import { useSWRConfig } from 'swr';
import DevicesList from './DevicesList';
import ClientsList from './ClientsList';

// Основен контейнер за страницата
const PageContainer = styled.div`
  display: flex;
  background: linear-gradient(135deg, #6e8efb08, #a777e308);
  min-height: calc(100vh - 100px);
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 40px;
  background-color: white;
  margin: 20px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(110, 142, 251, 0.1);

  @media (max-width: 768px) {
    margin: 10px;
    padding: 20px;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: white;
  border-right: 1px solid rgba(110, 142, 251, 0.1);
  padding: 20px;
  box-shadow: 2px 0 10px rgba(110, 142, 251, 0.05);

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SidebarMenu = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SidebarMenuItem = styled.li`
  margin-bottom: 10px;
`;

const SidebarMenuLink = styled(Link)`
  color: #4a5568;
  text-decoration: none;
  font-size: 1rem;
  display: block;
  padding: 10px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #6e8efb10, #a777e310);
    color: #6e8efb;
  }

  &.active {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    color: white;
    font-weight: 500;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 40px;
  text-align: center;

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

const Select = styled.select`
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid rgba(110, 142, 251, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  color: #4a5568;
  transition: all 0.2s ease;

  &:focus {
    border-color: #6e8efb;
    box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.2);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid rgba(110, 142, 251, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  background-color: #fff;
  color: #4a5568;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    border-color: #6e8efb;
    box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.2);
    outline: none;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, #5a75e0, #8f5ed0);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(110, 142, 251, 0.3);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1rem;
  }
`;

const DeviceList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 30px;
`;

const DeviceItem = styled.li`
  background-color: white;
  border: 1px solid rgba(110, 142, 251, 0.2);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(110, 142, 251, 0.05);

  &:hover {
    box-shadow: 0 6px 12px rgba(110, 142, 251, 0.1);
    transform: translateY(-2px);
  }
`;

const DeviceInfo = styled.div`
  flex: 1;
  color: #4a5568;
  font-size: 1rem;
`;

const SerialNumber = styled.span`
  font-family: monospace;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
  margin-left: 15px;
  display: inline-block;
  white-space: nowrap;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 20px;
    width: 95%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid rgba(110, 142, 251, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  color: #4a5568;
  transition: all 0.2s ease;

  &:focus {
    border-color: #6e8efb;
    box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.2);
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const AdminDashboard: React.FC = () => {
  const { products = [] } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const location = useLocation();
  const [newDevice, setNewDevice] = useState<Omit<Device, 'id'>>({
    name: '',
    model: '',
    type: '',
    description: '',
    image: '',
    price: '',
    serialNumber: '',
  });

  interface Device {
    id: string;
    name: string;
    model: string;
    type: string;
    description: string;
    image: string;
    price: string;
    serialNumber: string;
  }

  // Извличане на активния таб от URL
  const activeMenu = new URLSearchParams(location.search).get('tab') || 'products';

  const handleAddDevice = async () => {
    setIsModalOpen(true);
  };

  const useHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await useCreateProduct(newDevice);
      mutate(productApiUrls.fetchAllProducts);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'products':
        return (
          <>
            <Button onClick={handleAddDevice}>Добави продукт</Button>
            <DeviceList>
              {products.map((device: any) => (
                <DeviceItem key={device._id}>
                  <DeviceInfo>
                    {device.name} - {device.type}
                  </DeviceInfo>
                  <SerialNumber>{device.serialNumber}</SerialNumber>
                </DeviceItem>
              ))}
            </DeviceList>
          </>
        );
      case 'orders':
        return <h2>Поръчки</h2>;
      case 'devices':
        return <DevicesList />;
      case 'clients':
        return <ClientsList />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Sidebar>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuLink
                to="?tab=products"
                className={activeMenu === 'products' ? 'active' : ''}
              >
                Продукти
              </SidebarMenuLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuLink
                to="?tab=devices"
                className={activeMenu === 'devices' ? 'active' : ''}
              >
                Устройства
              </SidebarMenuLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuLink
                to="?tab=clients"
                className={activeMenu === 'clients' ? 'active' : ''}
              >
                Клиенти
              </SidebarMenuLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuLink
                to="?tab=settings"
                className={activeMenu === 'settings' ? 'active' : ''}
              >
                Настройки
              </SidebarMenuLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </Sidebar>
        <ContentContainer>
          <Title>Админ <span>Панел</span></Title>
          {renderContent()}
        </ContentContainer>
      </PageContainer>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <Form onSubmit={useHandleSubmit}>
              <Input
                type="text"
                placeholder="Име на устройството"
                value={newDevice.name}
                onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Модел"
                value={newDevice.model}
                onChange={(e) => setNewDevice({ ...newDevice, model: e.target.value })}
                required
              />
              <Select
                value={newDevice.type}
                onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                required
              >
                <option value="">Изберете тип</option>
                <option value="sensor">Сензор</option>
                <option value="receiver">Приемник</option>
              </Select>
              <TextArea
                placeholder="Описание"
                value={newDevice.description}
                onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="URL на снимката"
                value={newDevice.image}
                onChange={(e) => setNewDevice({ ...newDevice, image: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Цена"
                value={newDevice.price}
                onChange={(e) => setNewDevice({ ...newDevice, price: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Сериен номер"
                value={newDevice.serialNumber}
                onChange={(e) => setNewDevice({ ...newDevice, serialNumber: e.target.value })}
                required
              />
              <ButtonGroup>
                <Button type="submit">Добави</Button>
                <Button type="button" onClick={() => setIsModalOpen(false)}>
                  Затвори
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
      <Footer />
    </>
  );
};

export default AdminDashboard;