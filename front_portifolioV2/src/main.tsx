
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import get from './ACTIONS/GET/GET.tsx'
import { setProject } from './projectStore.ts'
import { hydrateAuthSession, setupAuthInterceptor } from './utils/auth.ts'

console.log("start")

hydrateAuthSession()
setupAuthInterceptor()

const project = await get.fetchProject("br")
setProject(project)
console.log(project)

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
