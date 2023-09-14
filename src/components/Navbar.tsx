import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./Ui/navigation-menu"
import UserGreeting from "./Ui/UserGreeting"


const Navbar = ({className}: {className?: string | undefined}) => {
  return (
    <NavigationMenu className={`${className} mx-auto pt-4 pb-12 px-4 grow-0`}>
      <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <Link href="/zapisy" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Zapisy
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/kompletowanie" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Kompletowanie
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/wydawanie" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Wydawanie
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
            <NavigationMenuItem>
              <UserGreeting className="text-sm" />
            </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navbar

