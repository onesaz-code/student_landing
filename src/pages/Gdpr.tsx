import { Navigate } from 'react-router-dom'
import { useActiveSolution } from '../context/ActiveSolutionContext'
import { MdmDocRoute } from './MdmDocRoute'

export function Gdpr() {
  const { activeSolution } = useActiveSolution()
  if (activeSolution === 'mdm') return <Navigate to="/" replace />
  return <MdmDocRoute page="gdpr" />
}
