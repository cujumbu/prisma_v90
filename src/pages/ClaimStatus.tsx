import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Claim {
  id: string;
  orderNumber: string;
  email: string;
  name: string;
  status: string;
  submissionDate: string;
}

const ClaimStatus: React.FC = () => {
  const [claim, setClaim] = useState<Claim | null>(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const claimId = location.state?.claimId;
    if (claimId) {
      fetchClaim(claimId);
    }
  }, [location]);

  const fetchClaim = async (id: string) => {
    try {
      const response = await fetch(`/api/claims/${id}`);
      if (!response.ok) {
        throw new Error(t('failedToFetchClaim'));
      }
      const claimData = await response.json();
      setClaim(claimData);
    } catch (error) {
      console.error('Error fetching claim:', error);
      setError(t('errorFetchingClaim'));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`/api/claims?orderNumber=${orderNumber}&email=${email}`);
      if (!response.ok) {
        throw new Error(t('failedToFetchClaim'));
      }
      const claims = await response.json();
      if (claims.length === 0) {
        setError(t('noClaimFound'));
        setClaim(null);
      } else {
        setClaim(claims[0]);
      }
    } catch (error) {
      console.error('Error fetching claim:', error);
      setError(t('errorFetchingClaim'));
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">{t('checkClaimStatus')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">{t('orderNumber')}</label>
          <input
            type="text"
            id="orderNumber"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t('checkStatus')}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {claim && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{t('claimStatus')}</h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('orderNumber')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{claim.orderNumber}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('name')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{claim.name}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('status')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{t(claim.status.toLowerCase())}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('submissionDate')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(claim.submissionDate).toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimStatus;