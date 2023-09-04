import './core/client/client.js'
import { AppEvents } from './core/services/emitter.js';
import { DevelopmentLog } from './core/utils/dev.js';

AppEvents.emit('onReady')

AppEvents.on('Ready', () => {
    DevelopmentLog('GPlex - Card Generator Online', true)
})
