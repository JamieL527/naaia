import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requestError, serverError, validate } from '../../../lib/apihandler';
import { db } from "../../../lib/db";
import { hash } from "bcrypt";

const schema = z.object({
  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
       new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
       "One special character")
    .min(8, "Must be at least 8 characters in length"),
});

let data;
let userId;

export async function PUT(req) {
  try {
    data = await validate(req, schema);

    let token = req.headers.get('Authorization');
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7);
    } else {
      throw new Error(JSON.stringify({ message: 'Invalid or missing Bearer token.' }));
    }
    const { id, tokenExpiredAt } = await db.user.findFirstOrThrow({
      where: { passwordToken: token },
    });
    userId = id;

    if (tokenExpiredAt && new Date() > tokenExpiredAt) {
      throw new Error(JSON.stringify({ message: 'Token has expired.' }));
    }
   
  } catch (error) {
    return requestError(error);
  }

  try {
    const hashedPassword = await hash(data.password, 10);
    const { id } = await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    
    return NextResponse.json({ id });
  } catch (error) {
    return serverError(error);
  }
}