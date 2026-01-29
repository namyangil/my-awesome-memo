This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### 데이터베이스 & 로그인

1. **의존성 설치**: `npm install`
2. **환경 변수**: `.env.example`을 참고해 `.env` 파일을 만들고 `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`을 설정하세요. (로컬 개발 시 `.env` 예시가 이미 있으면 그대로 사용 가능)
3. **DB 적용**: `npm run db:push` (Prisma SQLite 스키마 적용)
4. **회원가입**: `/signup`에서 계정 생성 후 `/login`에서 로그인하면 메모 페이지(`/`) 이용 가능

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
