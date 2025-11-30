'use client';

import React, { useEffect, useState } from 'react';
import { deleteAlarmsMutate, useAlarms, deleteAlarmMutate } from './hooks';
import { useUser } from '../hooks';
import { FaTrash } from 'react-icons/fa';
import styles from './alarms.module.css';

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

export default function AlarmsPage() {
  const { user, isLoading: userLoading } = useUser();
  const { alarms, isLoading: alarmsLoading, error, mutate } = useAlarms();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSingleConfirmDialog, setShowSingleConfirmDialog] = useState(false);
  const [alarmToDelete, setAlarmToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [flashLastAlarm, setFlashLastAlarm] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'revalidateAlarms') {
        console.log('Получено съобщение за ревалидация на аларми:', event.data.payload);
        mutate().then(() => {
          setFlashLastAlarm(true);
          setTimeout(() => setFlashLastAlarm(false), 1200);
        });
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleMessage);
      return () => {
        navigator.serviceWorker.removeEventListener('message', handleMessage);
      };
    }
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

  if (userLoading) {
    return <div className={styles.loadingMessage}>Зареждане на потребителска информация...</div>;
  }

  if (!user) {
    // В Next.js редиректът става с useRouter, но за сега просто връщаме null
    // или можеш да използваш redirect() в Server Component, но тук е Client
    return null;
  }

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>
            Преглед на <span>алармите</span>
          </h1>

          {alarms && (
            <>
              <div className={styles.subTitle}>Общ брой аларми: {alarms.length}</div>
              {alarms.length > 0 && (
                <div className={styles.actionBar}>
                  <button
                    onClick={() => setShowConfirmDialog(true)}
                    disabled={isDeleting || alarmsLoading || alarms.length === 0}
                    className={styles.bulkDeleteButton}
                  >
                    <FaTrash /> {isDeleting ? 'Изтриване...' : 'Изтрий всички'}
                  </button>
                </div>
              )}
            </>
          )}

          {alarmsLoading && <div className={styles.loadingMessage}>Зареждане на аларми...</div>}
          {error && (
            <div className={styles.errorMessage}>
              Грешка при зареждане на алармите: {error.message}
            </div>
          )}

          {alarms && alarms.length > 0 ? (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th className={styles.th}>№</th>
                    <th className={styles.th}>Охранява</th>
                    <th className={styles.th}>Дата и час</th>
                    <th className={styles.th}>Действия</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {alarms.map((alarm: Alarm, index: number) => (
                    <tr
                      key={alarm.alarmId}
                      className={`${flashLastAlarm && index === 0 ? styles.flash : ''}`}
                    >
                      <td className={styles.td} data-label="№">
                        {alarms.length - index}
                      </td>
                      <td className={styles.td} data-label="Охранява">
                        {alarm.protectedItem || 'Няма'}
                      </td>
                      <td className={styles.td} data-label="Дата">
                        {formatDate(alarm.date)}
                      </td>
                      <td className={styles.td} data-label="Действия">
                        <button
                          onClick={() => handleDeleteAlarm(alarm.alarmId)}
                          className={styles.deleteButton}
                        >
                          <FaTrash /> Изтрий
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.loadingMessage}>Няма налични аларми</div>
          )}
        </div>
      </div>

      {/* Диалог за изтриване на всички */}
      {showConfirmDialog && (
        <div className={styles.confirmationOverlay}>
          <div className={styles.confirmationDialog}>
            <h3 className={styles.dialogTitle}>Изтриване на всички аларми</h3>
            <p className={styles.dialogContent}>
              Сигурни ли сте, че искате да изтриете всички аларми? Това действие е необратимо.
            </p>
            <div className={styles.dialogActions}>
              <button
                onClick={() => setShowConfirmDialog(false)}
                disabled={isDeleting}
                className={styles.cancelButton}
              >
                Отказ
              </button>
              <button
                onClick={handleDeleteAllAlarms}
                disabled={isDeleting}
                className={styles.confirmButton}
              >
                {isDeleting ? 'Изтриване...' : 'Изтрий всички'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSingleConfirmDialog && (
        <div className={styles.confirmationOverlay}>
          <div className={styles.confirmationDialog}>
            <h3 className={styles.dialogTitle}>Изтриване на аларма</h3>
            <p className={styles.dialogContent}>
              Сигурни ли сте, че искате да изтриете тази аларма? Това действие е необратимо.
            </p>
            <div className={styles.dialogActions}>
              <button
                onClick={() => setShowSingleConfirmDialog(false)}
                disabled={isDeleting}
                className={styles.cancelButton}
              >
                Отказ
              </button>
              <button
                onClick={confirmDeleteSingleAlarm}
                disabled={isDeleting}
                className={styles.confirmButton}
              >
                {isDeleting ? 'Изтриване...' : 'Изтрий'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}