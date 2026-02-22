'use client';

import { useState, useMemo } from 'react';
import { mockLeaderboardData } from '@/data/mockLeaderboard';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  tasksCompleted: number;
  earnings: string;
  joinDate: string;
  avatar?: string;
}

type SortKey = 'rank' | 'score' | 'tasksCompleted' | 'earnings';
type SortOrder = 'asc' | 'desc';

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sort and filter data
  const sortedData = useMemo(() => {
    let filtered = mockLeaderboardData.filter(entry =>
      entry.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aVal: number | string = a[sortKey];
      let bVal: number | string = b[sortKey];

      // Handle earnings (remove $ and convert to number)
      if (sortKey === 'earnings') {
        aVal = parseFloat((a as any).earnings.replace('$', '').replace(',', ''));
        bVal = parseFloat((b as any).earnings.replace('$', '').replace(',', ''));
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-600 text-lg">
            Top contributors in the MergeFund Hackathon
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-indigo-600">
              {mockLeaderboardData.length}
            </div>
            <div className="text-gray-600">Total Participants</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-green-600">
              ${mockLeaderboardData.reduce((sum, e) => sum + parseFloat(e.earnings.replace('$', '').replace(',', '')), 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Earnings</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-orange-600">
              {mockLeaderboardData.reduce((sum, e) => sum + e.tasksCompleted, 0)}
            </div>
            <div className="text-gray-600">Tasks Completed</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left font-semibold">User</th>
                  <th 
                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-indigo-700 transition"
                    onClick={() => handleSort('score')}
                  >
                    Score {sortKey === 'score' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-indigo-700 transition hidden md:table-cell"
                    onClick={() => handleSort('tasksCompleted')}
                  >
                    Tasks {sortKey === 'tasksCompleted' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-indigo-700 transition"
                    onClick={() => handleSort('earnings')}
                  >
                    Earnings {sortKey === 'earnings' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-4 text-left font-semibold hidden lg:table-cell">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((entry, index) => (
                  <tr 
                    key={entry.username}
                    className={`border-b border-gray-100 hover:bg-indigo-50 transition ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' :
                      index === 1 ? 'bg-gradient-to-r from-gray-50 to-silver-50' :
                      index === 2 ? 'bg-gradient-to-r from-orange-50 to-amber-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="text-2xl font-bold">
                        {getRankBadge((currentPage - 1) * itemsPerPage + index + 1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                          {entry.username[0].toUpperCase()}
                        </div>
                        <span className="font-semibold text-gray-900">{entry.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-indigo-600 text-lg">{entry.score.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-gray-700">{entry.tasksCompleted}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-green-600">{entry.earnings}</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-gray-600">{entry.joinDate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {paginatedData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😕</div>
              <p className="text-gray-600 text-lg">No users found matching "{searchTerm}"</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    ← Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg transition ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>Updated in real-time • Rankings based on score, tasks completed, and earnings</p>
        </div>
      </div>
    </div>
  );
}
