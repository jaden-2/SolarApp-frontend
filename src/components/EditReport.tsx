import React, { useState } from 'react';
import { format } from 'date-fns';
import type { reportInterface, wireDetail } from '../interfaces/interfaces';

// Example option data (replace with your API data)
const batteryOptions: Object = {
  LITHIUM: [
    { brand: 'Teze', voltage: 48, capacity: 300, id: 1 },
    { brand: 'PowerSafe', voltage: 24, capacity: 200, id: 2 },
  ],
  LEAD_ACID: [
    { brand: 'Exide', voltage: 12, capacity: 150, id: 3 },
    { brand: 'Amaron', voltage: 12, capacity: 180, id: 4 },
  ],
};
const solarArrayOptions = [
  { brand: 'Canadian Solar', model: 'CS6R-400MS', power: 400, id: 1 },
  { brand: 'JA Solar', model: 'JAM60S20', power: 370, id: 2 },
];
const inverterOptions = [
  { name: 'Sukam', model: 'Fusion', capacityKva: 5, systemVoltage: 48, type: 'Pure Sine', id: 1 },
  { name: 'Luminous', model: 'EcoVolt', capacityKva: 3.5, systemVoltage: 24, type: 'PWM', id: 2 },
];
const chargeControllerOptions = [
  { brand: 'Outback', model: 'FM80', type: 'MPPT', maxCurrent: 80, minVolts: 12, maxVolts: 60, id: 1 },
  { brand: 'Victron', model: 'BlueSolar', type: 'PWM', maxCurrent: 50, minVolts: 12, maxVolts: 48, id: 2 },
];



