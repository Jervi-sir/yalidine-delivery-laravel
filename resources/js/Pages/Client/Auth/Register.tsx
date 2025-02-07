import { FormEventHandler, useState } from "react";
import { Head, useForm } from '@inertiajs/react';
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { AuthLayout } from "./AuthLayout";
import InputError from "@/Components/InputError";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
      e.preventDefault();

      post(route('client.fetchRegister'), {
          onFinish: () => reset('password', 'password_confirmation'),
      });
  };

  return (
    <AuthLayout>
      <Head title="Register" />
      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">
          {status}
        </div>
      )}

      <form onSubmit={submit}>
        <div className="flex flex-col gap-6">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="email">Name</Label>
            <Input
              id="name"
              type="name"
              name="name"
              value={data.name}
              placeholder="name"
              autoComplete="username"
              onChange={(e) => setData('name', e.target.value)}
              required
            />
            <InputError message={errors.name} className="mt-2" />
          </div>
          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={data.email}
              placeholder="email"
              autoComplete="username"
              onChange={(e) => setData('email', e.target.value)}
              required
            />
            <InputError message={errors.email} className="mt-2" />
          </div>
          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={data.password}
              placeholder="password"
              autoComplete="current-password"
              onChange={(e) => setData('password', e.target.value)}
              required
              showPasswordToggle
            />
            <InputError message={errors.password} className="mt-2" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm Password</Label>
            <Input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              placeholder="password"
              autoComplete="new-password"
              onChange={(e) => setData('password_confirmation', e.target.value)}
              required
              showPasswordToggle
            />
            <InputError message={errors.password_confirmation} className="mt-2" />
          </div>
          
          <Button type="submit" className="w-full" disabled={processing}>
          Register
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};


