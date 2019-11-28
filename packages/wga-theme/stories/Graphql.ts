import '@fortawesome/fontawesome-free/css/all.min.css'
import GraphiQL from 'graphiql'
import 'graphiql/graphiql.css'
import { createElement as create } from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'emotion'
import { Root, graphql } from '../src/index'

console.clear()

const stories = storiesOf('Pages', module).addDecorator(data => {
  return create(Root, {
    theme: 'snow_storm',
    children: create('div', {
      children: data(),
      className: css({
        display: 'flex',
        flexGrow: 1,
      }),
    }),
  })
})

stories.add('Explorer', () => {
  return create('div', {
    children: create(GraphiQL, {
      fetcher: async (graphQLParams: any) => {
        try {
          const data = await graphql<any>({
            ...graphQLParams,
            url: 'http://localhost:4000',
            authorization: ['wga-secret-key-f94c72f42177ca30b3f861ead']
              .filter(Boolean)
              .join(','),
          })
          return data.__schema ? { data } : data
        } catch (error) {
          return Promise.resolve(error)
        }
      },
    }),
    className: css({
      flexGrow: 1,
      /**
       * Container.
       */
      '.graphiql-container': {
        fontSize: '1rem',
        '*': {
          fontSize: '1rem !important',
          lineHeight: '1.2rem !important',
          fontFamily: 'Rubik !important',
          outline: 'none !important',
        },
      },
      /**
       * Topbar.
       */
      '.topBarWrap': {
        // header styles
        margin: 0,
        padding: '20px 25px',
        background: 'none',
      },
      '.topBar': {
        margin: 0,
        padding: 0,
        height: 'auto',
        width: 'auto',
        background: 'none',
        border: 'none',
        '.title': {
          margin: '0 auto 0 0',
          padding: 0,
        },
      },
      '.execute-button-wrap': {
        margin: 0,
        padding: 0,
        height: 'auto',
        width: 'auto',
      },
      '.execute-button': {
        // button styles
        background: '#777',
        color: '#EEE',
        border: 'none',
        boxShadow: 'none',
        borderRadius: 3,
        margin: '0 0 0 15px',
        padding: 15,
        height: 'auto',
        width: 'auto',
        display: 'flex',
        '&::before': {
          content: '"\f04b"',
          fontFamily: '"Font Awesome 5 Free"',
          fontWeight: 900,
        },
        svg: {
          display: 'none',
        },
      },
      '.execute-options': {
        margin: 0,
        padding: 0,
        top: '100%',
        left: '15px',
        borderRadius: 3,
        overflow: 'hidden',
        li: {
          margin: 0,
          padding: 15,
          '&:hover': {
            background: 'none',
            color: 'initial',
          },
        },
      },
      '.toolbar': {
        '.toolbar-button': {
          // button styles
          background: '#777',
          color: '#EEE',
          border: 'none',
          boxShadow: 'none',
          borderRadius: 3,
          margin: '0 0 0 15px',
          padding: 15,
        },
      },
      '.docExplorerShow': {
        // button styles
        background: '#777',
        color: '#EEE',
        border: 'none',
        boxShadow: 'none',
        borderRadius: 3,
        margin: '0 0 0 15px',
        padding: 15,
        '&::before': {
          content: 'none',
        },
      },
      /**
       * Documents & History.
       */
      '.docExplorerWrap, .historyPaneWrap': {
        width: '50% !important',
        maxWidth: '500px !important',
        boxShadow: 'none',
      },
      '.doc-explorer': {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
      },
      '.doc-explorer-back': {
        margin: 0,
        padding: 15,
        height: 'auto',
        '&::before': {
          content: 'none',
        },
      },
      '.doc-explorer-title-bar, .history-title-bar': {
        margin: 0,
        padding: '40px 0 0',
        height: 'auto',
      },
      '.doc-explorer-title, .history-title': {
        margin: 0,
        padding: 15,
        height: 'auto',
        textAlign: 'left',
      },
      '.docExplorerHide': {
        margin: 0,
        padding: 15,
        height: 'auto',
        color: 'transparent',
        boxSizing: 'content-box',
        width: '1rem',
        '&::before': {
          content: '"\f057"',
          fontFamily: '"Font Awesome 5 Free"',
          fontWeight: 900,
          color: 'black',
        },
      },
      '.doc-explorer-contents, .history-contents': {
        margin: 0,
        padding: 0,
        height: 'auto',
        position: 'unset',
        overflowY: 'auto',
      },
      '.doc-alert-text': {
        margin: 0,
        padding: 15,
        display: 'flex',
      },
      '.search-box': {
        margin: 0,
        padding: 0,
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
      },
      '.search-box-icon, .search-box-clear': {
        margin: 0,
        padding: 15,
        height: 'auto',
        color: 'transparent',
        position: 'unset',
        transform: 'none',
        background: 'none',
        border: 'none',
        width: '1rem',
        boxSizing: 'content-box',
        borderRadius: 0,
      },
      '.search-box-icon': {
        paddingRight: 0,
        '&::before': {
          content: '"\f002"',
          fontFamily: '"Font Awesome 5 Free"',
          fontWeight: 900,
          color: 'black',
        },
      },
      '.search-box-clear': {
        '&::before': {
          content: '"\f057"',
          fontFamily: '"Font Awesome 5 Free"',
          fontWeight: 900,
          color: 'black',
        },
      },
      input: {
        margin: 0,
        padding: 15,
        height: 'auto',
      },
      '.error-container': {},
      '.doc-type-description': {
        margin: 0,
        padding: 15,
        p: {
          margin: 0,
          '&:not(:last-child)': {
            marginBottom: 10,
          },
        },
      },
      '.doc-category': {
        margin: 0,
        padding: 0,
      },
      '.doc-category-title': {
        margin: 0,
        padding: 15,
        fontVariant: 'none',
        textTransform: 'capitalize',
        fontWeight: 'inherit',
      },
      '.doc-category-item': {
        margin: 0,
        padding: 15,
      },
      '.field-short-description': {
        margin: '15px 0 0',
        padding: 0,
        p: {
          margin: 0,
          '&:not(:last-child)': {
            marginBottom: 10,
          },
        },
      },
      '.history-contents': {
        li: {
          margin: 0,
          padding: 15,
          '&:hover': {
            background: 'none',
            color: 'initial',
          },
        },
      },
      /**
       * Editor.
       */
      '.editorBar': {},
      '.queryWrap': {},
      '.query-editor': {},
      '.variable-editor': {
        margin: 0,
        padding: 0,
        height: 'auto',
      },
      '.variable-editor-title': {
        margin: 0,
        padding: 15,
        fontVariant: 'none',
        textTransform: 'capitalize',
        fontWeight: 'inherit',
      },
      '.resultWrap': {},
      /**
       * Code Mirror.
       */
      '.CodeMirror': {
        '*': {
          fontFamily: 'Inconsolata !important',
        },
      },
    }),
  })
})
