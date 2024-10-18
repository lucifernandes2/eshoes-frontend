import { ColorRing, ColorRingProps } from 'react-loader-spinner'

const DEFAULT_COLOR = '#FAFAFA'

interface LoadingIndicatorProps extends ColorRingProps {
  color?: string
}

export default function LoadingIndicator({
  ariaLabel = 'color-ring-loading',
  color = DEFAULT_COLOR,
  height = '20',
  width = '20',
  wrapperClass = 'color-ring-wrapper',
  ...otherProps
}: LoadingIndicatorProps) {
  const colors = [color, color, color, color, color] as [
    string,
    string,
    string,
    string,
    string,
  ]

  return (
    <ColorRing
      {...otherProps}
      visible={true}
      height={height}
      width={width}
      colors={colors}
      ariaLabel={ariaLabel}
      wrapperClass={wrapperClass}
    />
  )
}