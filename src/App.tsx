import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from './store/auth';
import Layout from './components/Layout';
import Login from './components/Login';
import IPList from './components/IPList';
import ApiDocs from './components/ApiDocs';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [user] = useAtom(userAtom);
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<IPList />} />
          <Route path="api-docs" element={<ApiDocs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;