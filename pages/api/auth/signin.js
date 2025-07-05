// pages/auth/signin.js
import { getCsrfToken, signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignIn({ csrfToken }) {
  const [error, setError] = useState(null)

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Sign In</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form
        method="post"
        onSubmit={async e => {
          e.preventDefault()
          const res = await signIn('credentials', {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
          })
          if (res.error) setError(res.error)
          else window.location.href = '/'
        }}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label className="block">
          Email
          <input name="email" type="email" required className="w-full border p-2" />
        </label>
        <label className="block mt-4">
          Password
          <input name="password" type="password" required className="w-full border p-2" />
        </label>
        <button type="submit" className="mt-6 bg-blue-600 text-white px-4 py-2">
          Sign in
        </button>
      </form>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}
