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
          className="w-full justify-between h-12 px-4 border-2 border-green-200 bg-white hover:border-green-300 hover:bg-green-50/50 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200"
        >
          {selectedMember ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={selectedMember.photo}
                  alt={getMemberDisplayName(selectedMember)}
                  className="w-7 h-7 rounded-full object-cover border-2 border-green-100"
                />
              </div>
              <span className="font-medium text-gray-900 truncate">
                {getMemberDisplayName(selectedMember)}
              </span>
            </div>
          ) : (
            <span className="text-gray-500 font-normal">{placeholder}</span>
          )}
          <Icon
            name="ChevronsUpDown"
            size={18}
            className="ml-2 h-4 w-4 shrink-0 text-green-400 transition-transform duration-200"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 max-h-96 border-2 border-green-200 shadow-xl bg-white rounded-xl overflow-hidden"
        align="start"
        sideOffset={8}
      >
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 border-b border-green-100">
          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400"
            />
            <input
              type="text"
              placeholder="Найти члена семьи..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-green-200 rounded-lg text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200"
            />
          </div>
        </div>
        <div className="max-h-72 overflow-y-auto">
          {members.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <Icon
                name="UserX"
                size={32}
                className="mx-auto mb-2 opacity-50"
              />
              <p className="text-sm">Нет доступных членов семьи</p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {members.map((member, index) => (
                <div
                  key={member.id}
                  onClick={() => {
                    onValueChange(member.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 group",
                    "hover:bg-green-50 hover:shadow-sm active:bg-green-100",
                    value === member.id
                      ? "bg-green-100 border border-green-200"
                      : "border border-transparent",
                  )}
                >
                  <div className="relative">
                    <img
                      src={member.photo}
                      alt={getMemberDisplayName(member)}
                      className="w-10 h-10 rounded-full object-cover border-2 border-green-100 group-hover:border-green-200 transition-colors duration-200"
                    />
                    {member.deceased && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full border border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-green-800 transition-colors duration-200">
                        {getMemberDisplayName(member)}
                      </h4>
                      {value === member.id && (
                        <Icon
                          name="Check"
                          size={16}
                          className="text-green-600 ml-2 flex-shrink-0"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        {member.relation}
                      </span>
                      {member.age && (
                        <span className="text-xs text-gray-500">
                          {member.age} лет
                        </span>
                      )}
                      {member.deceased && (
                        <span className="text-xs text-gray-500 italic">
                          ушел из жизни
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FamilyMemberCombobox;
