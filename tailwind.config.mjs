module.exports = {
  content: [
    './views/**/*.pug',
  ],
  theme: {
    extend: {
      colors:{
        transparent: 'transparent',
        current: 'currentColor',
        'body': '#CDCFCC',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'login':'#A5DD9B',
        'input': '#f2f2f2',
        'boton':'#7FC7D9',
        'boton_2':'#365486',
      },
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'display': ['Oswald'],
        'body': ['"Open Sans"'],
      },
    },
  },
  plugins: [],
}