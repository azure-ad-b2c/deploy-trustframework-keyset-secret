const core = require('@actions/core');
const fs = require('fs');
(global as any).fetch = require('node-fetch'); // Polyfill for graph client
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientCredentialsAuthProvider } from './auth';

async function main() {
    try {
        const value = core.getInput('value');
        const name = core.getInput('name')
        const tenant = core.getInput('tenant');
        const clientId = core.getInput('clientId');
        const clientSecret = core.getInput('clientSecret');

        const client = Client.initWithMiddleware({
            authProvider: new ClientCredentialsAuthProvider(tenant, clientId, clientSecret),
            defaultVersion: "beta"
        });

        // Then upload the secret
        let response = await client.api(`trustFramework/keySets/${name}/uploadSecret`).post({
            use: "sig",
            k: value
        });

        try {
            // Create in case it does not already exist
            await client.api("trustFramework/keySets").create({
                id: name
            });
        } catch { }

        core.info("Uploaded secret using Microsoft Graph");
    } catch (error) {
        let errorText = error.message ?? error;
        core.error('Action failed: ' + errorText);
        core.setFailed();
    }
}

main();