const EditReport: React.FC<{data: reportInterface}> = ({data}) => {
  // Local state for editing
  const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
  const [form, setForm] = useState<any>(data);

  // Handlers
  const handleEdit = (section: string) => setEditing({ ...editing, [section]: true });
  const handleCancel = (section: string) => setEditing({ ...editing, [section]: false });
  const handleChange = (section: string, field: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };
  const handleSelectBatteryType = (type: string) => {
    setForm((prev: any) => ({
      ...prev,
      batteryBank: { ...prev.batteryBank, batteryType: type },
    }));
  };
  const handleSave = async (section: string) => {
    setEditing({ ...editing, [section]: false });
   // await onPatch({ [section]: form[section] });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Edit Solar System Report #{form.reportId}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Generated: {format(new Date(form.createdAt), 'PPpp')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Battery Bank Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Battery Bank
            </h2>
            {!editing.batteryBank ? (
              <button
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                onClick={() => handleEdit('batteryBank')}
              >
                Edit
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => handleSave('batteryBank')}
                >
                  Save
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleCancel('batteryBank')}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {editing.batteryBank ? (
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Battery Type</label>
                <select
                  value={form.batteryBank.batteryType}
                  onChange={e => handleSelectBatteryType(e.target.value)}
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {Object.keys(batteryOptions).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Battery</label>
                <select
                  value={form.batteryBank.brand}
                  onChange={e => handleChange('batteryBank', 'brand', e.target.value)}
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {/* {batteryOptions[form.batteryBank.batteryType]?.map((batt) => (
                    <option key={batt.id} value={batt.brand}>
                      {batt.brand} - {batt.voltage}V {batt.capacity}Ah
                    </option>
                  ))} */}
                </select>
              </div>
              {/* Add more editable fields as needed */}
            </div>
          ) : (
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><span className="font-medium">Brand:</span> {form.batteryBank.brand}</p>
              <p><span className="font-medium">Type:</span> {form.batteryBank.batteryType}</p>
              <p><span className="font-medium">Voltage:</span> {form.batteryBank.batteryVoltage}V</p>
              <p><span className="font-medium">Current Capacity:</span> {form.batteryBank.batteryCurrentCapacityAh}Ah</p>
              <p><span className="font-medium">Energy Capacity:</span> {form.batteryBank.batteryEnergyCapacityAh}kWh</p>
            </div>
          )}
        </section>

        {/* Solar Array Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              </svg>
              Solar Array
            </h2>
            {!editing.solarArray ? (
              <button
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                onClick={() => handleEdit('solarArray')}
              >
                Edit
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => handleSave('solarArray')}
                >
                  Save
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleCancel('solarArray')}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {editing.solarArray ? (
            <div className="space-y-4">
              <label className="block mb-1 font-medium">Solar Array</label>
              <select
                value={form.solarArray.brand}
                onChange={e => handleChange('solarArray', 'brand', e.target.value)}
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {solarArrayOptions.map((panel) => (
                  <option key={panel.id} value={panel.brand}>
                    {panel.brand} - {panel.model} ({panel.power}W)
                  </option>
                ))}
              </select>
              {/* Add more editable fields as needed */}
            </div>
          ) : (
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><span className="font-medium">Brand:</span> {form.solarArray.brand}</p>
              <p><span className="font-medium">Model:</span> {form.solarArray.model}</p>
              <p><span className="font-medium">Power:</span> {form.solarArray.electricalProperties?.power_w}W</p>
            </div>
          )}
        </section>

        {/* Inverter Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8V7a5 5 0 0110 0v1m-7 4h6m-7 4h8" />
              </svg>
              Inverter
            </h2>
            {!editing.inverter ? (
              <button
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                onClick={() => handleEdit('inverter')}
              >
                Edit
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => handleSave('inverter')}
                >
                  Save
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleCancel('inverter')}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {editing.inverter ? (
            <div className="space-y-4">
              <label className="block mb-1 font-medium">Inverter</label>
              <select
                value={form.inverter.name}
                onChange={e => handleChange('inverter', 'name', e.target.value)}
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {inverterOptions.map((inv) => (
                  <option key={inv.id} value={inv.name}>
                    {inv.name} - {inv.model} ({inv.capacityKva}kVA)
                  </option>
                ))}
              </select>
              {/* Add more editable fields as needed */}
            </div>
          ) : (
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><span className="font-medium">Brand:</span> {form.inverter.name}</p>
              <p><span className="font-medium">Model:</span> {form.inverter.model}</p>
              <p><span className="font-medium">Capacity:</span> {form.inverter.capacityKva}kVA</p>
            </div>
          )}
        </section>

        {/* Charge Controller Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl lg:col-span-3 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h8M8 14h8m-4 4h4m-4-8h4m-4-4h4M4 6h16" />
              </svg>
              Charge Controller
            </h2>
            {!editing.chargeController ? (
              <button
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                onClick={() => handleEdit('chargeController')}
              >
                Edit
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => handleSave('chargeController')}
                >
                  Save
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleCancel('chargeController')}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {editing.chargeController ? (
            <div className="space-y-4">
              <label className="block mb-1 font-medium">Charge Controller</label>
              <select
                value={form.chargeController.brand}
                onChange={e => handleChange('chargeController', 'brand', e.target.value)}
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {chargeControllerOptions.map((cc) => (
                  <option key={cc.id} value={cc.brand}>
                    {cc.brand} - {cc.model} ({cc.type})
                  </option>
                ))}
              </select>
              {/* Add more editable fields as needed */}
            </div>
          ) : (
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><span className="font-medium">Brand:</span> {form.chargeController.brand}</p>
              <p><span className="font-medium">Model:</span> {form.chargeController.model}</p>
              <p><span className="font-medium">Type:</span> {form.chargeController.type}</p>
              <p><span className="font-medium">Max Current:</span> {form.chargeController.maximumChargeCurrent}A</p>
            </div>
          )}
        </section>

        {/* Wire Details Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Wire Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {form.wireDetails.map((wire: wireDetail, index: number) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">{wire.type} Wire</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Max Length:</span> {wire.maximumAllowedWireLength_m.toFixed(2)}m</p>
                  <p><span className="font-medium">Power Loss:</span> {(wire.powerLoss * 100).toFixed(2)}%</p>
                  <p><span className="font-medium">SWG:</span> {wire.wireSpecification.SWG}</p>
                  <p><span className="font-medium">Diameter:</span> {wire.wireSpecification.diameter_mm}mm</p>
                  <p className="mt-2 text-indigo-600 dark:text-indigo-400 italic">{wire.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditReport;