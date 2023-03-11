import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

interface ExoticComponentWithDisplayName<P = any> extends React.ExoticComponent<P> {
  defaultProps?: Partial<P>
  displayName?: string
}

type AnyComponent<P = any> = ExoticComponentWithDisplayName<P> | React.ComponentType<P>

type KnownTarget = keyof JSX.IntrinsicElements | AnyComponent

type PolymorphicComponentProps<P extends object, E extends KnownTarget> = Omit<
  P & Omit<React.ComponentPropsWithRef<E>, keyof P>,
  'as'
> & {
  as?: P extends { as?: string | AnyComponent } ? P['as'] : E
}

interface PolymorphicComponent<P extends object, FallbackComponent extends KnownTarget>
  extends React.ForwardRefExoticComponent<P> {
  <E extends KnownTarget = FallbackComponent>(props: PolymorphicComponentProps<P, E>): React.ReactElement | null
}

export function styled<C extends KnownTarget, T>(component: C, config: Partial<Parameters<typeof cva<T>>>) {
  const Component = component
  const classVariance = cva<T>(...config)

  const Styled: PolymorphicComponent<VariantProps<typeof classVariance>, C> = React.forwardRef((props, ref) => {
    const { className, ...rest } = props
    const StyledComponent = (props as any).as || Component
    return <StyledComponent ref={ref} className={twMerge(classVariance(rest as any), className)} {...(rest as any)} />
  })

  return Styled
}
