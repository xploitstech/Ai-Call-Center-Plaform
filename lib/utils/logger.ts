import { createConsola } from 'consola'

const logger = createConsola({
  level: process.env.NODE_ENV === 'production' ? 3 : 4, // 3 for info, 4 for debug
  formatOptions: {
    date: true,
    colors: true,
  },
})

export { logger } 