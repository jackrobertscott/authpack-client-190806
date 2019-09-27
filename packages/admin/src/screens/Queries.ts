import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import GraphiQL from 'graphiql'
import 'graphiql/graphiql.css'
import { chat } from '../utils/server'

export type Queries = {}

export const Queries: FC<Queries> = () => {
  return create('div', {
    children: create(GraphiQL, {
      fetcher: (graphQLParams: any) =>
        chat({ ...graphQLParams, api: true })
          .then(data => (data.__schema ? { data } : data))
          .catch(console.warn),
    } as any),
    className: css({
      flexGrow: 1,
      '.graphiql-container': {
        fontSize: '15px',
        '.topBarWrap *, .historyPaneWrap *, .docExplorerWrap *': {
          fontFamily: 'Rubik',
          fontSize: '15px',
        },
        '.topBar, .docExplorerShow, .historyShow': {
          background: '#3B3B3B',
          borderBottom: 'none',
          borderLeft: 'none',
          color: '#FFFFFF',
          height: 'auto',
          padding: '15px 25px',
        },
        '.doc-explorer-contents': {
          background: 'transparent',
          borderTop: 'none',
          'p, & > span': {
            padding: '15px',
            display: 'block',
            margin: 0,
          },
        },
        '.docExplorerShow:hover': {
          background: '#505050',
        },
        '.docExplorerShow:before': {
          borderColor: '#FFFFFF',
        },
        '.doc-explorer-back': {
          color: '#999999',
          '&:before': {
            borderColor: '#999999',
          },
        },
        '.doc-category-item': {
          color: '#999999',
          '.field-name': {
            color: '#EEEEEE',
          },
        },
        '.doc-category-title': {
          margin: 0,
          borderBottom: 'none',
        },
        '.execute-button-wrap': {
          height: 'auto',
          marginRight: 0,
          svg: {
            margin: '-6px',
          },
        },
        '.execute-button, .toolbar-button': {
          background: '#555555',
          borderRadius: '3px',
          border: 'none',
          boxShadow: 'none',
          color: '#FFFFFF',
          fill: '#FFFFFF',
          padding: '15px',
          height: 'auto',
          width: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 15px 0 0',
        },
        '.execute-options, .toolbar-menu-items, .toolbar-select-options': {
          background: '#666666',
          color: '#FFFFFF',
          boxShadow: '0 1px 25px -5px hsla(0, 0%, 0%, 0.35)',
          padding: '15px',
          top: '100%',
          borderRadius: '3px',
          left: 0,
          li: {
            borderRadius: '3px',
            padding: '7.5px',
            width: '180px',
            '&.selected': {
              background: '#777777',
            },
          },
        },
        '.search-box': {
          margin: 0,
          borderBottom: 'none',
          '&:before': {
            content: 'unset',
          },
          '.search-box-clear': {
            backgroundColor: '#515151',
            borderRadius: '3px',
            fontSize: '15px',
            padding: '3.75px 7.5px',
            right: '7.5px',
            top: '7.5px',
          },
          input: {
            backgroundColor: '#353535',
            borderRadius: '3px',
            padding: '15px',
            color: '#FFFFFF',
          },
        },
        '.historyPaneWrap, .docExplorerWrap, .doc-explorer': {
          background: '#272727',
          boxShadow: 'none',
          color: '#FFFFFF',
        },
        '.history-title, .doc-explorer-title': {
          textAlign: 'left',
        },
        '.history-contents': {
          backgroundColor: 'transparent',
          borderTop: 'none',
          p: {
            borderBottom: 'none',
            color: '#B5B5B5',
            fontSize: '15px',
            padding: '15px',
            '&:hover': {
              background: '#444444',
              color: '#FFFFFF',
            },
          },
        },
        '.CodeMirror': {
          background: '#414141',
          '.CodeMirror-sizer *': {
            fontFamily: 'Inconsolata',
            fontSize: '16px',
            color: '#FEFEFE',
            letterSpacing: '0.025em',
            caretColor: '#FFFFFF',
          },
        },
        '.CodeMirror-gutters': {
          borderRight: 'none',
          backgroundColor: '#4F4F4F',
        },
        '.variable-editor': {
          height: 'auto',
        },
        '.variable-editor-title': {
          background: '#595959',
          color: '#999999',
          borderBottom: 'none',
          borderTop: 'none',
          padding: '15px',
        },
        '.resultWrap': {
          borderLeft: 'none',
        },
      },
    }),
  })
}
