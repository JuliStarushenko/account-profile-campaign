// App.tsx
import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Profiles from './components/Profiles';
import Campaigns from './components/Campaigns';
import Accounts from './components/Accounts';

const App: React.FC = () => {
  const BackButton = () => {
    const navigate = useNavigate();

    const isOnAccountsPage = location.pathname === '/accounts' || location.pathname === '/';

    return (
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-primary" 
        disabled={isOnAccountsPage}
      >
        Back
      </button>
    );
  };

  const accounts = [
    {
      accountId: '1',
      email: 'example1@email.com',
      authToken: 'xyz123',
      creationDate: '2022-01-17',
    },
    {
      accountId: '2',
      email: 'example2@email.com',
      authToken: 'abc456',
      creationDate: '2022-01-18',
    },
    {
      accountId: '3',
      email: 'example3@email.com',
      authToken: 'def789',
      creationDate: '2022-01-19',
    },
    {
      accountId: '4',
      email: 'example4@email.com',
      authToken: 'ghi012',
      creationDate: '2022-01-20',
    },
    {
      accountId: '5',
      email: 'example5@email.com',
      authToken: 'jkl345',
      creationDate: '2022-01-21',
    },
    {
      accountId: '6',
      email: 'example6@email.com',
      authToken: 'mno678',
      creationDate: '2022-01-22',
    },
    {
      accountId: '7',
      email: 'example7@email.com',
      authToken: 'pqr901',
      creationDate: '2022-01-23',
    },
    {
      accountId: '8',
      email: 'example8@email.com',
      authToken: 'stu234',
      creationDate: '2022-01-24',
    },
    {
      accountId: '9',
      email: 'example9@email.com',
      authToken: 'vwx567',
      creationDate: '2022-01-25',
    },
    {
      accountId: '10',
      email: 'example10@email.com',
      authToken: 'yz0123',
      creationDate: '2022-01-26',
    },
  ];

  const profiles = [
    {
      profileId: '1',
      country: 'USA',
      marketplace: 'Amazon',
    },
    {
      profileId: '2',
      country: 'Canada',
      marketplace: 'eBay',
    },
    {
      profileId: '3',
      country: 'UK',
      marketplace: 'Etsy',
    },
    {
      profileId: '4',
      country: 'Germany',
      marketplace: 'Zalando',
    },
    {
      profileId: '5',
      country: 'France',
      marketplace: 'Cdiscount',
    },
    {
      profileId: '6',
      country: 'Spain',
      marketplace: 'Mercado Libre',
    },
    {
      profileId: '7',
      country: 'Italy',
      marketplace: 'Vinted',
    },
    {
      profileId: '8',
      country: 'Australia',
      marketplace: 'Gumtree',
    },
    {
      profileId: '9',
      country: 'Japan',
      marketplace: 'Rakuten',
    },
    {
      profileId: '10',
      country: 'China',
      marketplace: 'Taobao',
    },
  ];

  const campaigns = [
    {
      campaignId: '1',
      clicks: 150,
      cost: 500,
      date: '2022-01-17',
    },
    {
      campaignId: '2',
      clicks: 120,
      cost: 450,
      date: '2022-01-18',
    },
    {
      campaignId: '3',
      clicks: 200,
      cost: 700,
      date: '2022-01-19',
    },
    {
      campaignId: '4',
      clicks: 180,
      cost: 600,
      date: '2022-01-20',
    },
    {
      campaignId: '5',
      clicks: 250,
      cost: 800,
      date: '2022-01-21',
    },
    {
      campaignId: '6',
      clicks: 170,
      cost: 550,
      date: '2022-01-22',
    },
    {
      campaignId: '7',
      clicks: 300,
      cost: 1000,
      date: '2022-01-23',
    },
    {
      campaignId: '8',
      clicks: 220,
      cost: 750,
      date: '2022-01-24',
    },
    {
      campaignId: '9',
      clicks: 280,
      cost: 900,
      date: '2022-01-25',
    },
    {
      campaignId: '10',
      clicks: 200,
      cost: 700,
      date: '2022-01-26',
    },
  ];

  return (
    <div className="container mt-4">
      <Router>
        <div style={{ paddingBottom: 10 }}>
          <BackButton /> { }
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/accounts" replace />} />
          <Route path="/accounts" element={<Accounts accounts={accounts} />} />
          <Route path="/profile/:accountId" element={<Profiles profiles={profiles} />} />
          <Route path="/campaigns/:accountId/:profileId" element={<Campaigns campaigns={campaigns} />} />
        </Routes>
      </Router>
    </div>

  );
};

export default App;
