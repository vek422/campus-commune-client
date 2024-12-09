import { useAppSelector } from "@/store/store";
import NavLink from "../../../components/NavLink";
import { useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import CreateChannel from "./CreateChannel";
import { Channel } from "@/store/reducers/CommuneReducer";

const selectChannel = createSelector(
  (state) => state.commune.communes,
  (state) => state.commune.channels,
  (_state, communeId: string) => communeId,
  (communes, channels, communeId) =>
    communes[communeId]?.channels?.map(
      (channelId: string) => channels[channelId]
    )
);

export default function CommuneSidebarNav() {
  const { communeId = "" } = useParams();
  const channels = useAppSelector((state) => selectChannel(state, communeId));

  return (
    <nav className="pt-16 px-4 h-screen flex flex-col gap-4">
      <div className="flex flex-col ">
        <h2 className="text-lg font-semibold">General</h2>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/communes">Commune</NavLink>
        {/* <NavLink href="/">Saved Threads</NavLink> */}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Channels</h2>
          <CreateChannel />
        </div>
        <div className="overflow-scroll max-h-[20vh] flex flex-col">
          {channels &&
            channels.map((channel: Channel) => (
              <NavLink
                key={channel._id}
                href={`/commune/${communeId}/channel/${channel._id}`}
              >
                {channel.name}
              </NavLink>
            ))}
          {channels && channels.length === 0 && <p>No channels</p>}
        </div>
      </div>
    </nav>
  );
}
