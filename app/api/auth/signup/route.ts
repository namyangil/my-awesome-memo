import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const signupSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해 주세요.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
  name: z.string().max(50).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      const msg = parsed.error.errors[0]?.message ?? '입력값을 확인해 주세요.'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const { email, password, name } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일이에요.' },
        { status: 409 }
      )
    }

    const hashed = await hash(password, 12)
    await prisma.user.create({
      data: { email, password: hashed, name: name || null },
    })

    return NextResponse.json({ message: '회원가입이 완료되었어요.' })
  } catch (e) {
    console.error('Signup error:', e)
    return NextResponse.json(
      { error: '회원가입 처리 중 오류가 발생했어요.' },
      { status: 500 }
    )
  }
}
