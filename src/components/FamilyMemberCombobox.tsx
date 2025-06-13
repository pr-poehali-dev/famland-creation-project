import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Icon from "@/components/ui/icon";
import { FamilyMember } from "@/types/family";
import { cn } from "@/lib/utils";

interface FamilyMemberComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
  members: FamilyMember[];
  placeholder?: string;
}

const FamilyMemberCombobox = ({
  value,
  onValueChange,
  members,
  placeholder = "Выберите члена семьи...",
}: FamilyMemberComboboxProps) => {
  const [open, setOpen] = useState(false);

  const selectedMember = members.find((member) => member.id === value);

  const getMemberDisplayName = (member: FamilyMember) => {
    return (
      member.name ||
      `${member.firstName} ${member.lastName}`.trim() ||
      member.relation
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-green-200 focus:border-green-400 hover:bg-green-50"
        >
          {selectedMember ? (
            <div className="flex items-center gap-2">
              <img
                src={selectedMember.photo}
                alt={getMemberDisplayName(selectedMember)}
                className="w-5 h-5 rounded-full object-cover"
              />
              {getMemberDisplayName(selectedMember)}
            </div>
          ) : (
            placeholder
          )}
          <Icon
            name="ChevronsUpDown"
            size={16}
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Поиск по имени..." />
          <CommandList>
            <CommandEmpty>Член семьи не найден.</CommandEmpty>
            <CommandGroup>
              {members.map((member) => (
                <CommandItem
                  key={member.id}
                  value={getMemberDisplayName(member)}
                  onSelect={() => {
                    onValueChange(member.id);
                    setOpen(false);
                  }}
                  className="px-3 py-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={member.photo}
                      alt={getMemberDisplayName(member)}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <span className="font-medium text-sm leading-tight">
                        {getMemberDisplayName(member)}
                      </span>
                      <span className="text-xs text-muted-foreground leading-tight">
                        {member.relation}
                        {member.age && ` • ${member.age} лет`}
                        {member.deceased && " • ушел из жизни"}
                      </span>
                    </div>
                  </div>
                  <Icon
                    name="Check"
                    size={16}
                    className={cn(
                      "ml-3 h-4 w-4 flex-shrink-0",
                      value === member.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FamilyMemberCombobox;
