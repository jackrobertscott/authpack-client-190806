import 'graphiql/graphiql.css'
import GraphiQL from 'graphiql'
import { createElement as element, FC } from 'react'
import { useTheme } from '@authpack/theme'
import { css } from 'emotion'
import { config } from '../config'
import { useUniversal } from '../hooks/useUniversal'
import { useAuthpackCurrent, authpack } from '../utils/authpack'

const startingQuery = `
query First10Users {
  users: ListUsers(options: { limit: 10 }) {
    id
    name
    email
    username
    created
    updated
  }
}
`.trim()

export const Explorer: FC = () => {
  const theme = useTheme()
  const universal = useUniversal()
  const auth = useAuthpackCurrent()
  return element('div', {
    children: element(GraphiQL, {
      defaultQuery: startingQuery,
      fetcher: async (graphQLParams: any) => {
        try {
          const data = await authpack.api.graphql<any>({
            url: config.api,
            key: universal.cluster_key_client,
            bearer: auth.bearer,
            ...graphQLParams,
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
        background: theme.page.background,
        '.historyPaneWrap, .editorWrap, .docExplorerWrap': {
          '*': {
            fontSize: '1rem',
            lineHeight: '1.25rem',
            fontFamily: `'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'`,
            fontWeight: 500,
            outline: 'none',
            letterSpacing: 'normal',
            WebkitTextFillColor: 'initial',
          },
        },
        /**
         * Topbar.
         */
        '.topBarWrap': {
          margin: 0,
          padding: 0,
          color: theme.page.title,
          background: theme.page.header,
          borderBottom: theme.page.border,
        },
        '.topBar': {
          margin: 0,
          padding: 0,
          height: 'auto',
          width: 'auto',
          background: 'none',
          border: 'none',
          '.title': {
            margin: '26px auto 22px 0',
            padding: '0 25px',
            span: {
              fontSize: '1.5rem',
            },
            em: {
              fontSize: '1.5rem',
            },
          },
        },
        '.execute-button-wrap': {
          margin: 0,
          padding: 0,
          height: 'auto',
          width: 'auto',
        },
        '.execute-button, .toolbar-button, .docExplorerShow': {
          padding: '25px 25px',
          margin: 0,
          boxShadow: 'none',
          transition: '200ms',
          border: 'none',
          borderRadius: 0,
          color: theme.page.label,
          background: theme.page.header,
          '&:hover': {
            color: theme.page.labelHover,
            background: theme.page.headerHover,
          },
        },
        '.execute-button': {
          width: 'auto',
          height: 'auto',
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
          left: -10,
          borderRadius: '0 0 3px 3px',
          overflow: 'hidden',
          background: 'transparent',
          border: theme.page.border,
          boxShadow: 'none',
          li: {
            margin: 0,
            padding: 15,
            color: theme.page.label,
            background: theme.page.header,
            transition: '200ms',
            minWidth: 240,
            '&:not(:last-child)': {
              borderBottom: theme.page.border,
            },
            '&:hover': {
              color: theme.page.labelHover,
              background: theme.page.headerHover,
            },
          },
        },
        '.toolbar': {},
        '.toolbar-button': {
          '&:active': {
            background: 'none',
            boxShadow: 'none',
          },
        },
        '.docExplorerShow': {
          '&::before': {
            content: 'none',
          },
        },
        /**
         * Documents & History.
         */
        '.docExplorerWrap, .historyPaneWrap': {
          boxShadow: 'none',
        },
        '.doc-explorer': {
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'hidden',
          color: theme.page.title,
          background: theme.page.background,
          borderLeft: theme.page.border,
        },
        '.historyPaneWrap': {
          color: theme.page.title,
          background: theme.page.background,
          borderRight: theme.page.border,
          width: '40% !important',
          maxWidth: '360px',
        },
        '.doc-explorer-title-bar, .history-title-bar': {
          margin: 0,
          padding: 0,
          height: 'auto',
          color: theme.page.title,
          background: theme.page.header,
          borderBottom: theme.page.border,
        },
        '.doc-explorer-title, .history-title': {
          margin: 0,
          padding: '25px 15px',
          height: 'auto',
          textAlign: 'left',
        },
        '.doc-explorer-back': {
          margin: 0,
          padding: 15,
          height: 'auto',
          display: 'flex',
          flexDirection: 'row-reverse',
          transition: '200ms',
          color: theme.page.title,
          borderRight: theme.page.border,
          '&:hover:not(:active)': {
            background: theme.page.headerHover,
          },
          '&::before': {
            content: 'none',
          },
          '&::after': {
            content: '"\f100"',
            fontFamily: '"Font Awesome 5 Free"',
            fontWeight: 900,
            marginRight: 15,
            color: theme.page.title,
          },
        },
        '.docExplorerHide': {
          margin: 0,
          padding: '25px 15px',
          height: 'auto',
          color: 'transparent',
          boxSizing: 'content-box',
          width: '1rem',
          '&::before': {
            content: '"\f057"',
            fontFamily: '"Font Awesome 5 Free"',
            fontWeight: 900,
            color: theme.page.title,
          },
        },
        '.doc-explorer-contents, .history-contents': {
          margin: 0,
          padding: 0,
          height: 'auto',
          position: 'unset',
          overflowY: 'auto',
          border: 'none',
        },
        '.doc-alert-text': {
          margin: 0,
          padding: 15,
          display: 'flex',
          color: theme.input.value,
          background: theme.input.background,
          borderBottom: theme.input.border,
        },
        '.search-box': {
          margin: 0,
          padding: 0,
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          transition: '200ms',
          color: theme.input.value,
          background: theme.input.background,
          borderBottom: theme.input.border,
          '&:hover, &:focus-within': {
            color: theme.input.valueHover,
            background: theme.input.backgroundHover,
          },
          '.search-box-icon, .search-box-clear': {
            margin: 0,
            padding: 15,
            height: 'auto',
            position: 'unset',
            transform: 'none',
            background: 'none',
            border: 'none',
            width: '1rem',
            boxSizing: 'content-box',
            borderRadius: 0,
            color: 'transparent',
          },
          '.search-box-icon': {
            paddingRight: 0,
            '&::before': {
              content: '"\f002"',
              fontFamily: '"Font Awesome 5 Free"',
              fontWeight: 900,
              color: theme.input.value,
            },
          },
          '.search-box-clear': {
            '&:hover, &:focus-within': {
              background: theme.input.backgroundHover,
            },
            '&::before': {
              content: '"\f057"',
              fontFamily: '"Font Awesome 5 Free"',
              fontWeight: 900,
              color: theme.input.value,
            },
          },
          input: {
            margin: 0,
            padding: 15,
            height: 'auto',
            background: 'transparent',
            color: theme.input.value,
            '&::placeholder': {
              color: theme.input.placeholder,
            },
            '&:hover, &:focus-within': {
              color: theme.input.valueHover,
            },
          },
        },
        '.error-container': {},
        '.doc-type-description': {
          margin: 0,
          padding: 15,
          color: theme.page.label,
          background: theme.page.background,
          borderBottom: theme.page.border,
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
          color: theme.page.label,
          background: theme.page.background,
          '& > span, & > .type-name': {
            display: 'flex',
            padding: 15,
          },
        },
        '.doc-category-title': {
          margin: 0,
          padding: '15px 15px 0 15px',
          fontVariant: 'none',
          textTransform: 'capitalize',
          fontWeight: 'inherit',
          letterSpacing: 'normal',
          color: theme.page.title,
          background: theme.page.background,
          borderBottom: 'none',
        },
        '.doc-category-item': {
          margin: 0,
          padding: 15,
          color: theme.page.label,
          background: theme.page.background,
          borderBottom: theme.page.border,
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
            padding: 0,
            color: theme.page.label,
            background: theme.page.header,
            borderBottom: theme.page.border,
            transition: '200ms',
            '&:hover': {
              color: theme.page.labelHover,
              background: theme.page.headerHover,
            },
            'button, input': {
              margin: 0,
              padding: 15,
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
          letterSpacing: 'normal',
          transition: '200ms',
          background: theme.page.header,
          borderBottom: theme.page.border,
          borderTop: theme.page.border,
          color: theme.page.label,
          '&:hover': {
            background: theme.page.headerHover,
          },
        },
        '.CodeMirror': {
          background: theme.input.background,
          '.CodeMirror-code': {
            '*': {
              fontWeight: 500,
              fontFamily: 'Inconsolata',
            },
          },
          '.CodeMirror-gutters': {
            borderLeft: 'none',
            borderRight: theme.page.border,
            background: theme.page.header,
          },
          '.CodeMirror-hints': {
            background: theme.page.header,
          },
        },
        '.resultWrap': {
          borderLeft: 'none',
          '.CodeMirror': {
            '.CodeMirror-gutters': {
              borderLeft: theme.page.border,
            },
          },
        },
      },
    }),
  })
}
