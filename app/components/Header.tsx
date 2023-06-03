import appconfig from '@/appconfig'
import { UserNav } from './UserNav'

export default function Header() {
  return (
    <header className="h-14 p-4 text-xl text-gray-500 dark:text-gray-300 bg-gray-200">
      {appconfig.siteName}
      <UserNav />
    </header>)
}
