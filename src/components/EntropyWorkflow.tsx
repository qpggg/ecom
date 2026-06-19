import { type MotionValue, motion, useTransform } from 'framer-motion'
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

const EDGES = [
  ['catalog', 'card'],
  ['card', 'order'],
  ['order', 'crm'],
  ['order', 'admin'],
  ['crm', 'sales'],
  ['admin', 'sales'],
] as const

type EntropyWorkflowProps = {
  progress: MotionValue<number>
  full?: boolean
}

export function EntropyWorkflow({ progress, full = false }: EntropyWorkflowProps) {
  const shellOpacity = useTransform(progress, [0.45, 0.75], [0, 1])
  const gridOpacity = useTransform(progress, [0.35, 0.65], [0, 0.5])
  const worldRotateX = useTransform(progress, [0, 0.55, 1], [22, 10, 0])
  const worldRotateY = useTransform(progress, [0, 0.55, 1], [-18, -6, 0])
  const worldScale = useTransform(progress, [0, 0.5, 1], [0.82, 0.92, 1])
  const entropyLabel = useTransform(progress, [0, 0.2, 0.4], [1, 0.35, 0])

  return (
    <div className={`entropy${full ? ' entropy--full' : ''}`}>
      <motion.div className="entropy__shell" style={{ opacity: shellOpacity }}>
        <div className="entropy__shell-top">
          <span className="entropy__pill entropy__pill--active">ЗАЯВКИ</span>
          <span className="entropy__pill">КАТАЛОГ</span>
          <span className="entropy__shell-title">order flow</span>
        </div>
      </motion.div>

      <motion.div className="entropy__grid-bg" style={{ opacity: gridOpacity }} aria-hidden />

      <motion.div className="entropy__entropy-tag" style={{ opacity: entropyLabel }} aria-hidden>
        entropy
      </motion.div>

      <motion.div
        className="entropy__world"
        style={{
          rotateX: worldRotateX,
          rotateY: worldRotateY,
          scale: worldScale,
        }}
      >
        <WorkflowEdges progress={progress} />
        {DEBRIS.map((d) => (
          <Debris key={d.id} item={d} progress={progress} />
        ))}
        {NODES.map((node) => (
          <WorkflowNode key={node.id} node={node} progress={progress} />
        ))}
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
  const opacity = useTransform(progress, [0, 0.1, 1], [0.75, 1, 1])
  const blur = useTransform(progress, [0, 0.4, 0.85], [10, 2, 0])
  const filter = useTransform(blur, (v) => `blur(${v}px)`)
  const outcomeGlow = useTransform(progress, [0.72, 1], [0, 1])
  const boxShadow = useTransform(outcomeGlow, (v) =>
    node.highlight
      ? `0 0 0 1px rgba(148, 163, 184, ${0.22 + v * 0.18}), 0 0 ${20 + v * 36}px rgba(148, 163, 184, ${0.1 + v * 0.14}), 0 24px 48px rgba(0, 0, 0, 0.45)`
      : '0 0 0 1px rgba(148, 163, 184, 0.08), 0 24px 48px rgba(0, 0, 0, 0.45)',
  )

  return (
    <motion.div
      className={`entropy__node${node.highlight ? ' entropy__node--outcome' : ''}`}
      style={{
        x,
        y,
        z,
        rotateX,
        rotateY,
        rotateZ,
        opacity,
        filter,
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

function WorkflowEdges({ progress }: { progress: MotionValue<number> }) {
  const lineOpacity = useTransform(progress, [0.48, 0.72, 1], [0, 0.55, 1])
  const dashOffset = useTransform(progress, [0.48, 0.85], [140, 0])

  const pos = Object.fromEntries(NODES.map((n) => [n.id, n.final])) as Record<
    string,
    { x: number; y: number }
  >

  return (
    <motion.svg
      className="entropy__edges"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ opacity: lineOpacity }}
      aria-hidden
    >
      {EDGES.map(([from, to]) => {
        const a = pos[from]
        const b = pos[to]
        const mx = (a.x + b.x) / 2
        const isOutcome = to === 'sales'
        const d = `M ${a.x} ${a.y + 4} C ${mx} ${a.y + 4}, ${mx} ${b.y + 4}, ${b.x} ${b.y + 4}`
        return (
          <motion.path
            key={`${from}-${to}`}
            d={d}
            className={`entropy__edge${isOutcome ? ' entropy__edge--outcome' : ''}`}
            style={{ strokeDashoffset: dashOffset }}
          />
        )
      })}
    </motion.svg>
  )
}
