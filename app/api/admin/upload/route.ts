import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import path from 'path'
import fs from 'fs/promises'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Ensure the upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true })

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 })
    }

    // File type validation
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { message: `Invalid file type. Allowed types are ${ALLOWED_MIME_TYPES.join(', ')}.` },
        { status: 400 }
      )
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: `File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB.` },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${file.name}`
    const filePath = path.join(UPLOAD_DIR, filename)

    await fs.writeFile(filePath, buffer)

    // Return the public URL
    const publicUrl = `/uploads/${filename}`
    return NextResponse.json({ url: publicUrl }, { status: 201 })

  } catch (error: any) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
