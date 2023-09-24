// src/database/db.ts
import { Pool } from 'pg';
import * as AWS from 'aws-sdk';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

const secret_name = 'dev/prm/postgress';

const client = new SecretsManagerClient({
  region: 'us-west-1',
});

AWS.config.update({
  region: 'us-west-1',
});

async function getDatabaseCredentials() {
  let response;
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: 'AWSCURRENT',
      }),
    );
  } catch (error) {
    throw error;
  }

  return JSON.parse(response.SecretString);
}

export async function connectToDatabase() {
  const credentials = await getDatabaseCredentials();
  if (!credentials) {
    console.error('Could not load credentials from AWS secrets!');
  } else {
    const pool = new Pool({
      type: 'postgres',
      host: 'db-prime-realty-market.cxzxqkobpgbs.us-west-1.rds.amazonaws.com', // Updated to use the provided endpoint
      port: credentials.port,
      user: credentials.username, // Updated to 'user' from 'username'
      password: credentials.password,
      database: credentials.database,
    });
    console.log('Credentials: ' + JSON.stringify(pool));

    try {
      const client = await pool.connect();
      console.log('Connected to the database!');
      client.release();
    } catch (err) {
      console.error('Error connecting to the database', err.stack);
    }
  }
}
