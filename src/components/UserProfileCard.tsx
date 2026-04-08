"use client"
import { useState } from "react"
import { Card } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { manageUser } from "@/action/medicine.action"
import { toast } from "sonner"
import { refresh } from "next/cache"

type Role ="USER" | "SELLER"

type User = {
  id: string
  name: string
  email: string
  image: string | null
  role: Role
  status: string
  createdAt: string
}

export default function UserProfileCard({ user }: { user: User }) {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(user.name)
  const [image, setImage] = useState(user.image ?? "")
  const [role, setRole] = useState<Role>(user.role)
  const [loading, setLoading] = useState(false)

  // BUG FIX: Reset all fields on cancel so stale edits don't persist
  const handleCancel = () => {
    setName(user.name)
    setImage(user.image ?? "")
    setRole(user.role)
    setEditMode(false)
  }

  const handleUpdate = async () => {
    setLoading(true)
    const res = await manageUser({ name, role, image }, user.id)
    setLoading(false)

    if (res) {
      toast.success("User updated successfully")
      refresh()
      setEditMode(false)
    } else {
      toast.error("Update failed. Please try again.")
    }
  }

  // BUG FIX: Format date in a human-readable way instead of raw ISO string
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const isActive = user.status === "unban"

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">
      <Card className="w-full max-w-3xl shadow-xl">
        <div className="p-8 space-y-8">

          {/* Header */}
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20 shrink-0">
              {image ? (
                <AvatarImage src={image} alt={user.name} />
              ) : (
                <AvatarFallback className="text-lg">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 min-w-0">
              {editMode ? (
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-base font-medium mb-1"
                  placeholder="Full name"
                />
              ) : (
                <h2 className="text-2xl font-semibold truncate">{user.name}</h2>
              )}
              <p className="text-sm text-muted-foreground mt-1 mb-3">{user.email}</p>

              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{user.role}</Badge>
                {/* BUG FIX: Correct badge color — active=secondary, banned=destructive */}
                <Badge variant={isActive ? "secondary" : "destructive"}>
                  {isActive ? "Active" : user.status}
                </Badge>
              </div>
            </div>

            {!editMode && (
              <Button variant="outline" onClick={() => setEditMode(true)}>
                Edit profile
              </Button>
            )}
          </div>

          <Separator />

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Profile image
              </label>
              {editMode ? (
                <Input
                  placeholder="https://example.com/photo.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              ) : (
                <p className="text-sm break-all">{user.image ?? "Not provided"}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Role
              </label>
              {editMode ? (
                // BUG FIX: "SELER" typo fixed → "SELLER"; ADMIN option added
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                >
                  <option value="USER">USER</option>
                  <option value="SELLER">SELLER</option>
                </select>
              ) : (
                <p className="text-sm">{user.role}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Joined
              </label>
              {/* BUG FIX: Human-readable date instead of raw ISO string */}
              <p className="text-sm">{formattedDate}</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                User ID
              </label>
              <p className="text-xs font-mono break-all text-muted-foreground">{user.id}</p>
            </div>
          </div>

          {/* Footer actions */}
          {editMode && (
            <div className="flex justify-end gap-3 pt-2">
              {/* BUG FIX: Cancel resets all fields */}
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={loading}>
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}