import React, { useState} from 'react';
import Navbar from './navbar';
import UserReport from '../components/userReports';
import NewReport from '../components/newReport';
import LoadingScreen from '../components/Loader';


const LoadEstimation: React.FC = () => {
  //------------States--------------------------
  const [activeTab, setActiveTab] = useState<'new' | 'list'>('new');
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {loading && <LoadingScreen message='Logging Out'/>}
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        setLoading={setLoading}
      />
          {activeTab=="new"? (<NewReport/>) : (
            <UserReport/>
          )}
       
      
    </div>
  );
};

export default LoadEstimation;