import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useState, useEffect } from "react";
import { User } from "@/types/api";
import { userService } from "@/services/userService";
import UserTable from "../../components/admin/users/UserTable";

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await userService.getUsers();
      console.log(response);
      setUsers(response);
    };
    fetchUsers();
  }, [searchQuery, selectedRole]);

  const filteredUsers = users.filter((user) => {
    const matchesUsername = user.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRole === "all" ||
      user.role.toLowerCase() === selectedRole.toLowerCase();
    return matchesUsername && matchesRole;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Users</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8 bg-muted/50 border-muted focus-visible:ring-primary w-full"
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full sm:w-[150px] bg-muted/50 border-muted focus-visible:ring-primary">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent className="border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <UserTable users={filteredUsers} />
        </div>
      </div>
    </AdminLayout>
  );
}
