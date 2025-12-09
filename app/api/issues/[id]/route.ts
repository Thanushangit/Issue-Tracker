import { IssueSchema } from "@/app/ZodValidationSchemas/IssueSchema";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


//update issue
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
const body = await request.json();
const { id } = await params;

const isValidator= IssueSchema.safeParse(body);

if(!isValidator.success)
    return NextResponse.json({error: isValidator.error.issues[0].message}, {status:400}); 

const isExisit = await prisma.issue.findUnique({
    where:{
        id:id
    }
});

if(!isExisit)
    return NextResponse.json({error: "Issue not found"}, {status:404});

const updatedIssue = await prisma.issue.update({
    where:{
        id:id
    },
    data:{
        title: body.title,
        description: body.description,
    }
})

return NextResponse.json(updatedIssue,{status:200})
}


//delete issue
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isExisit = await prisma.issue.findUnique({
        where:{
            id:id
        }
    })
    if(!isExisit)
        return NextResponse.json({error: "Issue not found"}, {status:404});
    await prisma.issue.delete({
        where:{
            id:id
        }
    });
    return NextResponse.json({message: "Issue deleted successfully"}, {status:200});
}