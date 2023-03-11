import React from 'react'
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'

type StyledProps<C extends React.ElementType, V extends (...args: any) => any> = Omit<
  React.ComponentPropsWithRef<C>,
  keyof VariantProps<V>
> &
  VariantProps<V> & { className?: string }

export function styled<C extends React.ElementType, T>(component: C, config: Partial<Parameters<typeof cva<T>>>) {
  const Component = component
  const classVariance = cva<T>(...config)

  const Styled = React.forwardRef<React.ElementRef<C>, StyledProps<C, typeof classVariance>>((props, ref) => {
    const { className, ...rest } = props
    return (
      <Component ref={ref} className={twMerge(classVariance({ ...(rest as any), className }))} {...(rest as any)} />
    )
  })

  return Styled
}
