'use client'
import { useOpportunity } from '@/contexts/opportunityContext'
import { Drawer } from '../Drawer'

export function DrawerOpportunity() {
  const { isDrawerOpen, handleCloseDrawer } = useOpportunity()
  return (
    <Drawer.Provider isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
      <Drawer.Overlay>
        <Drawer.Container>SDA</Drawer.Container>
      </Drawer.Overlay>
    </Drawer.Provider>
  )
}
