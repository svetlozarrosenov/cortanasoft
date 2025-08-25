import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { deleteAlarmsMutate, useAlarms, deleteAlarmMutate } from './hooks';
import { useUser } from '../hooks';
import { Navigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../Footer';
import { FaTrash } from 'react-icons/fa';

const flashAnimation = keyframes`
  0% { background-color: rgba(90, 103, 216, 0.1); }
  50% { background-color: rgba(90, 103, 216, 0.25); }
  100% { background-color: rgba(90, 103, 216, 0.1); }
`;

const PageContainer = styled.div`
  background: linear-gradient(135deg, #e6e9ff, #f3e8ff);
  min-height: calc(100vh - 60px);
  padding: 16px 8px;

  @media (min-width: 768px) {
    padding: 24px 16px;
  }
  @media (min-width: 1024px) {
    padding: 32px 24px;
  }
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);

  @media (min-width: 768px) {
    padding: 20px;
  }
  @media (min-width: 1024px) {
    padding: 24px;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 16px;
  color: #1f2a44;
  font-weight: 700;

  span {
    background: linear-gradient(135deg, #5a67d8, #b794f4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 24px;
  }
`;

const SubTitle = styled.div`
  text-align: center;
  font-size: 0.75rem;
  margin-bottom: 12px;
  color: #5a67d8;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 0.875rem;
    margin-bottom: 16px;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;

  @media (max-width: 767px) {
    justify-content: center;
  }
`;

const BulkDeleteButton = styled.button`
  background: linear-gradient(135deg, #f56565, #c53030);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #c53030, #9b2c2c);
    transform: translateY(-1px);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }

  @media (min-width: 768px) {
    padding: 8px 16px;
    font-size: 0.875rem;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 12px;

  @media (max-width: 767px) {
    display: block;
  }
`;

const TableHead = styled.thead`
  @media (max-width: 767px) {
    display: none;
  }
`;

const TableBody = styled.tbody`
  @media (max-width: 767px) {
    display: block;
  }
`;

const Th = styled.th`
  background: linear-gradient(135deg, #5a67d8, #b794f4);
  color: white;
  text-align: left;
  padding: 8px 10px;
  font-weight: 500;
  font-size: 0.75rem;

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
  }

  @media (min-width: 768px) {
    padding: 10px 12px;
    font-size: 0.875rem;
  }
`;

const Tr = styled.tr`
  background: #fff;
  transition: all 0.2s ease;

  &:nth-child(even) {
    background: rgba(90, 103, 216, 0.03);
  }

  &:hover {
    background: rgba(90, 103, 216, 0.08);
  }

  &.flash {
    animation: ${flashAnimation} 0.4s ease-in-out 2;
  }

  @media (max-width: 767px) {
    display: block;
    margin-bottom: 8px;
    border-radius: 8px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
    padding: 6px;
    &:nth-child(even) {
      background: rgba(90, 103, 216, 0.1);
    }
    &:nth-child(odd) {
      background: #fff;
    }
  }
`;

const Td = styled.td`
  border-bottom: 1px solid rgba(90, 103, 216, 0.1);
  padding: 6px 10px;
  vertical-align: middle;
  font-size: 0.875rem;
  color: #2d3748;
  text-align: left;

  @media (max-width: 767px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 6px;
    font-size: 0.8rem;
    border: none;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(90, 103, 216, 0.15);
    }

    &:before {
      content: attr(data-label);
      font-weight: 600;
      color: #5a67d8;
      flex: 0 0 35%;
      font-size: 0.8rem;
    }
  }

  @media (min-width: 768px) {
    padding: 8px 12px;
    font-size: 0.875rem;
  }
`;

const DeleteButton = styled.button`
  background: linear-gradient(135deg, #f56565, #c53030);
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 3px;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #c53030, #9b2c2c);
  }

  @media (min-width: 768px) {
    padding: 6px 12px;
    font-size: 0.75rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: #4a5568;
  margin: 16px 0;
  padding: 8px;
  background: rgba(90, 103, 216, 0.05);
  border-radius: 6px;

  @media (min-width: 768px) {
    font-size: 0.875rem;
    padding: 12px;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: #e53e3e;
  margin: 16px 0;
  padding: 8px;
  background: #fff5f5;
  border-radius: 6px;
  border: 1px solid #feb2b2;

  @media (min-width: 768px) {
    font-size: 0.875rem;
    padding: 12px;
  }
`;

const ConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 8px;
`;

const ConfirmationDialog = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);

  @media (min-width: 768px) {
    padding: 16px;
    max-width: 420px;
  }
`;

const DialogTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 12px;
  color: #1f2a44;
  text-align: center;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const DialogContent = styled.p`
  color: #4a5568;
  margin-bottom: 16px;
  font-size: 0.75rem;
  line-height: 1.4;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const CancelButton = styled.button`
  background: #edf2f7;
  color: #4a5568;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
  }

  @media (min-width: 768px) {
    padding: 8px 20px;
    font-size: 0.875rem;
  }
`;

const ConfirmButton = styled.button`
  background: linear-gradient(135deg, #f56565, #c53030);
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #c53030, #9b2c2c);
  }

  @media (min-width: 768px) {
    padding: 8px 20px;
    font-size: 0.875rem;
  }
