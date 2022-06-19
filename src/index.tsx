import './index.css';

/* @refresh reload */
import { render } from 'solid-js/web';

import { HopeProvider } from '@hope-ui/solid';

import App from './App';

render(() => {
    return (
        <HopeProvider>
            <App />
        </HopeProvider>
    );
}, document.getElementById('root') as HTMLElement);
