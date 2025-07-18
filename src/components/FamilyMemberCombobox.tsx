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
          className="w-full justify-between focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-green-200 focus:border-green-400 hover:border-green-300 hover:bg-green-50/50 h-11 sm:h-10"
        >
          {selectedMember ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={selectedMember.photo}
                  alt={getMemberDisplayName(selectedMember)}
                  className="w-6 h-6 sm:w-6 sm:h-6 rounded-full object-cover border border-green-100"
                />
              </div>
              <span className="font-normal text-gray-900 truncate text-sm sm:text-base">
                {getMemberDisplayName(selectedMember)}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground font-normal text-sm sm:text-base">
              {placeholder}
            </span>
          )}
          <Icon
            name="ChevronsUpDown"
            size={16}
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[calc(100vw-2rem)] sm:w-[400px] p-0"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder="Найти члена семьи..."
            className="focus-visible:ring-0 focus-visible:ring-offset-0 h-12 sm:h-auto"
          />
          <CommandList>
            <CommandEmpty className="py-6 text-center text-sm">
              Члены семьи не найдены.
            </CommandEmpty>
            <CommandGroup>
              {members.map((member) => (
                <CommandItem
                  key={member.id}
                  value={getMemberDisplayName(member)}
                  onSelect={() => {
                    onValueChange(member.id);
                    setOpen(false);
                  }}
                  className="my-1.5 focus:outline-none [&[data-selected]]:outline-none py-3 sm:py-2"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="relative">
                      <img
                        src={member.photo}
                        alt={getMemberDisplayName(member)}
                        className="w-10 h-10 sm:w-8 sm:h-8 rounded-full object-cover border border-green-100"
                      />
                      {member.deceased && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full border border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm sm:text-sm truncate">
                          {getMemberDisplayName(member)}
                        </h4>
                        <Icon
                          name="Check"
                          className={cn(
                            "ml-2 h-4 w-4",
                            value === member.id ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 sm:py-0.5 rounded-full">
                          {member.relation}
                        </span>
                        {member.age && (
                          <span className="text-xs text-muted-foreground">
                            {member.age} лет
                          </span>
                        )}
                        {member.deceased && (
                          <span className="text-xs text-muted-foreground italic">
                            ушел из жизни
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
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
