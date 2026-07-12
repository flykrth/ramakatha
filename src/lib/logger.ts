type LogLevel = 'INFO' | 'WARN' | 'ERROR'

class Logger {
  private log(level: LogLevel, message: string, meta?: Record<string, any>) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(meta && { metadata: meta }),
    }
    
    if (level === 'ERROR') {
      console.error(JSON.stringify(logEntry))
    } else if (level === 'WARN') {
      console.warn(JSON.stringify(logEntry))
    } else {
      console.log(JSON.stringify(logEntry))
    }
  }

  info(message: string, meta?: Record<string, any>) {
    this.log('INFO', message, meta)
  }

  warn(message: string, meta?: Record<string, any>) {
    this.log('WARN', message, meta)
  }

  error(message: string, error?: Error | any, meta?: Record<string, any>) {
    const errorMeta = error instanceof Error 
      ? { errorName: error.name, errorMessage: error.message, errorStack: error.stack } 
      : { error }
    this.log('ERROR', message, { ...errorMeta, ...meta })
  }
}

export const logger = new Logger()
