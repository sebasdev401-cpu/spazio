import { useEffect, useRef, useState, useCallback } from 'react'
import { Box, Text } from '@chakra-ui/react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import { projectsByCountry } from '../../data/projects-by-country'

const COUNTRY_NUMERIC = {
  ECU: 218, CHE: 756, ITA: 380, SAU: 682, MAR: 504, USA: 840,
}

const COUNTRY_CENTERS = {
  ECU: [-78.5, -1.8], CHE: [8.2, 46.8], ITA: [12.5, 42.5],
  SAU: [45.0, 24.0], MAR: [-7.0, 31.8], USA: [-98.0, 38.0],
}

export default function WorldMap({ onSelectCountry }) {
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, name: '', count: 0 })

  const drawMap = useCallback(() => {
    if (!svgRef.current || !containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    if (width === 0 || height === 0) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg
      .attr('width', width)
      .attr('height', height)
      .style('display', 'block')
      .style('background', '#0A0A0A')

    const isMobile = width < 768

    const projection = d3.geoNaturalEarth1()
      .scale(isMobile ? width / 5.5 : width / 6.5)
      .translate([width / 2, isMobile ? height / 2.2 : height / 2])

    const pathGenerator = d3.geoPath().projection(projection)

    const numericToCode = Object.fromEntries(
      Object.entries(COUNTRY_NUMERIC).map(([k, v]) => [v, k])
    )

    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then((world) => {
      const countries = topojson.feature(world, world.objects.countries)

      svg.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('d', pathGenerator)
        .attr('fill', (d) => {
          const code = numericToCode[+d.id]
          return code ? '#2a2a28' : '#0A0A0A'
        })
        .attr('stroke', '#F7F7F5')
        .attr('stroke-width', isMobile ? 0.2 : 0.3)
        .style('cursor', (d) => numericToCode[+d.id] ? 'pointer' : 'default')
        .style('transition', 'fill 0.3s ease')
        // Desktop — hover
        .on('mouseenter', function (event, d) {
          const code = numericToCode[+d.id]
          if (!code) return
          d3.select(this).attr('fill', '#F7F7F5')
          setTooltip({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            name: projectsByCountry[code].name,
            count: projectsByCountry[code].projects.length,
          })
        })
        .on('mousemove', function (event, d) {
          const code = numericToCode[+d.id]
          if (!code) return
          setTooltip((prev) => ({ ...prev, x: event.clientX, y: event.clientY }))
        })
        .on('mouseleave', function (event, d) {
          const code = numericToCode[+d.id]
          if (!code) return
          d3.select(this).attr('fill', '#2a2a28')
          setTooltip({ visible: false, x: 0, y: 0, name: '', count: 0 })
        })
        .on('click', function (event, d) {
          const code = numericToCode[+d.id]
          if (code) onSelectCountry(code)
        })
        // Mobile — touch
        .on('touchstart', function (event, d) {
            const code = numericToCode[+d.id]
            if (!code) return
            if (event.cancelable) event.preventDefault()
            const touch = event.touches[0]
            d3.select(this).attr('fill', '#F7F7F5')
            setTooltip({
                visible: true,
                x: touch.clientX,
                y: touch.clientY,
                name: projectsByCountry[code].name,
                count: projectsByCountry[code].projects.length,
            })
            })
        .on('touchend', function (event, d) {
          const code = numericToCode[+d.id]
          if (!code) return
          if (event.cancelable) event.preventDefault()
          setTooltip({ visible: false, x: 0, y: 0, name: '', count: 0 })
          d3.select(this).attr('fill', '#2a2a28')
          onSelectCountry(code)
        })

      // Puntos sobre países activos
      Object.entries(COUNTRY_CENTERS).forEach(([code, coords]) => {
        const projected = projection(coords)
        if (!projected) return

        svg.append('circle')
          .attr('cx', projected[0])
          .attr('cy', projected[1])
          .attr('r', isMobile ? 4 : 3)
          .attr('fill', '#F7F7F5')
          .attr('opacity', 0.7)
          .style('cursor', 'pointer')
          .style('transition', 'all 0.3s ease')
          .on('mouseenter', function () {
            d3.select(this).attr('r', isMobile ? 6 : 5).attr('opacity', 1)
          })
          .on('mouseleave', function () {
            d3.select(this).attr('r', isMobile ? 4 : 3).attr('opacity', 0.7)
          })
          .on('click', () => onSelectCountry(code))
          .on('touchend', (event) => {
            if (event.cancelable) event.preventDefault()
            onSelectCountry(code)
          })
      })
    })
  }, [onSelectCountry])

  useEffect(() => {
    // Pequeño delay para asegurar que el contenedor tiene dimensiones
    const timeout = setTimeout(drawMap, 100)

    const handleResize = () => drawMap()
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [drawMap])

  return (
    <Box
      ref={containerRef}
      position="relative"
      width="100%"
      height="100%"
      bg="#0A0A0A"
    >
      <svg ref={svgRef} style={{ display: 'block', width: '100%', height: '100%' }} />

      {/* Tooltip — desktop */}
      {tooltip.visible && (
        <Box
          position="fixed"
          left={`${tooltip.x + 16}px`}
          top={`${tooltip.y - 48}px`}
          zIndex={100}
          bg="rgba(10,10,10,0.92)"
          border="1px solid rgba(247,247,245,0.15)"
          px={4}
          py={2}
          pointerEvents="none"
        >
          <Text fontFamily="body" fontSize="10px" letterSpacing="0.2em" textTransform="uppercase" color="white">
            {tooltip.name}
          </Text>
          <Text fontFamily="body" fontSize="9px" letterSpacing="0.1em" color="whiteAlpha.500">
            {tooltip.count} proyecto{tooltip.count > 1 ? 's' : ''}
          </Text>
        </Box>
      )}

      {/* Tooltip mobile — centrado abajo */}
      {tooltip.visible && (
        <Box
          position="absolute"
          bottom="140px"
          left="50%"
          transform="translateX(-50%)"
          zIndex={100}
          bg="rgba(10,10,10,0.92)"
          border="1px solid rgba(247,247,245,0.15)"
          px={5}
          py={3}
          pointerEvents="none"
          display={{ base: 'block', md: 'none' }}
          whiteSpace="nowrap"
        >
          <Text fontFamily="body" fontSize="11px" letterSpacing="0.2em" textTransform="uppercase" color="white" textAlign="center">
            {tooltip.name}
          </Text>
          <Text fontFamily="body" fontSize="10px" letterSpacing="0.1em" color="whiteAlpha.500" textAlign="center">
            {tooltip.count} proyecto{tooltip.count > 1 ? 's' : ''}
          </Text>
        </Box>
      )}
    </Box>
  )
}