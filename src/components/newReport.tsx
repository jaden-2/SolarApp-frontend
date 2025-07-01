import { useEffect, useState } from "react";
import type { batteryCategories, Payload, reportInterface, solarPanel, SystemParams } from "../interfaces/interfaces";
import LoadingScreen from "./Loader";
import { FaPlus, FaTrash } from "react-icons/fa";

import useAuthFetch from "../CustomHook/UseAuthFetch";
import SolarReport from "./Report";
import { useAuth } from "../AuthProvider";

interface LoadItem {
  id: string;
  appliance: string;
  power: number;
  duration: number;
  energy: number;
}

//const SolarReport: React.FC<{ data:  reportInterface}> = ({ data }) => {
const NewReport: React.FC= ()=>{

  const [isManualMode, setIsManualMode] = useState(false);
  const [directInput, setDirectInput] = useState({ power: 0, energy: 0 });
  const [loads, setLoads] = useState<LoadItem[]>([]);
  const [isLoading, setLoading] = useState(false)
  const baseApiUrl = import.meta.env.VITE_API_URL;
  const [panels, setPanels] = useState<solarPanel[]>([{brand:"", type:"", power: 0}]);
  const [isError, setIsError] = useState(false)
  const {authFetch} = useAuthFetch();
  const {isAuthenticated} = useAuth()
  const [report, setReport] = useState<reportInterface|null>(null);
  const [title, setTitle] = useState<string>("");
  const [autonomy, setAutonomy] = useState<number>(0);
  const [psh, setPsh] = useState<number>(0);
  const [bLoad, setBload] = useState<number>(100);
  const [series, setSeries] = useState<number> (2);
  const [systemParams, setSystemParams] = useState<SystemParams>({
    preferredPanel: {brand: "", type:"", power: 0},
    daysOfBackup: 0,
    psh: 0,
    loadOnBattery: 100,
    arraySeriesLength: 2,
    systemVolt: 0,
    batteryType: "",
    title: title
  });
  // Add this variable at the top of your component (inside NewReport)
const disabledInputStyle = !isAuthenticated ? "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800" : "";
  //-------------------end----------------------
  
  useEffect(()=>{
    const fetchPanels = async ()=>{
      if(!isAuthenticated) return;
      try{
        let response = await fetch(`${baseApiUrl}/resources/panels`)

        if(response.status == 200){
          let panels:[] = await response.json();        
          setPanels(panels.map(({brand, type, power})=>({brand, type, power})))
        }else{
          console.error("An error occured communicating with resource")
        }
      }catch(err){
      console.error("fetch failed", err)
    }
    }
    fetchPanels()
  }, []);
  
  
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
    let power:number = 0;
    let energy:number = 0;

    power = directInput.power;
    energy = directInput.energy

    if(isManualMode){
      loads.forEach((load)=>{
        power += load.power;
        energy += load.energy;
      })
    }
    
      const payload: Payload = {
      energy_wh: energy,
      load_w: power,
      daysOfBackup: autonomy/24,
      psh: psh,
      systemVolt: systemParams.systemVolt,
      preferredPanel: systemParams.preferredPanel,
      loadOnBattery: bLoad/100,
      arraySeriesLength: series,
      batteryType: systemParams.batteryType,
      title: title
    }
    
    return payload;
  };

  const isRequestValid = (request:Payload)=>{
      let isNumericValid = (request.energy_wh > 0 && request.load_w>0 && 
      request.daysOfBackup > 0 && request.psh > 0 && request.loadOnBattery > 0 && request.arraySeriesLength >0)
      let isCategoryValid = (request.batteryType!="" && request.preferredPanel.brand!="" && request.preferredPanel.power>0 && request.title.length > 0)
      return isNumericValid && isCategoryValid
  }

  // remove error message
  useEffect(()=>{
    setTimeout(()=>setIsError(false), 7000)
  }, [isError])

  const generateReport = async ()=>{

    let payload = getPayload()
    if (!isRequestValid(payload)) {
      setIsError(true)
      return
    };

    setLoading(true)    
      try{
      const response = await authFetch(`${baseApiUrl}/reports/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      )
      
      if(response.status == 200){
        setReport(await response.json())
        setLoading(false)
      }else if(response.status == 401){
        setLoading(false)
        console.log("Unauthorized access after retrying")   
      }else{
        setLoading(false)
      }
    }catch(err){
      setLoading(false)
    }
  }
 

  return (
  <main className="pt-24 px-4 pb-12">
    {isLoading && <LoadingScreen message="Generating Report"/>}
    {!isAuthenticated && (
      <div className="max-w-2xl mx-auto mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded shadow text-center">
        Please log in to use the solar estimation features.
      </div>
    )}
    <div className="max-w-7xl mx-auto">
      <div className="space-y-8">
        
        {/* Mode Toggle */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-xl shadow-lg">
          <div className="flex justify-around space-x-4">
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
                  className={"flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-lg hover:scale-105 transition-transform text-white"+disabledInputStyle}
                disabled={!isAuthenticated}
                >
                  <FaPlus /> <span>Add Load</span>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={"bg-gray-100/50 dark:bg-gray-700/50"+disabledInputStyle}>
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
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Energy Profile</h2>
            <div className='grid grid-cols-2 lg:grid-cols-2 gap-8 '>
              <div>
              <label className="block text-sm mb-1">Total Power (W)</label>
              <input
                type="number"
                value={directInput.power}
                //bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white
                onChange={(e) => setDirectInput({...directInput, power: Number(e.target.value)})}
                className={"bg-white/50 dark:bg-gray-700/50 w-full rounded p-2 text-gray-900 dark:text-white"+disabledInputStyle}
                disabled={!isAuthenticated}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Total Daily Energy Required (Wh)</label>
              <input
                type="number"
                value={directInput.energy}
                onChange={(e) => setDirectInput({...directInput, energy: Number(e.target.value)})}
                className={"bg-white/50 dark:bg-gray-700/50 w-full rounded p-2 "+disabledInputStyle}
                disabled={!isAuthenticated}
              />
            </div>
            </div>
            
          </div>
        )}
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <label className="block text-sm mb-1">Title:</label>
          <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className={"bg-white/50 dark:bg-gray-700/50 rounded p-2 w-full"} disabled={!isAuthenticated}/>
        </div>
        
          {/* System Parameters with grid layout */}
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Basic Parameters</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Solar Panel</label>
                <select
                  onChange={(e) => setSystemParams({...systemParams, preferredPanel: panels[parseInt(e.target.value)]})}
                  className={"bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white"+disabledInputStyle}
                  disabled={!isAuthenticated}
                >
                  <option value="" className="text-gray-900 dark:text-white" hidden>Select Panel</option>
                  {
                    panels.map(({brand, type, power}, index)=> <option value={index} className='text-gray-900 dark:text-white' key={index}>{`${brand} ${type}CRYSTALLINE: ${power}W`}</option>)
                  }
                </select>
              </div>
              
              <div>
                <label className="block text-sm mb-1">System Voltage</label>
                <select
                  value={systemParams.systemVolt}
                  onChange={(e) => setSystemParams({...systemParams, systemVolt: Number(parseInt(e.target.value))})}
                  className={"bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white"+disabledInputStyle}
                  disabled={!isAuthenticated}
                >
                  <option value="" className="text-gray-900 dark:text-white" hidden>Select System Voltage</option>
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
                  value={autonomy}
                  onChange={(e) => setAutonomy(parseInt(e.target.value))}
                  className={"bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white" + disabledInputStyle}
                  disabled={!isAuthenticated}
                />
              </div>
              <div>
                  <label className="block text-sm mb-1">Battery Type</label>
                  <select
                    value={systemParams.batteryType}
                    
                    onChange={(e) => setSystemParams({...systemParams, batteryType: e.target.value as batteryCategories})}
                    className={"bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white"+disabledInputStyle}
                  disabled={!isAuthenticated}
                  >
                    <option value="" className="text-gray-900 dark:text-white"  hidden>Select Battery</option>
                    <option value="LITHIUM" className="text-gray-900 dark:text-white">Lithium Ion</option>
                    <option value="AGM" className="text-gray-900 dark:text-white">Dry Cell</option>
                    <option value="FLOODED" className="text-gray-900 dark:text-white">Tubular</option>
                  </select>
                </div>

                <div className='col-span-2'>
                  <label className="block text-sm mb-1">Peak Sun Hours</label>
                  <input
                    type="number"
                    value={psh}
                    onChange={(e) => setPsh(parseFloat(e.target.value))}
                    className={"bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white"+disabledInputStyle}
                    step="any"
                    disabled={!isAuthenticated}
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
                  value={bLoad}
                  onChange={(e) => setBload(parseInt(e.target.value))}
                  className={"bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white"+disabledInputStyle}
                  required
                  disabled={!isAuthenticated}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Series Connection</label>
                <input
                  type="number"
                  value={series}
                  onChange={(e) => setSeries(parseInt(e.target.value))}
                  className={`bg-white dark:bg-gray-700 rounded p-2 w-full text-gray-900 dark:text-white ${disabledInputStyle}`}
                  required
                  disabled={!isAuthenticated}
                />
                
              </div>
              {isError && <p className='text-red-500 block text-center col-span-2'>Fill all fields</p>}
            </div>
          </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={generateReport}
          className={`px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform w-full ${disabledInputStyle}` }
          disabled={!isAuthenticated}
        >
          Generate Report
        </button>
      </div>
      {report!=null&& <SolarReport data={report}/>}
    </div>
</div>       
</main>   
  );
};

export default NewReport;