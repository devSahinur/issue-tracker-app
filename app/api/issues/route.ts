import { NextRequest } from "next/server";
import { z } from 'zod'
import prisma from "@/prisma/client";

const createIssuesSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
})

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createIssuesSchema.safeParse(body)
    if (!validation.success) {
        return new Response(JSON.stringify({ error: validation.error }), {
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