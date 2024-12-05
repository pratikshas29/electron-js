import React, { useState } from 'react';
import Header from '../components/Header';

const TableStatus = {
  EMPTY: 'Empty',
  RUNNING: 'Running',
  OCCUPIED: 'Occupied',
  BILL_PRINTED: 'Bill Printed'
};

const SectionDetail = () => {
  const [tables, setTables] = useState(Array(21).fill().map((_, index) => ({
    id: `A${index + 1}`,
    status: TableStatus.EMPTY,
    amount: 0,
    time: null
  })));

  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case TableStatus.RUNNING:
        return 'bg-pink-100 border-pink-300';
      case TableStatus.OCCUPIED:
        return 'bg-yellow-100 border-yellow-300';
      case TableStatus.BILL_PRINTED:
        return 'bg-gray-100 border-gray-300';
      default:
        return 'bg-white border-gray-300';
    }
  };

  const getTimeDisplay = (time) => {
    if (!time) return '';
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const handleTableClick = (tableId) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        const newStatus = getNextStatus(table.status);
        return {
          ...table,
          status: newStatus,
          time: newStatus === TableStatus.RUNNING ? new Date() : table.time,
          amount: newStatus === TableStatus.RUNNING ? 1010 : table.amount
        };
      }
      return table;
    }));
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case TableStatus.EMPTY:
        return TableStatus.RUNNING;
      case TableStatus.RUNNING:
        return TableStatus.OCCUPIED;
      case TableStatus.OCCUPIED:
        return TableStatus.BILL_PRINTED;
      case TableStatus.BILL_PRINTED:
        return TableStatus.EMPTY;
      default:
        return TableStatus.EMPTY;
    }
  };

  const getStats = () => {
    const stats = {
      forecast: 1010,
      empty: 0,
      running: 0,
      ordered: 0,
      billRequested: 0,
      total: tables.length,
      engaged: tables.filter(t => t.status !== TableStatus.EMPTY).length,
      available: tables.filter(t => t.status === TableStatus.EMPTY).length
    };

    tables.forEach(table => {
      switch (table.status) {
        case TableStatus.EMPTY:
          stats.empty++;
          break;
        case TableStatus.RUNNING:
          stats.running++;
          break;
        case TableStatus.OCCUPIED:
          stats.ordered++;
          break;
        case TableStatus.BILL_PRINTED:
          stats.billRequested++;
          break;
      }
    });

    return stats;
  };

  const getFilteredTables = () => {
    if (filterStatus === 'all') return tables;
    return tables.filter(table => {
      switch (filterStatus) {
        case 'empty':
          return table.status === TableStatus.EMPTY;
        case 'running':
          return table.status === TableStatus.RUNNING;
        case 'occupied':
          return table.status === TableStatus.OCCUPIED;
        case 'billPrinted':
          return table.status === TableStatus.BILL_PRINTED;
        default:
          return true;
      }
    });
  };

  const stats = getStats();
  const filteredTables = getFilteredTables();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Title and Top Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              Family Section
            </h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  filterStatus === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                All Tables
              </button>
              <button
                onClick={() => setFilterStatus('empty')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  filterStatus === 'empty'
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-green-600 border border-green-500 hover:bg-green-50'
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setFilterStatus('occupied')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  filterStatus === 'occupied'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white text-yellow-600 border border-yellow-500 hover:bg-yellow-50'
                }`}
              >
                Occupied
              </button>
              <button
                onClick={() => setFilterStatus('running')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  filterStatus === 'running'
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-pink-600 border border-pink-500 hover:bg-pink-50'
                }`}
              >
                Running
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-100 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Tables</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{stats.engaged}</div>
              <div className="text-sm text-gray-600">Engaged</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{stats.available}</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
          </div>

          {/* Status Legend */}
          <div className="flex justify-end mb-4 space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
              <span className="text-sm text-gray-600">Empty</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-pink-100 border border-pink-300 rounded"></div>
              <span className="text-sm text-gray-600">Running</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
              <span className="text-sm text-gray-600">Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
              <span className="text-sm text-gray-600">Bill Printed</span>
            </div>
          </div>

          {/* Table Grid */}
          <div className="grid grid-cols-7 gap-4 mb-6">
            {filteredTables.map((table) => (
              <div
                key={table.id}
                onClick={() => handleTableClick(table.id)}
                className={`relative p-4 border-2 rounded-lg cursor-pointer min-h-[100px] ${getStatusColor(table.status)}`}
              >
                <div className="text-lg font-semibold text-gray-700">{table.id}</div>
                {(table.status === TableStatus.RUNNING || table.status === TableStatus.OCCUPIED) && (
                  <>
                    <div className="text-sm text-gray-600">₹{table.amount}</div>
                    <div className="absolute top-2 right-2 text-xs text-gray-500">
                      {getTimeDisplay(table.time)}
                    </div>
                  </>
                )}
                <div className="absolute bottom-2 right-2 text-xs font-medium">
                  {table.status}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Filters */}
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-700">
              Forecast Sales - ₹{stats.forecast}
            </div>
            <button
              onClick={() => setFilterStatus('empty')}
              className={`px-4 py-2 rounded-md ${
                filterStatus === 'empty'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              Empty - {stats.empty}
            </button>
            <button
              onClick={() => setFilterStatus('running')}
              className={`px-4 py-2 rounded-md ${
                filterStatus === 'running'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              Running - {stats.running}
            </button>
            <button
              onClick={() => setFilterStatus('occupied')}
              className={`px-4 py-2 rounded-md ${
                filterStatus === 'occupied'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              Occupied - {stats.ordered}
            </button>
            <button
              onClick={() => setFilterStatus('billPrinted')}
              className={`px-4 py-2 rounded-md ${
                filterStatus === 'billPrinted'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-50 text-gray-700'
              }`}
            >
              Bill Requested - {stats.billRequested}
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              + Add Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;
