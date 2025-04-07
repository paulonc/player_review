import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GamepadIcon as GameController, Users, MessageSquare, Building, Tags } from "lucide-react"
import AdminLayout from "@/components/layouts/AdminLayout"
import { StatCard } from "@/components/admin/StatCard"
import { QuickAction } from "@/components/admin/QuickAction"
import { ActivityItem } from "@/components/admin/ActivityItem"
import { dashService } from "@/services/dashService"
import { useEffect, useState } from "react"
import { DashCounts, RecentActivity } from "@/types/api"

export default function AdminDashboard() {
  const [counts, setCounts] = useState<DashCounts>({ games: 0, reviews: 0, users: 0 })
  const [activities, setActivities] = useState<RecentActivity[]>([])

  const fetchDashboardData = async () => {
    const [countsData, activitiesData] = await Promise.all([
      dashService.getCounts(),
      dashService.getRecentActivities(),
    ])
    setCounts(countsData)
    setActivities(activitiesData)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            onClick={fetchDashboardData}
          >
            Refresh Data
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Total Games" value={counts.games} Icon={GameController} />
          <StatCard title="Active Users" value={counts.users} Icon={Users} />
          <StatCard title="Reviews" value={counts.reviews} Icon={MessageSquare} />
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
              {activities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  Icon={activity.type === 'Game' ? GameController : MessageSquare}
                  title={'New Review Flagged for'}
                  highlight={activity.game}
                  timestamp={activity.timestamp}
                  author={activity.author}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
