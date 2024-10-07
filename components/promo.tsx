"use client"

import Image from "next/image"

export const Promo = () => {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="space-y-2">
                <div className="flex items-center">
                    <Image
                    src="/unlimited.svg"
                    alt="Pro"
                    height={26}
                    width={26}
                    />
                    <h3>
                        Upgrade to Pro
                    </h3>
                </div>
            </div>
        </div>
    )
}
