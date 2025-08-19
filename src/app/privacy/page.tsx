import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p>
              We collect the following types of information when you use the TypeScript Typing Practice Application:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</li>
              <li><strong>Usage Data:</strong> We collect information about how you use the application, including typing speed, accuracy, completed lessons, and practice time.</li>
              <li><strong>Device Information:</strong> We collect information about the device you use to access the application, including browser type, operating system, and device identifiers.</li>
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar technologies to track activity on our application and hold certain information.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
            <p>
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, maintain, and improve the application</li>
              <li>To personalize your experience and deliver content relevant to your interests</li>
              <li>To track your progress and provide performance statistics</li>
              <li>To communicate with you about updates, new features, and support</li>
              <li>To detect, prevent, and address technical issues and security breaches</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">3. Data Storage and Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">4. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information to third parties. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With service providers who perform services on our behalf</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with a business transfer, such as a merger or acquisition</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">5. Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access and receive a copy of your personal information</li>
              <li>The right to correct or update your personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to restrict or object to processing of your personal information</li>
              <li>The right to data portability</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">6. Children's Privacy</h2>
            <p>
              The application is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">7. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">8. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p className="font-medium">privacy@typingpractice.example.com</p>
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