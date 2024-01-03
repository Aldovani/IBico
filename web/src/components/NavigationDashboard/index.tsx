'use client'
import { useNavigationDashboard } from './useNavigationDashboard'
import { ActiveLink } from './components/ActiveLink'

export function NavigationDashboard() {
  const { handleMouseLeave, handleMouseEntre, hoverLink, router, LINKS } =
    useNavigationDashboard()
  return (
    <nav className="border-b border-slate-200 max-sm:hidden ">
      <ul
        onMouseLeave={handleMouseLeave}
        className="flex gap-4 relative max-w-screen-xl mx-auto pt-28 px-6 pb-6"
      >
        <span
          style={{
            width: hoverLink.width,
            left: hoverLink.left,
          }}
          className="absolute bottom-0 transition-all h-px translate-y-px  duration-500  bg-blue-900"
        ></span>

        {LINKS.map(({ href, title, pathName }) => (
          <li key={title}>
            <ActiveLink
              href={href}
              onMouseEnter={({ currentTarget: { offsetLeft, clientWidth } }) =>
                handleMouseEntre({
                  left: offsetLeft,
                  width: clientWidth,
                })
              }
              isActive={router === pathName}
            >
              {title}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
