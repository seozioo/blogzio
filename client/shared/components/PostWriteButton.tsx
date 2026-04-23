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
    width: 56,
    height: 56,
    backgroundColor: '#ff0088',
    borderRadius: 10,
};

export const WritePostButton = () => {
    const { token } = useAuth();
    const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const constraintsRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    const routerHandle = () => {
        router.push('/write');
    }



    if (!isMounted || !token) return null;

    return (
        <div
            ref={constraintsRef}
            className="pointer-events-none absolute inset-0"
        >
            <motion.div
                drag
                onClick={routerHandle}
                dragConstraints={constraintsRef}
                dragElastic={0.2}
                style={box}
                className="pointer-events-auto absolute bottom-4 right-4 flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
                <PencilSimpleIcon size={24} weight="bold" color="white" />
            </motion.div>
        </div >
    );
};
