'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, ShoppingCart, Package, Truck, MapPin, BarChart, Settings, LogOut, SofaIcon } from 'lucide-react';
import { useCurrentCompany } from './hooks';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { company } = useCurrentCompany();
  const pathname = usePathname();
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleProductsMenu = () => {
    setIsProductsOpen((prev) => !prev);
  };

  // Проверка за активен линк
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block bg-gray-800 text-white w-64 min-h-screen p-4 fixed top-0 left-0">
        {company && (
          <div className="mb-6 mt-20 px-4 py-2">
            <h2 className="text-xl font-bold text-white">{company.name}</h2>
          </div>
        )}
        <nav>
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                  isActive('/dashboard') && !pathname.includes('/dashboard/')
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
                Дашборд
              </Link>
            </li>
            <li>
                <Link
                  href="/dashboard/tasks"
                  className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                    isActive('/dashboard/tasks') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                  }`}
                >
                  <SofaIcon className="w-5 h-5" />
                  Задачи
                </Link>
              </li>
            <li>
              <Link
                href="/dashboard/clients"
                className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                  isActive('/dashboard/clients') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                }`}
              >
                <Users className="w-5 h-5" />
                Клиенти
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/orders"
                className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                  isActive('/dashboard/orders') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Поръчки
              </Link>
            </li>
            <li>
              <button
                onClick={toggleProductsMenu}
                className={`w-full flex items-center justify-between px-4 py-2 text-base rounded transition-colors duration-300 ${
                  isActive('/dashboard/products') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Продукти
                </div>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${isProductsOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              <ul className={`pl-6 mt-1 space-y-1 ${isProductsOpen ? 'block' : 'hidden'}`}>
                <li>
                  <Link
                    href="/dashboard/products/all"
                    className={`block px-4 py-2 text-sm rounded transition-colors duration-300 ${
                      isActive('/dashboard/products/all') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                    }`}
                  >
                    Видове продукти
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/products/lots"
                    className={`block px-4 py-2 text-sm rounded transition-colors duration-300 ${
                      isActive('/dashboard/products/serialized') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                    }`}
                  >
                    Партиди
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/dashboard/supplies"
                className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                  isActive('/dashboard/supplies') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                }`}
              >
                <Package className="w-5 h-5" />
                Доставки
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/suppliers"
                className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                  isActive('/dashboard/suppliers') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                }`}
              >
                <Truck className="w-5 h-5" />
                Доставчици
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/locations"
                className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                  isActive('/dashboard/locations') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                }`}
              >
                <MapPin className="w-5 h-5" />
                Обекти
              </Link>
            </li>
            <li>
              <Link
                href="/logout"
                className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                  isActive('/logout') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                }`}
              >
                <LogOut className="w-5 h-5" />
                Разлогване
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <input type="checkbox" id="sidebar-toggle" className="hidden peer" />
        <label
          htmlFor="sidebar-toggle"
          className="fixed top-4 left-4 z-50 p-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors duration-300 md:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </label>
        <aside
          className="fixed top-0 left-0 w-64 min-h-screen bg-gray-800 text-white p-4 transform -translate-x-full peer-checked:translate-x-0 transition-transform duration-300 md:hidden"
        >
          <div className="mb-6 px-4 py-2">
            <h2 className="text-xl font-bold text-white">ERP/CRM Дашборд</h2>
          </div>
          <nav>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                    isActive('/dashboard') && !pathname.includes('/dashboard/')
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  Дашборд
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/tasks"
                  className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                    isActive('/dashboard/tasks') && !pathname.includes('/dashboard/tasks/')
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                  }`}
                >
                  <SofaIcon className="w-5 h-5" />
                  Задачи
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/clients"
                  className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                    isActive('/dashboard/clients') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Клиенти
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/orders"
                  className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                    isActive('/dashboard/orders') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Поръчки
                </Link>
              </li>
              <li>
                <button
                  onClick={toggleProductsMenu}
                  className={`w-full flex items-center justify-between px-4 py-2 text-base rounded transition-colors duration-300 ${
                    isActive('/dashboard/products') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Продукти
                  </div>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${isProductsOpen ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                <ul className={`pl-6 mt-1 space-y-1 ${isProductsOpen ? 'block' : 'hidden'}`}>
                  <li>
                    <Link
                      href="/dashboard/products/all"
                      className={`block px-4 py-2 text-sm rounded transition-colors duration-300 ${
                        isActive('/dashboard/products/all') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                      }`}
                    >
                      Всички продукти
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/products/serialized"
                      className={`block px-4 py-2 text-sm rounded transition-colors duration-300 ${
                        isActive('/dashboard/products/serialized') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                      }`}
                    >
                      Индивидуални продукти
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/products/bulk"
                      className={`block px-4 py-2 text-sm rounded transition-colors duration-300 ${
                        isActive('/dashboard/products/bulk') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                      }`}
                    >
                      Bulk продукти
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  href="/dashboard/supplies"
                  className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                    isActive('/dashboard/supplies') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  Доставки
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/suppliers"
                  className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                    isActive('/dashboard/suppliers') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  Доставчици
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/locations"
                  className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                    isActive('/dashboard/locations') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  Обекти
                </Link>
              </li>
              <li>
                <Link
                  href="/logout"
                  className={`flex items-center gap-2 px-4 py-2 text-base rounded transition-colors duration-300 ${
                    isActive('/logout') ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                  }`}
                >
                  <LogOut className="w-5 h-5" />
                  Разлогване
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 bg-gray-900">
        {children}
      </div>
    </div>
  );
}