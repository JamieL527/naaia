'use client'
import React, { useState } from 'react'
import { ForgotPasswordSent } from '../../../components/forgotpasswordsent'
import { ForgotPasswordEdit } from '../../../components/forgotpasswordedit'

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false)
  return isSent ? (
    <ForgotPasswordSent />
  ) : (
    <ForgotPasswordEdit onCompletion={() => setIsSent(true)} />
  )
}