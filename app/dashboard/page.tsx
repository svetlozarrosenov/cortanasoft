'use client'
import styles from "./dashboard.module.css";
import { useUser } from "../login/hooks";

export default function DashboardPage() {
  const { user } = useUser();
  console.log('crb_user', user)
  let revenue = null;
  let tasks = [];
  let customers = null;

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Monthly Revenue</h2>
        <p className={styles.cardValue}>
          {revenue ? `$${revenue?.total?.toLocaleString()}` : "N/A"}
        </p>
        <p className={styles.cardDescription}>
          Total revenue for {new Date().toLocaleString("default", { month: "long" })}.
        </p>
      </div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Current Tasks</h2>
        <p className={styles.cardValue}>{tasks.length || 0}</p>
        <ul className={styles.list}>
          {tasks.length && tasks?.slice(0, 3).map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
          {tasks.length === 0 && <li>No tasks available</li>}
        </ul>
      </div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Customer Stats</h2>
        <p className={styles.cardValue}>{customers?.total || 0}</p>
        <p className={styles.cardDescription}>Total active customers.</p>
      </div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Active Orders</h2>
        <p className={styles.cardValue}>{revenue?.activeOrders || 0}</p>
        <p className={styles.cardDescription}>Orders pending fulfillment.</p>
      </div>
    </div>
  );
}