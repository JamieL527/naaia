"use client"

import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../../components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import Container from "../../../components/container";
import Link from 'next/link';
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useToast } from "../../../components/ui/use-toast"


const FormSchema = z.object({
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

const SignInForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Redirect if user is already signed in and has an active session
    if (status === "authenticated" && session?.user?.isActive) {
      router.push("/");
      router.refresh()
      toast({
        title: "Welcome back!",
        description: "Signed in sucessfully.",
      });
    } else if (status === "authenticated") {
      // Show error toast if user is not active
      toast({
        title: "Your account is not active",
        description: "Please sign up to complete your subscription",
      });
    }
  }, [status, session, router, toast]);

  const onSubmit = async (values) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
      });
    } else {
      router.push("/");
      router.refresh()
    }
  };



  return (
    <Container className="xl:w-1/4 lg:w-1/2">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-5 lg:text-2xl lg:leading-tight xl:text-2xl xl:leading-tight">Sign in to your account</h1>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
       
        <p className='text-right text-sm text-gray-600 mt-2'>
        <Link className='text-blue-500 hover:underline' href='/forgot-password'>
          Forgot password?
        </Link>
        </p>
        <Button className="w-full px-6 py-2 mt-5 text-center text-white bg-indigo-600 rounded-md" type="submit">
          Sign in
        </Button>
      </form>
      <p className='text-center text-sm text-gray-600 mt-2'>
        Do not have an account? Please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Sign up
        </Link>
      </p>
    </Form>
    </Container>
  )
}

export default SignInForm

