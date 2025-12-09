import AuthOptions from "@/app/auth/AuthOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const session = await getServerSession(AuthOptions);
    if(!session){
        return new Response(JSON.stringify({error: "Unauthorized"}), {status:401});
    }

    const users = await prisma.user.findMany({orderBy:{name: "asc"}});
    return NextResponse.json(users, {status:200});
}