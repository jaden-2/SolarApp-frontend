import React from 'react';
import { format } from 'date-fns';
import type { reportInterface, wireDetail } from '../interfaces/interfaces';


const SolarReport: React.FC<{ data:  reportInterface}> = ({ data }) => {
    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Solar System Report #{data.reportId}
                </h1>
                {data.title!=null && <h2><b>Title:</b><i>{data.title}</i></h2>}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generated: {format(new Date(data.createdAt), 'PPpp')}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Battery Bank Section */}
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Battery Bank
                    </h2>
                    <h3 className='text-center'><b>Recommended Battery</b></h3>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300 mt-4 border-t border-gray-200 dark:border-gray-700">
                        <p><span className="font-medium">Brand:</span> {data.batteryBank.brand}</p>
                        <p><span className="font-medium">Type:</span> {data.batteryBank.batteryType}</p>
                        <p><span className="font-medium">Voltage:</span> {data.batteryBank.batteryVoltage}V</p>
                        <p><span className="font-medium">Current Capacity:</span> {data.batteryBank.batteryCurrentCapacityAh}Ah</p>
                        <p><span className="font-medium">Energy Capacity:</span> {data.batteryBank.batteryEnergyCapacityAh}kWh</p>
                        {/*  */}
                        <div className="mt-2 pt-4">
                            <p className="font-medium mb-2">Configuration:</p>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Series</p>
                                    <p className="font-semibold">{data.batteryBank.configuration.series}</p>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Parallel</p>
                                    <p className="font-semibold">{data.batteryBank.configuration.parallel}</p>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                                    <p className="font-semibold">{data.batteryBank.configuration.total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4">
                        <h4 className='text-center'><b>Minimum Battery Size</b></h4>
                        <div className="space-y-2 text-gray-700 dark:text-gray-300 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p><span className="font-medium ">Minimum Battery Capacity: </span>{Math.round(data.batteryBank.requiredBankCapacityAh)}Ah</p>
                        </div>
                        
                    </div>
                </section>

                {/* Solar Array Section */}
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                        </svg>
                        Solar Array
                    </h2>
                    <h3 className='text-center'><b>Recommended Solar Array</b></h3>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p><span className="font-medium">Brand:</span> {data.solarArray.brand}</p>
                        <p><span className="font-medium">Model:</span> {data.solarArray.model}</p>
                        <p><span className="font-medium">Power:</span> {data.solarArray.electricalProperties.power_w}W</p>
                        <p><span className="font-medium">Type:</span> {data.solarArray.electricalProperties.type}</p>
                        <div>
                            <p className="font-medium mb-2">Configuration:</p>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Series</p>
                                    <p className="font-semibold">{data.solarArray.configuration.series}</p>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Parallel</p>
                                    <p className="font-semibold">{data.solarArray.configuration.parallel}</p>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                                    <p className="font-semibold">{data.solarArray.configuration.total}</p>
                                </div>
                            </div>
                        </div>
                        <h3 className='text-center mt-4 pt-4'><b>Required Solar Array Size</b></h3>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p><span className="font-medium">Minimum Solar Array Power:</span> {data.solarArray.calculatePanelCapacity.toFixed(0)}W</p>
                        </div>
                    </div>
                </section>

                {/* Inverter Section */}
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8V7a5 5 0 0110 0v1m-7 4h6m-7 4h8" />
                        </svg>
                        Inverter
                    </h2>
                    <h3 className='text-center'><b>Recommened Inverter</b></h3>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p><span className="font-medium">Brand:</span> {data.inverter.name}</p>
                        <p><span className="font-medium">Model:</span> {data.inverter.model}</p>
                        <p><span className="font-medium">Capacity:</span> {data.inverter.capacityKva}kVA</p>
                        <p><span className="font-medium">System Voltage:</span> {data.inverter.systemVoltage}V</p>
                        <p><span className="font-medium">Type:</span> {data.inverter.type}</p>                        <div>
                            <p className="font-medium mb-2">Configuration:</p>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Series</p>
                                    <p className="font-semibold">{data.inverter.configuration.series}</p>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Parallel</p>
                                    <p className="font-semibold">{data.inverter.configuration.parallel}</p>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                                    <p className="font-semibold">{data.inverter.configuration.total}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p><span className="font-medium">Minimum Inverter Capacity:</span> {data.inverter.calculatedInverterCapacityKva}kVA</p>
                        </div>
                    </div>
                </section>

                {/* Charge Controller Section */}
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl lg:col-span-3">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h8M8 14h8m-4 4h4m-4-8h4m-4-4h4M4 6h16" />
                        </svg>
                        Charge Controller
                    </h2>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300 ">
                        <p className="font-medium mb-2 text-center">Recommended System:</p>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p><span className="font-medium">Brand:</span> {data.chargeController.brand}</p>
                            <p><span className="font-medium">Model:</span> {data.chargeController.model}</p>
                            <p><span className="font-medium">Type:</span> {data.chargeController.type}</p>
                            <p><span className="font-medium">Max Current:</span> {data.chargeController.maximumChargeCurrent}A</p>
                            <p><span className="font-medium">Voltage Range:</span> {data.chargeController.minimumVolts}V - {data.chargeController.maximumVolts}V</p>
                        </div>                     
                        
                    </div>
                    <div>
                            <p className="font-medium mb-2">Configuration:</p>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Series</p>
                                    <p className="font-semibold">{data.chargeController.configuration.series}</p>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Parallel</p>
                                    <p className="font-semibold">{data.chargeController.configuration.parallel}</p>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                                    <p className="font-semibold">{data.chargeController.configuration.total}</p>
                                </div>
                            </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p><span className="font-medium">Minimum Controller Capacity:</span> {data.chargeController.calculatedCapacity}A</p>
                        </div>
                </section>

                {/* Wire Details Section with special styling for multiple items */}
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl lg:col-span-3">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Wire Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.wireDetails.map((wire: wireDetail, index: number) => (
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
                 <div className="grid  md:grid-cols-2 lg:grid-cols-3 space-x-4">
                <button
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform lg:col-span-3"
                >
                  Download Report
                </button>
              </div>
            </div>
        </div>
    );
};

export default SolarReport;