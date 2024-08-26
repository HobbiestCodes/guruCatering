import { Suspense } from 'react'
import Render from '../components/render/Render'
import Tea from '../components/ui/loader/tea'

function App() {

  return (
    <>
    <Suspense fallback={<Tea />}>
      <Render />
    </Suspense>
    </>
  )
}

export default App
