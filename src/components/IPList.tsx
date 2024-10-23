import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Download, Plus, Pencil, Trash } from 'lucide-react';
import { ipRecordsAtom } from '../store/ip-records';
import { userAtom } from '../store/auth';

export default function IPList() {
  const [ipRecords] = useAtom(ipRecordsAtom);
  const [user] = useAtom(userAtom);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = ipRecords.filter(record => 
    record.ip.includes(searchTerm) || 
    record.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.functionality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ['IP地址', '地区', '功能', '备注'];
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(record => 
        [record.ip, record.region, record.functionality, record.notes].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ip-list.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">IP地址管理</h2>
          <div className="flex space-x-4">
            <button
              onClick={downloadCSV}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              导出CSV
            </button>
            {user?.role === 'admin' && (
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                添加IP
              </button>
            )}
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="搜索IP、地区或功能..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP地址</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">地区</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">功能</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">备注</th>
                {user?.role === 'admin' && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.ip}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.functionality}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{record.notes}</td>
                  {user?.role === 'admin' && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4" title="编辑">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="删除">
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}