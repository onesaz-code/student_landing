import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Text,
  H3,
} from '@onesaz/ui'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import type { MdmDocSection } from '../data/mdmSiteContent'

type ContentDocPageProps = {
  title: string
  sections: MdmDocSection[]
}

const EMAIL_SEGMENT = /\b[\w.%+-]+@[\w.-]+\.[a-z]{2,}\b/gi

function textWithBoldEmails(text: string, keyPrefix: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  EMAIL_SEGMENT.lastIndex = 0
  let match: RegExpExecArray | null
  let n = 0
  while ((match = EMAIL_SEGMENT.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(
      <strong key={`${keyPrefix}-e${n++}`} className="font-semibold text-foreground">
        {match[0]}
      </strong>,
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  return parts.length ? parts : text
}

export function ContentDocPage({ title, sections }: ContentDocPageProps) {
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
              <CardTitle className="text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {sections.map((section, i) => (
                <section key={i} className="space-y-4">
                  {section.title ? <H3 className="text-lg">{section.title}</H3> : null}
                  {(section.paragraphs ?? []).map((p, j) => (
                    <Text key={j} color="muted" className="leading-relaxed whitespace-pre-wrap">
                      {textWithBoldEmails(p, `p-${i}-${j}`)}
                    </Text>
                  ))}
                  {section.bullets?.length ? (
                    section.ordered ? (
                      <ol className="list-decimal pl-6 space-y-2 text-muted-foreground text-sm leading-relaxed">
                        {section.bullets.map((item, k) => (
                          <li key={k}>{textWithBoldEmails(item, `o-${i}-${k}`)}</li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-sm leading-relaxed">
                        {section.bullets.map((item, k) => (
                          <li key={k}>{textWithBoldEmails(item, `u-${i}-${k}`)}</li>
                        ))}
                      </ul>
                    )
                  ) : null}
                </section>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
