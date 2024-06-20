'use client';

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { NoiseCancellation } from '@stream-io/audio-filters-web';
import { NoiseCancellationProvider, StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useMemo, useState } from 'react'

const Meeting = ({ params: { id } } : { params: { id: string} }) => {
  const { user,isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const { call, isCallLoading } = useGetCallById(id);
  const noiseCancellation = useMemo(() => new NoiseCancellation(), []);

  if(!isLoaded || isCallLoading) return <Loader />
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
        <NoiseCancellationProvider noiseCancellation={noiseCancellation}>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
          </NoiseCancellationProvider>
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
