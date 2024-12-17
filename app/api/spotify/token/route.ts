import { cookies } from "next/headers"

export const GET = async (req: any, res: any) => {
    // GET THE TOKEN FROM THE COOKIE
    const token = cookies().get("spotify_access_token");

    if (!token) {
        return new Response("Unauthorized", { status: 401 });
    }

    return new Response(JSON.stringify({ token }), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}