import { useState } from 'react';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';

export default function SearchCourier() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const { data } = await API.get(`/staff/courier/search?refNumber=${query}`);
      setResults(data);
    } catch (err) {
      setResults([]);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Search Courier by Reference</h2>
      <div className="flex gap-2 mb-4">
        <input type="text" placeholder="Enter Reference Number" value={query} onChange={(e) => setQuery(e.target.value)} className="border p-2 flex-1 rounded" />
        <button onClick={handleSearch} className="bg-green-600 text-white px-4 rounded">Search</button>
      </div>
      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-200"><tr><th>Ref No</th><th>Sender</th><th>Recipient</th><th>Status</th></tr></thead>
            <tbody>
              {results.map(c => (
                <tr key={c.ID} className="border-b"><td className="p-2">{c.RefNumber}</td><td>{c.SenderName}</td><td>{c.RecipientName}</td><td>{c.Status}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}