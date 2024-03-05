'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/use-toast';

const FormSchema = z
  .object({
    password: z
      .string()
      .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
      .regex(new RegExp('.*\\d.*'), 'One number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'One special character',
      )
      .min(8, 'Must be at least 8 characters in length'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

export default function ResetPassword() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const { toast } = useToast();
  const forceRedirect = useSearchParams().size == 0;
  const token = useSearchParams().get('token');

  useEffect(() => {
    if (forceRedirect) {
      router.push('/sign-in');
    }
  }, [forceRedirect, router]);

  if (forceRedirect) return <></>;

  const onSubmit = async (values) => {
    const response = await fetch('/api/reset-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push('/sign-in');
      toast({
        title: 'Password Reset successfully',
        description: 'Please sign in to your account.',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Oops! Something went wrong.',
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <h1 className="w-1/4 p-8 mx-auto xl:px-0 text-2xl text-center font-bold text-gray-800">Reset Password</h1>
          <p className="px-8 mx-auto mb-5 xl:px-0 text-center text-base">Enter your new password</p>
          <div className="w-1/4 px-8 mx-auto xl:px-0 space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
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
                    <Input placeholder="Re-Enter your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4 px-8 mx-auto xl:px-0 ">
            <Button className="w-full px-6 py-2 mt-5 text-center text-white bg-indigo-600 rounded-md" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
