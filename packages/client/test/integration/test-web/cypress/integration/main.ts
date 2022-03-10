import * as testPeerClient from '@iroha2/test-peer/src/api/client';
import { peer_config, peer_genesis } from '../../../config';

testPeerClient.setBaseURL('/peer-server');

before(async () => {
    await testPeerClient.cleanConfiguration();
    await testPeerClient.cleanSideEffects();
    await testPeerClient.setConfiguration({ config: peer_config, genesis: peer_genesis });
});

beforeEach(async () => {
    await testPeerClient.killPeer();
    await testPeerClient.startPeer();
});

it('Register new domain and wait until committment', () => {
    cy.visit('/');

    // wait for genesis committment
    cy.get('h3').contains('Status').closest('div').contains('Blocks: 1');

    cy.get('button').contains('Listen').click().contains('Stop');

    cy.get('input').type('bob');
    cy.get('button').contains('Register domain').click();

    cy.contains('Blocks: 2');
});
