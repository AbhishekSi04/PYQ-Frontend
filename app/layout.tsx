import "./globals.css";
import Sidebar from "../components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "JEE Main PYQs",
  description: "Chapter-wise Collection of PYQs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col md:flex-row min-h-screen min-h-0">
            <div className="z-10 sticky top-0 md:h-screen md:w-84 w-full top-0">
              <Sidebar />
            </div>
            <main className="flex-1 overflow-y-auto h-[100dvh]  w-full md:h-screen ">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}