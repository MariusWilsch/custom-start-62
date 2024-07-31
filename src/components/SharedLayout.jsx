import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Search, User, Menu } from "lucide-react";
import { toast } from "sonner";
import { LanguageProvider } from "../contexts/LanguageContext";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LanguageSwitcher from "./molecules/LanguageSwitcher";

const SharedLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('de');
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <LanguageProvider initialLanguage={currentLanguage}>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <header className={cn(
          "sticky top-0 z-30 flex h-14 items-center gap-4 border border-input rounded-lg bg-background px-4 sm:static sm:h-auto sm:px-6 transition-all duration-300",
          isMenuVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        )}>
          <div className="flex items-center justify-end w-full">
            <div className="flex items-center gap-4">
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
              </div>
              <LanguageSwitcher
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => toast("Inquires to: [Ticket#18801]")}>
                    Show Ticket Number
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
    </LanguageProvider>
  );
};

export default SharedLayout;
