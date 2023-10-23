import { SOCIAL_SHARE_MAP } from '@/constants/share-links'
import { ShareItem } from './ShareItem'

type ShareLinksProps = {
  url: string
}
export function ShareList({ url }: ShareLinksProps) {
  return (
    <ul className="flex items-center justify-between mt-8 ">
      {SOCIAL_SHARE_MAP.map((link) => (
        <ShareItem social={link.name} key={link.name} href={link.url + url}>
          {link.display}
        </ShareItem>
      ))}
    </ul>
  )
}
