# Tailwind Styled

Inspired by Stitches and Styled Components, Tailwind Styled is a utility function that allows you to create components with a similar syntax but using Tailwind CSS classes.

## Installation

```bash
npm install tailwind-styled
```

## Usage

```tsx
import { twStyled } from 'tailwind-styled'

const Button = twStyled('button', [
  // Base styles
  'px-4 py-2 rounded-md text-white',
  // Class Variance Authority config
  {
    // Variants
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
      },
      color: {
        primary: 'bg-blue-500 hover:bg-blue-600',
      },
    },
    // Compound Variants
    compoundVariants: [
      {
        size: 'sm',
        color: 'primary',
        css: 'px-2 py-1',
      },
    ],
    // Default values
    defaults: {
      size: 'md',
      color: 'primary',
    },
  },
])

// Usage
// Properties are inferred from the config plus the element props
<Button size="sm" href="/">
  {/*             ^-- "href" does not exist on type ... */}
  Button
</Button>
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
