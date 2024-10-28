import NavLink from "../../../components/NavLink";
import { useParams } from "react-router-dom";

export default function CommuneSidebarNav({ commune }) {
  const { communeId } = useParams();
  return (
    <nav className="pt-16 px-4 h-screen flex flex-col gap-4">
      <div className="flex flex-col ">
        <h2 className="text-lg font-semibold">General</h2>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/communes">Communes</NavLink>
        <NavLink href="/">Saved Threads</NavLink>
        <NavLink href="/">Drafts</NavLink>
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">Channels</h2>
        <div className="overflow-scroll max-h-[20vh] flex flex-col">
          {commune?.channels &&
            commune?.channels.map((channel) => (
              <NavLink
                key={channel._id}
                href={`/commune/${communeId}/channel/${channel._id}`}
              >
                {channel.name}
              </NavLink>
            ))}
          {commune?.channels && commune?.channels.length === 0 && (
            <p>No channels</p>
          )}
        </div>
      </div>
    </nav>
  );
}
