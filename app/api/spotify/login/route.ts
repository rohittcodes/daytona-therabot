import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

const generateRandomString = (length: number) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

export const GET = async (req: any, res: any) => {
    const scopes = 'user-read-private user-read-email';
    const state = generateRandomString(16);

    const auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: client_id as string,
        scope: scopes,
        redirect_uri: redirect_uri as string,
        state: state
      })

      return NextResponse.redirect(new URL(`https://accounts.spotify.com/authorize?${auth_query_parameters}`).toString());
}