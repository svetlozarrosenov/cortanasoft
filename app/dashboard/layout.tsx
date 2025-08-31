'use client'
import Link from "next/link";
import { Home, Users, ShoppingCart, Package, BarChart, Settings, LogOut } from "lucide-react";
import styles from "./dashboard.module.css";
import { useCurrentCompany } from "./hooks";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { company } = useCurrentCompany();

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} hidden md:block`}>
        {company && <div className={styles.sidebarHeader}>
          <h2>{company.name}</h2>
        </div>}

        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/dashboard" className={styles.navLink}>
                <Home className={styles.icon} />
                Дашборд
              </Link>
            </li>
            <li>
              <Link href="/dashboard/clients" className={styles.navLink}>
                <Users className={styles.icon} />
                Клиенти
              </Link>
            </li>
            <li>
              <Link href="/dashboard/orders" className={styles.navLink}>
                <ShoppingCart className={styles.icon} />
                Поръчки
              </Link>
            </li>
            <li>
              <Link href="/dashboard/products" className={styles.navLink}>
                <Package className={styles.icon} />
                Продукти
              </Link>
            </li>
            <li>
              <Link href="/dashboard/supplies" className={styles.navLink}>
                <Package className={styles.icon} />
                Доставки
              </Link>
            </li>
            <li>
              <Link href="/dashboard/suppliers" className={styles.navLink}>
                <Package className={styles.icon} />
                Доставчици
              </Link>
            </li>
            <li>
              <Link href="/logout" className={styles.navLink}>
                <LogOut className={styles.icon} />
                Разлогване
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <input type="checkbox" id="sidebar-toggle" className="hidden peer" />
        <label htmlFor="sidebar-toggle" className={styles.toggleButton}>
          <svg className={styles.toggleIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </label>
        <aside className={`${styles.sidebar} ${styles.mobileSidebar}`}>
          <div className={styles.sidebarHeader}>
            <h2>ERP/CRM Дашборд</h2>
          </div>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link href="/dashboard" className={styles.navLink}>
                  <Home className={styles.icon} />
                  Дашборд
                </Link>
              </li>
              <li>
                <Link href="/dashboard/clients" className={styles.navLink}>
                  <Users className={styles.icon} />
                  Клиенти
                </Link>
              </li>
              <li>
                <Link href="/dashboard/orders" className={styles.navLink}>
                  <ShoppingCart className={styles.icon} />
                  Поръчки
                </Link>
              </li>
              <li>
                <Link href="/dashboard/products" className={styles.navLink}>
                  <Package className={styles.icon} />
                  Продукти
                </Link>
              </li>
              <li>
              <Link href="/dashboard/supplies" className={styles.navLink}>
                <Package className={styles.icon} />
                Доставки
              </Link>
            </li>

            <li>
              <Link href="/dashboard/suppliers" className={styles.navLink}>
                <Package className={styles.icon} />
                Доставчици
              </Link>
            </li>
              <li>
                <Link href="/dashboard/reports" className={styles.navLink}>
                  <BarChart className={styles.icon} />
                  Репорти
                </Link>
              </li>
              <li>
                <Link href="/settings" className={styles.navLink}>
                  <Settings className={styles.icon} />
                  Настройки
                </Link>
              </li>
              <li>
                <Link href="/users" className={styles.navLink}>
                  <Users className={styles.icon} />
                  Потребители
                </Link>
              </li>
              <li>
                <Link href="/logout" className={styles.navLink}>
                  <LogOut className={styles.icon} />
                  Разлогване
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        {children}
      </div>
    </div>
  );
}