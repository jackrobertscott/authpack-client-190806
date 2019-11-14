import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { graphql, useTheme } from 'wga-theme'
import GraphiQL from 'graphiql'
import 'graphiql/graphiql.css'
import { config } from '../config'
import { useUniversal } from '../hooks/useUniversal'
import { wga } from '../utils/gadgets'

export const Explorer: FC = () => {
  const theme = useTheme()
  const universal = useUniversal()
  return create('div', {
    children: create(GraphiQL, {
      fetcher: async (graphQLParams: any) => {
        try {
          const data = await graphql<any>({
            ...graphQLParams,
            url: config.api,
            authorization: [universal.current_domain_key, wga.current.bearer]
              .filter(Boolean)
              .join(','),
          })
          return data.__schema ? { data } : data
        } catch (error) {
          return Promise.resolve(error)
        }
      },
    } as any),
    className: css({
      flexGrow: 1,
      '.graphiql-container': {
        fontSize: '15px',
        '.topBarWrap *, .historyPaneWrap *, .docExplorerWrap *': {
          fontFamily: 'futura-pt',
          fontSize: '15px',
          fontWeight: 700,
        },
        '.topBar, .docExplorerShow, .historyShow': {
          background: theme.page.header,
          borderBottom: theme.page.border,
          borderLeft: 'none',
          color: theme.page.title,
          height: 'auto',
          padding: '15px 25px',
          transition: '200ms',
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
          background: theme.page.headerHover,
        },
        '.docExplorerShow:before': {
          borderColor: theme.page.title,
        },
        '.doc-explorer-back': {
          background: '#111111',
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
            margin: '-7px',
          },
        },
        '.execute-button, .toolbar-button': {
          background: theme.page.headerHover,
          borderRadius: '3px',
          border: 'none',
          boxShadow: 'none',
          color: theme.page.labelHover,
          fill: theme.page.labelHover,
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
          background: '#111111',
          boxShadow: 'none',
          color: '#FFFFFF',
        },
        '.historyPaneWrap': {
          width: '30% !important',
          maxWidth: '400px',
          borderRight: theme.page.border,
        },
        '.docExplorerWrap': {
          width: '40% !important',
          maxWidth: '600px',
          borderLeft: theme.page.border,
        },
        '.history-title-bar, .doc-explorer-title-bar': {
          padding: '25px 15px',
        },
        '.history-title, .doc-explorer-title': {
          textAlign: 'left',
          padding: 0,
        },
        '.docExplorerHide': {
          padding: '7px',
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
              background: '#222222',
              color: '#FFFFFF',
            },
          },
        },
        '.CodeMirror': {
          background: theme.page.background,
          '.CodeMirror-sizer *': {
            fontFamily: 'Inconsolata',
            fontSize: '16px',
            color: theme.page.title,
            letterSpacing: '0.025em',
            caretColor: '#FFFFFF',
          },
        },
        '.CodeMirror-gutters': {
          borderRight: theme.page.border,
          borderLeft: theme.page.border,
          backgroundColor: 'transparent',
        },
        '.variable-editor': {
          height: 'auto',
        },
        '.variable-editor-title': {
          background: theme.page.headerHover,
          color: theme.page.title,
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
