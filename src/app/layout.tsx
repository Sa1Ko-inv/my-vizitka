import type { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";
import GothicBackground from "@/components/GothicBackground";

export const metadata: Metadata = {
  title: "Dmitriy (Sa1Ko-inv) | Professional Web Developer & Software Engineer",
  description: "Premium Gothic Bento Grid Portfolio (Нелистабельный сайт-визитка) showcasing fullstack development expertise in Next.js, React, NestJS, Vue, PrismaORM, and PostgreSQL.",
  keywords: ["Dmitriy", "Sa1Ko-inv", "Next.js", "React", "NestJS", "PrismaORM", "PostgreSQL", "Vue", "TypeScript", "Bento Grid", "Сайт-визитка"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <GothicBackground />
        <div className={styles.dashboardContainer}>
          <main className={styles.mainContent}>{children}</main>
        </div>
      </body>
    </html>
  );
}
