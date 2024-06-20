'use client';

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter();

    if(!call){
        throw new Error('useStreamCall must be used within a streamCall component');
    }

    const { useLocalParticipant } = useCallStateHooks();
    const localParticipants = useLocalParticipant();

    const meetingOwner = localParticipants && call.state.createdBy && localParticipants.userId === call.state.createdBy.id;

    if(!meetingOwner) return null;

    const endCall = async() => {
        await call.endCall();
        router.push('/');
    }

  return (
    <Button onClick={endCall} className='bg-red-500'>
        End Call for Everyone
    </Button>
  )
}

export default EndCallButton
