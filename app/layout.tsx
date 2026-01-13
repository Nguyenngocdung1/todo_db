'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeOutlined,
  CheckSquareOutlined,
  UserOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <html lang="vi">
      <body>
        <div className="layout">
          <aside className="sidebar">
            <h3>MENU</h3>
            <nav>
              <Link
                href="/"
                className={`menu-item ${isActive('/') ? 'active' : ''}`}
              >
                <HomeOutlined />
                <span>Trang chủ</span>
              </Link>

              <Link
                href="/todos"
                className={`menu-item ${isActive('/todos') ? 'active' : ''}`}
              >
                <CheckSquareOutlined />
                <span>Todos</span>
              </Link>

              <Link
                href="/users"
                className={`menu-item ${isActive('/users') ? 'active' : ''}`}
              >
                <UserOutlined />
                <span>Users</span>
              </Link>

              <Link
                href="/random-user"
                className={`menu-item ${isActive('/random-user') ? 'active' : ''}`}
              >
                <TrophyOutlined />
                <span>Quay Random</span>
              </Link>
            </nav>
          </aside>

          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
