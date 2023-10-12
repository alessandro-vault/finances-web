import {defineConfig} from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";
import presetExt from "@twind/preset-ext";

export default defineConfig({
    presets: [
        presetTailwind(),
        presetExt(),
    ],
    darkMode: "class",
    theme: {
        content: [
            './pages/**/*.{ts,tsx}',
            './components/**/*.{ts,tsx}',
            './app/**/*.{ts,tsx}',
        ],
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            }
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: {height: 0},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: 0},
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            colors: {
                'slate': {
                    950: '#020617',
                }
            }
        }
    }
});