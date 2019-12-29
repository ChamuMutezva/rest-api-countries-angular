export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {
    "--light-mode-text": "hsl(200, 15%, 8%)",
    "--light-mode-input": "hsl(0, 0%, 52%)",
    "--light-mode-background": "hsl(0, 0%, 98%)",
    "--light-mode-elements": "hsl(0, 0%, 100%)",
  }
};

export const dark: Theme = {
  name: "dark",
  properties: {
    "--dark-mode-elements": "hsl(209, 23%, 22%)",
    "--dark-mode-background": "hsl(207, 26%, 17%)",
    "--dark-mode-text": "hsl(0, 0%, 100%)",

  }
};