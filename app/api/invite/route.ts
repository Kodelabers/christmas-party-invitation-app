import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendInviteEmail } from '@/lib/sendInviteEmail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const firstName = String(body?.first_name ?? '').trim();
    const lastName = String(body?.last_name ?? '').trim();

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const insertResult = await supabaseAdmin
      .from('responses')
      .insert({
        email,
        first_name: firstName,
        last_name: lastName,
        response: 'No response',
      })
      .select('id')
      .single();

    if (insertResult.error) {
      if (insertResult.error.code === '23505') {
        return NextResponse.json(
          { message: 'This email address is already invited.' },
          { status: 409 }
        );
      }

      console.error('[invite] insert error', insertResult.error);
      return NextResponse.json(
        { message: 'Unable to save the guest. Please try again.' },
        { status: 500 }
      );
    }

    const inviteId = insertResult.data?.id;
    if (typeof inviteId === 'string') {
      try {
        await sendInviteEmail({
          email,
          firstName,
          lastName,
          inviteId,
        });
      } catch (err) {
        console.error('[invite] send email error', err);
      }
    }

    return NextResponse.json({ success: true, id: inviteId });
  } catch (error) {
    console.error('[invite] unexpected error', error);
    return NextResponse.json(
      { message: 'Unexpected error. Please try again.' },
      { status: 500 }
    );
  }
}

