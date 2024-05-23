import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'RecruAi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="cursor-default select-none overflow-x-hidden bg-white">
			<body className={inter.className}>{children}</body>
		</html>
	)
}
