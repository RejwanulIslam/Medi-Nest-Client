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

type User = {
    id: string
    name: string
    email: string
    image: string | null
    role: "ADMIN" | "USER" | "SELLER"
    status: string
    createdAt: string
}

export default function UserProfileCard({ user }: { user: User }) {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(user.name)
    const [image, setImage] = useState(user.image || "")
    const [role, setRole] = useState(user.role)
    const [loading, setLoading] = useState(false)


    const handleUpdate = async () => {
        setLoading(true)
        const userdata = {
            name,
            role,
            image
        }

        const res = await manageUser(userdata, user.id)
        console.log(res)
        setLoading(false)

        if (res) {
            toast("User updated successfully")
            setEditMode(false)
        } else {
            toast("Update failed")
        }
    }

    return (
        <div className="min-h-screen bg-muted flex items-center justify-center px-4">
            <Card className="w-full max-w-4xl shadow-xl">
                <div className="p-8 space-y-8">

                    {/* Header */}
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                            {image ? (
                                <AvatarImage src={image} />
                            ) : (
                                <AvatarFallback>
                                    {user.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            )}
                        </Avatar>

                        <div className="flex-1">
                            {editMode ? (
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="text-xl font-semibold"
                                />
                            ) : (
                                <h2 className="text-2xl font-bold">{user.name}</h2>
                            )}
                            <p className="text-muted-foreground">{user.email}</p>

                            <div className="mt-2 flex gap-2">
                                <Badge variant="secondary">{user.role}</Badge>
                                <Badge variant={user.status === "unban" ? "secondary" : "destructive"}>
                                    {user.status}
                                </Badge>
                            </div>
                        </div>

                        {!editMode && (
                            <Button onClick={() => setEditMode(true)}>
                                Edit Profile
                            </Button>
                        )}
                    </div>

                    <Separator />

                    {/* Body */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Image */}
                        <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">Profile Image</label>
                            {editMode ? (
                                <Input
                                    placeholder="Image URL"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            ) : (
                                <p className="text-sm">{user.image ?? "Not provided"}</p>
                            )}
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">Role</label>
                            {editMode ? (
                                <select
                                    className="w-full border rounded-md px-3 py-2"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as any)}
                                >
                                    <option value="USER">USER</option>
                                    <option value="SELER">SELER</option>
                                </select>
                            ) : (
                                <p className="text-sm">{user.role}</p>
                            )}
                        </div>

                        {/* Created */}
                        <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">Joined</label>
                            <p className="text-sm">
                                {new Date(user.createdAt).toISOString()}
                            </p>
                        </div>

                        {/* ID */}
                        <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">User ID</label>
                            <p className="text-xs break-all text-muted-foreground">
                                {user.id}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    {editMode && (
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                variant="outline"
                                onClick={() => setEditMode(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpdate}
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Save Changes"}
                            </Button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}