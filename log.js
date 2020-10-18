// Write Javascript code!
export const logger = place => ({
  h1: () => ({
    log: m =>
      (document.getElementById(`r${place}`).innerHTML += `<h1>${m}</h1>`)
  }),
  p: () => ({
    log: m => (document.getElementById(`r${place}`).innerHTML += `<p>${m}</p>`)
  })
});

const stringify = logger => ({
  h1: () => ({
    log: m => {
      logger.h1().log(JSON.stringify(m));
    }
  }),
  p: () => ({
    log: m => {
      logger.p().log(JSON.stringify(m));
    }
  })
});

export const logger1 = logger(1);
export const log = logger(1).p().log;
