import Link from 'next/link';

export default function EmailPreviewsPage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Email Template Previews</h1>
      <div className="grid gap-4">
        <Link
          href="/admin/email-previews/verification"
          className="rounded-lg border p-4 transition hover:bg-gray-100"
        >
          Verification Email
        </Link>
        <Link
          href="/admin/email-previews/reset-password"
          className="rounded-lg border p-4 transition hover:bg-gray-100"
        >
          Reset Password Email
        </Link>
        <Link
          href="/admin/email-previews/change-email"
          className="rounded-lg border p-4 transition hover:bg-gray-100"
        >
          Change Email Verification
        </Link>
      </div>
    </div>
  );
}
