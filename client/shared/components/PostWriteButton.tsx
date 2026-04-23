'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PencilSimpleIcon } from '@phosphor-icons/react';
import { useAuth } from '../hooks/use-auth';
import * as motion from "motion/react-client"
import { useRef } from "react"

const constraints = {
    width: 300,
    height: 300,
    backgroundColor: "var(--hue-1-transparent)",
    borderRadius: 10,
}

const box = {
    width: 100,
    height: 100,
    backgroundColor: "#ff0088",
    borderRadius: 10,
}

export const WritePostButton = () => {
    const { token } = useAuth();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const constraintsRef = useRef<HTMLDivElement>(null);

    if (!isMounted || !token) return null;

    return (
        <motion.div ref={constraintsRef} style={constraints}>
            <motion.div
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.2}
                style={box}
            />
            <Link
                href="/write"
                className="flex items-center gap-1 px-3 h-9 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600"
            >
                <PencilSimpleIcon size={16} weight="bold" />
                글쓰기
            </Link>
        </motion.div>

    );
};
