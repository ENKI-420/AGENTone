"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type AuthContextType = {
  user: User | null
  supabase: SupabaseClient | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  supabase: null,
  loading: true,
  error: null,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  resetPassword: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Missing Supabase credentials")
      setLoading(false)
      return
    }

    try {
      // Create Supabase client without URL validation
      const supabaseClient = createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      })
      setSupabase(supabaseClient)

      // Check for active session
      const checkUser = async () => {
        try {
          const { data, error } = await supabaseClient.auth.getSession()
          if (error) {
            console.error("Error checking auth session:", error)
          }

          if (data?.session) {
            setUser(data.session.user)
          }
        } catch (error) {
          console.error("Error checking auth:", error)
        } finally {
          setLoading(false)
        }
      }

      checkUser()

      // Set up auth state listener
      const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
          // Redirect to login if not on auth pages
          if (!pathname?.includes("/auth/")) {
            router.push("/auth/login")
          }
        }
      })

      return () => {
        authListener?.subscription.unsubscribe()
      }
    } catch (error) {
      console.error("Error initializing Supabase client:", error)
      setLoading(false)
    }
  }, [router, pathname])

  const signIn = async (email: string, password: string) => {
    if (!supabase) return

    try {
      setLoading(true)
      setError(null) // Clear any previous errors

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        throw authError
      }

      toast({
        title: "Signed in successfully",
        description: "Welcome back to AGENT 2.0",
      })

      router.push("/chat")
    } catch (error: any) {
      const errorMessage = error.message || "Failed to sign in"
      setError(errorMessage)
      toast({
        title: "Authentication error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    if (!supabase) return

    try {
      setLoading(true)
      setError(null) // Clear any previous errors

      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (authError) {
        setError(authError.message)
        throw authError
      }

      toast({
        title: "Verification email sent",
        description: "Please check your email to verify your account",
      })
    } catch (error: any) {
      const errorMessage = error.message || "Failed to sign up"
      setError(errorMessage)
      toast({
        title: "Registration error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    if (!supabase) return

    try {
      setError(null) // Clear any previous errors
      await supabase.auth.signOut()
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      })
      router.push("/auth/login")
    } catch (error: any) {
      const errorMessage = error.message || "Failed to sign out"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  const resetPassword = async (email: string) => {
    if (!supabase) return

    try {
      setLoading(true)
      setError(null) // Clear any previous errors

      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (authError) {
        setError(authError.message)
        throw authError
      }

      toast({
        title: "Password reset email sent",
        description: "Please check your email for the reset link",
      })
    } catch (error: any) {
      const errorMessage = error.message || "Failed to send reset email"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        supabase,
        loading,
        error,
        signIn,
        signOut,
        signUp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

