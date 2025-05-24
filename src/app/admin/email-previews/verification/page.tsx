'use client';

import { useEffect, useState } from 'react';
import VerificationEmailTemplate from '~/email-templates/verification-email';
import { Preview, render } from '@react-email/components';
import Link from 'next/link';

export default function VerificationEmailPreviewPage() {
  const [otp, setOtp] = useState('12345');
  const [html, setHtml] = useState('');

  useEffect(() => {
    render(
      <VerificationEmailTemplate otp={otp} />
    ).then((html) => {
      setHtml(html);
    });
  }, [otp]);


  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/admin/email-previews"
          className="text-blue-500 hover:underline"
        >
          ← Back to Email Previews
        </Link>
      </div>

      <h1 className="mb-4 text-2xl font-bold">Verification Email Preview</h1>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">
          OTP:
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="ml-2 rounded border p-2 text-black"
            maxLength={5}
          />
        </label>
      </div>

      <iframe
        className="solid h-300 max-h-full w-250 rounded-lg bg-white"
        srcDoc={html}
      />
    </div>
  );
}
