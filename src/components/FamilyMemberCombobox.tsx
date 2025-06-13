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
          className="w-full justify-between focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-input bg-background hover:bg-accent/50 transition-colors"
        >
          {selectedMember ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={selectedMember.photo}
                  alt={getMemberDisplayName(selectedMember)}
                  className="w-6 h-6 rounded-full object-cover border border-green-100"
                />
              </div>
              <span className="font-normal text-gray-900 truncate">
                {getMemberDisplayName(selectedMember)}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground font-normal">
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
        className="w-[--radix-popover-trigger-width] p-0 shadow-lg border-border bg-popover"
        align="start"
      >
        <Command className="rounded-md">
          <CommandInput
            placeholder="Найти члена семьи..."
            className="border-none focus:ring-0 h-10 px-3"
          />
          <CommandList className="max-h-64 overflow-auto">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              Члены семьи не найдены.
            </CommandEmpty>
            <CommandGroup className="p-1">
              {members.map((member) => (
                <CommandItem
                  key={member.id}
                  value={getMemberDisplayName(member)}
                  onSelect={() => {
                    onValueChange(member.id);
                    setOpen(false);
                  }}
                  className="px-3 py-3 rounded-lg cursor-pointer transition-colors hover:bg-accent focus:bg-accent data-[selected]:bg-accent"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="relative">
                      <img
                        src={member.photo}
                        alt={getMemberDisplayName(member)}
                        className="w-8 h-8 rounded-full object-cover border-2 border-border shadow-sm"
                      />
                      {member.deceased && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-muted-foreground rounded-full border-2 border-background shadow-sm"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm truncate text-foreground">
                          {getMemberDisplayName(member)}
                        </h4>
                        <Icon
                          name="Check"
                          className={cn(
                            "ml-2 h-4 w-4 text-primary",
                            value === member.id ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground bg-accent px-2 py-0.5 rounded-full border border-border">
                          {member.relation}
                        </span>
                        {member.age && (
                          <span className="text-xs text-muted-foreground">
                            {member.age} лет
                          </span>
                        )}
                        {member.deceased && (
                          <span className="text-xs text-muted-foreground italic opacity-75">
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
