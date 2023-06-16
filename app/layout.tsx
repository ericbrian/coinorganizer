import Provider from "./context-component/Provider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
import appconfig from "../appconfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: appconfig.siteName,
  description: appconfig.siteDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full scroll-smooth antialiased`}
    >
      <body className="flex h-full flex-col">
        <Provider>
          <Header />
          <main className="m-4 rounded-md p-4">
            <div className="grow">{children}</div>
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
