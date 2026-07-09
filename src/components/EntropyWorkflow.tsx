import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import {
  type MotionValue,
  motion,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import './EntropyWorkflow.css'

type NodeDef = {
  id: string
  label: string
  sub: string
  icon: string
  highlight?: boolean
  chaos: { x: number; y: number; z: number; rx: number; ry: number; rz: number }
  final: { x: number; y: number }
}

const NODES: NodeDef[] = [
  {
    id: 'catalog',
    label: 'Каталог',
    sub: 'товары',
    icon: '▦',
    chaos: { x: -520, y: -280, z: 480, rx: 42, ry: -58, rz: -22 },
    final: { x: 8, y: 42 },
  },
  {
    id: 'card',
    label: 'Карточка',
    sub: 'выбор',
    icon: '◫',
    chaos: { x: 480, y: -320, z: 360, rx: -28, ry: 48, rz: 26 },
    final: { x: 24, y: 30 },
  },
  {
    id: 'order',
    label: 'Заявка',
    sub: 'форма',
    icon: '✎',
    chaos: { x: -320, y: 260, z: 420, rx: 24, ry: -36, rz: -12 },
    final: { x: 40, y: 46 },
  },
  {
    id: 'crm',
    label: 'CRM',
    sub: 'клиенты',
    icon: '➤',
    chaos: { x: 560, y: 80, z: 300, rx: -36, ry: 22, rz: 18 },
    final: { x: 62, y: 28 },
  },
  {
    id: 'admin',
    label: 'Админка',
    sub: 'статусы',
    icon: '☰',
    chaos: { x: 120, y: 340, z: 380, rx: 32, ry: -50, rz: -28 },
    final: { x: 62, y: 64 },
  },
  {
    id: 'sales',
    label: 'Стабильные продажи',
    sub: 'результат',
    icon: '↗',
    highlight: true,
    chaos: { x: 720, y: 40, z: 260, rx: -18, ry: 32, rz: 10 },
    final: { x: 88, y: 46 },
  },
]

const DEBRIS = [
  { id: 'd1', text: 'сколько?', x: -580, y: -80, z: 520, rz: 14 },
  { id: 'd2', text: 'прайс.xlsx', x: 620, y: -200, z: 460, rz: -10 },
  { id: 'd3', text: 'не ответили', x: -420, y: 320, z: 400, rz: -16 },
  { id: 'd4', text: 'фото?', x: 480, y: 280, z: 540, rz: 8 },
  { id: 'd5', text: 'перезвони', x: -80, y: -360, z: 600, rz: -6 },
  { id: 'd6', text: 'а цена?', x: 200, y: 380, z: 480, rz: 12 },
]

type EdgeSide = 'left' | 'right' | 'top' | 'bottom'

type EdgeSpec = {
  from: string
  to: string
  fromSide: EdgeSide
  fromRatio?: number
  toSide: EdgeSide
  toRatio?: number
}

const EDGE_SPECS: EdgeSpec[] = [
  { from: 'catalog', to: 'card', fromSide: 'right', toSide: 'left' },
  { from: 'card', to: 'order', fromSide: 'right', toSide: 'left' },
  { from: 'order', to: 'crm', fromSide: 'right', fromRatio: 0.35, toSide: 'left' },
  { from: 'order', to: 'admin', fromSide: 'right', fromRatio: 0.65, toSide: 'left' },
  { from: 'crm', to: 'sales', fromSide: 'right', toSide: 'left', toRatio: 0.35 },
  { from: 'admin', to: 'sales', fromSide: 'right', toSide: 'left', toRatio: 0.65 },
]

type EdgePath = { id: string; d: string; outcome: boolean }

function edgeAnchor(rect: DOMRect, side: EdgeSide, ratio = 0.5) {
  switch (side) {
    case 'left':
      return { x: rect.left, y: rect.top + rect.height * ratio }
    case 'right':
      return { x: rect.right, y: rect.top + rect.height * ratio }
    case 'top':
      return { x: rect.left + rect.width * ratio, y: rect.top }
    case 'bottom':
      return { x: rect.left + rect.width * ratio, y: rect.bottom }
  }
}

function insetAlongLine(
  start: { x: number; y: number },
  end: { x: number; y: number },
  insetPx: number,
) {
  const dx = end.x - start.x
  const dy = end.y - start.y
  const len = Math.hypot(dx, dy)
  if (len <= insetPx) return end
  const t = insetPx / len
  return { x: end.x - dx * t, y: end.y - dy * t }
}

function toViewBox(point: { x: number; y: number }, box: DOMRect) {
  return {
    x: ((point.x - box.left) / box.width) * 100,
    y: ((point.y - box.top) / box.height) * 100,
  }
}

function buildEdgePaths(container: HTMLElement): EdgePath[] {
  const box = container.getBoundingClientRect()
  if (box.width < 1 || box.height < 1) return []

  const nodeRect = (id: string) => {
    const el = container.querySelector<HTMLElement>(`[data-node-id="${id}"]`)
    return el?.getBoundingClientRect() ?? null
  }

  return EDGE_SPECS.flatMap((spec) => {
    const fromRect = nodeRect(spec.from)
    const toRect = nodeRect(spec.to)
    if (!fromRect || !toRect) return []

    const start = edgeAnchor(fromRect, spec.fromSide, spec.fromRatio)
    let end = edgeAnchor(toRect, spec.toSide, spec.toRatio)
    const outcome = spec.to === 'sales'
    if (outcome) {
      end = insetAlongLine(start, end, 2)
    }

    const a = toViewBox(start, box)
    const b = toViewBox(end, box)

    return [
      {
        id: `${spec.from}-${spec.to}`,
        d: `M ${a.x} ${a.y} L ${b.x} ${b.y}`,
        outcome,
      },
    ]
  })
}

type EntropyWorkflowProps = {
  progress: MotionValue<number>
  full?: boolean
}

export function EntropyWorkflow({ progress, full = false }: EntropyWorkflowProps) {
  const worldRef = useRef<HTMLDivElement>(null)
  const gridOpacity = useTransform(progress, [0.35, 0.65], [0, 0.5])
  const worldRotateX = useTransform(progress, [0, 0.55, 1], [22, 10, 0])
  const worldRotateY = useTransform(progress, [0, 0.55, 1], [-18, -6, 0])
  const worldScale = useTransform(progress, [0, 0.5, 1], [0.82, 0.92, 1])
  const entropyLabel = useTransform(progress, [0, 0.2, 0.4], [1, 0.35, 0])

  return (
    <div className={`entropy${full ? ' entropy--full' : ''}`}>
      <motion.div className="entropy__grid-bg" style={{ opacity: gridOpacity }} aria-hidden />

      <motion.div className="entropy__entropy-tag" style={{ opacity: entropyLabel }} aria-hidden>
        entropy
      </motion.div>

      <motion.div
        ref={worldRef}
        className="entropy__world"
        style={{
          rotateX: worldRotateX,
          rotateY: worldRotateY,
          scale: worldScale,
        }}
      >
        {DEBRIS.map((d) => (
          <Debris key={d.id} item={d} progress={progress} />
        ))}
        {NODES.map((node) => (
          <WorkflowNode key={node.id} node={node} progress={progress} />
        ))}
        <WorkflowEdges worldRef={worldRef} progress={progress} />
      </motion.div>
    </div>
  )
}

function WorkflowNode({ node, progress }: { node: NodeDef; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 0.55, 1], [node.chaos.x, node.chaos.x * 0.1, 0])
  const y = useTransform(progress, [0, 0.55, 1], [node.chaos.y, node.chaos.y * 0.1, 0])
  const z = useTransform(progress, [0, 0.55, 1], [node.chaos.z, node.chaos.z * 0.12, 0])
  const rotateX = useTransform(progress, [0, 0.55, 1], [node.chaos.rx, node.chaos.rx * 0.12, 0])
  const rotateY = useTransform(progress, [0, 0.55, 1], [node.chaos.ry, node.chaos.ry * 0.12, 0])
  const rotateZ = useTransform(progress, [0, 0.55, 1], [node.chaos.rz, node.chaos.rz * 0.12, 0])
  const opacity = useTransform(progress, [0, 0.1, 0.55, 1], [0.45, 0.75, 1, 1])
  const outcomeGlow = useTransform(progress, [0.72, 1], [0, 1])
  const boxShadow = useTransform(outcomeGlow, (v) =>
    node.highlight ? `0 0 0 ${1 + v}px rgba(255, 255, 255, ${0.55 + v * 0.45})` : 'none',
  )

  return (
    <motion.div
      className={`entropy__node${node.highlight ? ' entropy__node--outcome' : ''}`}
      data-node-id={node.id}
      style={{
        x,
        y,
        z,
        rotateX,
        rotateY,
        rotateZ,
        opacity,
        boxShadow: node.highlight ? boxShadow : undefined,
        left: `${node.final.x}%`,
        top: `${node.final.y}%`,
      }}
    >
      <div className="entropy__node-icon">{node.icon}</div>
      <div className="entropy__node-body">
        <strong>{node.label}</strong>
        <span>{node.sub}</span>
      </div>
    </motion.div>
  )
}

