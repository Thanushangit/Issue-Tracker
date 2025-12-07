import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import {prisma} from "@/lib/prisma";

const IssueSchema = z.object({
    title: z.string().min(1,"Title is required").max(100,"Title cannot exceed 100 characters"),
    description: z.string().min(1,"Description is required").max(1000,"Description cannot exceed 1000 characters"),
})

export async function POST(request:NextRequest) {
const body = await request.json();
const parsedBody = IssueSchema.safeParse(body);

if(!parsedBody.success){
   return NextResponse.json({error: parsedBody.error.issues[0].message}, {status: 400});
}

const newIssue = await prisma.issue.create({
    data:{
        title:body.title,
        description:body.description,
    }
})

return NextResponse.json(newIssue,{status:200});
}