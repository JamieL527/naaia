import React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from './ui/form';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from 'next/link';
import { useToast } from "./ui/use-toast"

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});

export function ForgotPasswordEdit({ onCompletion }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });
  const { toast } = useToast()
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email'),
    };
    fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: data.email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`data: ${JSON.stringify(data)}`);
        onCompletion();
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        toast({
          title: "Error",
          description: "Opps! Something went wrong.",
        });
      });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit} className='w-full'>
          <h1 className="w-1/4 p-8 mx-auto xl:px-0 text-2xl text-center font-bold text-gray-800">Forgot Password</h1>
          <p className="px-8 mx-auto mb-5 xl:px-0 text-center text-base">Enter your email and we'll send you a link to reset your password.</p>
          <div className='w-1/4 px-8 mx-auto xl:px-0'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='mail@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4 px-8 mx-auto xl:px-0 ">
            <Button className="w-full px-6 py-2 mt-5 text-center text-white bg-indigo-600 rounded-md" type='submit'>
              Submit
            </Button>
          </div>
        </form>
       
        <p className='text-center text-sm text-gray-600 mt-2'>
          <Link className='text-blue-500 hover:underline' href='/sign-in'>
            Back to Sign in
          </Link>
        </p>
        
      </Form>
    </div>
  );
};
