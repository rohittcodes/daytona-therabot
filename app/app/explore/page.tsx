"use client";

import { SpotifyProvider } from "@/components/spotify-provider";

const ExplorePage = () => {

    return (
        <div className="flex w-full overflow-y-auto p-2">
            <SpotifyProvider />
        </div>
     );
}
 
export default ExplorePage;