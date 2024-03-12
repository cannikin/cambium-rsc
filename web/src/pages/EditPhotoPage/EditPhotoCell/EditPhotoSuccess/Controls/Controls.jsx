import {
  EyeDropperIcon,
  GlobeAltIcon,
  ArrowsPointingInIcon,
  SparklesIcon,
  SunIcon,
} from '@heroicons/react/24/solid'

import { useParams } from '@redwoodjs/router'

const CONTROLS = [
  {
    name: 'brightness',
    label: 'Brightness',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 1,
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    name: 'contrast',
    label: 'Contrast',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 1,
    icon: <ArrowsPointingInIcon className="h-5 w-5" />,
  },
  {
    name: 'hue-rotate',
    label: 'Hue',
    min: 0,
    max: 360,
    step: 1,
    defaultValue: 0,
    icon: <GlobeAltIcon className="h-4 w-4" />,
  },
  {
    name: 'saturate',
    label: 'Saturation',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 1,
    icon: <EyeDropperIcon className="h-4 w-4" />,
  },
  {
    name: 'grain',
    label: 'Grain',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0,
    icon: <SparklesIcon className="h-4 w-4" />,
  },
]

const Controls = ({ refs, onChange, onReset, onResetAll }) => {
  const params = new URLSearchParams(location.hash.slice(1))

  // override any defaultValues that are in the URL
  const controls = CONTROLS.map((control) => {
    return {
      ...control,
      defaultValue: params.get(control.name) || control.defaultValue,
    }
  })

  return (
    <form className="flex flex-col space-y-5">
      {controls.map((control, i) => (
        <div key={i} className="control">
          <label htmlFor={control.name}>
            <div className="justify-left flex items-center space-x-1">
              {control.icon}
              <span>{control.label}</span>
            </div>
            <button
              type="button"
              className="py-1/2 rounded-full bg-neutral-800 px-2 text-xs text-neutral-600 transition duration-150 hover:text-neutral-400"
              onClick={() => onReset(control.name)}
            >
              Reset
            </button>
          </label>
          <input
            type="range"
            name={control.name}
            ref={refs[control.name]}
            onChange={onChange}
            defaultValue={control.defaultValue}
            min={control.min}
            max={control.max}
            step={control.step}
          />
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="reset"
          className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-600 transition duration-150 hover:text-white"
          onClick={onResetAll}
        >
          Reset All
        </button>
      </div>
    </form>
  )
}

export default Controls
