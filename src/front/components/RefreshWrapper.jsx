// import React, { useEffect, useState } from "react"
// import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
// import ReactPullToRefresh from "react-pull-to-refresh";


// export const RefreshWrapper = ({vote_average}) => {

//     const [refresh, setRefresh] = useState<number>(0);

//     useEffect(() => {
//         if(refresh > 0){
//             console.log("Refresh Triggered", refresh);            
//         }
//     }, [refresh]);

//     const handleRefresh = async (): Promise<void> => {
//         await new Promise((resolve) => setTimeout(resolve, 300));
//         setRefresh((n) => n + 1);
//     };

//     const backendUrl = import.meta.env.VITE_BACKEND_URL as string | undefined;

//     if (!backendUrl || backendUrl === "") {
//         return (
//         <React.StrictMode>
//             <BackendURL />
//         </React.StrictMode>
//         );
//     }
            

//     return (
//         <div className="text-center ">
//             <ReactPullToRefresh onRefresh={handleRefresh} style={{ height: "100vh", overflow: "auto" }}>
//                 <Main key={refresh} />
//             </ReactPullToRefresh>
//         </div>        
//     );
// };