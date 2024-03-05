import { NextResponse } from "next/server"
import { db } from "../../../lib/db"
import { hash } from "bcrypt"
import * as z from "zod"

const userSchema = z.object({
  firstname: z
    .string()
    .min(1, "Firstname is required")
    .max(100),
  lastname: z
    .string()
    .min(1, "Lastname is required")
    .max(100),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
       new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
       "One special character"
     )
    .min(8, "Must be at least 8 characters in length")
})

export async function POST(req) {
  try {
    const body = await req.json()
    const { firstname, lastname, email, password } = userSchema.parse(body)

    const existingUser = await db.user.findUnique({
      where: { email: email }
    })
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exsits" },
        { status: 409 }
      )
    }

    const hashedPassword = await hash(password, 10)
    const user = await db.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword
      }
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
