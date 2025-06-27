import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { type ModifiedPayLoad, type reportInterface, type ResourceMap, type wireDetail } from '../interfaces/interfaces';
import { useAuth } from '../AuthProvider';


const fetchResources = async(url: string)=>{
    try{
        let response = await fetch(url)

        if(response.status == 200){
            return await response.json()
        }
    }catch(err){
        console.error(err)
    }
}

const handlePatch = async (url: string, body: string, token: string|null) =>{
  try{
    let response = await fetch(url, {
      body: body,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if(response.status == 200)
      return await response.json()
  }catch(err){
    console.error(err)
  }
}

const EditReport: React.FC<{data: reportInterface}> = ({data}) => {

  // Local state for editing
  const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
  const [report, setReport] = useState<reportInterface>(data);
 
  // Handlers
  const handleEdit = (section: string) => setEditing({ ...editing, [section]: true });
  const handleCancel = (section: string) => setEditing({ ...editing, [section]: false });

  const handleChange = (item: string,  value: number) => {
    setPayload((prev=>({...prev, [item]: value})))

  };


  const handleSave = async (patch: string, section: string) => {
    setEditing({ ...editing, [section]: false });
    const key = patch as keyof ModifiedPayLoad;
    let requestBody = JSON.stringify({
      id: payLoad[key]
    }
    )
    let url = `${import.meta.env.VITE_API_URL}/${report.reportId}/${key}`
    let updateReport:reportInterface = await handlePatch(url, requestBody, token);
    setReport(updateReport)
  };

  //-----------my space-----------------
  const [resources, setResources] = useState<Partial<ResourceMap>>({})
  const [selectedBatteryC, setSelectedBatteryC] = useState<string>()
  const [payLoad, setPayload] = useState<Partial<ModifiedPayLoad>>({});
  const {token} = useAuth()

  useEffect(()=>{
      let baseUrl = import.meta.env.VITE_API_URL
      let items: (keyof ResourceMap)[] = ["panels", "inverters", "batteries", "controllers"]
      items.forEach((item)=>{
          let url = `${baseUrl}/resources/${item}`
          fetchResources(url).then((val)=>{
              setResources((prev=> ({...prev, [item]: val})))
          })
      })
  }, [])
    
 
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
       <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Title: {data.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
            Generated: {format(new Date(data.createdAt), 'PPpp')}
        </p>
        <h2 className='text-left'><b>ReportId: </b>#{data.reportId}</h2>
        
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
                  onClick={() => handleSave('battery', 'batteryBank')}
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
                  onChange={(e)=>setSelectedBatteryC(e.target.value)}
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                <option hidden>Battery Types</option>
                 <option value="LITHIUM">Lithium</option>
                 <option value="AGM">Dry Cell</option>
                 <option value="FLOODED">Tubular</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Battery</label>
                <select
                  onChange={e => handleChange('battery', parseInt(e.target.value))}
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="" hidden>Batteries</option>
                  {
                    resources.batteries?.filter((b)=>b.type==selectedBatteryC).map((battery)=>{
                      return <option value={battery.id} key={battery.id}>
                        {battery.brand} - {battery.energyCapacity}Kwh
                      </option>
                    })
                  }
                </select>
              </div>
              {/* Add more editable fields as needed */}
            </div>
          ) : (
                    <section>
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
                  onClick={() => handleSave('array', "solarArray")}
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
                value={report.solarArray.brand}
                onChange={e => handleChange('array', parseInt(e.target.value))}
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {
                resources.panels?.map((panel) => (
                  <option key={panel.id} value={panel.id}>
                    {panel.brand} - ({panel.power}W)
                  </option>
                ))}
              </select>
              {/* Add more editable fields as needed */}
            </div>
          ) : (
            <section>   
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
                        <h3 className='text-center mt-4 pt-4'><b>Minimum Solar Array Size</b></h3>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p><span className="font-medium">Minimum Solar Array Power:</span> {data.solarArray.calculatePanelCapacity.toFixed(0)}W</p>
                        </div>
                    </div>
                </section>
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
                  onClick={() => handleSave('inverter', "inverter")}
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
                value={report.inverter.name}
                onChange={e => handleChange('inverter', parseInt(e.target.value))}
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {resources.inverters?.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    {inv.name} - ({inv.capacity}kVA)
                  </option>
                ))}
              </select>
              {/* Add more editable fields as needed */}
            </div>
          ) : (
             <section>
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
                        
                        <h3 className='text-center mt-4 pt-4'><b>Minimum Inverter Capacity</b></h3>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p><span className="font-medium">Minimum Inverter Capacity:</span> {data.inverter.calculatedInverterCapacityKva}kVA</p>
                        </div>
                    </div>
                </section>
          )}
        </section>

        {/* Charge Controller Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl lg:col-span-1 relative">
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
                  onClick={() => handleSave('controller', "chargeController")}
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
                value={report.chargeController.brand}
                onChange={e => handleChange('controller', parseInt(e.target.value))}
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {resources.controllers?.map((cc) => (
                  <option key={cc.id} value={cc.id}>
                    {cc.brand} - {cc.type} - {cc.maxChargeCurrent} Amps
                  </option>
                ))}
              </select>
              {/* Add more editable fields as needed */}
            </div>
          ) : (
          <section>
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
              <h3 className='text-center mt-4 pt-4'><b>Minimum Charge Controller Capacity</b></h3>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p><span className="font-medium">Minimum Controller Capacity:</span> {data.chargeController.calculatedCapacity}A</p>
                  </div>
              </section>
          )}
        </section>

        {/* DC Breaker Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8V7a5 5 0 0110 0v1m-7 4h6m-7 4h8" />
                </svg>
                DC Breaker
            </h2>
            <h3 className='text-center'><b>Recommened DC Breaker</b></h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p><span className="font-medium">Model:</span> {data.dcBreaker.model}</p>
                <p><span className="font-medium">Capacity:</span> {data.dcBreaker.current}A</p>
                <p><span className="font-medium">Maximum Voltage:</span> {data.dcBreaker.maximumVoltage}V</p>
                <p><span className="font-medium">Type:</span> {data.dcBreaker.type}</p>                        <div>
                </div>
                <h3 className='text-center mt-4 pt-4'><b>Minimum Dc Breaker Capacity</b></h3>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p><span className="font-medium">Minimum DC Breaker Capacity:</span> {data.dcBreaker.calculatedCapacity}A</p>
                </div>
            </div>
        </section>

        {/* Wire Details Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Wire Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {report.wireDetails.map((wire: wireDetail, index: number) => (
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