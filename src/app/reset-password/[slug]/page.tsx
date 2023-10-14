import { UserResetPasswordForm } from "./components/user-reset-password-form"

export default function ResetPasswordPage({ params }: { params: { slug: string } }) {
  const token = params.slug

  return (
    <div className="flex container h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <UserResetPasswordForm token={token} />
      </div>
    </div>
  )
}
