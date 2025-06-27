import React, { useState} from 'react';
import Navbar from './navbar';
import UserReport from '../components/userReports';
import NewReport from '../components/newReport';


const LoadEstimation: React.FC = () => {
  //------------States--------------------------
  const [activeTab, setActiveTab] = useState<'new' | 'list'>('new');
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
          {activeTab=="new"? (<NewReport/>) : (
            <UserReport/>
          )}
       
      
    </div>
  );
};

export default LoadEstimation;