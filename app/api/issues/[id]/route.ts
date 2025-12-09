import AuthOptions from "@/app/auth/AuthOptions";
import { PatchIssueSchema } from "@/app/ZodValidationSchemas/IssueSchema";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


//update issue
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(AuthOptions);
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status:401});
    }
const body = await request.json();
const { id } = await params;

const isValidator= PatchIssueSchema.safeParse(body);

if(!isValidator.success)
    return NextResponse.json({error: isValidator.error.issues[0].message}, {status:400}); 

// Convert empty string to null for assignToUserId
const assignToUserId = body.assignToUserId === "" ? null : body.assignToUserId;

if(assignToUserId){
    const userExists = await prisma.user.findUnique({
        where:{
            id: assignToUserId
        }
    });

    if(!userExists)
        return NextResponse.json({error: "User not found"}, {status:404});
}

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
        assignToUserId
    }
})

return NextResponse.json(updatedIssue,{status:200})
}


//delete issue
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
     const session = await getServerSession(AuthOptions);
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status:401});
    }
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