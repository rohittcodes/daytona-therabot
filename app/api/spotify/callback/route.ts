import { NextResponse } from "next/server";
import axios from 'axios';
import { cookies } from "next/headers";

export const GET = async (req: any, res: any) => {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    let access_token = "";

    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        data: {
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: "authorization_code"
        },
        headers: {
            Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        // console.log("authOptions", authOptions);
        const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
        access_token = response.data.access_token;
        
    } catch (error) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // what to do with the access token?
    // save it to the user's session, and redirect to the home page

    cookies().set("spotify_access_token", access_token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });

    return Response.redirect(new URL("/app/explore", req.url));

}
