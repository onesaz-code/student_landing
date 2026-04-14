import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardHeader, CardTitle, CardContent, Text, Caption } from '@onesaz/ui'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export function PrivacyPolicy() {
  const navigate = useNavigate()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative z-10 min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-8"
            startIcon={<ArrowLeft className="h-4 w-4" />}
            onClick={() => navigate('/')}
          >
            Back to home
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Text color="muted" className="leading-relaxed">
                This policy describes how Acadhub collects, uses, and protects information when you use our services.
                We use bank-grade encryption, maintain backups, and follow applicable data protection practices.
              </Text>
              <Text color="muted" className="leading-relaxed">
                For questions about your data or this policy, email{' '}
                <a href="mailto:support@acadhub.com" className="text-[var(--accent)] hover:underline">
                  support@acadhub.com
                </a>
                .
              </Text>
              <Caption color="muted">Last updated: April 2026.</Caption>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
