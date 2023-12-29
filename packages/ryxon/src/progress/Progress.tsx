import {
  h,
  computed,
  defineComponent,
  type SVGAttributes,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import { isString, isFunction, definePropType } from '@ryxon/utils'
import { createNamespace } from '../utils'

// Components
import { Icon } from '../icon'
import {
  Check,
  Close,
  CircleCheck,
  CircleClose,
  WarningFilled
} from '@ryxon/icons'

// Types
import type { ProgressColor, ProgressFn } from './types'

export const progressProps = {
  type: {
    type: String,
    default: 'line',
    values: ['line', 'circle', 'dashboard']
  },
  percentage: {
    type: Number,
    default: 0,
    validator: (val: number): boolean => val >= 0 && val <= 100
  },
  status: {
    type: String,
    default: '',
    values: ['', 'success', 'danger', 'warning']
  },
  indeterminate: { type: Boolean, default: false },
  duration: { type: Number, default: 3 },
  strokeWidth: { type: Number, default: 6 },
  strokeLinecap: {
    type: definePropType<NonNullable<SVGAttributes['stroke-linecap']>>(String),
    default: 'round'
  },
  textInside: { type: Boolean, default: false },
  width: { type: Number, default: 126 },
  showText: { type: Boolean, default: true },
  color: {
    type: definePropType<string | ProgressColor[] | ProgressFn>([
      String,
      Array,
      Function
    ]),
    default: ''
  },
  striped: Boolean,
  stripedFlow: Boolean,
  format: {
    type: definePropType<ProgressFn>(Function),
    default: (percentage: number): string => `${percentage}%`
  }
}

export type ProgressProps = ExtractPropTypes<typeof progressProps>

const [name, bem, , isBem] = createNamespace('progress')

export default defineComponent({
  name,
  props: progressProps,
  emits: [],
  setup(props, { slots }) {
    const barStyle = computed<CSSProperties>(() => ({
      width: `${props.percentage}%`,
      animationDuration: `${props.duration}s`,
      backgroundColor: getCurrentColor(props.percentage)
    }))

    const content = computed(() => props.format(props.percentage))

    // 直线进度条
    const renderLine = () => {
      return (
        <div class={bem('bar')}>
          <div
            class={bem('bar--outer')}
            style={{ height: `${props.strokeWidth}px` }}
          >
            <div
              class={[
                bem('bar--inner', {
                  indeterminate: props.indeterminate,
                  striped: props.striped,
                  'striped-flow': props.stripedFlow
                })
              ]}
              style={barStyle.value}
            >
              {(props.showText || slots.default) && props.textInside && (
                <div class={bem('bar--innerText')}>
                  {slots.default ? (
                    slots.default({ percentage: props.percentage })
                  ) : (
                    <span>{content.value}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    const STATUS_COLOR_MAP: Record<string, string> = {
      success: '#13ce66',
      danger: '#ff4949',
      warning: '#e6a23c',
      default: '#20a0ff'
    }

    function getColors(color: ProgressColor[]) {
      const span = 100 / color.length
      const seriesColors = color.map((seriesColor, index) => {
        if (isString(seriesColor)) {
          return {
            color: seriesColor,
            percentage: (index + 1) * span
          }
        }
        return seriesColor
      })
      return seriesColors.sort((a, b) => a.percentage - b.percentage)
    }

    const getCurrentColor = (percentage: number) => {
      const { color } = props
      if (isFunction(color)) {
        return color(percentage)
      } else if (isString(color)) {
        return color
      } else {
        const colors = getColors(color)
        for (const color of colors) {
          if (color.percentage > percentage) return color.color
        }
        return colors[colors.length - 1]?.color
      }
    }

    const stroke = computed(() => {
      let ret: string
      if (props.color) {
        ret = getCurrentColor(props.percentage)
      } else {
        ret = STATUS_COLOR_MAP[props.status] || STATUS_COLOR_MAP.default
      }
      return ret
    })

    const relativeStrokeWidth = computed(() =>
      ((props.strokeWidth / props.width) * 100).toFixed(1)
    )

    const radius = computed(() => {
      if (['circle', 'dashboard'].includes(props.type)) {
        return Number.parseInt(
          `${50 - Number.parseFloat(relativeStrokeWidth.value) / 2}`,
          10
        )
      }
      return 0
    })

    const trackPath = computed(() => {
      const r = radius.value
      const isDashboard = props.type === 'dashboard'
      return `
            M 50 50
            m 0 ${isDashboard ? '' : '-'}${r}
            a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
            a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
            `
    })

    const perimeter = computed(() => 2 * Math.PI * radius.value)
    const rate = computed(() => (props.type === 'dashboard' ? 0.75 : 1))

    const strokeDashoffset = computed(() => {
      const offset = (-1 * perimeter.value * (1 - rate.value)) / 2
      return `${offset}px`
    })
    const trailPathStyle = computed<CSSProperties>(() => ({
      strokeDasharray: `${perimeter.value * rate.value}px, ${
        perimeter.value
      }px`,
      strokeDashoffset: strokeDashoffset.value
    }))

    const circlePathStyle = computed<CSSProperties>(() => ({
      strokeDasharray: `${
        perimeter.value * rate.value * (props.percentage / 100)
      }px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value,
      transition:
        'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s'
    }))

    const renderCircle = () => {
      return (
        <div
          class={bem('circle')}
          style={{ height: `${props.width}px`, width: `${props.width}px` }}
        >
          <svg viewBox="0 0 100 100">
            <path
              class={bem('circle--track')}
              d={trackPath.value}
              stroke={`var(--r-fill-color-light, #e5e9f2)`}
              stroke-width={relativeStrokeWidth.value}
              fill="none"
              style={trailPathStyle.value}
            ></path>
            <path
              class={bem('circle--path')}
              d={trackPath.value}
              stroke-linecap={props.strokeLinecap}
              stroke-width={relativeStrokeWidth.value}
              stroke={stroke.value}
              fill="none"
              opacity={props.percentage ? 1 : 0}
              style={circlePathStyle.value}
            ></path>
          </svg>
        </div>
      )
    }

    const statusIcon = computed(() => {
      if (props.status === 'warning') {
        return WarningFilled
      }
      if (props.type === 'line') {
        return props.status === 'success' ? CircleCheck : CircleClose
      } else {
        return props.status === 'success' ? Check : Close
      }
    })

    const progressTextSize = computed(() => {
      return props.type === 'line'
        ? 12 + props.strokeWidth * 0.4
        : props.width * 0.111111 + 2
    })

    const renderText = () => {
      if ((props.showText || slots.default) && !props.textInside) {
        return (
          <div
            class={bem('text')}
            style={{ fontSize: `${progressTextSize.value}px` }}
          >
            {slots.default ? (
              slots.default({ percentage: props.percentage })
            ) : !props.status ? (
              <span>{content.value}</span>
            ) : (
              <Icon>{h(statusIcon.value)}</Icon>
            )}
          </div>
        )
      }
    }

    return () => (
      <div
        class={[
          bem([
            props.type,
            {
              'without-text': !props.showText,
              'text-inside': props.textInside
            }
          ]),
          isBem(props.status)
        ]}
        role="progressbar"
        aria-valuenow={props.percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {props.type === 'line' ? renderLine() : renderCircle()}
        {renderText()}
      </div>
    )
  }
})
