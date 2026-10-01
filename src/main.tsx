import { createRoot } from 'react-dom/client'
// New ONESAZ landing page. The previous app (./App) stays in the repo until the clean-up commit.
import App from './landing/LandingApp'
import './index.css'

createRoot(document.getElementById('root')!).render(<App />)
