// 'use client'

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import Link from "next/link"

// export function LoginPageComponent() {
//   const [showTwoFactor, setShowTwoFactor] = useState(false)

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Simulating 2FA requirement
//     setShowTwoFactor(true)
//     // Implement actual login logic here
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <svg
//             className=" h-12 w-12 mx-auto text-gray-900"
//             fill="none"
//             height="24"
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//             width="24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M12 5v14" />
//             <path d="M5 12h14" />
//           </svg>
//           <h2 className="mt-2 text-2xl font-bold text-gray-900">Distributed Compute System</h2>
//         </div>
//         <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//           <div className="mb-4">
//             <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//               Username
//             </Label>
//             <Input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="username"
//               type="text"
//               placeholder="Username"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </Label>
//             <Input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               placeholder="******************"
//               required
//             />
//           </div>
//           {showTwoFactor && (
//             <div className="mb-6">
//               <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="twoFactor">
//                 Two-Factor Authentication Code
//               </Label>
//               <Input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="twoFactor"
//                 type="text"
//                 placeholder="Enter 2FA code"
//                 required
//               />
//             </div>
//           )}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center">
//               <Checkbox id="remember" />
//               <label className="ml-2 text-sm text-gray-600" htmlFor="remember">
//                 Remember me
//               </label>
//             </div>
//             <Link className="text-sm text-blue-500 hover:text-blue-800" href="/forgot-password">
//               Forgot Password?
//             </Link>
//           </div>
//           <div className="flex items-center justify-between">
//             <Button className="w-full" type="submit">
//               Login
//             </Button>
//           </div>
//         </form>
//         <div className="text-center text-sm text-gray-500">
//           <Link className="text-blue-500 hover:text-blue-800 mr-4" href="/privacy-policy">
//             Privacy Policy
//           </Link>
//           <Link className="text-blue-500 hover:text-blue-800 mr-4" href="/terms-of-service">
//             Terms of Service
//           </Link>
//           <Link className="text-blue-500 hover:text-blue-800" href="/support">
//             Support
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState } from "react";
import { useRouter } from "next/navigation"; // This is for Next.js 13 App Router
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function LoginPageComponent() {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulating 2FA requirement or successful login
    if (!showTwoFactor) {
      setShowTwoFactor(true);
    } else {
      // Simulate successful login
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-md mt-8">
        <div className="text-center mb-8">
          <svg
            className=" h-12 w-12 mx-auto text-gray-900"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Distributed Compute System</h2>
        </div>
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-6">
            <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              required
            />
          </div>
          {showTwoFactor && (
            <div className="mb-6">
              <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="twoFactor">
                Two-Factor Authentication Code
              </Label>
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="twoFactor"
                type="text"
                placeholder="Enter 2FA code"
                required
              />
            </div>
          )}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Checkbox id="remember" />
              <label className="ml-2 text-sm text-gray-600" htmlFor="remember">
                Remember me
              </label>
            </div>
            <Link className="text-sm text-blue-500 hover:text-blue-800" href="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <Button className="w-full" type="submit">
              Login
            </Button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-500">
          <Link className="text-blue-500 hover:text-blue-800 mr-4" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="text-blue-500 hover:text-blue-800 mr-4" href="/terms-of-service">
            Terms of Service
          </Link>
          <Link className="text-blue-500 hover:text-blue-800" href="/support">
            Support
          </Link>
        </div>
      </div>
    </div>
  );
}
