import * as dotenv from 'dotenv/config';
import * as React from 'react';
import * as mobx from 'mobx';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Auth from '@src/Auth';
import DevTools from 'mobx-react-devtools';

mobx.useStrict(true); // don't allow state modifications outside actions

const Root = (
    <AppContainer>
        <Auth>
            <h1>Working!</h1>
            <DevTools/>
        </Auth>
    </AppContainer>
);

ReactDOM.render(Root, document.getElementById('root'));
