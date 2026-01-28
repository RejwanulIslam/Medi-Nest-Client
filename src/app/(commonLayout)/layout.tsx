import { Navbar1 } from '@/components/navbar1'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar1></Navbar1>
            {children}
        </div>
    )
}
