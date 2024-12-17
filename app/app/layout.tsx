import Sidebar from "./_components/sidebar";

const AppLayout = (
    { children } : { children: React.ReactNode }
) => {
    return ( 
        <div className="flex w-full h-full px-4 py-4 gap-2">
            <Sidebar />
            <div className="flex flex-col w-full h-full py-4 px-2 border-border border-[1px] rounded-md drop-shadow-sm shadow-border">
                {children}
            </div>
        </div>
     );
}
 
export default AppLayout;