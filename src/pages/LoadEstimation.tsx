import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTrash, FaSun, FaMoon, FaUser } from 'react-icons/fa';
import { useDarkMode } from '../components/darkmode';
import Navbar from './navbar';

interface LoadItem {
  id: string;
  appliance: string;
  power: number;
  duration: number;
  energy: number;
}

interface SystemParams {
  solarPanel: string;
  batteryBackup: number;
  peakSunHours: number;
  loadOnBattery: number;
  seriesConnection: number;
  systemVoltage: number;
}

const LoadEstimation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'list'>('new');
  const [isManualMode, setIsManualMode] = useState(true);
  const [directInput, setDirectInput] = useState({ power: 0, energy: 0 });
  const [loads, setLoads] = useState<LoadItem[]>([]);
  const [systemParams, setSystemParams] = useState<SystemParams>({
    solarPanel: '',
    batteryBackup: 0,
    peakSunHours: 0,
    loadOnBattery: 0,
    seriesConnection: 0,
    systemVoltage: 0
  });
  const [reports, setReports] = useState<any[]>([]); // Add proper type

  const addNewRow = () => {
    const newRow: LoadItem = {
      id: Date.now().toString(),
      appliance: '',
      power: 0,
      duration: 0,
      energy: 0
    };
    setLoads([...loads, newRow]);
  };

  const updateLoad = (id: string, field: keyof LoadItem, value: string | number) => {
    setLoads(loads.map(load => {
      if (load.id === id) {
        const updatedLoad = { ...load, [field]: value };
        if (field === 'power' || field === 'duration') {
          updatedLoad.energy = updatedLoad.power * updatedLoad.duration;
        }
        return updatedLoad;
      }
      return load;
    }));
  };

  const deleteRow = (id: string) => {
    setLoads(loads.filter(load => load.id !== id));
  };

  const getPayload = () => {
    return {
      mode: isManualMode ? 'manual' : 'direct',
      loads: isManualMode ? loads : directInput,
      systemParams
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <main className="pt-24 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'new' ? (
            <div className="space-y-8">
              {/* Mode Toggle */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-xl shadow-lg">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsManualMode(true)}
                    className={`px-6 py-2 rounded-full transition ${
                      isManualMode 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Manual Estimation
                  </button>
                  <button
                    onClick={() => setIsManualMode(false)}
                    className={`px-6 py-2 rounded-full transition ${
                      !isManualMode 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Direct Input
                  </button>
                </div>
              </div>

              {/* Load Input Section */}
              {isManualMode ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Load Table */}
                  <div className="lg:col-span-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
                    <div className="p-4 flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Load Estimation</h2>
                      <button
                        onClick={addNewRow}
                        className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-lg hover:scale-105 transition-transform text-white"
                      >
                        <FaPlus /> <span>Add Load</span>
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-100/50 dark:bg-gray-700/50">
                          <tr>
                            <th className="p-3 text-left">Appliance</th>
                            <th className="p-3">Power (W)</th>
                            <th className="p-3">Duration (h)</th>
                            <th className="p-3">Energy (Wh)</th>
                            <th className="p-3">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loads.map((load) => (
                            <tr key={load.id} className="border-t border-gray-200 dark:border-gray-700">
                              <td className="p-3">
                                <input
                                  type="text"
                                  value={load.appliance}
                                  onChange={(e) => updateLoad(load.id, 'appliance', e.target.value)}
                                  className="bg-white/50 dark:bg-gray-700/50 rounded p-2 w-full"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  value={load.power}
                                  onChange={(e) => updateLoad(load.id, 'power', Number(e.target.value))}
                                  className="bg-white/50 dark:bg-gray-700/50 rounded p-2 w-24 text-center"
                                  step="any"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  value={load.duration}
                                  onChange={(e) => updateLoad(load.id, 'duration', Number(e.target.value))}
                                  className="bg-white/50 dark:bg-gray-700/50 rounded p-2 w-24 text-center"
                                  step="any"
                                />
                              </td>
                              <td className="p-3 text-center">{load.energy}</td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => deleteRow(load.id)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                // Direct Input Form with grid layout
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm mb-1">Total Power (W)</label>
                    <input
                      type="number"
                      value={directInput.power}
                      onChange={(e) => setDirectInput({...directInput, power: Number(e.target.value)})}
                      className="bg-white/50 dark:bg-gray-700/50 w-full rounded p-2 text-center"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Total Energy (Wh)</label>
                    <input
                      type="number"
                      value={directInput.energy}
                      onChange={(e) => setDirectInput({...directInput, energy: Number(e.target.value)})}
                      className="bg-white/50 dark:bg-gray-700/50 w-full rounded p-2 text-center"
                        
                    />
                  </div>
                </div>
              )}

              
                  {/* System Parameters with grid layout */}
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Basic Parameters</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1">Solar Panel</label>
                        <select
                          value={systemParams.solarPanel}
                          onChange={(e) => setSystemParams({...systemParams, solarPanel: e.target.value})}
                          className="bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white"
                        >
                          <option value="" className="text-gray-900 dark:text-white">Select Panel</option>
                          {/* Add panel options */}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm mb-1">System Voltage</label>
                        <select
                          value={systemParams.systemVoltage}
                          onChange={(e) => setSystemParams({...systemParams, systemVoltage: Number(e.target.value)})}
                          className="bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white"
                        >
                          <option value="12" className="text-gray-900 dark:text-white">12V</option>
                          <option value="24" className="text-gray-900 dark:text-white">24V</option>
                          <option value="36" className="text-gray-900 dark:text-white">36V</option>
                          <option value="48" className="text-gray-900 dark:text-white">48V</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm mb-1">Battery Backup (hours)</label>
                        <input
                          type="number"
                          value={systemParams.batteryBackup}
                          onChange={(e) => setSystemParams({...systemParams, batteryBackup: Number(e.target.value)})}
                          className="bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white"
                          step="any"
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-1">Peak Sun Hours</label>
                        <input
                          type="number"
                          value={systemParams.peakSunHours}
                          onChange={(e) => setSystemParams({...systemParams, peakSunHours: Number(e.target.value)})}
                          className="bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white"
                          step="any"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Parameters */}
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Additional Parameters</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1">Load on Battery (%)</label>
                        <input
                          type="number"
                          value={systemParams.loadOnBattery}
                          onChange={(e) => setSystemParams({...systemParams, loadOnBattery: Number(e.target.value)})}
                          className="bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white"
                          step="any"
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-1">Series Connection</label>
                        <input
                          type="number"
                          value={systemParams.seriesConnection}
                          onChange={(e) => setSystemParams({...systemParams, seriesConnection: Number(e.target.value)})}
                          className="bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white"
                          step="any"
                        />
                      </div>
                    </div>
                  </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {/* Generate report logic */}}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform w-full"
                >
                  Generate Report
                </button>
              </div>
            </div>
          ) : (
            // Reports List View
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">My Reports</h2>
              {/* Add your reports list here */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoadEstimation;