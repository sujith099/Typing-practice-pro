import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the TypeScript Typing Practice Application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">2. Description of Service</h2>
            <p>
              The TypeScript Typing Practice Application provides typing practice exercises, coding practice, performance tracking, and related services to help users improve their typing speed and accuracy.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">3. User Accounts</h2>
            <p>
              To access certain features of the application, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">4. User Content</h2>
            <p>
              You retain ownership of any content you submit to the application. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display the content in connection with the application.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">5. Prohibited Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the application for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to any part of the application</li>
              <li>Interfere with the proper functioning of the application</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Use the application to distribute malware or other harmful code</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">6. Intellectual Property</h2>
            <p>
              The application, including all content, features, and functionality, is owned by us and is protected by copyright, trademark, and other intellectual property laws.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">7. Disclaimer of Warranties</h2>
            <p>
              The application is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the application will be error-free or uninterrupted.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the application.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting the updated terms on the application. Your continued use of the application after such changes constitutes your acceptance of the new terms.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">10. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}