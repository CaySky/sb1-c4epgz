import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../store/auth';
import { Code } from 'lucide-react';

export default function ApiDocs() {
  const [user] = useAtom(userAtom);

  if (user?.role !== 'admin') {
    return <div>访问被拒绝</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">API文档</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">认证</h3>
            <p className="text-gray-600 mb-4">
              所有API请求都需要在请求头中包含您的API密钥：
            </p>
            <div className="bg-gray-50 rounded-md p-4">
              <code className="text-sm">
                Authorization: Bearer {user.apiKey}
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">接口列表</h3>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center mb-2">
                  <Code className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-900">GET /api/ips</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">获取所有IP记录</p>
                <div className="bg-gray-50 rounded-md p-3">
                  <pre className="text-sm">
                    {JSON.stringify({ 
                      status: "success",
                      data: [{
                        ip: "192.168.1.1",
                        region: "亚洲/上海",
                        functionality: "Web服务器",
                        notes: "主要web服务器"
                      }]
                    }, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center mb-2">
                  <Code className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-900">POST /api/ips</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">添加新的IP记录</p>
                <div className="bg-gray-50 rounded-md p-3">
                  <pre className="text-sm">
                    {JSON.stringify({
                      ip: "192.168.1.2",
                      region: "亚洲/上海",
                      functionality: "数据库服务器",
                      notes: "备用数据库服务器"
                    }, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}