function Debris({
  item,
  progress,
}: {
  item: (typeof DEBRIS)[0]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, [0, 0.12, 0.4], [1, 0.75, 0])
  const scale = useTransform(progress, [0, 0.4], [1, 0.5])
  const z = useTransform(progress, [0, 0.4], [item.z, item.z * 0.2])

  return (
    <motion.div
      className="entropy__debris"
      style={{
        x: item.x,
        y: item.y,
        z,
        rotateZ: item.rz,
        opacity,
        scale,
        left: '50%',
        top: '50%',
      }}
    >
      {item.text}
    </motion.div>
  )
}

function WorkflowEdges({
  worldRef,
  progress,
}: {
  worldRef: React.RefObject<HTMLDivElement | null>
  progress: MotionValue<number>
}) {
  const lineOpacity = useTransform(progress, [0.48, 0.72, 1], [0, 0.55, 1])
  const [paths, setPaths] = useState<EdgePath[]>([])

  const measure = useCallback(() => {
    const world = worldRef.current
    if (!world) return
    setPaths(buildEdgePaths(world))
  }, [worldRef])

  useLayoutEffect(() => {
    measure()
    const world = worldRef.current
    if (!world) return

    const ro = new ResizeObserver(() => measure())
    ro.observe(world)
    window.addEventListener('resize', measure)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure, worldRef])

  useMotionValueEvent(progress, 'change', (v) => {
    if (v >= 0.48) requestAnimationFrame(measure)
  })

  return (
    <motion.svg
      className="entropy__edges"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ opacity: lineOpacity }}
      aria-hidden
    >
      {paths.map((edge) => (
        <path
          key={edge.id}
          d={edge.d}
          className={`entropy__edge${edge.outcome ? ' entropy__edge--outcome' : ''}`}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </motion.svg>
  )
}
