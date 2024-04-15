export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180)
}

export const createSectorPath = (
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
): string => {
  const startAngleRad = degreesToRadians(startAngle)
  const endAngleRad = degreesToRadians(endAngle)

  // Determine the start and end points for both the inner and outer radius
  const innerStartX = innerRadius * Math.cos(startAngleRad)
  const innerStartY = innerRadius * Math.sin(startAngleRad)
  const innerEndX = innerRadius * Math.cos(endAngleRad)
  const innerEndY = innerRadius * Math.sin(endAngleRad)

  const outerStartX = outerRadius * Math.cos(startAngleRad)
  const outerStartY = outerRadius * Math.sin(startAngleRad)
  const outerEndX = outerRadius * Math.cos(endAngleRad)
  const outerEndY = outerRadius * Math.sin(endAngleRad)

  // Determine if the arc should be drawn as a large arc or not
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  // Create the d attribute for the path
  return `
    M ${innerStartX} ${innerStartY} 
    L ${outerStartX} ${outerStartY}
    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}
    L ${innerEndX} ${innerEndY}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
    Z
  `
}

export const getTextAnchor = (angle: number): 'start' | 'middle' | 'end' => {
  if ((angle > 0 && angle < 75) || (angle > 285)) {
    return 'start'
  } else if (angle > 105 && angle < 255) {
    return 'end'
  } else {
    return 'middle'
  }
}
