// File: src/app/api/pages/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pathName = searchParams.get('pathName');

  if (!pathName) {
    return NextResponse.json({ success: false, message: 'PathName is required' }, { status: 400 });
  }

  try {
    const existingPage = await db.select().from(users).where(eq(users.pathName, pathName)).limit(1);
    
    if (existingPage.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Existing page found',
        data: existingPage[0]
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Page not found'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json({ success: false, message: 'An error occurred while processing your request' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { pathName } = body;

  if (!pathName) {
    return NextResponse.json({ success: false, message: 'PathName is required' }, { status: 400 });
  }

  try {
    // Check if pathName already exists
    const existingPage = await db.select().from(users).where(eq(users.pathName, pathName)).limit(1);
    
    if (existingPage.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Redirecting to existing page',
      }, { status: 201 });
    }

    // If it doesn't exist, insert a new page
    await db.insert(users).values({
      pathName: pathName,
      editorSavedState: '',
    });

    return NextResponse.json({
      success: true,
      message: 'New page created',
      data: { pathName: pathName, editorSavedState: '' }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json({ success: false, message: 'An error occurred while processing your request' }, { status: 500 });
  }
}


export async function PUT(request: NextRequest) {
    const body = await request.json();
    const { pathName, editorSavedState, read } = body;
  
    if (!pathName) {
      return NextResponse.json({ success: false, message: 'PathName is required' }, { status: 400 });
    }
  
    try {
      const existingPage = await db.select().from(users).where(eq(users.pathName, pathName)).limit(1);
      
      if (existingPage.length > 0) {
        const updateData: Partial<typeof users.$inferSelect> = {};
        
        if (editorSavedState !== undefined) {
          updateData.editorSavedState = editorSavedState;
        }
        
        if (read !== undefined) {
          updateData.read = read;
        }
  
        await db.update(users)
                .set(updateData)
                .where(eq(users.pathName, pathName));
        
        return NextResponse.json({ success: true, message: 'Page updated' });
      } else {
        return NextResponse.json({ success: false, message: 'Page not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error updating page:', error);
      return NextResponse.json({ success: false, message: 'An error occurred while processing your request' }, { status: 500 });
    }
  }