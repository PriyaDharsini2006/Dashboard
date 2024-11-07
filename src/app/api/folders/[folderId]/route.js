import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
  try {
    const folderId = parseInt(params.folderId);
    
    await prisma.folder.delete({
      where: { id: folderId }
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error deleting folder:', error);
    return NextResponse.json(
      { error: 'Error deleting folder' },
      { status: 500 }
    );
  }
}