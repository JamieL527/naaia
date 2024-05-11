import { serverError, validate } from '../../../lib/apihandler'
import {  NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../../../lib/token';
import { dateOffset } from '../../../lib/date';
import { compileResetTemplate, sendMail } from '../../../lib/mail'


export async function POST(req) {
  const schema = z.object({
    to: z.string().min(1, 'Email is required').email('Invalid email'),
  });
  const data = await validate(req, schema);
  const prisma = new PrismaClient(); 
  const passwordToken = generateToken();
  const tokenExpiredAt = dateOffset(30, 'minute');

  try {
    await prisma.user.update({
      where: { email: data.to },
      data: {
        passwordToken,
        tokenExpiredAt,
      },
    })
  } catch (error) {
    return serverError(error)
  } finally {
    await prisma.$disconnect()
  }

  try {
      const { firstname } = await prisma.user.findFirstOrThrow({ where: { email: data.to } });
      const userName = firstname || '';
      const message = await sendMail({
      to: data.to,
      name: 'email',
      subject: 'Password Reset(valid for 30 minutes)',
      body: compileResetTemplate(`${userName}`, `${process.env.NEXT_PUBLIC_WEBSITE_URL}/reset-password?token=${passwordToken}`),
    })
    return NextResponse.json({ message })
    } catch (error) {
      return NextResponse.json({ message: err.message })
    }

  
}
 
  

