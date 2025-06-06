import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./authReducer";

export interface Commune {
    _id: string;
    name: string;
    description: string;
    profileUri: string;
    members: string[] | User[];
    channels: string[];
    createdBy: string | object;
    createdAt: Date;
    updatedAt: Date;
    allRoles: Role[];
    roles: {
        [key: string]: Role
    }
}

export interface Channel {
    _id: string;
    name: string;
    threads: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Thread {
    title: string;
    content: string;
    createdBy: string | User;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
    imagesUri: string[];
    channelId: string
    communeId: string
}
export interface CommuneState {
    communes: { [key: string]: Commune };
    channels: { [key: string]: Channel },
    threads: { [key: string]: Thread }
}
export interface Role {
    _id: string,
    name: string,
    description: string,
    permissions: string[]
}

export interface Comment {
    _id: string,
    content: string,
    createdBy: User,
    createdAt: Date,
    updatedAt: Date,
    threadId: string,
    imagesUri: string[]
}

const initialState: CommuneState = {
    communes: {},
    channels: {},
    threads: {}
};

const communeSlice = createSlice({
    name: "commune",
    initialState,
    reducers: {

        addCommune: (state, action: PayloadAction<{ commune: Commune, channels: Channel[] }>) => {
            //only add commune related data ,no channel ,no threads
            if (typeof action.payload.channels[0] == "string") {
                console.log("Error in adding Commune, Invalid Data")
                return
            }
            const channels = action.payload.channels as Channel[];
            state.communes[action.payload.commune._id] = {
                ...action.payload.commune,
                channels: channels.map((channel: Channel) => channel._id)
            };
            if (!state.channels) {
                state.channels = {};
            }
            channels.forEach((channel: Channel) => {
                state.channels[channel._id] = { ...channel, threads: [] };
            })
        },
        addCommunes: (state, action: PayloadAction<Commune[]>) => {
            if (action.payload.length === 0) return;
            action.payload.forEach((commune) => {
                state.communes[commune._id] = { ...commune, channels: [] }
            })
        },
        addRole: (state, action: PayloadAction<{ role: Role, communeId: string }>) => {
            if (!state.communes[action.payload.communeId]) {
                console.log("no Commune found returning")
            };
            state.communes[action.payload.communeId].allRoles.push(action.payload.role);
            console.log("Role Added")
        },
        assignRole: (state, action: PayloadAction<{ communeId: string, userId: string, role: Role }>) => {
            if (!state.communes[action.payload.communeId]) {
                console.log("no Commune found returning")
                return;
            }
            state.communes[action.payload.communeId].roles[action.payload.userId] = action.payload.role;
            console.log("Role Assigned")
        },
        addChannel: (state, action: PayloadAction<{ channel: Channel, communeId: string }>) => {
            if (!state.communes[action.payload.communeId]) {
                console.log("No Commune Found Returning")
                return
            }
            if (!state.channels) {
                state.channels = {}
            }
            state.channels[action.payload.channel._id] = { ...action.payload.channel, threads: [] };

            state.communes[action.payload.communeId].channels.push(action.payload.channel._id as string);
        },
        addChannels: (state, action: PayloadAction<{ channels: Channel[], communeId: string }>) => {
            // check if commune exists
            console.log("Commune ID", action.payload.communeId)
            if (!state.communes[action.payload.communeId]) {
                console.log("No Commune Found Returning")
                return
            };
            if (!state.threads) {
                state.threads = {}
            }
            // only add channels related data ,no threads
            action.payload.channels.forEach((channel) => {
                state.channels[channel._id] = { ...channel, threads: [] };

            })

            //add the channels to commune
            state.communes[action.payload.communeId].channels = action.payload.channels.map(channel => channel._id);
        },
        addThreads: (state, action: PayloadAction<Thread[]>) => {

            if (action.payload.length === 0) return;
            // if (!state.threads) state.threads = {}
            action.payload.forEach((thread) => {
                state.threads[thread._id] = thread;
                if (state.channels[action.payload[0].channelId]) {
                    console.log("No Channel Found Returning")
                    state.channels[thread.channelId]?.threads.push(thread._id);
                };
            })


        },
        addThreadFront: (state, action: PayloadAction<Thread>) => {
            if (!state.channels[action.payload.channelId]) {
                console.log("No Channel Found Returning")
                return
            }
            state.threads[action.payload._id] = action.payload;
            state.channels[action.payload.channelId]?.threads.unshift(action.payload._id);
        },
        clearState: (state) => {
            state.communes = {}
            state.channels = {}
            state.threads = {}
        },
        removeThread: (state, action: PayloadAction<{ threadId: string, channelId: string }>) => {
            const thread = state.threads[action.payload.threadId];
            if (!thread) return;
            delete state.threads[action.payload.threadId];
            state.channels[action.payload.channelId].threads = state.channels[action.payload.channelId].threads.filter(threadId => threadId !== action.payload.threadId);
            console.log("Thread Deleted")
        }
    }
});

export const { addCommune, addThreads, addChannels, addCommunes, addThreadFront, removeThread, addRole, assignRole, addChannel } = communeSlice.actions;
export default communeSlice.reducer;
