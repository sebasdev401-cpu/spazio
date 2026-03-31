import { useEffect, useRef, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import { projectsByCountry } from '../../data/projects-by-country'

const COUNTRY_NUMERIC = {
  ECU: 218, CHE: 756, ITA: 380, SAU: 682, MAR: 504, USA: 840,
}

const COUNTRY_CENTERS = {
  ECU: [-78.5, -1.8],
  CHE: [8.2, 46.8],
  ITA: [12.5, 42.5],
  SAU: [45.0, 24.0],
  MAR: [-7.0, 31.8],
  USA: [-98.0, 38.0],
}

export default function WorldMap({ onSelectProject, onCountryChange  }) {
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const isMobile = window.innerWidth < 768

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    const svg = d3.select(svgRef.current)
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    svg.selectAll('*').remove()
    svg
      .attr('width', width)
      .attr('height', height)
      .style('background', '#0A0A0A')

    // Proyección que excluye polo sur
    const boundsGeoJSON = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-180, 75], [180, 75], [180, -56], [-180, -56], [-180, 75],
        ]],
      },
    }

    const projection = d3.geoNaturalEarth1()
      .fitSize([width, height], boundsGeoJSON)

    // Elimina espacio muerto desktop
    if (!isMobile) {
      const topLeftY = projection([-180, 75])[1]
      const bottomRightY = projection([180, -56])[1]
      const mapHeight = bottomRightY - topLeftY
      const currentTranslate = projection.translate()
      const heightScale = height / mapHeight
      const newScale = projection.scale() * heightScale
      const newTranslateY = currentTranslate[1] * heightScale - topLeftY * heightScale
      projection.scale(newScale).translate([currentTranslate[0], newTranslateY])
    }

    const path = d3.geoPath().projection(projection)

    const initialScale = projection.scale()
    const initialTranslate = projection.translate()

    // Capas
    const mapLayer = svg.append('g')
    const markersLayer = svg.append('g')
    const countryMarkersLayer = svg.append('g')

    const numericToCode = Object.fromEntries(
      Object.entries(COUNTRY_NUMERIC).map(([k, v]) => [v, k])
    )

    const drawWorldMarkers = () => {
      markersLayer.selectAll('*').remove()

      Object.entries(COUNTRY_CENTERS).forEach(([code, coords]) => {
        const projected = projection(coords)
        if (!projected) return

        markersLayer.append('circle')
          .attr('cx', projected[0])
          .attr('cy', projected[1])
          .attr('r', isMobile ? 4 : 3)
          .attr('fill', '#F7F7F5')
          .attr('opacity', 0.7)
          .style('cursor', 'pointer')
          .on('mouseenter', function () { d3.select(this).attr('r', isMobile ? 6 : 5).attr('opacity', 1) })
          .on('mouseleave', function () { d3.select(this).attr('r', isMobile ? 4 : 3).attr('opacity', 0.7) })
          .on('click', () => zoomToCountry(code))
          .on('touchend', (e) => { if (e.cancelable) e.preventDefault(); zoomToCountry(code) })
      })
    }

    const showCountryMarkers = (code) => {
      countryMarkersLayer.selectAll('*').remove()
      const country = projectsByCountry[code]
      if (!country) return

      country.projects.forEach((project, i) => {
        const projected = projection(project.coordinates)
        if (!projected) return

        const g = countryMarkersLayer.append('g')
          .style('cursor', 'pointer')
          .attr('opacity', 0)

        g.transition().delay(i * 80).duration(400).attr('opacity', 1)

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
          .on('mouseenter', function () { d3.select(this).attr('r', isMobile ? 10 : 7) })
          .on('mouseleave', function () { d3.select(this).attr('r', isMobile ? 8 : 5) })
          .on('click', () => onSelectProject && onSelectProject(project.id))
          .on('touchend', (e) => {
            if (e.cancelable) e.preventDefault()
            onSelectProject && onSelectProject(project.id)
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

        // Área táctil mobile
        if (isMobile) {
          g.append('circle')
            .attr('cx', projected[0])
            .attr('cy', projected[1])
            .attr('r', 30)
            .attr('fill', 'transparent')
            .on('touchend', (e) => {
              if (e.cancelable) e.preventDefault()
              onSelectProject && onSelectProject(project.id)
            })
            .on('click', () => onSelectProject && onSelectProject(project.id))
        }
      })
    }

    const zoomToCountry = (code) => {
      setSelectedCountry(code)
      onCountryChange && onCountryChange(code)
      markersLayer.selectAll('*').remove()
      mapLayer.style('pointer-events', 'none')

      const coords = COUNTRY_CENTERS[code]
      const zoomFactor = isMobile ? 3 : 3.5
      const currentProjected = projection(coords)
      const currentScale = projection.scale()
      const currentTx = projection.translate()[0]
      const currentTy = projection.translate()[1]

      // En mobile usamos el ancho visible de la pantalla, no 900px
      const targetWidth = isMobile ? window.innerWidth : width
      const targetHeight = isMobile ? window.innerHeight - 64 : height

      const newScale = initialScale * zoomFactor
      const newTx = targetWidth / 2 + (currentTx - width / 2) * zoomFactor - (currentProjected[0] - width / 2) * zoomFactor
      const newTy = targetHeight / 2 + (currentTy - height / 2) * zoomFactor - (currentProjected[1] - height / 2) * zoomFactor

      svg.transition()
        .duration(1200)
        .ease(d3.easeCubicInOut)
        .tween('zoom', () => {
          const s = d3.interpolate(currentScale, newScale)
          const tx = d3.interpolate(currentTx, newTx)
          const ty = d3.interpolate(currentTy, newTy)

          return (t) => {
            projection.scale(s(t)).translate([tx(t), ty(t)])
            mapLayer.selectAll('path').attr('d', path)
          }
        })
        .on('end', () => showCountryMarkers(code))
    }

    const reset = () => {
      setSelectedCountry(null)
      onCountryChange && onCountryChange(null)
      countryMarkersLayer.selectAll('*').remove()

      // En mobile el contenedor vuelve a 900px — redibujamos
      svg.transition()
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .tween('zoomOut', () => {
          const s = d3.interpolate(projection.scale(), initialScale)
          const tx = d3.interpolate(projection.translate()[0], initialTranslate[0])
          const ty = d3.interpolate(projection.translate()[1], initialTranslate[1])

          return (t) => {
            projection.scale(s(t)).translate([tx(t), ty(t)])
            mapLayer.selectAll('path').attr('d', path)
          }
        })
        .on('end', () => {
          mapLayer.style('pointer-events', 'auto')
          drawWorldMarkers()
        })
    }

    svg.node().__reset = reset

    // Dibujar mapa
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json').then((world) => {
      const countries = topojson.feature(world, world.objects.countries)

      mapLayer.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', (d) => {
          const code = numericToCode[+d.id]
          return code ? '#2a2a28' : '#111110'
        })
        .attr('stroke', '#F7F7F5')
        .attr('stroke-width', 0.3)
        .style('cursor', (d) => numericToCode[+d.id] ? 'pointer' : 'default')
        .on('mouseenter', function (event, d) {
          const code = numericToCode[+d.id]
          if (!code) return
          d3.select(this).attr('fill', '#F7F7F5')
        })
        .on('mouseleave', function (event, d) {
          const code = numericToCode[+d.id]
          if (!code) return
          d3.select(this).attr('fill', '#2a2a28')
        })
        .on('click', (event, d) => {
          const code = numericToCode[+d.id]
          if (code) zoomToCountry(code)
        })
        .on('touchend', (event, d) => {
          const code = numericToCode[+d.id]
          if (!code) return
          if (event.cancelable) event.preventDefault()
          zoomToCountry(code)
        })

      // Clip polo sur en mobile
      if (isMobile) {
        const defs = svg.append('defs')
        defs.append('clipPath')
          .attr('id', 'map-clip')
          .append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', width * 3)
          .attr('height', height * 0.74)
        mapLayer.attr('clip-path', 'url(#map-clip)')
        markersLayer.attr('clip-path', 'url(#map-clip)')
        countryMarkersLayer.attr('clip-path', 'url(#map-clip)')
      }

      drawWorldMarkers()
    })
  }, [])

  const handleBack = () => {
    svgRef.current?.__reset()
  }

  const country = projectsByCountry[selectedCountry]

  return (
    <Box ref={containerRef} position="relative" width="100%" height="100%" bg="#0A0A0A">
      <svg ref={svgRef} style={{ width: '100%', height: '100%', display: 'block' }} />

      {/* UI del país — solo visible cuando hay país seleccionado */}
      {country && (
        <>
          {/* Nombre del país */}
          <Box
            position="absolute"
            top={{ base: '8px', md: '24px' }}
            left="50%"
            transform="translateX(-50%)"
            zIndex={10}
            textAlign="center"
            pointerEvents="none"
          >
            <Text
              fontFamily="heading"
              fontSize={{ base: 'md', md: '2xl' }}
              fontWeight="300"
              color="white"
              whiteSpace="nowrap"
            >
              {country.name}
            </Text>
          </Box>

          {/* Lista proyectos — esquina inferior derecha */}
          <Box
            position="absolute"
            bottom={{ base: '60px', md: '100px' }}
            right={{ base: '8px', md: '24px' }}
            zIndex={10}
            display="flex"
            flexDirection="column"
            gap={1}
            alignItems="flex-end"
            maxWidth={{ base: '140px', md: '240px' }}
          >
            {country.projects.map((project) => (
              <Box
                key={project.id}
                onClick={() => onSelectProject && onSelectProject(project.id)}
                cursor="pointer"
                border="1px solid rgba(247,247,245,0.2)"
                px={{ base: 2, md: 5 }}
                py={{ base: 1, md: 3 }}
                _hover={{ borderColor: 'rgba(247,247,245,0.7)', bg: 'rgba(247,247,245,0.05)' }}
                transition="all 0.3s ease"
                textAlign="right"
              >
                <Text
                  fontFamily="body"
                  fontSize={{ base: '7px', md: '9px' }}
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  color="whiteAlpha.500"
                  mb="2px"
                >
                  {project.city}
                </Text>
                <Text
                  fontFamily="heading"
                  fontSize={{ base: '10px', md: 'md' }}
                  fontWeight="300"
                  color="white"
                >
                  {project.title}
                </Text>
              </Box>
            ))}
          </Box>

          {/* Botón volver — esquina inferior izquierda */}
          <Box
            position="absolute"
            bottom={{ base: '16px', md: '24px' }}
            left={{ base: '12px', md: '24px' }}
            zIndex={10}
            onClick={handleBack}
            cursor="pointer"
            display="flex"
            alignItems="center"
            gap={2}
            opacity={0.5}
            _hover={{ opacity: 1 }}
            transition="opacity 0.3s ease"
          >
            <Box width="20px" height="1px" bg="white" />
            <Text
              fontFamily="body"
              fontSize={{ base: '8px', md: '10px' }}
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="white"
            >
              ← Mundo
            </Text>
          </Box>
        </>
      )}
    </Box>
  )
}