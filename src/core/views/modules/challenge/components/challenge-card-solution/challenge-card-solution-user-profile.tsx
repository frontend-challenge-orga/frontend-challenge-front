import { Avatar, AvatarImage } from "@/core/views/components/ui/avatar";
import type { UserDTO } from "@/core/infrastructure/dto/user.dto";

type Props = {
  user: UserDTO;
};

export const ChallengeCardSolutionUserProfile = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-4 p-6">
      <Avatar>
        <AvatarImage src={user.image ?? "/avatar.png"} alt={""} />
      </Avatar>

      <div>
        <div className="flex gap-2">
          <h3>{user.name}</h3> • <span>{user.points}</span>
        </div>

        <p>@SwiichyCode</p>
      </div>
    </div>
  );
};
