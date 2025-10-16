import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

const members = [
  {
    id: 1,
    name: "Aziz Guennichi",
    imageUrl: "https://avatars.githubusercontent.com/u/124068781?v=4",
    email: "medazizguennichi@gmail.com"
  }
]
export function WorkspaceMembersList() {
  return (
    <div className="space-y-0.5 py-1">
      {members.map((member) => (
        <div className="px-3 py-2 hover:bg-accent cursor-pointer transition-colors flex items-center space-x-3" key={member.id}>
          <div className="relative">
            <Avatar className="size-8 relative">
              <Image src={member.imageUrl} alt="User image" className="object-cover" fill />
              <AvatarFallback>
                {member.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{member.name}</p>
            <p className="text-xs text-muted-foreground truncate">{member.email}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
