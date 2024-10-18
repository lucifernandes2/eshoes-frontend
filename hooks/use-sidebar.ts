import { produce } from 'immer'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type SidebarSettings = { disabled: boolean; isHoverOpen: boolean }
type SidebarStore = {
  isOpen: boolean
  isHover: boolean
  settings: SidebarSettings
  toggleOpen: () => void
  setIsOpen: (isOpen: boolean) => void
  setIsHover: (isHover: boolean) => void
  getOpenState: () => boolean
  setSettings: (settings: Partial<SidebarSettings>) => void
}

export const useSidebar = create(
  persist<SidebarStore>(
    (set, get) => ({
      getOpenState: () => {
        const state = get()
        return state.isOpen || (state.settings.isHoverOpen && state.isHover)
      },
      isHover: false,
      isOpen: true,
      setIsHover: (isHover: boolean) => {
        set({ isHover })
      },
      setIsOpen: (isOpen: boolean) => {
        set({ isOpen })
      },
      setSettings: (settings: Partial<SidebarSettings>) => {
        set(
          produce((state: SidebarStore) => {
            state.settings = { ...state.settings, ...settings }
          })
        )
      },
      settings: { disabled: false, isHoverOpen: false },
      toggleOpen: () => {
        set({ isOpen: !get().isOpen })
      }
    }),
    {
      name: 'sidebar',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
