import { useAuth } from "../AuthProvider";

let isRefreshing= false;
let refreshPromise:Promise<number>|null=null;

export default function useAuthFetch(){
    const {refresh} = useAuth();

    const authFetch = async (url:string, options?:RequestInit):Promise<Response> =>{
        let response = await fetch(url, {...options, credentials: "include"});
        
        if(response.status == 403){
            if(!isRefreshing){
                isRefreshing = true;
                refreshPromise = refresh()
            }

            const refreshStatus = await refreshPromise;

            isRefreshing=false;
            refreshPromise=null;

            if(refreshStatus==200){
                response = await fetch(url, {...options, credentials: "include"});
            }
        }
        return response;
    }

    const downloadPdf = async (reportId:number)=>{
        let response = await authFetch(`${import.meta.env.VITE_API_URL}/reports/${reportId}/pdf`);

        if(!response.ok){
            throw new Error("Failed to download")
          }
    
          const blob = await response.blob()
          const contentDisposition = response.headers.get("Content-Disposition");
          let filename= 'report.pdf'
          if(contentDisposition){
            const match = contentDisposition.match(RegExp('/filenam="?(.+?"?$/'));
            if(match && match[1]){
              filename = match[1]
            }
          }
    
          const url = window.URL.createObjectURL(blob)
          const anchor = document.createElement("a")
          anchor.href = url;
          anchor.download = filename;
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();  

    }

    return {authFetch, downloadPdf};
}