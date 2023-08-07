// import { WelcomeTemplate } from "@/app/components/UI/emails/WelcomeTemplate"
// import { NextResponse } from "next/server"
// import { Resend } from "resend"
// import type { NextRequest } from "next/server"

// const resend = new Resend(process.env.RESEND_API_KEY)

// export async function POST(req: NextRequest) {
//   const body = await req.json()
//   const { email, password, name, tokenToActivate } = body

//   try {
//     const data = await resend.emails.send({
//       from: "Reks <support@reks-manager.pl>",
//       to: email,
//       subject: "Aktywuj konto",
//       react: WelcomeTemplate({ firstName: name, password }),
//     })

//     return NextResponse.json(data)
//   } catch (error) {
//     return NextResponse.json({ error })
//   }
// }
