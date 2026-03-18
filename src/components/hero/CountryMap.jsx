import { useEffect, useRef, useCallback } from 'react'
import { Box, Text } from '@chakra-ui/react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import { projectsByCountry } from '../../data/projects-by-country'

const COUNTRY_NUMERIC = {
  ECU: 218, CHE: 756, ITA: 380, SAU: 682, MAR: 504, USA: 840,
}

const COUNTRY_CONFIG = {
  ECU: { scale: 1800, center: [-78.5, -1.8] },
  CHE: { scale: 6000, center: [8.2, 46.8] },
  ITA: { scale: 1800, center: [12.5, 42.5] },
  SAU: { scale: 600,  center: [45.0, 24.0] },
  MAR: { scale: 1000, center: [-7.0, 31.8] },
  USA: { scale: 500,  center: [-98.0, 38.0] },
}

export default function CountryMap({ countryCode, onSelectProject, onBack }) {
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const country = projectsByCountry[countryCode]
  const config = COUNTRY_CONFIG[countryCode]

  const drawMap = useCallback(() => {
    if (!svgRef.current || !containerRef.current || !country) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    if (width === 0 || height === 0) return

    const isMobile = width < 768
    const mobileScale = isMobile ? config.scale * 0.55 : config.scale

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg
      .attr('width', width)
      .attr('height', height)
      .style('display', 'block')
      .style('background', '#0A0A0A')

    const projection = d3.geoMercator()
      .scale(mobileScale)
      .center(config.center)
      .translate([width / 2, height / 2])

    const pathGenerator = d3.geoPath().projection(projection)
    const targetNumeric = COUNTRY_NUMERIC[countryCode]

    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json').then((world) => {
      const countries = topojson.feature(world, world.objects.countries)

      svg.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('d', pathGenerator)
        .attr('fill', (d) => +d.id === targetNumeric ? '#1a1a18' : '#0A0A0A')
        .attr('stroke', '#F7F7F5')
        .attr('stroke-width', (d) => +d.id === targetNumeric ? 0.5 : 0.15)
        .attr('opacity', (d) => +d.id === targetNumeric ? 1 : 0.25)

      // Marcadores
      country.projects.forEach((project) => {
        const projected = projection(project.coordinates)
        if (!projected) return

        const g = svg.append('g')
          .style('cursor', 'pointer')

        // Pulso
        g.append('circle')
          .attr('cx', projected[0])
          .attr('cy', projected[1])
          .attr('r', isMobile ? 16 : 12)
          .attr('fill', 'none')
          .attr('stroke', '#F7F7F5')
          .attr('stroke-width', 0.5)
          .attr('opacity', 0.3)

        // Punto
        g.append('circle')
          .attr('cx', projected[0])
          .attr('cy', projected[1])
          .attr('r', isMobile ? 8 : 5)
          .attr('fill', '#F7F7F5')
          .attr('opacity', 0.9)
          .on('mouseenter', function () {
            d3.select(this).attr('r', isMobile ? 10 : 7)
          })
          .on('mouseleave', function () {
            d3.select(this).attr('r', isMobile ? 8 : 5)
          })
          .on('click', () => onSelectProject(project.id))
          .on('touchend', (event) => {
            event.preventDefault()
            onSelectProject(project.id)
          })

        // Ciudad
        g.append('text')
          .attr('x', projected[0])
          .attr('y', projected[1] - (isMobile ? 24 : 18))
          .attr('text-anchor', 'middle')
          .attr('fill', '#F7F7F5')
          .attr('font-size', isMobile ? '12px' : '10px')
          .attr('font-family', 'Montserrat, sans-serif')
          .attr('letter-spacing', '0.15em')
          .attr('opacity', 0.8)
          .style('pointer-events', 'none')
          .text(project.city)

        // Proyecto
        g.append('text')
          .attr('x', projected[0])
          .attr('y', projected[1] - (isMobile ? 10 : 6))
          .attr('text-anchor', 'middle')
          .attr('fill', '#F7F7F5')
          .attr('font-size', isMobile ? '10px' : '9px')
          .attr('font-family', 'Montserrat, sans-serif')
          .attr('letter-spacing', '0.1em')
          .attr('opacity', 0.5)
          .style('pointer-events', 'none')
          .text(project.title)

        // Área táctil invisible más grande en mobile
        if (isMobile) {
          g.append('circle')
            .attr('cx', projected[0])
            .attr('cy', projected[1])
            .attr('r', 30)
            .attr('fill', 'transparent')
            .on('touchend', (event) => {
              event.preventDefault()
              onSelectProject(project.id)
            })
            .on('click', () => onSelectProject(project.id))
        }
      })
    })
  }, [countryCode, country, config, onSelectProject])

  useEffect(() => {
    const timeout = setTimeout(drawMap, 100)
    const handleResize = () => drawMap()
    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [drawMap])

  if (!country) return null

  return (
    <Box ref={containerRef} position="relative" width="100%" height="100%" bg="#0A0A0A">
      <svg ref={svgRef} style={{ display: 'block', width: '100%', height: '100%' }} />

      {/* Nombre del país */}
      <Box
        position="absolute"
        top={{ base: '16px', md: '24px' }}
        left="50%"
        transform="translateX(-50%)"
        zIndex={10}
      >
        <Text
          fontFamily="heading"
          fontSize={{ base: 'lg', md: '2xl' }}
          fontWeight="300"
          fontStyle="italic"
          color="white"
          textAlign="center"
          whiteSpace="nowrap"
        >
          {country.name}
        </Text>
      </Box>

      {/* Lista proyectos — derecha */}
      <Box
        position="absolute"
        bottom={{ base: '80px', md: '100px' }}
        right={{ base: '12px', md: '24px' }}
        zIndex={10}
        display="flex"
        flexDirection="column"
        gap={2}
        alignItems="flex-end"
      >
        {country.projects.map((project) => (
          <Box
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            cursor="pointer"
            border="1px solid rgba(247,247,245,0.2)"
            px={{ base: 3, md: 5 }}
            py={{ base: 2, md: 3 }}
            _hover={{ borderColor: 'rgba(247,247,245,0.7)', bg: 'rgba(247,247,245,0.05)' }}
            transition="all 0.3s ease"
            textAlign="right"
          >
            <Text fontFamily="body" fontSize="9px" letterSpacing="0.2em" textTransform="uppercase" color="whiteAlpha.500" mb={1}>
              {project.city}
            </Text>
            <Text fontFamily="heading" fontSize={{ base: 'sm', md: 'md' }} fontWeight="300" fontStyle="italic" color="white">
              {project.title}
            </Text>
          </Box>
        ))}
      </Box>

      {/* Botón volver — izquierda abajo */}
      <Box
        position="absolute"
        bottom={{ base: '24px', md: '24px' }}
        left={{ base: '16px', md: '24px' }}
        zIndex={10}
        onClick={onBack}
        cursor="pointer"
        display="flex"
        alignItems="center"
        gap={3}
        opacity={0.6}
        _hover={{ opacity: 1 }}
        transition="opacity 0.3s ease"
      >
        <Box width="30px" height="1px" bg="white" />
        <Text fontFamily="body" fontSize="10px" letterSpacing="0.25em" textTransform="uppercase" color="white">
          ← Mundo
        </Text>
      </Box>
    </Box>
  )
}