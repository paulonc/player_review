import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GamepadIcon as GameController, Users, MessageSquare, Building, Tags } from "lucide-react"
import AdminLayout from "@/components/layouts/AdminLayout"
import { StatCard } from "@/components/admin/StatCard"
import { QuickAction } from "@/components/admin/QuickAction"
import { ActivityItem } from "@/components/admin/ActivityItem"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          >
            Refresh Data
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Total Games" value={1248} Icon={GameController} />
          <StatCard title="Active Users" value={34789} Icon={Users} />
          <StatCard title="Reviews" value={24356} Icon={MessageSquare} />
        </div>

        <h2 className="text-xl font-semibold mt-8">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction to="/admin/games" Icon={GameController} label="Manage Games" />
          <QuickAction to="/admin/categories" Icon={Tags} label="Manage Categories" />
          <QuickAction to="/admin/publishers" Icon={Building} label="Manage Publishers" />
          <QuickAction to="/admin/users" Icon={Users} label="Manage Users" />
        </div>

        <h2 className="text-xl font-semibold mt-8">Recent Activity</h2>
        <Card className="border-muted/60">
          <CardContent className="p-6">
            <div className="space-y-4">
              <ActivityItem
                Icon={GameController}
                title="New game added:"
                highlight="Starfield"
                timestamp="2 hours ago"
                author="Admin"
              />
              <ActivityItem
                Icon={MessageSquare}
                title="New review flagged for"
                highlight="Elden Ring"
                timestamp="3 hours ago"
                author="System"
              />
              <ActivityItem
                Icon={Users}
                title="New user registered:"
                highlight="GamerPro456"
                timestamp="5 hours ago"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

