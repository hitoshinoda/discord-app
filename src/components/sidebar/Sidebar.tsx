import React, { useEffect, useState } from 'react';
import "./Sidebar.scss"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import SidebarChannel from './SidebarChannel';
import { auth, db } from '../../firebase';
import { useAppSelecter } from '../../app/hooks';
import useCollection from '../../hooks/useCollection';
import { addDoc, collection } from 'firebase/firestore';
// import { collection, query } from 'firebase/firestore/lite';

const Sidebar = () => {

    const user = useAppSelecter((state) => state.user.user);
    const { documents: channels } = useCollection("channels");
    const addChannel = async () => {
        let channelName: string | null = prompt("新しいチャンネルを登録します");
        if(channelName){
            await addDoc(collection(db, "channels"), {
                channelName: channelName,
            })
        }
    }

    return (
        <div className='sidebar'>
            <div className='sidebarLeft'>
                <div className='serverIcon'>
                    <img src="./discordIcon.png" />
                </div>
                <div className='serverIcon'>
                    <img src="./logo192.png" />
                </div>
            </div>
            <div className='sidebarRight'>
                <div className='sidebarTop'>
                    <h3>Discord</h3>
                    <ExpandMoreIcon />
                </div>
                <div className='sidebarChannels'>
                    <div className='sidebarChannelsHeader'>
                        <div className='sidebarHeader'>
                            <ExpandMoreIcon />
                            <h4>プログラミング</h4>
                        </div>
                        <AddIcon className='sidebarAddIcon' onClick={() => addChannel()} />
                    </div>
                    <div className='sidebarChannelList'>
                        {channels.map((channel) => (
                            <SidebarChannel channel={channel} id={channel.id} key={channel.id} />
                        ))}
                    </div>
                    <div className='sidebarSettings'>
                        <div className='sidebarAccount'>
                            <img src={user?.photo} alt="" onClick={() => auth.signOut()}/>
                            <div className='accountName'>
                                <h4>{user?.displayName}</h4>
                                <span>#{user?.uid.substring(0, 4)}</span>
                            </div>
                        </div>
                        <div className='sidebarVoice'>
                            <MicIcon />
                            <HeadsetIcon />
                            <SettingsIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;