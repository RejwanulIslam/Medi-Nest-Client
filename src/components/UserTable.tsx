"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { updateUserStatus } from "@/action/medicine.action"
import { useEffect, useState } from "react"

type User = {
    id: string
    name: string
    email: string
    role: string
    status: "ban" | "unban"
    createdAt: string
}

export default function UserTable({
    users,
}: {
    users: User[]
}) {

    const handeStatus = async (status: string, id: string) => {
        const res = await updateUserStatus(status, id)
        console.log(res)
    }


    function FormattedDate(dateString: any) {
        const [formatted, setFormatted] = useState("")

        useEffect(() => {
            const date = new Date(dateString)
            setFormatted(date.toLocaleDateString("en-GB"))
        }, [dateString])

        return <>{formatted}</>
    }


    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                                {user.name}
                            </TableCell>

                            <TableCell>{user.email}</TableCell>

                            <TableCell>
                                <Badge variant="secondary">{user.role}</Badge>
                            </TableCell>

                            {/* STATUS DROPDOWN */}
                            <TableCell>
                                <Select
                                    defaultValue={user.status}
                                    onValueChange={(value) => {
                                        handeStatus(value, user.id)
                                    }}

                                >
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="unban">Unban</SelectItem>
                                        <SelectItem value="ban">Ban</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>

                            <TableCell>
                                {FormattedDate(user?.createdAt)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}