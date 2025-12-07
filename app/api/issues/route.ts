import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { IssueSchema } from "../../ZodValidationSchemas/IssueSchema";

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