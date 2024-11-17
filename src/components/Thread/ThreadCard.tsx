import { Bookmark, Heart, MessageSquare, SendHorizonal } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function ThreadCard() {
  return (
    <div className="w-full  min-h-max bg-secondary/30 border border-secondary rounded-xl p-2 flex flex-col gap-2">
      {/* thread main section */}
      <div className="flex gap-2 ">
        <Avatar className="h-10 w-10">
          <AvatarFallback>Vk</AvatarFallback>
        </Avatar>
        <div className="flex gap-2 flex-col">
          <div>
            <p className="text-sm">Vedant Kotkar</p>
            <p className="text-xs">2hrs ago</p>
          </div>
          <h1 className="text-xl font-bold">Thread Title</h1>
          <p className="text-sm font-semibold">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
            molestiae, dolore maiores accusamus eligendi delectus commodi
            deleniti similique neque deserunt harum voluptatibus sed ab
            accusantium impedit minus amet consectetur maxime.
          </p>
          <div className="flex gap-2">
            <img
              src="/sample1.jpg"
              alt="commune"
              className="w-44 h-44 object-cover overflow-hidden rounded-lg"
            />
            <img
              src="/sample2.png"
              alt="commune"
              className="w-44 h-44 object-cover overflow-hidden rounded-lg"
            />
          </div>
          <div className="h-10 gap-5 rounded-lg flex items-center max-w-min ">
            <MessageSquare size={20} />
            <Heart size={20} />
            <Bookmark size={20} />
          </div>
        </div>
      </div>
      {/* comment start */}
      <div className="rounded-lg ml-12 p-2 bg-muted/20 border-muted border flex flex-col">
        <div className="flex gap-2 items-center">
          <Avatar className="h-7 w-7">
            <AvatarFallback>CG</AvatarFallback>
          </Avatar>
          <p className="text-sm">Chaitanya Gore</p>
          <p className="text-xs">2hrs ago</p>
        </div>
        <div className="pl-9 flex flex-col gap-2">
          <p className="text-sm font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque illum
            molestias nulla! Veritatis, atque odit?
          </p>
          <div className="flex gap-2">
            <Heart size={20} />
            <MessageSquare size={20} />
          </div>
        </div>
      </div>
      {/* comment end */}

      {/* add comment section */}
      <div className=" flex gap-2 items-center">
        <Avatar className="w-7 h-7">
          <AvatarFallback>vk</AvatarFallback>
        </Avatar>
        <Input className="border-none" placeholder="Add Comment" />
        <Button variant={"default"} size={"icon"}>
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
}
