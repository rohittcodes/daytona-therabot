"use server";

export const fetchSpotifyProfile = async (token: string) => {
    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
}

export const fetchSpotifyPlaylists = async (token: string) => {
    
    const playlistsToFetch = [
        "37i9dQZF1DWZqd5JICZI0u",
        "37i9dQZF1DWXe9gFZP0gtP",
        "37i9dQZF1DX9uKNf5jGX6m",
        "37i9dQZF1DXdzGIPNRTvyN",
        "37i9dQZF1DXebxttQCq0zA",
        "37i9dQZF1DXaPleDxjpDoo",
        "37i9dQZF1DX4Oe8zprVH3z",
    ]

    const playlists = playlistsToFetch.map(async (playlistId) => {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.json();
    });
    
    // return array by resolving all promises
    
    const resolvedPlaylists = await Promise.all(playlists);

    // console.log("resolvedPlaylists", resolvedPlaylists);

    return resolvedPlaylists;
}