`;

interface Alarm {
  alarmId: string;
  deviceId: string;
  deviceName: string;
  date: string;
  protectedItem?: string;
  serialNumber?: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('bg-BG', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const AlarmPage: React.FC = () => {
  const { user, isLoading: userLoading } = useUser();
  const { alarms, isLoading: alarmsLoading, error, mutate } = useAlarms();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSingleConfirmDialog, setShowSingleConfirmDialog] = useState(false);
  const [alarmToDelete, setAlarmToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [flashLastAlarm, setFlashLastAlarm] = useState(false);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data?.type === 'revalidateAlarms') {
        console.log('Получено съобщение за ревалидация на аларми:', event.data.payload);
        mutate().then(() => {
          setFlashLastAlarm(true);
          setTimeout(() => setFlashLastAlarm(false), 1200);
        });
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, [mutate]);

  const handleDeleteAllAlarms = async () => {
    setIsDeleting(true);
    try {
      await deleteAlarmsMutate();
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Грешка при изтриване на алармите:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteAlarm = (alarmId: string) => {
    setAlarmToDelete(alarmId);
    setShowSingleConfirmDialog(true);
  };

  const confirmDeleteSingleAlarm = async () => {
    if (!alarmToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAlarmMutate(alarmToDelete);
      setShowSingleConfirmDialog(false);
      setAlarmToDelete(null);
    } catch (error) {
      console.error('Грешка при изтриване на аларма:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDeleteSingleAlarm = () => {
    setShowSingleConfirmDialog(false);
    setAlarmToDelete(null);
  };

  if (userLoading) {
    return <LoadingMessage>Зареждане на потребителска информация...</LoadingMessage>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <Title>
            Преглед на <span>алармите</span>
          </Title>

          {alarms && (
            <>
              <SubTitle>Общ брой аларми: {alarms.length}</SubTitle>
              {alarms.length > 0 && (
                <ActionBar>
                  <BulkDeleteButton
                    onClick={() => setShowConfirmDialog(true)}
                    disabled={isDeleting || alarmsLoading || alarms.length === 0}
                  >
                    <FaTrash />
                    {isDeleting ? 'Изтриване...' : 'Изтрий всички'}
                  </BulkDeleteButton>
                </ActionBar>
              )}
            </>
          )}

          {alarmsLoading && <LoadingMessage>Зареждане на аларми...</LoadingMessage>}
          {error && (
            <ErrorMessage>Грешка при зареждане на алармите: {error.message}</ErrorMessage>
          )}

          {alarms && alarms.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <tr>
                    <Th>№</Th>
                    <Th>Охранява</Th>
                    <Th>Дата и час</Th>
                    <Th>Действия</Th>
                  </tr>
                </TableHead>
                <TableBody>
                  {alarms.map((alarm: Alarm, index: number) => (
                    <Tr
                      key={alarm.alarmId}
                      className={flashLastAlarm && index === 0 ? 'flash' : ''}
                    >
                      <Td data-label="№">{alarms.length - index}</Td>
                      <Td data-label="Охранява">{alarm.protectedItem || 'Няма'}</Td>
                      <Td data-label="Дата">{formatDate(alarm.date)}</Td>
                      <Td data-label="Действия">
                        <DeleteButton onClick={() => handleDeleteAlarm(alarm.alarmId)}>
                          <FaTrash />
                          Изтрий
                        </DeleteButton>
                      </Td>
                    </Tr>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <LoadingMessage>Няма налични аларми</LoadingMessage>
          )}
        </ContentContainer>
      </PageContainer>
      <Footer />

      {showConfirmDialog && (
        <ConfirmationOverlay>
          <ConfirmationDialog>
            <DialogTitle>Изтриване на всички аларми</DialogTitle>
            <DialogContent>
              Сигурни ли сте, че искате да изтриете всички аларми? Това действие е необратимо.
            </DialogContent>
            <DialogActions>
              <CancelButton onClick={() => setShowConfirmDialog(false)} disabled={isDeleting}>
                Отказ
              </CancelButton>
              <ConfirmButton onClick={handleDeleteAllAlarms} disabled={isDeleting}>
                {isDeleting ? 'Изтриване...' : 'Изтрий всички'}
              </ConfirmButton>
            </DialogActions>
          </ConfirmationDialog>
        </ConfirmationOverlay>
      )}

      {showSingleConfirmDialog && (
        <ConfirmationOverlay>
          <ConfirmationDialog>
            <DialogTitle>Изтриване на аларма</DialogTitle>
            <DialogContent>
              Сигурни ли сте, че искате да изтриете тази аларма? Това действие е необратимо.
            </DialogContent>
            <DialogActions>
              <CancelButton onClick={cancelDeleteSingleAlarm} disabled={isDeleting}>
                Отказ
              </CancelButton>
              <ConfirmButton onClick={confirmDeleteSingleAlarm} disabled={isDeleting}>
                {isDeleting ? 'Изтриване...' : 'Изтрий'}
              </ConfirmButton>
            </DialogActions>
          </ConfirmationDialog>
        </ConfirmationOverlay>
      )}
    </>
  );
};

export default AlarmPage;