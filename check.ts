import fs from 'fs';
import { exit } from 'process';

interface Env {
  url?: string;
  key?: {
    recognition?: string;
    detection?: string;
    verify?: string;
  };
}

const envFile = 'test/env.json';

if (!fs.existsSync(envFile)) {
  console.error('No environment file found for test!');
  exit(1);
}

try {
  const data = fs.readFileSync(envFile, 'utf-8');
  const env = JSON.parse(data) as Env;
  if (!env.url?.trim()) {
    console.error('"url" is empty in the environment file for test!');
    exit(1);
  }

  if (!env.key) {
    console.error('"key" is empty in the environment file for test!');
    exit(1);
  } else {
    if (!env.key.recognition?.trim()) {
      console.error('"key.recognition" is empty in the environment file for test!');
      exit(1);
    }
    if (!env.key.detection?.trim()) {
      console.error('"key.detection" is empty in the environment file for test!');
      exit(1);
    }
    if (!env.key.verify?.trim()) {
      console.error('"key.verify" is empty in the environment file for test!');
      exit(1);
    }
  }
} catch {
  console.error('Environment file for test is wrong!');
  exit(1);
}
