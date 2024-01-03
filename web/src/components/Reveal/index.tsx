import { ReactNode, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

import {} from 'tailwind-variants'
type RevealProps = {
  children: ReactNode
  to?: 'bottom' | 'top'
  duration?: number
  delay?: number
}
export function Reveal({
  children,
  to = 'top',
  delay = 0.25,
  duration = 0.5,
}: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainController = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainController.start('visible')
    }
  }, [isInView, mainController])
  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: to === 'top' ? 75 : -75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainController}
        transition={{ duration, delay, ease: [0.17, 0.84, 0.44, 1] }}
        // className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}
