import {
  curveBasis,
  curveBasisClosed,
  curveBasisOpen,
  curveBundle, curveCardinal,
  curveCardinalClosed,
  curveCardinalOpen,
  curveCatmullRom,
  curveCatmullRomClosed,
  curveCatmullRomOpen,
  curveLinear,
  curveMonotoneX, curveMonotoneY, curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore
} from 'd3'

export const curveInterpolators = {
  linear: curveLinear,
  step: curveStep,
  stepBefore: curveStepBefore,
  stepAfter: curveStepAfter,
  basis: curveBasis,
  basisOpen: curveBasisOpen,
  basisClosed: curveBasisClosed,
  bundle: curveBundle,
  cardinal: curveCardinal,
  cardinalOpen: curveCardinalOpen,
  cardinalClosed: curveCardinalClosed,
  catmullRom: curveCatmullRom.alpha(0.5),
  catmullRomOpen: curveCatmullRomOpen.alpha(0.5),
  catmullRomClosed: curveCatmullRomClosed.alpha(0.5),
  monotoneX: curveMonotoneX,
  monotoneY: curveMonotoneY,
  natural: curveNatural
}
