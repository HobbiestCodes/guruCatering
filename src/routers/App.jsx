import { Suspense } from 'react'
import Loader from '../components/render/Loader'
import Render from '../components/render/Render'

function App() {

  return (
    <>
    <Suspense fallback={<Loader />}>
      <Render />
    </Suspense>
     {/* <Loader /> */}
    </>
  )
}

export default App
