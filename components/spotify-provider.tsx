"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { fetchSpotifyPlaylists, fetchSpotifyProfile } from "@/actions/spotify";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const SpotifyProvider = () => {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState<any>({});
  const [playlists, setPlaylists] = useState<any[]>([]);

    //   fetch the token from the server
    useEffect(() => {
        fetch("/api/spotify/token")
            .then((res) => res.json())
            .then((data) => {
                setToken(data.token.value);
            });
    }, []);
    
    useEffect(() => {
        // fetch the user's profile with server action
        const fetchProfile = async () => {
            const data = await fetchSpotifyProfile(token);

            setProfile(data);
        }

        if (token) {
            fetchProfile();
        }
    }, [token]);

    const profileImage = (profile && profile.images?.[0].url);

    useEffect(() => {
        // fetch the user's playlists with server action
        const fetchPlaylists = async () => {
            const data = await fetchSpotifyPlaylists(token);
            setPlaylists(data);
        }

        if (token) {
            fetchPlaylists();
        }
    }, [token]);

  return (
    <>
        {(token === "") ? (
            <div className="flex items-center justify-center h-full">
                <Link href="/api/spotify/login">
                    <Button>Connect Spotify</Button>
                </Link>
            </div>
        ) : (
            <div className="flex flex-col items-center">
                {
                    profile ? (
                        <div className="flex flex-col w-full items-start space-y-4">
                            <div className="flex items-center justify-center">
                                <Image
                                    src={profileImage}
                                    alt="Spotify Profile Image"
                                    width={46}
                                    height={46}
                                    className="rounded-full"
                                />
                                <div className="flex flex-col ml-4">
                                    <span>{profile.display_name}</span>
                                    <span>{profile.email}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
                                {
                                    playlists.map((playlist) => (
                                        <Card key={playlist.id} className="w-full">
                                            <CardHeader>
                                                <CardTitle>{playlist.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex items-center justify-center">
                                                <CardDescription className="flex flex-col items-center space-y-2">
                                                    <Image src={playlist.images[0].url} alt={playlist.name} width={240} height={240} />
                                                    {/* show ellipsis if description is too long */}
                                                    <span className="h-6 overflow-hidden overflow-ellipsis">
                                                        {playlist.description}
                                                    </span>
                                                </CardDescription>
                                            </CardContent>
                                            <CardFooter className="flex items-center justify-between">
                                                <span>{playlist.tracks.total} tracks</span>
                                                <Link href={playlist.external_urls.spotify}>
                                                    <Button variant="ghost">Open</Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))
                                }
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )   
                }
            </div>
        )}
    </>
  );
};