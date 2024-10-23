import React from 'react';
import { useAtom } from 'jotai';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Database, LogOut, Server, User } from 'lucide-react';
import { userAtom } from '../store/auth';

export default function Layout() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center px-2 py-2 text-gray-900">
                <Database className="h-6 w-6 mr-2" />
                <span className="font-semibold">IP管理系统</span>
              </Link>
              <div className="ml-6 flex space-x-4">
                <Link to="/" className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
                  <Server className="h-4 w-4 mr-1" />
                  IP列表
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/api-docs" className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
                    <Database className="h-4 w-4 mr-1" />
                    API文档
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-gray-600">{user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="ml-4 p-2 text-gray-400 hover:text-gray-600"
                  title="退出登录"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}