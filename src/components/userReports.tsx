import React, { useEffect, useState } from 'react';
import { FaFileAlt, FaChevronRight } from 'react-icons/fa';
import type { reportInterface } from '../interfaces/interfaces';
import EditReport from '../components/EditReport';
import useAuthFetch from '../CustomHook/UseAuthFetch';
import { useAuth } from '../AuthProvider';




const UserReports: React.FC = () => {
  const [reports, setReports] = useState<reportInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<reportInterface>();
  const {authFetch} = useAuthFetch();
  const baseUrl = import.meta.env.VITE_API_URL;
  const {isAuthenticated} = useAuth()

  const fetchReports = async (): Promise<reportInterface[]> => {
      if(!isAuthenticated) return [];
      const res = await authFetch(`${baseUrl}/reports`, {
        credentials: "include",
      });
      const data:reportInterface[] = await res.json();
      return data;
  };

  const setEditReport = (reportId: number)=>{
    const report = reports.find(r=> r.reportId ===reportId)
      if(report) setSelectedReport({...report})
      
  }
  
  useEffect(() => {
     if (isAuthenticated) {
      fetchReports().then((data) => {
        setReports(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      
      <div className="max-w-2xl mx-auto pt-32 px-4 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-center">My Solar Reports</h1>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-6">
          {!isAuthenticated ? (
            <div className="text-center py-8 text-yellow-700 dark:text-yellow-200 bg-yellow-100 dark:bg-yellow-900/30 rounded">
              Please log in to view your reports.
            </div>
          ) : loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : reports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No reports found.</div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {reports.map((report) => (
                <li key={report.reportId}>
                  <button
                    onClick={()=>setEditReport(report.reportId)}
                    className="w-full flex items-center justify-between px-4 py-4 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded transition"
                  >
                    <span className="flex items-center gap-3">
                      <FaFileAlt className="text-indigo-600 dark:text-indigo-400" />
                      <span className="font-medium">
                        {report.title==null?(
                          <p>Report #{report.reportId}</p>
                        ): (<p>{report.title}</p>)
                        }
                        <span className="block text-xs text-gray-500 dark:text-gray-400">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </span>
                      </span>
                    </span>
                    <FaChevronRight />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {selectedReport!=null && <EditReport data={selectedReport}  key={selectedReport.reportId} update={setSelectedReport}/>}
    </div>
  );
};

export default UserReports;