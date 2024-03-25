import { NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { createIssuesSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createIssuesSchema.safeParse(body)
    if (!validation.success) {
        return new Response(JSON.stringify({ error: validation.error.format()}), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
   const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return new Response(JSON.stringify(newIssue), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
    

}

export async function GET(request: NextRequest) {
    const issues = await prisma.issue.findMany()
    return new Response(JSON.stringify({ issues }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}