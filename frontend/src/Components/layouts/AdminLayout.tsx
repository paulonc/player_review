"use client"

import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  GamepadIcon,
  LayoutDashboard,
  GamepadIcon as GameController,
  Tags,
  Users,
  MessageSquare,
  LogOut,
} from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = useLocation()

  const isActive = (path: string) => {
    return pathname.pathname === path
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex">
      <div className="w-64 border-r bg-muted/10 hidden md:block">
        <div className="h-16 border-b flex items-center px-6">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-md">
              <GamepadIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Admin Panel
            </span>
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/admin">
            <Button
              variant={isActive("/admin") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/admin") ? "bg-primary hover:bg-primary/90" : ""}`}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/admin/games">
            <Button
              variant={isActive("/admin/games") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/admin/games") ? "bg-primary hover:bg-primary/90" : ""}`}
            >
              <GameController className="mr-2 h-4 w-4" />
              Games
            </Button>
          </Link>
          <Link to="/admin/categories">
            <Button
              variant={isActive("/admin/categories") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/admin/categories") ? "bg-primary hover:bg-primary/90" : ""}`}
            >
              <Tags className="mr-2 h-4 w-4" />
              Categories
            </Button>
          </Link>
          <Link to="/admin/users">
            <Button
              variant={isActive("/admin/users") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/admin/users") ? "bg-primary hover:bg-primary/90" : ""}`}
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
          </Link>
          <Link to="/admin/reviews">
            <Button
              variant={isActive("/admin/reviews") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/admin/reviews") ? "bg-primary hover:bg-primary/90" : ""}`}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Reviews
            </Button>
          </Link>
          <div className="pt-4 mt-4 border-t">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <LogOut className="mr-2 h-4 w-4" />
                Back to Site
              </Button>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-6">
          <div className="md:hidden flex items-center gap-2">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-md">
                <GamepadIcon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                Admin
              </span>
            </Link>
          </div>
          <div className="flex items-center ml-auto gap-4">
            <span className="text-sm text-muted-foreground">Admin User</span>
            <Link to="/">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Exit Admin
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

