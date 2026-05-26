import * as React from 'react'

export type MarketingSolution = 'lms' | 'erp' | 'mdm'

type ActiveSolutionContextValue = {
  activeSolution: MarketingSolution
  setActiveSolution: React.Dispatch<React.SetStateAction<MarketingSolution>>
}

const ActiveSolutionContext = React.createContext<ActiveSolutionContextValue | null>(null)

export function ActiveSolutionProvider({ children }: { children: React.ReactNode }) {
  const [activeSolution, setActiveSolution] = React.useState<MarketingSolution>('mdm')
  const value = React.useMemo(() => ({ activeSolution, setActiveSolution }), [activeSolution])
  return <ActiveSolutionContext.Provider value={value}>{children}</ActiveSolutionContext.Provider>
}

export function useActiveSolution() {
  const ctx = React.useContext(ActiveSolutionContext)
  if (!ctx) throw new Error('useActiveSolution must be used within ActiveSolutionProvider')
  return ctx
}
