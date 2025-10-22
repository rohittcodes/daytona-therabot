"use server";

export const fetchSpotifyProfile = async (token: string) => {
    if (!token) {
        throw new Error("No token provided");
    }

    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.error?.message || `Failed to fetch profile: ${response.status}`);
    }

    return response.json();
}

export const fetchSpotifyPlaylists = async (token: string) => {
    if (!token) {
        throw new Error("No token provided");
    }
    
    const playlistsToFetch = [
        "3ksy3Zso4vdt4JIzTYvpF9",
        "6gCC8kozvUlLGTzl2YO2MR"
    ];

    try {
        const playlists = await Promise.all(
            playlistsToFetch.map(async (playlistId) => {
                try {
                    const response = await fetch(
                        `https://api.spotify.com/v1/playlists/${playlistId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (!response.ok) {
                        const error = await response.json().catch(() => null);
                        console.error(
                            error?.error?.message ||
                            `Failed to fetch playlist ${playlistId}: ${response.status}`
                        );
                        return null;
                    }
        
                    return response.json();
                } catch (error) {
                    console.error(`Error fetching playlist ${playlistId}:`, error);
                    return null;
                }
            })
        );
        
        return playlists.filter(playlist => playlist !== null);
    } catch (error) {
        console.error("Error fetching playlists:", error);
        throw error;
    }
}