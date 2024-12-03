import { Merriweather } from 'next/font/google'

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
})

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${merriweather.variable} font-serif`}>
      {children}
    </div>
  )
}

