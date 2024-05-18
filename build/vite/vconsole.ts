import path from 'node:path'
import { viteVConsole } from 'vite-plugin-vconsole'

export function createViteVConsole() {
  return viteVConsole({
    entry: [path.resolve('src/main.ts')],
    enabled: false,
    config: {
      maxLogNumber: 1000,
      theme: 'light',
    },
    // https://github.com/vadxq/vite-plugin-vconsole/issues/21
    dynamicConfig: {
      theme: `document.documentElement.classList.contains('dark') ? 'dark' : 'light'`,
    },
    eventListener: `
      const targetElement = document.querySelector('html'); // Choose the elements to be monitored
      const observerOptions = {
        attributes: true, // Monitor attribute changes
        attributeFilter: ['class'] // Only listen to changes in class attributes
      };

      // Define a callback function to deal with observed changes
      function handleAttributeChange(mutationsList) {
        for(let mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (window && window.vConsole) {
              window.vConsole.dynamicChange.value = new Date().getTime();
            }
          }
        }
      }

      // Create an observer instance and pass in the callback function
      const observer = new MutationObserver(handleAttributeChange);

      // Start observing the target element
      observer.observe(targetElement, observerOptions);

      // Stop observing when you no longer need to observe.
      // observer.disconnect();
    `,
  })
}
