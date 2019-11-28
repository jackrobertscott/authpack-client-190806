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
      '*': {
        border: '1px solid black !important',
      },
      /**
       * Container.
       */
      '.graphiql-container': {
        fontSize: '1rem',
        '*': {
          fontFamily: 'Rubik !important',
        },
      },
      /**
       * Topbar.
       */
      '.topBar': {
        margin: 0,
        padding: '20px 25px',
        height: 'auto',
        width: 'auto',
        '.title': {
          margin: '0 auto 0 0',
          padding: 0,
          fontSize: '1rem',
        },
        '.execute-button-wrap': {
          margin: 0,
          padding: 0,
          height: 'auto',
          width: 'auto',
          '.execute-button': {
            // button styles
            background: '#777',
            color: '#EEE',
            border: 'none',
            boxShadow: 'none',
            borderRadius: 3,
            fontSize: '1rem',
            margin: '0 0 0 15px',
            padding: 15,
            height: 'auto',
            width: 'auto',
            '&::before': {
              content: '"\f04b"',
              fontFamily: '"Font Awesome 5 Free"',
              fontWeight: 900,
            },
            svg: {
              display: 'none',
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
            fontSize: '1rem',
            margin: '0 0 0 15px',
            padding: 15,
          },
        },
      },
      /**
       * Editor.
       */
      '.editorBar': {
        '.queryWrap': {
          '.query-editor': {},
          '.variable-editor': {
            '.variable-editor-title': {},
          },
        },
        '.resultWrap': {},
      },
      /**
       * Code Mirror.
       */
      '.CodeMirror': {
        '*': {
          fontFamily: 'Inconsolata !important',
        },
      },
      /**
       * Documents.
       */
      '.docExplorerWrap': {
        '.docExplorerResizer': {},
        '.doc-explorer': {
          '.doc-explorer-title-bar': {
            '.doc-explorer-title': {},
            '.docExplorerHide': {},
          },
          '.doc-explorer-contents': {
            '.search-box': {
              '.search-box-icon': {},
              '.search-box-clear': {},
              input: {},
            },
            '.error-container': {},
          },
        },
      },
      /**
       * History.
       */
      '.historyPaneWrap': {
        '.history-title-bar': {
          '.history-title': {},
          '.docExplorerHide': {},
        },
        '.history-contents': {
          li: {},
        },
      },
    }),
  })
})
