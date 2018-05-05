import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { JssProvider } from 'react-jss';
import getPageContext from './src/getPageContext';
import { configureStore } from './store';

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  // Get the context of the page to collected side effects.
  const pageContext = getPageContext();
  const store = configureStore();

  const bodyHTML = renderToString(
    <Provider store={store}>
      <JssProvider
        registry={pageContext.sheetsRegistry}
        generateClassName={pageContext.generateClassName}
      >
        {React.cloneElement(bodyComponent, {
          pageContext,
        })}
      </JssProvider>
    </Provider>
  );

  replaceBodyHTMLString(bodyHTML);
  setHeadComponents([
    <style
      type="text/css"
      id="server-side-jss"
      key="server-side-jss"
      dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
    />,
  ]);
};
