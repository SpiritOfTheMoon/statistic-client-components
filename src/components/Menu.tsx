import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import 'office-ui-fabric-react/dist/css/fabric.css';

import { MenuNav, KeyMenu } from './MenuNav';
import { FrontendMenu } from './FrontendMenu';
import { BackendMenu } from './BackendMenu';

export type MenuProps = {
  systemId: string;
};

export function Menu({ systemId }: MenuProps): JSX.Element {
  return (
    <>
      <Router>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm1 ms-xl1">
              <MenuNav />
            </div>
            <div className="main-element ms-Grid-col ms-sm11 ms-xl11">
              <div className="ms-Grid-row" />
              <div className="ms-Grid-row">
                <Switch>
                  <Redirect exact from="/" to={`/${KeyMenu.Frontend}/${KeyMenu.TargetKey}`} />
                  <Route
                    exact
                    path={`/${KeyMenu.Frontend}/:key`}
                    render={
                      (props) => (
                        <FrontendMenu
                          systemId={systemId}
                          selectedKey={props.match.params.key}
                          history={props.history}
                        />
                      )
                    }
                  />
                  <Route
                    exact
                    path={`/${KeyMenu.Backend}/:key`}
                    render={
                      (props) => (
                        <BackendMenu
                          systemId={systemId}
                          selectedKey={props.match.params.key}
                          history={props.history}
                        />
                      )
                    }
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}
