import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/Layout.jsx';
import Home from '@/Pages/Home.jsx';
import Chatbot from '@/Pages/Chatbot.jsx';
import Scanner from '@/Pages/Scanner.jsx';
import Reports from '@/Pages/Reports.jsx';
import Documents from '@/Pages/Documents.jsx';
import CreateReport from '@/Pages/CreateReport.jsx';

// Assume Layout wraps the children or we wrap it here.
// Layout.js viewed earlier:
// export default function Layout({ children, currentPageName })
// So it takes children.

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Layout currentPageName="Home"><Home /></Layout>} />
                <Route path="/chatbot" element={<Layout currentPageName="Chatbot"><Chatbot /></Layout>} />
                <Route path="/scanner" element={<Layout currentPageName="Scanner"><Scanner /></Layout>} />
                <Route path="/reports" element={<Layout currentPageName="Reports"><Reports /></Layout>} />
                <Route path="/documents" element={<Layout currentPageName="Documents"><Documents /></Layout>} />
                <Route path="/create-report" element={<Layout currentPageName="CreateReport"><CreateReport /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
