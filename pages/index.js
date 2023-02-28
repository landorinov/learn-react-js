import { isToken } from '../lib/auth'
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()

  if (isToken()) {
    typeof window !== 'undefined' && router.push("/social")
  }else{
    typeof window !== 'undefined' && router.push("/login")
  }

  // return (
  //   <>
  //   <p>p</p>
  //   </>
  // )
}
