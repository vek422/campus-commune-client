import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChangeEvent } from "react";

export interface Commune {
    _id: string;
    name: string;
    description: string;
    profileUri: string;
    members: string[] | object[];
    channels: string[];
    createdBy: string | object;
    createdAt: Date;
    updatedAt: Date;
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
    description: string;
    createdBy: string | object;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
}
export interface CommuneState {
    communes: { [key: string]: Commune };
    channels: { [key: string]: Channel },
    threads: { [key: string]: Thread }
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
        addCommune: (state, action: PayloadAction<Commune>) => {
            //only add commune related data ,no channel ,no threads
            state.communes[action.payload._id] = {
                ...action.payload,
                channels: action.payload.channels.map(channel => channel._id)
            };
            if (!state.channels) {
                state.channels = {};
            }

            action.payload.channels.forEach((channel: any) => {
                state.channels[channel._id] = { ...channel, threads: [] };
            })
        },
        addCommunes: (state, action: PayloadAction<Commune[]>) => {
            if (action.payload.length === 0) return;
            if (typeof action.payload[0].channels[0] != "string")
                action.payload.forEach((commune) => {
                    state.communes[commune._id] = { ...commune, channels: commune.channels.map(channel => channel._id) }
                    commune.channels.forEach((channel: any) => {
                        state.channels[channel._id] = { ...channel, threads: [] };
                    })
                })
            else {
                action.payload.forEach((commune) => {
                    state.communes[commune._id] = { ...commune, channels: [] }
                })
            }
        },
        addChannels: (state, action: PayloadAction<{ channels: Channel[], communeId: string }>) => {
            // check if commune exists
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
            if (!state.channels[action.payload[0].channelId]) {
                console.log("No Channel Found Returning")
                return
            };
            if (!state.threads) state.threads = {}
            action.payload.forEach((thread) => {
                state.threads[thread._id] = thread;
                // if (!state.channels[thread._id]?.threads.includes(thread._id))
                state.channels[thread.channelId]?.threads.push(thread._id);
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
    }
});

export const { addCommune, addThreads, addChannels, addCommunes, addThreadFront } = communeSlice.actions;
export default communeSlice.reducer;
