import { NextResponse } from "next/server"
import { db } from "../../../lib/db"
import { hash } from "bcrypt"
import * as z from "zod"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Specify the Stripe API version
});


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
    console.log("Received request with body:", body);
    const { firstname, lastname, email, password } = userSchema.parse(body)

    const existingUser = await db.user.findUnique({
      where: { email: email }
    })

    if (existingUser && !existingUser.isActive) {
      return NextResponse.json(
        { redirect: '/subscription' },
        { status: 200 })
    }

    if (existingUser && existingUser.isActive){
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 });
    }
   
    const customer = await stripe.customers.create({
      email: email,
    });

    const hashedPassword = await hash(password, 10)
    const user = await db.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        stripeCustomerId: customer.id,
        isActive: false,
      }
    })

    return NextResponse.json({
      message: "Registration successful. Please complete your subscription.",
      redirect: '/subscription' // This tells the client where to redirect
    }, { status: 201 }); // Status code 201 indicates creation was successful
    
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
