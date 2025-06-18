import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSyncAlt } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 text-white p-6 space-y-8">
      {/* Mode Toggle */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-4 rounded-xl">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsManualMode(true)}
            className={`px-6 py-2 rounded-full transition ${
              isManualMode 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Manual Estimation
          </button>
          <button
            onClick={() => setIsManualMode(false)}
            className={`px-6 py-2 rounded-full transition ${
              !isManualMode 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Direct Input
          </button>
        </div>
      </div>

      {/* Load Input Section */}
      {isManualMode ? (
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Load Estimation</h2>
            <button
              onClick={addNewRow}
              className="flex items-center space-x-2 bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <FaPlus /> <span>Add Load</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/20">
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
                  <tr key={load.id} className="border-t border-white/10">
                    <td className="p-3">
                      <input
                        type="text"
                        value={load.appliance}
                        onChange={(e) => updateLoad(load.id, 'appliance', e.target.value)}
                        className="bg-white/5 rounded p-2 w-full"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={load.power}
                        onChange={(e) => updateLoad(load.id, 'power', Number(e.target.value))}
                        className="bg-white/5 rounded p-2 w-24 text-center"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={load.duration}
                        onChange={(e) => updateLoad(load.id, 'duration', Number(e.target.value))}
                        className="bg-white/5 rounded p-2 w-24 text-center"
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
      ) : (
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm opacity-70 mb-1">Total Power (W)</label>
              <input
                type="number"
                value={directInput.power}
                onChange={(e) => setDirectInput({...directInput, power: Number(e.target.value)})}
                className="bg-white/5 rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm opacity-70 mb-1">Total Energy (Wh)</label>
              <input
                type="number"
                value={directInput.energy}
                onChange={(e) => setDirectInput({...directInput, energy: Number(e.target.value)})}
                className="bg-white/5 rounded p-2 w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* System Parameters */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">System Parameters</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm opacity-70 mb-1">Solar Panel</label>
            <select
              value={systemParams.solarPanel}
              onChange={(e) => setSystemParams({...systemParams, solarPanel: e.target.value})}
              className="bg-white/5 rounded p-2 w-full"
            >
              <option value="">Select Panel</option>
              {/* Add your panel options here */}
            </select>
          </div>
          <div>
            <label className="block text-sm opacity-70 mb-1">Battery Backup (hours)</label>
            <input
              type="number"
              value={systemParams.batteryBackup}
              onChange={(e) => setSystemParams({...systemParams, batteryBackup: Number(e.target.value)})}
              className="bg-white/5 rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm opacity-70 mb-1">Peak Sun Hours</label>
            <input
              type="number"
              value={systemParams.peakSunHours}
              onChange={(e) => setSystemParams({...systemParams, peakSunHours: Number(e.target.value)})}
              className="bg-white/5 rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm opacity-70 mb-1">Load on Battery (%)</label>
            <input
              type="number"
              value={systemParams.loadOnBattery}
              onChange={(e) => setSystemParams({...systemParams, loadOnBattery: Number(e.target.value)})}
              className="bg-white/5 rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm opacity-70 mb-1">Series Connection</label>
            <input
              type="number"
              value={systemParams.seriesConnection}
              onChange={(e) => setSystemParams({...systemParams, seriesConnection: Number(e.target.value)})}
              className="bg-white/5 rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm opacity-70 mb-1">System Voltage</label>
            <input
              type="number"
              value={systemParams.systemVoltage}
              onChange={(e) => setSystemParams({...systemParams, systemVoltage: Number(e.target.value)})}
              className="bg-white/5 rounded p-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* JSON Preview */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Request Payload</h2>
        <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
          {JSON.stringify(getPayload(), null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default LoadEstimation;
