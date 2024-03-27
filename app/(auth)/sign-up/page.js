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
import { useRouter } from 'next/navigation';
import { useToast } from "../../../components/ui/use-toast"

const FormSchema = z
  .object({
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
         "One special character" )
      .min(8, "Must be at least 8 characters in length"),
      confirmPassword: z.string().min(1, "Password confirmation is required")
   })
  .refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match"
  })

const SignUpForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (values) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password
        })
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error("Oops! Something went wrong.");
      }
  
      if (responseData.message === "User with this email already exists") {
        toast({
          title: "Error",
          description: responseData.message,
        });
      } else if (response.ok && responseData.redirect) {
        router.push("/subscription");
        localStorage.setItem('userEmail', values.email);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };


  return (
    <Container className="xl:w-1/4 lg:w-1/2">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <h1 className="text-2xl text-center font-bold text-gray-800 mb-5 lg:text-2xl lg:leading-tight xl:text-2xl xl:leading-tight">Become a member</h1>
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full px-6 py-2 mt-5 text-center text-white bg-indigo-600 rounded-md" type="submit">
          Sign up
        </Button>
      </form>
      <p className='text-center text-sm text-gray-600 mt-2'>
        Already have an account? Please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-in'>
          Sign in
        </Link>
      </p>
    </Form>
    </Container>
  )

}


export default SignUpForm
