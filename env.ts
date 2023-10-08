import fs from 'fs';

const envFile = 'test/env.json';

if (!fs.existsSync(envFile)) {
  const emptyEnv = {
    url: '',
    key: {
      recognition: '',
      detection: '',
      verify: '',
    },
  };
  const emptyEnvStr = JSON.stringify(emptyEnv, undefined, 2);

  fs.writeFileSync(envFile, emptyEnvStr);
}
