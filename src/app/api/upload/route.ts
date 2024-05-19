import { NextRequest } from 'next/server'

import { S3Client, ListObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3'

const Bucket = process.env.S3_BUCKET
const s3 = new S3Client({
    endpoint: `https://${process.env.DIGITAL_OCEAN_ENDPOINT}`,
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
})

export async function GET() {
    const response = await s3.send(new ListObjectsCommand({ Bucket }))
    return Response.json(response?.Contents ?? [])
}

export async function POST(request: NextRequest) {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
        return Response.json({ error: 'File required', status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const params = {
        Bucket,
        Key: `${file.name}-${Date.now()}`,
        Body: buffer,
        ContentType: file.type,
    }

    const command = new PutObjectCommand(params)
    const result = await s3.send(command)

    return Response.json(result)
}