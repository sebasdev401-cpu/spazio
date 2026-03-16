import { useEffect, useRef } from 'react'
import Landing from './pages/Landing'

function App() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const follower = followerRef.current
    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursor) {
        cursor.style.left = `${mouseX - 4}px`
        cursor.style.top = `${mouseY - 4}px`
      }
    }

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.08
      followerY += (mouseY - followerY) * 0.08
      if (follower) {
        follower.style.left = `${followerX - 16}px`
        follower.style.top = `${followerY - 16}px`
      }
      requestAnimationFrame(animateFollower)
    }

    window.addEventListener('mousemove', moveCursor)
    animateFollower()

    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  const isTouchDevice = window.matchMedia('(hover: none)').matches

  return (
    <>
      {!isTouchDevice && (
        <>
          <div className="cursor" ref={cursorRef} />
          <div className="cursor-follower" ref={followerRef} />
        </>
      )}
      <Landing />
    </>
  )
}

export default App