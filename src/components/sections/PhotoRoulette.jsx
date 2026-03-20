import { Box, Text } from '@chakra-ui/react'
import { useState, useEffect, useRef, useCallback } from 'react'

const photos = [
  {
    id: 1,
    title: 'Casa Lago',
    type: 'image',
    src: '/images/renders/Scene%201_4.jpg',
  },
  {
    id: 2,
    title: 'Casa Abuga',
    type: 'image',
    src: '/images/renders/image.png',
  },
  {
    id: 3,
    title: 'Oasis House',
    type: 'image',
    src: '/images/renders/IMG_4831.jpg',
  },
  {
    id: 4,
    title: 'Sfizio Kitchen School',
    type: 'image',
    src: '/images/renders/ai-render-1778376.jpg',
  },
  {
    id: 5,
    title: 'Villa Teresa',
    type: 'image',
    src: '/images/renders/IMG_4457.jpg',
  },
  {
    id: 6,
    title: 'Villa Tatari',
    type: 'image',
    src: '/images/renders/villa_tatari.jpg',
  },
]

export default function PhotoRoulette() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef(null)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  const goTo = useCallback((index) => {
    if (animating) return
    setAnimating(true)
    setPrev(current)
    setCurrent(index)
    setTimeout(() => {
      setPrev(null)
      setAnimating(false)
    }, 900)
  }, [animating, current])

  const next = useCallback(() => {
    goTo((current + 1) % photos.length)
  }, [current, goTo])

  const prev_ = useCallback(() => {
    goTo((current - 1 + photos.length) % photos.length)
  }, [current, goTo])

  // Auto avance
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000)
    return () => clearInterval(intervalRef.current)
  }, [next])

  // Reset timer al navegar manualmente
  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, 5000)
  }, [next])

  const handleNext = () => { next(); resetTimer() }
  const handlePrev = () => { prev_(); resetTimer() }

  // Swipe touch
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current)
    if (Math.abs(dx) > 50 && dy < 80) {
      dx > 0 ? handlePrev() : handleNext()
    }
    touchStartX.current = null
  }

  // Click en mitad izquierda/derecha
  const handleClick = (e) => {
    const x = e.clientX
    const mid = window.innerWidth / 2
    x < mid ? handlePrev() : handleNext()
  }

  return (
    <Box
      id="inicio"
      className="scroll-section"
      position="relative"
      width="100%"
      height="100svh"
      overflow="hidden"
      bg="#0A0A0A"
      cursor="none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {/* Foto anterior — sale */}
      {prev !== null && (
        <Box
          position="absolute"
          inset="0"
          zIndex={1}
          backgroundImage={`url('${photos[prev].image}')`}
          backgroundSize="cover"
          backgroundPosition="center"
          opacity={0}
          transition="opacity 0.9s ease"
        />
      )}

      {/* Foto actual — entra */}
      {photos.map((photo, i) => (
        <Box
          key={photo.id}
          position="absolute"
          inset="0"
          zIndex={i === current ? 2 : 0}
          opacity={i === current ? 1 : 0}
          transition="opacity 0.9s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#0A0A0A"
        >
          {photo.type === 'video' ? (
            <Box
              as="video"
              autoPlay
              muted
              loop
              playsInline
              position="absolute"
              inset="0"
              width="100%"
              height="100%"
              style={{
                objectFit: 'contain',
                filter: 'brightness(0.65)',
              }}
            >
              <source src={photo.src} type="video/mp4" />
            </Box>
          ) : (
            <Box
              as="img"
              src={photo.src}
              alt={photo.title}
              maxWidth="100%"
              maxHeight="100%"
              width="auto"
              height="auto"
              style={{
                objectFit: 'contain',
                filter: 'brightness(0.65)',
              }}
            />
          )}
        </Box>
      ))}

      {/* Overlay gradiente */}
      <Box
        position="absolute"
        inset="0"
        zIndex={3}
        pointerEvents="none"
        background="linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.1) 50%, rgba(10,10,10,0.75) 100%)"
      />

      {/* Título del proyecto */}
      <Box
        position="absolute"
        zIndex={4}
        bottom={{ base: '100px', md: '120px' }}
        left={{ base: 6, md: 16, lg: 24 }}
        pointerEvents="none"
      >
        <Text
          fontFamily="body"
          fontSize="9px"
          letterSpacing="0.35em"
          textTransform="uppercase"
          color="whiteAlpha.500"
          mb={3}
        >
          {String(current + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
        </Text>
        <Text
          fontFamily="heading"
          fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
          fontWeight="300"
          fontStyle="italic"
          color="white"
          lineHeight="1"
          key={current}
          style={{
            animation: 'fadeSlideUp 0.8s ease forwards',
          }}
        >
          {photos[current].title}
        </Text>
      </Box>

      {/* Indicadores */}
      <Box
        position="absolute"
        zIndex={4}
        bottom={{ base: '32px', md: '40px' }}
        left="50%"
        transform="translateX(-50%)"
        display="flex"
        gap={2}
        pointerEvents="none"
      >
        {photos.map((_, i) => (
          <Box
            key={i}
            width={i === current ? '24px' : '6px'}
            height="1px"
            bg="white"
            opacity={i === current ? 1 : 0.3}
            transition="all 0.4s ease"
          />
        ))}
      </Box>

      {/* Flechas desktop */}
      <Box
        position="absolute"
        zIndex={4}
        bottom={{ base: '28px', md: '36px' }}
        right={{ base: 6, md: 16 }}
        display={{ base: 'none', md: 'flex' }}
        gap={6}
        pointerEvents="auto"
      >
        <Box
          onClick={(e) => { e.stopPropagation(); handlePrev() }}
          cursor="none"
          opacity={0.5}
          _hover={{ opacity: 1 }}
          transition="opacity 0.3s ease"
        >
          <Text fontFamily="body" fontSize="10px" letterSpacing="0.2em" textTransform="uppercase" color="white">
            ← Anterior
          </Text>
        </Box>
        <Box
          onClick={(e) => { e.stopPropagation(); handleNext() }}
          cursor="none"
          opacity={0.5}
          _hover={{ opacity: 1 }}
          transition="opacity 0.3s ease"
        >
          <Text fontFamily="body" fontSize="10px" letterSpacing="0.2em" textTransform="uppercase" color="white">
            Siguiente →
          </Text>
        </Box>
      </Box>

      {/* Animación CSS */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  )
}