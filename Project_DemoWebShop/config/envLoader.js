/**
* Simplified Environment Configuration Loader
* Loads environment-specific .env files with variable interpolation support.
*
Locally: Uses .env.auto (parameterized format with ${} variables)
* Local → .env
* Test  → .env.test
*
* Usage:
*       const { loadEnv, getEnvConfig } = require('./config/envLoader');
*       loadEnv();  // Call once at startup
*       const config = getEnvConfig();
*/

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const path = require('path'); const fs = require('fs');

// Track if environment has been loaded to avoid duplicate logging
let envLoaded = false;
let loadedEnvName = null;

// Load environment configuraction/**

function loadEnv(envName = null) {
     const rootDir = path.resolve(__dirname, '..');

// Determine environment: explicit > NODE_ENV > default (local)
let env = envName || process.env.NODE_ENV || 'local';

// Normalize env
if (env !== 'test') {
    env = 'local';
  }

// Prevent reloading
if (envLoaded && loadedEnvName === env) {
    return process.env;
  }

// Select file
const envFile = env === 'test' ? '.env.test' : '.env';
const envPath = path.join(rootDir, envFile);

if (!fs.existsSync(envPath)) {
    throw new Error(`❌ Environment file not found: ${envFile}`);
  }

// Load env
const envConfig = dotenv.config({ path: envPath, override: true });
dotenvExpand.expand(envConfig);

console.log(`✅ Loaded environment: ${env} (${envFile})`);

envLoaded = true;
loadedEnvName = env;

return process.env;
}

function getEnvConfig() { return { envName: process.env.NODE_ENV || 'local',

// URLs
    baseUrl: process.env.BASE_URL_DEMOWEBSHOP,

    // // Super Users
    // superUser: {
    //     username: process.env.TEST_USER_SUPER,
    //     password: process.env.TEST_PASSWORD,
    // },

    defaultUser: {
        username: process.env.username_maker,
        password: process.env.password_maker,
    },

    test: {
        workers: parseInt(process.env.WORKERS || '1'),
        headless: process.env.HEADLESS === 'true',
        retry: parseInt(process.env.RETRY || '0'),
        navTimeout: parseInt(process.env.NAV_TIMEOUT || '90000'),
        actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '45000'),
    },
};

}

function getUser(role, index = 1) {
   const config = getEnvConfig();

  if (role === 'super') return config.superUser;

  if (role === 'maker') {
    return config.users[`user${index}`] || config.defaultUser;
    }

throw new Error(`Unknown role: ${role}`);
}

module.exports = { loadEnv, getEnvConfig, getUser, };
