import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardHeader, CardTitle, CardContent, Text } from '@onesaz/ui'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export function About() {
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
              <CardTitle className="text-2xl">About Acadhub</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Text color="muted" className="leading-relaxed">
                Acadhub is an EdTech platform for schools and educational institutions — combining ERP and LMS so
                administration, academics, and communication stay in one place.
              </Text>
              <Text color="muted" className="leading-relaxed">
                We help institutes digitize admissions, fees, attendance, exams, payroll, transport, and parent
                engagement, with analytics and secure, scalable infrastructure.
              </Text>
              <Text color="muted" className="leading-relaxed">
                For demos or partnerships, contact{' '}
                <a href="mailto:support@acadhub.com" className="text-[var(--accent)] hover:underline">
                  support@acadhub.com
                </a>
                .
              </Text>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
