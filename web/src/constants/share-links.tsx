import { ReactNode } from 'react'
import {
  FiFacebook,
  FiSend,
  FiSmartphone,
  FiTwitter,
  FiLinkedin,
} from 'react-icons/fi'

type SocialNames =
  | 'whatsapp'
  | 'facebook'
  | 'linkedin'
  | 'twitter'
  | 'telegram'
  | undefined

type SocialShareProvider = {
  url: string
  name: SocialNames
  display: string | ReactNode
}

export const SOCIAL_SHARE_MAP: SocialShareProvider[] = [
  {
    url: 'https://www.facebook.com/sharer/sharer.php?u=',
    display: <FiFacebook size={24} />,
    name: 'facebook',
  },
  {
    url: 'https://twitter.com/intent/tweet?url=',
    display: <FiTwitter size={24} />,
    name: 'twitter',
  },
  {
    url: 'https://telegram.me/share/url?url=',
    display: <FiSend size={24} />,
    name: 'telegram',
  },
  {
    url: 'https://api.whatsapp.com/send?text=',
    display: <FiSmartphone size={24} />,
    name: 'whatsapp',
  },
  {
    url: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    display: <FiLinkedin size={24} />,
    name: 'linkedin',
  },
]
