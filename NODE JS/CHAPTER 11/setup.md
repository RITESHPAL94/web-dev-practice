How to setup Tailwind CSS

Step 1: Run the following commands

npm install tailwindcss @tailwindcss/cli

Step 2: Create input.css
Create a folder named src.

Inside src, create a file named input.css.

Add the following code:
css

@import "tailwindcss";

Step 3: Start the Tailwind CLI build process
Run this command in your terminal:


bash
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
Command explanation:

-i – Specifies the input CSS file.
-o – Specifies the output CSS file.
--watch – Automatically rebuilds CSS when files change.
Tailwind will automatically generate output.css.

Keep the terminal running.