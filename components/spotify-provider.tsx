"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { fetchSpotifyPlaylists, fetchSpotifyProfile } from "@/actions/spotify";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const SpotifyProvider = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);

  // Fetch token on mount
  useEffect(() => {
    const getToken = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/spotify/token");
        const data = await response.json();
        
        if (!data.token?.value) {
          throw new Error("No token received");
        }
        
        setToken(data.token.value);
      } catch (err) {
        setError("Failed to fetch token");
        console.error("Token fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getToken();
  }, []);

  // Fetch profile and playlists when token is available
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        setIsLoading(true);
        
        // Fetch both profile and playlists concurrently
        const [profileData, playlistsData] = await Promise.all([
          fetchSpotifyProfile(token),
          fetchSpotifyPlaylists(token)
        ]);

        if (!profileData) {
          throw new Error("Failed to fetch profile");
        }

        if (!playlistsData) {
          throw new Error("Failed to fetch playlists");
        }

        setProfile(profileData);
        setPlaylists(playlistsData);
      } catch (err) {
        setError("Failed to fetch Spotify data");
        console.error("Data fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
        <Link href="/api/spotify/login">
          <Button className="ml-4">Reconnect Spotify</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center h-full">
        <Link href="/api/spotify/login">
          <Button>Connect Spotify</Button>
        </Link>
      </div>
    );
  }

  const profileImage = profile?.images?.[0]?.url;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full items-start space-y-4">
        <div className="flex items-center justify-center">
          {profileImage && (
            <Image
              src={profileImage}
              alt="Spotify Profile Image"
              width={46}
              height={46}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col ml-4">
            <span>{profile?.display_name}</span>
            <span>{profile?.email}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="w-full">
              <CardHeader>
                <CardTitle>{playlist.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <CardDescription className="flex flex-col items-center space-y-2">
                  {playlist.images[0]?.url && (
                    <Image 
                      src={playlist.images[0].url} 
                      alt={playlist.name} 
                      width={240} 
                      height={240} 
                    />
                  )}
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
          ))}
        </div>
      </div>
    </div>
  );
};