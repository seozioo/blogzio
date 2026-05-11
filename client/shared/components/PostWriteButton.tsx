'use client';

import { useRef, useSyncExternalStore } from 'react';
import { PencilSimpleIcon } from '@phosphor-icons/react';
import { useAuth } from '../hooks/use-auth';
import * as motion from 'motion/react-client';
import { useRouter } from 'next/navigation';

const subscribe = () => () => { };
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const box = {
    width: 64,
    height: 64,

};


const CLICK_THRESHOLD = 5;

export const WritePostButton = () => {
    const { token } = useAuth();
    const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const constraintsRef = useRef<HTMLDivElement>(null);
    const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
    const draggedRef = useRef(false);


    const router = useRouter();


    if (!isMounted || !token) return null;

    return (
        <div
            ref={constraintsRef}
            className="pointer-events-none absolute inset-0"
        >
            <motion.div
                drag
                dragSnapToOrigin
                dragConstraints={constraintsRef}
                dragElastic={0.01}
                dragTransition={{
                    bounceStiffness: 300,
                    bounceDamping: 20,
                }}
                onPointerDown={(e) => {
                    pointerStartRef.current = { x: e.clientX, y: e.clientY };
                    draggedRef.current = false;
                }}
                onPointerMove={(e) => {
                    const start = pointerStartRef.current;
                    if (!start) return;
                    const dx = e.clientX - start.x;
                    const dy = e.clientY - start.y;
                    if (Math.hypot(dx, dy) > CLICK_THRESHOLD) {
                        draggedRef.current = true;
                    }
                }}
                onClick={(e) => {
                    if (draggedRef.current) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    router.push('/write');
                }}
                style={box}
                className="pointer-events-auto absolute bottom-4 right-4 flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
                <PencilSimpleIcon size={64} weight="fill" color="#63ceff" />
            </motion.div>
        </div >
    );
};
