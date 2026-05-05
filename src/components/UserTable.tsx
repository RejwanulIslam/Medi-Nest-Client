"use client"

import { updateUserStatus } from "@/action/medicine.action"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Users, ShieldCheck, UserX, Calendar, Mail, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

type User = {
  id: string
  name: string
  email: string
  role: string
  status: "ban" | "unban"
  createdAt: string
}

const ROLE_STYLE: Record<string, string> = {
  ADMIN: "bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/30",
  SELLER: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30",
  USER: "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30",
}

const STATUS_STYLE: Record<string, string> = {
  unban: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
  ban: "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/30",
}

function getInitials(name: string) {
  return name?.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "?"
}

function FormattedDate({ dateString }: { dateString: string }) {
  const [formatted, setFormatted] = useState("")
  useEffect(() => {
    setFormatted(new Date(dateString).toLocaleDateString("en-GB"))
  }, [dateString])
  return <>{formatted}</>
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

export default function UserTable({ users }: { users: User[] }) {
  const [search, setSearch] = useState("")
  const [statusMap, setStatusMap] = useState<Record<string, string>>(
    Object.fromEntries((users ?? []).map((u) => [u.id, u.status]))
  )

  const handleStatus = async (status: string, id: string) => {
    setStatusMap((prev) => ({ ...prev, [id]: status }))
    await updateUserStatus(status, id)
  }

  const filtered = (users ?? []).filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Panel
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-1">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-400">Users</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {users?.length ?? 0} total users registered on the platform.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by name, email or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-violet-500"
          />
        </div>
      </motion.div>

      {/* ── User Cards ── */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-slate-400 dark:text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">No Users Found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Try a different search term.</p>
        </motion.div>
      ) : (
        <>
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1.5fr] gap-4 px-5 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            <span>User</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Joined</span>
            <span>Action</span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {filtered.map((user) => (
              <motion.div
                key={user.id}
                variants={rowVariants as any}
                className="group grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr_1fr_1fr_1.5fr] gap-4 items-center bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:border-violet-500/20 transition-all duration-200"
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-black flex-shrink-0 shadow-md">
                    {getInitials(user.name)}
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm truncate">{user.name}</p>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm truncate">
                  <Mail className="w-4 h-4 flex-shrink-0 text-slate-400" />
                  <span className="truncate">{user.email}</span>
                </div>

                {/* Role */}
                <div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ROLE_STYLE[user.role] ?? "bg-slate-100 text-slate-600"}`}>
                    {user.role}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[statusMap[user.id]] ?? ""}`}>
                    {statusMap[user.id] === "ban" ? (
                      <span className="flex items-center gap-1"><UserX className="w-3 h-3" /> Banned</span>
                    ) : (
                      <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Active</span>
                    )}
                  </span>
                </div>

                {/* Joined */}
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                  <Calendar className="w-4 h-4 flex-shrink-0 text-slate-400" />
                  <FormattedDate dateString={user.createdAt} />
                </div>

                {/* Action Dropdown */}
                <Select
                  defaultValue={user.status}
                  onValueChange={(value) => handleStatus(value, user.id)}
                >
                  <SelectTrigger className="h-9 text-xs rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-violet-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unban">✅ Active</SelectItem>
                    <SelectItem value="ban">🚫 Ban User</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  )
}