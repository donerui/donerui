# Döner UI

A modern UI library optimized for React and styled with Tailwind CSS, @donerui makes it easy to build beautiful and responsive interfaces with efficiency.

## Installation

To use @donerui in your project, you need to have Tailwind CSS installed. If you haven't already installed Tailwind CSS, please follow the [official installation guide](https://tailwindcss.com/docs/installation).

After setting up Tailwind CSS, you can install @donerui via npm:

```bash
npm install @donerui
```

or using yarn:

```bash
yarn add @donerui
```

## Configuring Tailwind CSS
To take full advantage of @donerui, include the library in your tailwind.config.js file. This setup allows you to use the custom styles and utilities provided by @donerui seamlessly.

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/@donerui/**/*.js", // Include @donerui components
  ],
}
```

### Extending Your Tailwind Configuration
Modify your tailwind.config.js to include @donerui's custom configurations. Here's how you can extend your Tailwind setup to include primary and secondary colors used by @donerui:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ffddaa",
          200: "#ffddaa",
          300: "#ffddaa",
          400: "#ffddaa",
          500: "#ffddaa",
          600: "#ffddaa",
          700: "#ffddaa",
          800: "#ffddaa",
          900: "#ffddaa",
        },
        secondary: {
          100: "#ffaadd",
          200: "#ffaadd",
          300: "#ffaadd",
          400: "#ffaadd",
          500: "#ffaadd",
          600: "#ffaadd",
          700: "#ffaadd",
          800: "#ffaadd",
          900: "#ffaadd",
        },
      },
    },
  }
}
```

## Usage
Once you have included @donerui in your project and configured Tailwind CSS, you can start using the components as follows:

```jsx
import { Button, Rating } from '@donerui';

function App() {
  return (
    <div>
      <Button color="primary">Click me</Button>
      <Rating />
    </div>
  );
}
```

This example shows how to use the Button and Rating components from @donerui. You can import and use any component from the library in a similar manner.

## Contributing
We welcome contributions to @donerui! If you have suggestions or issues, please file them as issues on our GitHub repository at github.com/donerui/donerui.

## License
@donerui is MIT licensed.