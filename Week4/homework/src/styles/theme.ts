const theme = {
  colors: {
    primary: "#4FADF7",
    background: "#F5F8FF",
    white: "#FFFFFF",
    text: "#000000",
    subText: "#888888",
    border: "#D9D9D9",
    error: "#FF4444",
  },
} as const;

export type Theme = typeof theme;
export default theme;
