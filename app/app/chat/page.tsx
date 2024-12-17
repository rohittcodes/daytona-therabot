import { NotebookPen } from "lucide-react";

const TheraBot = () => {
    return ( 
        <div className="w-full h-full px-4 py-2 rounded-md flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold">TheraBot</span>
            <span className="text-lg font-light text-center mt-2">Welcome to TheraBot! Create a chat <NotebookPen size={24} className="inline-block" /> to get started.</span>
        </div>
     );
}
 
export default TheraBot;